<script setup>
import { StarIcon, MapPinIcon, HeartIcon } from "@heroicons/vue/24/solid"
import { ref, onMounted, watch, nextTick, defineEmits, onUnmounted,computed } from "vue"
import { HeartIcon as OutlineHeartIcon } from "@heroicons/vue/24/outline"
import AddPlaceBtn from "./AddPlaceBtn.vue"
import { usePlacesStore } from "@/stores/fetchPlaces"
import { useSearchStore } from "@/stores/searchPlaces"
import { PlaceModalStore } from "@/stores/PlaceModal"
import { useRouter, useRoute } from "vue-router"

const placesStore = usePlacesStore()
const searchStore = useSearchStore()
const modalStore = PlaceModalStore()





const router = useRouter()
const API_URL = "http://localhost:3000"
const columns = ref([]) // 每欄
const numCols = ref(2) // 預設為兩欄
const emit = defineEmits(["open-detail-modal"])

// 瀑布流計算
const calculateColumns = async () => {
  // 每次重新初始化 columns
  columns.value = Array.from({ length: numCols.value }, () => [])
  const heights = Array(numCols.value).fill(0)

  for (const item of placesStore.items) {
    const shortestCol = heights.indexOf(Math.min(...heights))
    columns.value[shortestCol].push(item)
    await nextTick()
    const img = document.getElementById(`img-${item.id}`)
    if (img) {
      heights[shortestCol] += img.offsetHeight + 16
    }
  }
}

// 監聽螢幕大小調整欄位數量
const handleResize = () => {
  if (window.innerWidth >= 1024) numCols.value = 4
  else if (window.innerWidth >= 768) numCols.value = 3
  else numCols.value = 2
  calculateColumns()
}

// 初始化
onMounted(async () => {
  await calculateColumns() // 初始計算瀑布流
  handleResize() // 初始化欄數
  window.addEventListener("resize", handleResize)
})

// 收藏按鈕
const toggleFavorite = async (item) => {
  item.isFavorited = !item.isFavorited;

  try {
    if (item.isFavorited) {
      const placeData = {
        place_id: item.id,
        name: item.name,
        image_url: item.url,
        address: item.location,
        rating: item.rating,
        google_map_url: item.mapUrl,
      };

      //儲存到 places
      await axios.post(`${API_URL}/places`, placeData);
      
      
      console.log('placeData:', placeData);
      console.log('userId:', userId);

      console.log('favorite_user:', userId.value);
      console.log('favorite_places:', placeData.place_id);

      //儲存到 favorites
      await axios.post(`${API_URL}/favorites`, {
        favorite_user: userId.value,
        favorite_places: placeData.place_id,
      });

      alert('收藏成功');
    } else {
      //取消收藏，刪除favorites
      await axios.delete(`${API_URL}/favorites`, {
        data: { favorite_user: userId, favorite_places: item.id },
      });

      alert('已取消收藏');
    }
  } catch (error) {
    console.error('切換收藏時發生錯誤:', error);
    item.isFavorited = !item.isFavorited;
    alert('操作失敗，請稍號再試');
  }
};



// 判斷是否已收藏
const isFavorited = computed(() =>
  favorites.some((fav) => fav.favorite_places === place.id)
);

// 狀態
const userId = ref(1); // 假設目前登入的使用者 ID 是 1
const favorites = ref([]);

// 加載景點資料 
const loadPlaces = async () => {
  const response = await axios.get(`${API_URL}/places`); // 假設有此 API 返回所有景點
  places.value = response.data;
};

// 加載使用者收藏資料
const loadFavorites = async () => {
  const response = await axios.get(`${API_URL}/favorites/${userId.value}`);
  favorites.value = response.data;
};

const openDetailModal = (detailId) => {
  emit("open-detail-modal", detailId) // 傳遞地點的 ID
}

onUnmounted(() => {
  window.removeEventListener("resize", handleResize)
})

// 監聽 items 的變化並重新計算瀑布流
watch(
  () => placesStore.items,
  async (newItems) => {
    await calculateColumns()
  },
  { immediate: true }
)

// 監聽 searchStore.searchData，當有更新時觸發 placesStore 更新
watch(
  () => searchStore.searchData,
  (newData) => {
    if (newData.length > 0) {
      // console.log('searchData 更新，觸發 placesStore 更新:', newData)
      placesStore.updateFromSearch(newData)
    }
  }
)
</script>

<template>
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
          <a
            href="#"
            @click="openDetailModal(item.id), modalStore.savePlace(item)"
          >
            <div class="relative w-full mb-2 overflow-hidden rounded-lg">
              <!-- 黑色遮罩 -->
              <div
                class="absolute w-full h-full transition-opacity bg-black opacity-0 group-hover:opacity-20"
              ></div>

              <!-- 喜歡按鈕和加入景點 -->
              <div
                class="absolute bottom-0 flex items-center justify-between w-full p-4 transition-opacity opacity-0 z-2 group-hover:opacity-100"
              >
                <button
                  class="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-gray hover:bg-opacity-75 tooltip"
                  data-tip="加入最愛"
                  @click.prevent.stoop="toggleFavorite(item)"
                >
                  <component
                    :is="item.isFavorited ? HeartIcon : OutlineHeartIcon"
                    :class="item.isFavorited ? 'text-red-500' : 'text-gray-500'"
                    class="size-6"
                  />
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
