<script setup>
import { ref, inject, onMounted, watch } from 'vue';
import axios from 'axios';
import {
  XMarkIcon,
  ChevronLeftIcon,
  TrashIcon
} from '@heroicons/vue/24/outline';
import { EllipsisHorizontalIcon, MapPinIcon } from '@heroicons/vue/24/solid';
import DeletePerDayModal from './DeletePerDayModal.vue';
import DeletePerPlaceModal from './DeletePerPlaceModal.vue';
import ScheduleOverview from './ScheduleOverview.vue';
import draggable from 'vuedraggable';
import { useSearchStore } from '@/stores/searchPlaces';
import { usePlacesStore } from '@/stores/fetchPlaces';
import { generateImageUrl } from '@/stores/favorites';

const placesStore = usePlacesStore();
const searchStore = useSearchStore();
const listAndDetailToggle = inject('listAndDetailToggle');
const detailToggle = inject('detailToggle');
const scheduleId = inject('scheduleId');
const place = ref([]);
const groupedPlaces = ref({});
const API_URL = process.env.VITE_HOST_URL;
const userId = ref(localStorage.getItem('userId'));
const token = localStorage.getItem('token');
const activeTab = ref(0);
const setActiveTab = (index) => {
  activeTab.value = index;
};

const formatDateWithoutTime = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const getDayInChinese = (date) => {
  const daysInChinese = ['日', '一', '二', '三', '四', '五', '六'];
  return daysInChinese[new Date(date).getDay()];
};

const formatDate = (dateString) => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  };
  return new Date(dateString).toLocaleTimeString('zh-TW', options);
};

const formatDuration = (durationString) => {
  const duration = new Date(durationString);
  const hours = duration.getUTCHours();
  const minutes = duration.getUTCMinutes();
  if (hours == 0) {
    return `${minutes} 分鐘`;
  }
  return `${hours} 小時 ${minutes} 分鐘`;
};

const formatMode = (mode) => {
  switch (mode) {
    case 'CAR':
      return '開車';
    case 'MOTOBIKE':
      return '騎機車';
    case 'transit':
      return '搭乘大眾運輸';
    case 'bicycling':
      return '騎腳踏車';
    case 'walking':
      return '步行';
    default:
      return '未知';
  }
};

