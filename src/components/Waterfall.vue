<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue"

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const containerRef = ref(null) // 參考外容器
const items = ref([])
const columns = ref([]) // 每欄
const numCols = ref(2) // 預設為兩欄
let resizeObserver = null

// 計算欄位分佈
const calculateColumns = async () => {
  columns.value = Array.from({ length: numCols.value }, () => [])
  const heights = Array(numCols.value).fill(0)

  for (const item of items.value) {
    const shortestCol = heights.indexOf(Math.min(...heights))
    columns.value[shortestCol].push(item)
    await nextTick()
    const img = document.getElementById(`img-${item.id}`)
    if (img) {
      heights[shortestCol] += img.offsetHeight + 16
    }
  }
}
// 根據容器寬度調整欄數
const updateColumnCount = () => {
  if (!containerRef.value) return
  const width = containerRef.value.offsetWidth

  if (width >= 1200) numCols.value = 5
  else if (width >= 900) numCols.value = 4
  else if (width >= 600) numCols.value = 3
  else numCols.value = 2

  calculateColumns()
}

onMounted(() => {
  initializeItems()
  console.log(props.place.photos)

  // 監聽外容器大小
  resizeObserver = new ResizeObserver(updateColumnCount)
  if (containerRef.value) resizeObserver.observe(containerRef.value)
})

onBeforeUnmount(() => {
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value)
  }
})

// 收取Detail的景點
const props = defineProps({
  place: {
    type: Object,
    required: true,
  },
})

// 組成URL
const initializeItems = () => {
  if (!props.place || !props.place.photos) return

  items.value = props.place.photos.map((photo, index) => ({
    id: `photo-${index}`,
    url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`,
  }))

  calculateColumns()
}
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
        <div v-for="item in col" :key="item.id" class="group">
          <div
            class="z-40 relative w-full overflow-hidden rounded-lg focus:border-2 focus:border-primary-500 focus:my-[-0.5px] focus:after:content-[''] focus:after:w-full focus:after:h-full focus:after:bg-primary-400 focus:after:opacity-10 focus:after:absolute focus:after:z-50 focus:after:top-0"
            tabindex="0"
          >
            <!-- 黑色遮罩 -->
            <div
              class="absolute w-full h-full transition-opacity bg-black opacity-0 group-hover:opacity-20"
            ></div>
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
