<script setup>
import { ref, computed, watch } from "vue";
import SearchCategoryNav from "../components/SearchCategoryNav.vue";

// 本地數據
const categories = ref(["推薦", "台灣", "日本", "韓國"]);
const destinations = ref([
  { name: "地點1", category: "推薦", image: "https://fakeimg.pl/100x100/100" },
  { name: "地點2", category: "台灣", image: "https://fakeimg.pl/100x200/300" },
  { name: "地點3", category: "日本", image: "https://fakeimg.pl/100x100/300" },
  { name: "地點4", category: "韓國", image: "https://fakeimg.pl/100x100/400" },
]);

// 從路由獲取當前分類
const route = useRoute();
const currentCategory = ref(route.params.category || "推薦");

// 監聽路由變化，更新分類
watch(
  () => route.params.category,
  (newCategory) => {
    currentCategory.value = newCategory || "推薦";
  }
);

// 計算過濾後的目的地
const filteredDestinations = computed(() =>
  destinations.value.filter(
    (destination) => destination.category === currentCategory.value
  )
);
</script>

<template>
  <div >
    <!-- 顯示篩選選單 -->
    <SearchCategoryNav :categories="categories" />
    <!-- 顯示過濾後的目的地 -->
    <div class="area-list flex flex-wrap gap-2 mt-4">
      <div
        v-for="destination in filteredDestinations"
        :key="destination.name"
        class="area-item"
      >
        <img :src="destination.image" :alt="destination.name" />
        <p class="text-sm text-center mt-2">{{ destination.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.area-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.area-item img:hover {
  transform: scale(1.1);
}

</style>
