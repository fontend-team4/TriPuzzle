<script setup>
import { ref, onMounted, nextTick } from "vue";
import { StarIcon, MapPinIcon, ChevronDownIcon, HeartIcon, PlusCircleIcon } from "@heroicons/vue/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/vue/24/outline";
import fakeLocation from "../../fakeLocation.json";
import AddPlaceModal from "./AddPlaceModal.vue";

const fakeLocations = ref([]);
const items = ref([]);
const columns = ref([]); // 每欄
const numCols = ref(2); // 預設為兩欄

const initializeItems = () => {
  items.value = fakeLocation.map((location) => ({
    id: location.id,
    url: location.image,
    title: location.name,
    rating: location.rating.toString(),
    location: location.city,
    mapUrl: location.google_map,
  }));
};

// 瀑布流
const calculateColumns = async () => {
  columns.value = Array.from({ length: numCols.value }, () => []);
  const heights = Array(numCols.value).fill(0);

  for (const item of items.value) {
    const shortestCol = heights.indexOf(Math.min(...heights));
    columns.value[shortestCol].push(item);
    await nextTick();
    const img = document.getElementById(`img-${item.id}`);
    if (img) {
      heights[shortestCol] += img.offsetHeight + 16;
    }
  }
};

const handleResize = () => {
  if (window.innerWidth >= 1024) numCols.value = 4;
  else if (window.innerWidth >= 768) numCols.value = 3;
  else numCols.value = 2;
  calculateColumns();
};

onMounted(() => {
  fakeLocations.value = fakeLocation;
  initializeItems(); // 初始化 items
  handleResize();
  window.addEventListener("resize", handleResize);
});

// 點擊愛心切換
const toggleFavorite = (item) => {
  item.isFavorited = !item.isFavorited;
};
</script>

<template>
  <div class="h-screen lg:ps-28 pt-20 lg:pt-24 pb-14 bg-slate-100">
    <!-- 瀑布流 -->
    <div
      class="grid"
      :style="{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }"
      style="gap: 16px"
    >
      <div
        v-for="(col, colIndex) in columns"
        :key="colIndex"
        class="flex flex-col gap-4"
      >
        <div v-for="item in col" :key="item.id" class="group">
          <a href="#">
            <div class="relative w-full mb-2 overflow-hidden rounded-lg ">
              <!-- 黑色遮罩 -->
              <div class="absolute w-full h-full transition-opacity bg-black opacity-0 group-hover:opacity-20"></div>
              
              <!-- 喜歡按鈕和加入景點 -->
              <div class="absolute bottom-0 z-2 flex items-center justify-between w-full p-4 transition-opacity opacity-0 group-hover:opacity-100">
                <div
                  class="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-gray hover:bg-opacity-75 tooltip " data-tip="加入最愛"
                  @click.prevent="toggleFavorite(item)"
                >
                <component  :is="item.isFavorited ? HeartIcon : OutlineHeartIcon":class="item.isFavorited ? 'text-red-500' : 'text-gray-500'" class="size-6"/>
                </div>
                <button class="btn border-0 overflow-hidden text-white text-lg bg-secondary-500 rounded-full
  hover:bg-secondary-600" onclick="AddPlace.showModal()">加入行程<PlusCircleIcon class="size-6"/></button>
                <AddPlaceModal />
              </div>
              
              <!-- 圖片 -->
              <img :id="'img-' + item.id" :src="item.url" alt="" />
            </div>
            <div>
              <h3 class="text-sm font-bold text-gray-700 md:text-lg text-ellipsis text-slate-900">
                {{ item.title }}
              </h3>
              <div class="flex justify-between">
                <div class="flex text-slate-500 text-[12px] md:text-base">
                  <StarIcon class="text-yellow-500 md:size-6 size-4" /><span>{{
                    item.rating
                  }}</span
                  >．<span>{{ item.location }}</span>
                </div>
                <a :href="item.mapUrl"><MapPinIcon class="text-gray-500 md:size-6 size-4" /></a>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.group:hover .group-hover\:opacity-20 {
  opacity: 0.2;
}
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}

summary:active{
background-color:transparent !important;
color: rgb(55 65 81 / var(--tw-text-opacity, 1))  !important;
}

</style>
