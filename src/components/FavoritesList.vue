<script setup>
import { StarIcon, MapPinIcon, HeartIcon } from "@heroicons/vue/24/solid";
import AddPlaceBtn from "./AddPlaceBtn.vue";
import DetailModal from "@/components/DetailModal.vue";
import { PlaceModalStore } from "@/stores/PlaceModal"
import { ref, onMounted, watch, nextTick, defineEmits, onUnmounted,computed } from "vue"
import axios from "axios"
import {  favorites, isFavorited, loadFavorites, toggleFavorite,removeFavoriteDirectly,generateImageUrl } from "@/stores/favorites";


// 定義狀態
const places = ref([]); 
const loading = ref(true); 
const userId = ref(localStorage.getItem("userId"));
const token = localStorage.getItem("token"); 


const API_URL = import.meta.env.VITE_HOST_URL



const modalStore = PlaceModalStore()

// 獲取收藏景點資料
const fetchPlaces = async () => {
  try {
    const res = await axios.get(`${API_URL}/favorites/${userId.value}`, {
      headers: {
        Authorization: token
      }
    });
    places.value = res.data.map((favorite) => favorite.places);
    localStorage.setItem("favorites", JSON.stringify(places.value));

  } catch (err) {
    alert("無法獲取景點資料", err);
  } finally {
    loading.value = false;
  }
};
const emit = defineEmits(["open-detail-modal"])

const openDetailModal = (place) => {
  emit("open-detail-modal", place.place_id) // 傳遞地點的 ID
}



// 載入收藏景點
onMounted(fetchPlaces);
</script>

<template>
  <div class="favorites">
    <!-- 載入中 -->
    <div v-if="loading" class="text-center">
      <p>載入中...</p>
    </div>

    <!-- 沒有收藏景點 -->
    <div v-else-if="places.length === 0" class="text-center p-6 rounded-lg">
      <img
        src="https://web.chictrip.com.tw/assets/img-empty.65a29235.png"
        alt="Empty collection"
        class="w-80 mx-auto mb-4"
      />
      <p class="mb-8">「收藏」中還沒有景點哦</p>
      <RouterLink
        to="/planner"
        class="px-16 p-4 bg-primary-600 text-white text-sm rounded-full hover:bg-primary-800 transition"
      >
        探索景點
      </RouterLink>
    </div>

    <!-- 有收藏景點 -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      <div
        v-for="place in places"
        :key="place.id"
        class="p-4 rounded shadow-md hover:shadow-lg group"
      >
        <a
          href="#"
          @click="openDetailModal(place), modalStore.savePlace(place)"

        >
          <div class="relative w-full mb-2 overflow-hidden rounded-lg">
            <!-- 黑色遮罩 -->
            <div
              class="absolute  h-full transition-opacity bg-black opacity-0 group-hover:opacity-20"
            ></div>

            <!-- 收藏按鈕和加入景點 -->
            <div
              class="absolute bottom-0 flex items-center justify-between w-full p-4 transition-opacity opacity-0 z-2 group-hover:opacity-100"
            >
            <button
              class="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-gray hover:bg-opacity-75 tooltip"
              data-tip="取消收藏"
              @click.prevent.stop="removeFavoriteDirectly(place)"
            >
              <HeartIcon class="text-red-500 size-6" />
            </button>

              <AddPlaceBtn @click.stop @click="modalStore.savePlace(place)" />
            </div>

            <!-- 圖片 -->
            <img 
              :src="generateImageUrl(place.image_url)" 
              alt="Place image" 
              class="w-full h-40 object-cover mb-3 rounded" 
            />

          </div>
          <div>
            <h3
              class="text-sm font-bold text-gray-700 md:text-lg text-ellipsis text-slate-900"
            >
              {{ place.name }}
            </h3>
            <div class="flex justify-between">
              <div class="flex text-slate-500 text-[12px] md:text-base gap-1">
                <StarIcon class="text-yellow-500 md:size-6 size-4" />
                <span>{{ place.rating }}</span>
                <span>{{ place.location }}</span>
              </div>
              <a :href="place.mapUrl" target="_blank">
                <MapPinIcon class="text-gray-500 md:size-6 size-4" />
              </a>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
  <DetailModal
      class="fixed top-0 left-0 z-40 flex-auto"
      v-if="isModalOpen"
      :place="currentPlace"
      @close="closeDetailModal"
    />

</template>

<style scoped>
.favorites {
  margin: 0 auto;
  padding: 20px;
}

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