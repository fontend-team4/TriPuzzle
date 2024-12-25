<script setup>
import taiwanLocation from "../../taiwanLocation.json"
import { ref } from "vue"

// 縣市名稱
const categories = ref(Object.keys(taiwanLocation))

const selectedCity = ref(categories.value[0])
const selectedCityData = ref(taiwanLocation[selectedCity.value])

const selectCity = (city) => {
  selectedCity.value = city
  selectedCityData.value = taiwanLocation[city]
}
</script>

<template>
  <div class="flex">
    <!-- 左側分類列表 -->
    <nav class="relative flex block-category shrink-0">
      <ul class="flex flex-col gap-1 bg-white category-list">
        <li
          v-for="city in categories"
          :key="city"
          class="relative flex px-6 py-3 text-sm font-medium cursor-pointer category-item leading-2 hover:bg-gray"
          :class="{ active: city === selectedCity }"
          @click="selectCity(city)"
        >
          <p class="w-auto h-4 leading-4">
            {{ city }}
          </p>
        </li>
      </ul>
    </nav>

    <!-- 右側內容 -->
    <div class="h-full p-8" v-if="selectedCityData">
      <div class="text-lg font-medium">推薦區域</div>
      <div class="flex flex-wrap gap-4 m-4">
        <a v-for="area in selectedCityData['熱門區域']" :key="area" href="#">
          <div class="relative overflow-hidden rounded-2xl">
            <img src="https://fakeimg.pl/200x200/200" alt="" />
            <p class="absolute text-white bottom-3 left-3">{{ area }}</p>
          </div>
        </a>
      </div>
      <div class="text-lg font-medium">所有區域</div>
      <div class="flex flex-wrap gap-4 m-4">
        <button
          v-for="area in selectedCityData['區域']"
          :key="area"
          class="px-4 py-2 bg-white rounded-full hover:bg-primary-200"
        >
          {{ area }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-item.active {
  color: #d23430;
  border-left: 5px solid #d23430;

  background-color: #eeeeee;
}
</style>
