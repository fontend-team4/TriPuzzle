<script setup>
import axios from 'axios'
import { ref, onMounted, nextTick, defineEmits, provide, watch } from 'vue'
import {
  StarIcon,
  MapPinIcon,
  ChevronDownIcon,
  HeartIcon,
  PlusCircleIcon,
} from '@heroicons/vue/24/solid'
import { HeartIcon as OutlineHeartIcon } from '@heroicons/vue/24/outline'
import { useRouter, useRoute } from 'vue-router'
import AddPlaceBtn from './AddPlaceBtn.vue'
import DefaultPlaces from '../../places_default.json'
import { PlaceModalStore } from '@/stores/PlaceModal'

const modalStore=PlaceModalStore()



const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const  places  = DefaultPlaces
console.log(places[0].name);


// places是陣列形式
// console.log(places[1].photos[1].name)

const router = useRouter()
const API_URL = 'http://localhost:3000'
const defaultPlacesData = ref([])
const items = ref([])
const columns = ref([]) // 每欄
const numCols = ref(2) // 預設為兩欄
const emit = defineEmits(['open-detail-modal'])

const initializeItems = () => {
  items.value = places.map((location) => ({
    id: location.place_id, // 使用 place_id 作為 ID
    url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${location.photos[1].photo_reference}&key=${GOOGLE_API_KEY}`,
    name: location.name,
    rating: location.rating || 'N/A', // 若 rating 不存在，則顯示 'N/A'
    location: location.address.split(/[0-9]+/)[1]?.slice(2, 5) || 'Unknown', // 確保處理 undefined 的情況
    mapUrl: location.placeUrl,
  }))
}


// 瀑布流
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

const handleResize = () => {
  if (window.innerWidth >= 1024) numCols.value = 4
  else if (window.innerWidth >= 768) numCols.value = 3
  else numCols.value = 2
  calculateColumns()
}

onMounted(() => {
  defaultPlacesData.value = places
  initializeItems() // 初始化 items
  handleResize()
  window.addEventListener('resize', handleResize)
})

// 點擊愛心切換
const toggleFavorite = (item) => {
  item.isFavorited = !item.isFavorited
}

const openDetailModal = (detailId) => {
  emit('open-detail-modal', detailId) // 傳遞地點的 ID
}


const getDefaultLocations = async()=>{
  // 拿取MapComponent的判斷是否定位，以及預設經緯度（信義區）
  // 如果使用者允許定位，那就搜尋使用者經緯度附近的20個景點
  // 如果使用者不允許定位，則設定信義區作為中心點去渲染地圖id
  console.log(123);
// http://localhost:3000/places/search?latitude=25.0329694&longitude=121.5654177&type=餐廳
  try {
    const defaultLat = ref(24.998564)
    const defaultLng = ref(121.576222)
    const response = await axios.get(
      `${API_URL}/places/search?latitude=${defaultLat.value}&longitude=${defaultLng.value}&type=餐廳`,
      // ScheduleData,
      // config
      // type : "景點類型" , latitude : "地圖中心經度" , longitude : "地圖中心緯度"
    )
    console.log(response.data)
  } catch (err) {
    console.error(err.message)
    alert('搜尋失敗')
  }

  
}
</script>

<template>
  <button @click="getDefaultLocations" class="absolute top-0 z-50 left-16">按我取得資料</button>
  <div class="absolute top-0 h-auto pt-20 lg:ps-28 lg:pt-24 pb-14 bg-slate-100">
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
          <a href="#" @click="openDetailModal(item.id),modalStore.savePlace(item)">
            <div class="relative w-full mb-2 overflow-hidden rounded-lg">
              <!-- 黑色遮罩 -->
              <div
                class="absolute w-full h-full transition-opacity bg-black opacity-0 group-hover:opacity-20"
              ></div>

              <!-- 喜歡按鈕和加入景點 -->
              <div
                class="absolute bottom-0 flex items-center justify-between w-full p-4 transition-opacity opacity-0 z-2 group-hover:opacity-100"
              >
                <div
                  class="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-gray hover:bg-opacity-75 tooltip"
                  data-tip="加入最愛"
                  @click.prevent="toggleFavorite(item)"
                  @click.stop
                >
                  <component
                    :is="item.isFavorited ? HeartIcon : OutlineHeartIcon"
                    :class="item.isFavorited ? 'text-red-500' : 'text-gray-500'"
                    class="size-6"
                  />
                </div>
                <!-- <button class="overflow-hidden text-lg text-white border-0 rounded-full btn bg-secondary-500 hover:bg-secondary-600" onclick="AddPlaceModal.showModal()">加入行程<PlusCircleIcon class="size-6"/></button> -->
                <AddPlaceBtn @click.stop @click="modalStore.savePlace(item)" />
              </div>

              <!-- 圖片 -->
              <img :id="'img-' + item.id" :src="item.url" alt="" />
            </div>
            <div>
              <h3
                class="text-sm font-bold text-gray-700 md:text-lg text-ellipsis text-slate-900"
              >
                {{ item.name }}
              </h3>
              <div class="flex justify-between">
                <div class="flex text-slate-500 text-[12px] md:text-base">
                  <StarIcon class="text-yellow-500 md:size-6 size-4" /><span>{{
                    item.rating
                  }}</span
                  >．<span>{{ item.location }}</span>
                </div>
                <a :href="item.mapUrl" target="_blank"
                  ><MapPinIcon class="text-gray-500 md:size-6 size-4"
                /></a>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- <AddPlaceModal class="absolute top-0 z-50"/> -->
</template>

<style scoped>
.group:hover .group-hover\:opacity-20 {
  opacity: 0.2;
}
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}

summary:active {
  background-color: transparent !important;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1)) !important;
}
</style>
