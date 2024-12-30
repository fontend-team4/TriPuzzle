<script setup>
import { StarIcon, MapPinIcon, HeartIcon } from "@heroicons/vue/24/solid"
import {
  ref,
  onMounted,
  watch,
  nextTick,
  defineEmits,
  onUnmounted,
  computed,
} from "vue"
import { HeartIcon as OutlineHeartIcon } from "@heroicons/vue/24/outline"
import AddPlaceBtn from "./AddPlaceBtn.vue"
import { usePlacesStore } from "@/stores/fetchPlaces"
import { useSearchStore } from "@/stores/searchPlaces"
import { PlaceModalStore } from "@/stores/PlaceModal"
import {
  favorites,
  isFavorited,
  loadFavorites,
  toggleFavorite,
} from "@/stores/favorites.js"
import axios from "axios"
import { useRoute, useRouter } from "vue-router"
import { addPlace } from "@/stores/addPlaces"

const placesStore = usePlacesStore()
const searchStore = useSearchStore()
const modalStore = PlaceModalStore()
const router = useRouter()
const route = useRoute()

const columns = ref([]) // 每欄
const numCols = ref(2) // 預設為兩欄
const isLogin = ref(false)
const token = localStorage.getItem("token")
const userId = ref(localStorage.getItem("userId"))


const place = ref(null)
const loading = ref(true)

const API_URL = import.meta.env.VITE_HOST_URL

const emit = defineEmits(["open-detail-modal", "updateIsPlacesComponent"])

// 檢查登入狀態
onMounted(() => {
  isLogin.value = Boolean(token && userId.value);
  if (isLogin.value) {
    loadFavorites(); // 加載收藏列表
  }
})

// 瀑布流計算
const calculateColumns = async () => {
  columns.value = Array.from({ length: numCols.value }, () => [])
  const heights = Array(numCols.value).fill(0)

  for (const item of placesStore.items) {
    const shortestCol = heights.indexOf(Math.min(...heights))
    columns.value[shortestCol].push(item)

    await nextTick()
    const img = document.getElementById(`img-${item.id}`)

    if (img) {
      heights[shortestCol] += img.offsetHeight + 16;
    }
  }
};

// 監聽螢幕大小調整欄位數量
const handleResize = () => {
  if (window.innerWidth >= 1024) numCols.value = 4
  else if (window.innerWidth >= 768) numCols.value = 3
  else numCols.value = 2
  calculateColumns()
}

const openDetailModal = (detailId) => {
  emit("open-detail-modal", detailId) // 傳遞地點的 ID
  router.replace({ query: { action: "placeInfo", placeId: detailId } }) // 更新URL
}


// 更新地圖中心點
const updateMapCenter = (item) => {
  searchStore.placeGeometry = item.geometry;
  emit("updateIsPlacesComponent", false);
};


// 初始化
onMounted(async () => {
  const placeId = route.query.placeId; // URL中的placeId
  if (placeId) {
    await fetchPlaceById(placeId); // 載入placeId對應的地點
  }

  await calculateColumns(); // 初始計算瀑布流
  handleResize(); // 初始化欄數
  window.addEventListener("resize", handleResize);
});

// 根據 place_id 載入地點詳細資訊
const fetchPlaceById = async (placeId) => {
  try {
    const response = await axios.get(`${API_URL}/places/${placeId}`)
    place.value = response.data
    console.log("在資料庫中找到:", place.value)
  } catch (error) {
    console.error("載入詳情失敗:", error)
    alert("載入地點失敗")
  } finally {
    loading.value = false
  }
}

// 初始化和監聽事件

// 初始化
onMounted(async () => {
  const placeId = route.query.placeId // URL中的placeId
  if (placeId) {
    await fetchPlaceById(placeId) // 載入placeId對應的地點
  }

  await calculateColumns() // 初始計算瀑布流
  handleResize() // 初始化欄數
  window.addEventListener("resize", handleResize)
})


// 移除事件監聽器
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// 監聽 items 的變化並重新計算瀑布流
watch(
  () => placesStore.items,
  async (newItems) => {
    await calculateColumns();
  },
  { immediate: true }
);

// 監聽 searchStore.searchData，當有更新時觸發 placesStore 更新
watch(
  () => searchStore.searchData,
  (newData) => {
    if (newData.length > 0) {
      placesStore.updateFromSearch(newData);
    }
  }
);
</script>

<template>
  <div
    class="absolute top-0 min-h-full pt-20 lg:ps-28 lg:pt-24 pb-14 bg-slate-100"
  >
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
          <a
            href="#"
            @click="
              openDetailModal(item.id),
                addPlace(item),
                modalStore.savePlace(item)
            "
          >
            <div class="relative w-full mb-2 overflow-hidden rounded-lg">
              <!-- 黑色遮罩 -->
              <div
                class="absolute w-full h-full transition-opacity bg-black opacity-0 group-hover:opacity-20"
              ></div>

              <!-- 收藏按鈕和加入景點 -->
              <div
                class="absolute bottom-0 flex items-center justify-between w-full p-4 transition-opacity opacity-0 z-2 group-hover:opacity-100"
              >
                <button
                  v-if="isLogin"
                  class="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-gray hover:bg-opacity-75 tooltip"
                  :data-tip="isFavorited(item.id) ? '已收藏' : '加入收藏'"
                  @click.prevent.stop="toggleFavorite(item)"
                >
                  <component
                    :is="isFavorited(item.id) ? HeartIcon : OutlineHeartIcon"
                    :class="
                      isFavorited(item.id) ? 'text-red-500' : 'text-gray-500'
                    "
                    class="size-6"
                  />
                </button>
                <!-- 未登入狀態 -->
                <button
                  v-else
                  class="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-gray hover:bg-opacity-75 tooltip"
                  data-tip="請先登入!"
                  @click.prevent.stop="toggleFavorite(item)"
                >
                  <OutlineHeartIcon class="text-gray-500 size-6" />
                </button>

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
                <div class="flex text-slate-500 text-[12px] md:text-base gap-1">
                  <StarIcon class="text-yellow-500 md:size-6 size-4" /><span>{{
                    item.rating
                  }}</span
                  ><span>{{ item.location }}</span>
                </div>
                <button
                  target="_blank"
                  @click.stop
                  @click="updateMapCenter(item)"
                >
                  <MapPinIcon class="text-gray-500 md:size-6 size-4" />
                </button>
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
