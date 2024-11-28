<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import fakeLocation from "../../fakeLocation.json";

const containerRef = ref(null); // 參考外容器
const fakeLocations = ref([]);
const items = ref([]);
const columns = ref([]); // 每欄
const numCols = ref(2); // 預設為兩欄
let resizeObserver = null;

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

// 計算欄位分佈
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

// 根據容器寬度調整欄數
const updateColumnCount = () => {
  if (!containerRef.value) return;
  const width = containerRef.value.offsetWidth;

  if (width >= 1200) numCols.value = 5;
  else if (width >= 900) numCols.value = 4;
  else if (width >= 600) numCols.value = 3;
  else numCols.value = 2;

  calculateColumns();
};

onMounted(() => {
  fakeLocations.value = fakeLocation;
  initializeItems(); // 初始化 items

  // 監聽外容器大小
  resizeObserver = new ResizeObserver(updateColumnCount);
  if (containerRef.value) resizeObserver.observe(containerRef.value);
});

onBeforeUnmount(() => {
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value);
  }
});
</script>

<template>
  <div ref="containerRef" class="w-full h-screen px-6 pt-4 pb-14">
    <!-- 瀑布流 -->
    <div
      class="grid"
      :style="{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }"
      style="gap: 12px"
    >
      <div
        v-for="(col, colIndex) in columns"
        :key="colIndex"
        class="flex flex-col gap-3"
      >
        <div v-for="item in col" :key="item.id" class=" group">
            <div class=" z-40 relative w-full overflow-hidden rounded-lg focus:border-2 focus:border-primary-500 focus:my-[-0.5px] focus:after:content-[''] focus:after:w-full focus:after:h-full focus:after:bg-primary-400 focus:after:opacity-10 focus:after:absolute focus:after:z-50 focus:after:top-0" tabindex="0" >
              <!-- 黑色遮罩 -->
              <div class="absolute w-full h-full transition-opacity bg-black opacity-0 group-hover:opacity-20 "></div>
              <!-- 圖片 -->
              <a href="" class="">
                <img :id="'img-' + item.id" :src="item.url" alt="" />
              </a>
            </div>
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
</style>