const fetchDate = async () => {
  try {
    if (!userId.value || !token) {
      return;
    }
    const { data } = await axios.get(`${API_URL}/schedulePlaces/dates`, {
      params: { schedule_id: scheduleId.value },
      headers: { Authorization: `${token}` }
    });
    const { start_date, end_date } = data;
    const start = new Date(start_date);
    const end = new Date(end_date);
    const dateArray = [];
    while (start <= end) {
      dateArray.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    const dateMap = {};
    dateArray.forEach((date) => {
      const formattedDate = date.toISOString().split('T')[0];
      dateMap[formattedDate] = [];
    });
    return dateMap;
  } catch (error) {
    return null;
  }
};

const fetchData = async () => {
  try {
    if (!userId.value || !token) {
      return;
    }
    const response = await axios.get(`${API_URL}/schedulePlaces`, {
      params: { schedule_id: scheduleId.value },
      headers: { Authorization: `${token}` }
    });
    place.value = response.data;
    place.value.forEach((item) => {
      // item.places.image_url = generateImageUrl(item.places.image_url);
      item.transportation_way = formatMode(item.transportation_way);
    });
    groupedPlaces.value = await groupByDate(place.value);
    return groupedPlaces.value;
  } catch (error) {
    return null;
  }
};

const groupByDate = async (places) => {
  const dateObjct = await fetchDate();
  places.forEach((item) => {
    const date = item.which_date.split('T')[0];
    if (dateObjct[date]) {
      dateObjct[date].push(item);
    }
  });
  return dateObjct;
};

onMounted(() => {
  fetchData();
});

const updateMapCenter = (item) => {
  searchStore.placeGeometry = item.geometry;
};

watch(
  () => searchStore.searchData,
  (newData) => {
    if (newData.length > 0) {
      placesStore.updateFromSearch(newData);
      defaultPlacesData.value = placesStore.items;
    }
  },
  { immediate: true }
);

const drag = ref(false);

const removeDate = async (schedule_id, which_date) => {
  await axios.delete(`${API_URL}/schedulePlaces/${schedule_id}/${which_date}`);
  await fetchData();
};

const removePlace = (e, n) => {
  e.splice(n, 1);
  console.log(e);
  updateOrder(e);
  console.log(e[1].order);
  // await axios.delete(`${API_URL}/schedulePlaces/${id}`);
  // await fetchData();
};

const updateOrder = (items) => {
  items.forEach((item, index) => {
    item.order = index;
  });
};
</script>

<template>
  <div class="w-full h-screen transition-all bg-white shadow-xl lg:w-96">
    <!-- header -->
    <div class="relative py-5 bg-primary-600 ps-4 pe-14">
      <div class="flex items-center justify-between gap-0.5">
        <div
          class="flex items-center hover:cursor-pointer"
          @click="detailToggle"
        >
          <span class="inline-block w-4 h-4 text-white">
            <ChevronLeftIcon />
          </span>
          <h2 class="text-sm text-white">行程列表</h2>
        </div>
      </div>
      <label
        class="bg-gray opacity-80 text-gray-600 w-8 h-8 rounded-full absolute top-3.5 right-4 p-1.5 hover:opacity-90 tooltip tooltip-bottom hover:cursor-pointer"
        data-tip="隱藏行程"
        @click="listAndDetailToggle"
      >
        <XMarkIcon />
      </label>
    </div>
    <!-- date tab -->
    <div class="flex border-b border-gray">
      <div class="flex w-full h-12 pt-2 overflow-x-scroll ps-8 pe-3">
        <ul class="flex gap-4">
          <li class="whitespace-nowrap">
            <a
              @click.prevent="setActiveTab(-1)"
              class="pb-2 text-sm font-medium hover:text-primary-600"
              :class="activeTab === -1 ? 'text-primary-600' : ''"
            >
              總覽頁
            </a>
          </li>
          <li
            v-for="(places, date, index) in groupedPlaces"
            :key="date"
            class="whitespace-nowrap"
          >
            <a
              @click="setActiveTab(index)"
              class="pb-2 text-sm font-medium hover:text-primary-600"
              :class="activeTab === index ? 'text-primary-600' : ''"
            >
              第{{ index + 1 }}天
            </a>
          </li>
        </ul>
      </div>
    </div>
    <ScheduleOverview v-if="activeTab === -1" />
    <!-- everyday schedule -->
    <div v-for="(places, date, index) in groupedPlaces" :key="date">
      <div v-if="activeTab === index">
        <!-- date -->
        <div class="px-5 pt-5 mb-3">
          <div class="flex gap-1 date">
            <p class="font-medium">
              {{ formatDateWithoutTime(date) }}週{{ getDayInChinese(date) }}
            </p>
          </div>
        </div>
        <!-- place & transportation -->
        <div
          class="overflow-y-scroll overflow-x-hidden mb-4 h-[76vh] md:h-[76vh]"
        >
          <div
            class="w-11/12 mt-4 mx-auto h-28 border place bg-gray rounded-xl border-gray flex items-center justify-center"
            v-if="groupedPlaces[date].length === 0"
          >
            <p class="inline-block text-lg">今天還沒有行程呦!</p>
          </div>
          <draggable
            v-model="groupedPlaces[date]"
            :animation="250"
            group="local"
            @start="drag = true"
            @end="updateOrder(groupedPlaces[date])"
            item-key="id"
          >
            <template #item="{ element }">
              <div class="container place-transportation">
                <p
                  v-if="element.order !== 0 && groupedPlaces[date].length > 1"
                  class="w-full py-4 ml-3 border-l border-dashed ps-3 border-gray"
                >
                  {{
                    `${element.transportation_way} 需要 ${formatDuration(
                      element.duration
                    )} `
                  }}
                </p>
                <div
                  class="px-5 pt-2 pb-1 overflow-x-hidden overflow-y-hidden bg-white"
                >
                  <div
                    :key="element.id"
                    class="w-full mt-4 border place bg-gray rounded-xl border-gray"
                  >
                    <div class="flex p-1">
                      <img
                        class="w-[108px] h-[108px] rounded-xl object-cover"
                        :src="element.places.image_url"
                      />
                      <div class="relative flex justify-between w-cal">
                        <ul class="px-4 flex flex-col gap-0.5 justify-center">
                          <li class="text-sm font-medium text-orange-400">
                            {{ formatDate(element.arrival_time) }}
                          </li>
                          <li class="font-medium">{{ element.places.name }}</li>
                          <li class="text-xs text-gray-400">
                            {{ `停留 ${formatDuration(element.stay_time)} ` }}
                          </li>
                        </ul>
                        <button
                          class="absolute z-50 right-1 bottom-2"
                          @click="updateMapCenter(element.places)"
                        >
                          <MapPinIcon class="size-5" />
                        </button>
                        <TrashIcon
                          @click="
                            removePlace(groupedPlaces[date], element.order)
                          "
                          class="m-1 w-6 h-6 hover:text-primary-600 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.date:hover > .dropdown {
  display: inline;
}
.place:hover > .more {
  display: block;
}
.w-cal {
  width: calc(100% - 108px);
}
</style>
