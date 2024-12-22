<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// 定義狀態
const places = ref([]); 
const loading = ref(true); 
const userId = ref(localStorage.getItem("userId"));
const token = localStorage.getItem("token"); 
const API_URL = "http://localhost:3000";

// 獲取收藏景點資料
const fetchPlaces = async () => {
  try {
    const res = await axios.get(`${API_URL}/favorites/${userId.value}`, {
      headers: {
        Authorization: token
      }
    });
    places.value = res.data.map((favorite) => favorite.places);
  } catch (err) {
    alert("無法獲取景點資料", err);
  } finally {
    loading.value = false;
  }
};

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
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="place in places"
        :key="place.id"
        class="p-4 border rounded shadow-md hover:shadow-lg"
      >
        <img
          :src="place.image_url"
          alt="Place image"
          class="w-full h-40 object-cover mb-3 rounded"
        />
        <h2 class="text-lg font-semibold">{{ place.name }}</h2>
        <p class="text-sm text-gray-600">
          地址: {{ place.address || "未提供" }}
        </p>
        <p class="text-sm text-gray-500 mt-2">評分: {{ place.rating }}</p>
        <a
          v-if="place.google_map_url"
          :href="place.google_map_url"
          target="_blank"
          class="text-primary-600 hover:underline text-sm"
        >
          在 Google 地圖上查看
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorites {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
