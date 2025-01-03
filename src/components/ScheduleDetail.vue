<script setup>
import { ref, inject, onMounted, watchEffect, watch } from "vue"
import axios from "axios"
import {
  XMarkIcon,
  ChevronLeftIcon,
  ArrowUpTrayIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  PlusCircleIcon,
} from "@heroicons/vue/24/outline"
import { EllipsisHorizontalIcon, MapPinIcon } from "@heroicons/vue/24/solid"
import EditPlaceModal from "./EditPlaceModal.vue"
import DeletePerDayModal from "./DeletePerDayModal.vue"
import MoveToOtherDateModal from "./MoveToOtherDateModal.vue"
import DeletePerPlaceModal from "./DeletePerPlaceModal.vue"
import ScheduleOverview from "./ScheduleOverview.vue"
import draggable from "vuedraggable"
import { useSearchStore } from "@/stores/searchPlaces"
import { usePlacesStore } from "@/stores/fetchPlaces"

const placesStore = usePlacesStore()
const searchStore = useSearchStore()
const listAndDetailToggle = inject("listAndDetailToggle")
const detailToggle = inject("detailToggle")
const scheduleId = inject("scheduleId")
const transportationToggle = inject("transportationToggle")
const place = ref([]);
const groupedPlaces = ref({});
const API_URL = process.env.VITE_HOST_URL;
const userId = ref(localStorage.getItem("userId"));
const token = localStorage.getItem("token");
const activeTab = ref(0);
const setActiveTab = (index) => {
    activeTab.value = index;
};
const formatDateWithoutTime = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const getDayInChinese = (date) => {
  const daysInChinese = ["日", "一", "二", "三", "四", "五", "六"];
  return daysInChinese[new Date(date).getDay()];
};



const formatDate = (dateString) => {
  const options = { hour: '2-digit', minute: '2-digit', hour12: false };
  return new Date(dateString).toLocaleTimeString('zh-TW', options);
};

const formatDuration = (durationString) => {
  const duration = new Date(durationString);
  const hours = duration.getUTCHours();
  const minutes = duration.getUTCMinutes();
  return `${hours} 小時 ${minutes} 分鐘`;
};

const fetchData = async () => {
  try {
    if (!userId.value || !token) {
      return;
    }
    const response = await axios.get(`${API_URL}/schedulePlaces`, {
      params: { schedule_id: scheduleId.value },
      headers: { Authorization: `${token}` },
    });
    place.value = response.data;
    groupedPlaces.value = groupByDate(response.data);
  } catch (error) {
    return null;
  }
};

const groupByDate = (places) => {
  const grouped = {};
  places.forEach((item) => {
    const date = formatDateWithoutTime(item.which_date);
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });
  return grouped;
};

onMounted(() => {
  fetchData();
});

// const nearbySearch = () => {
//   searchStore.mapSearch()
// }

const updateMapCenter = (item) => {

  searchStore.placeGeometry = item.geometry;
};

watch(
  () => searchStore.searchData,
  (newData) => {
    if (newData.length > 0) {
      placesStore.updateFromSearch(newData)
      defaultPlacesData.value = placesStore.items
    }
  },
  { immediate: true }
)

// 拖曳狀態
const drag = ref(false)
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
          <span class="inline-block w-4 h-4 text-white"
            ><ChevronLeftIcon
          /></span>
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
              >總覽頁</a
            >
          </li>
          <li
            v-for="(places ,date, index) in groupedPlaces"
            :key="date"
            class="whitespace-nowrap">
            <a
              @click="setActiveTab(index)"
              class="pb-2 text-sm font-medium hover:text-primary-600"
              >第{{ index + 1 }}天</a
            >
          </li>
        </ul>
      </div>
      <div class="w-12 pt-2 text-center text-primary-600 hover:cursor-pointer">
        <span class="inline-block rounded-full w-7 h-7 hover:bg-gray"
          ><PlusCircleIcon
        /></span>
      </div>
    </div>
    <ScheduleOverview v-if="activeTab === -1" />
    <!-- everyday schedule -->
    <div v-for="(places, date, index) in groupedPlaces" :key="date">
      <div v-if="activeTab === index">
        <!-- date -->
        <div class="px-5 pt-5 mb-3">
          <div class="flex gap-1 cursor-pointer date w-36">
            <p class="font-medium">{{ formatDateWithoutTime(date) }}週{{ getDayInChinese(date) }}</p>
            <div class="dropdown lg:hidden">
              <div class="w-6 h-6" tabindex="0" role="button">
                <EllipsisHorizontalIcon />
              </div>
              <!-- delete dropdown -->
              <div
                tabindex="0"
                class="dropdown-content flex gap-2 bg-base-100 rounded z-[1] w-32 p-2 shadow hover:bg-gray"
                onclick="delete_date.showModal()"
              >
                <span class="w-6 h-6"><TrashIcon /></span>
                <p>刪除這天</p>
                <DeletePerDayModal />
              </div>
            </div>
          </div>
        </div>
        <!-- place & transportation -->
        <div class=" overflow-y-scroll overflow-x-hidden mb-4 h-[76vh] md:h-[76vh]">
        <draggable
          v-model="groupedPlaces[date]"
          :animation="250"
          group="local"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
        >
          <template #item="{ element }" >
            <div class="container place-transportation">
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
                      <button class="absolute z-50 right-1 bottom-2" @click="updateMapCenter(element.places)">
                        <MapPinIcon  class="size-5"/>
                      </button>
                      <div class="p-1 dropdown">
                        <button
                          role="button"
                          class="relative w-5 h-5 text-white bg-gray-300 rounded-full hover:bg-gray-400"
                        >
                          <EllipsisHorizontalIcon class="text-black"/>
                        </button>
                        <!-- dropdown 控制開關 -->
                        <ul
                          tabindex="0"
                          class="dropdown-content w-32 bg-white rounded border absolute right-[-12px] top-8 shadow-xl"
                        >
                          <li @click="moveDate.showModal()">
                            <a
                              class="flex items-center gap-1 px-5 py-2 text-sm hover:bg-gray"
                              href="#"
                            >
                              <span class="inline-block w-6 h-6"
                                ><CalendarIcon
                              /></span>
                              <p>移到別天</p>
                            </a>
                          </li>
                          <MoveToOtherDateModal />
                          <li>
                            <a
                              class="flex items-center gap-1 px-5 py-2 text-sm hover:bg-gray"
                              href="#"
                            >
                              <span class="inline-block w-6 h-6"
                                ><DocumentDuplicateIcon
                              /></span>
                              <p>複製</p>
                            </a>
                          </li>
                          <li class="border-t" @click="delete_place.showModal()">
                            <a
                              class="flex items-center gap-1 px-5 py-2 text-sm hover:bg-gray"
                              href="#"
                            >
                              <span class="inline-block w-6 h-6"
                                ><TrashIcon
                              /></span>
                              <p>刪除</p>
                            </a>
                          </li>
                          <DeletePerPlaceModal />
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- hover:relative feature -->
                </div>
              </div>
              <p
                v-if="element !== place[place.length - 1]"
                class="w-full py-4 ml-3 border-l border-dashed ps-3 border-gray hover:cursor-pointer"
                @click="transportationToggle"
              >
                {{ `自訂交通 ${element.transhour} 分` }}
              </p>
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
