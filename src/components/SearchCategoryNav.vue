<script setup>
import taiwanLocation from "../../taiwanLocation.json"
import { ref, onMounted, inject } from "vue"
import { useSearchStore } from "../stores/searchPlaces"

const searchStore = useSearchStore()
// 縣市名稱

const categories = ref(Object.keys(taiwanLocation))
const selectedCity = ref(categories.value[0])
const selectedCityData = ref(taiwanLocation[selectedCity.value])
const selectedDistrict = ref(selectedCityData.value["區域"][0])
const selectedCityImage = ref('https://images.pexels.com/photos/260566/pexels-photo-260566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')

const selectCity = (city) => {
  selectedCity.value = city
  selectedCityData.value = taiwanLocation[city]
  selectedCityImage.value = taiwanLocation[city].image
}
const selectDistrict = async (area) => {
  selectedDistrict.value = area
  searchStore.region = selectedCity.value + area
  await searchStore.regionSearch()
  closeModal()
}

const closeModal = inject("closeModal")

onMounted(() => {
  searchStore.region = selectedCity.value
})
</script>

<template>
  <div class="flex">
    <!-- 左側分類列表 -->
    <nav class="h-full md:h-[704px] overflow-y-scroll relative flex block-category shrink-0 bg-white">
      <ul class="flex flex-col gap-1 pt-2 category-list">
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
    <div class="p-8" v-if="selectedCityData">
      <div class="w-full md:w-[400px] md:h-[200px] overflow-hidden rounded-2xl mb-4">
        <img class="w-full object-cover object-center" 
        :src=selectedCityImage alt="image">
      </div>
      <div class="text-lg font-medium">推薦區域</div>
      <div class="flex flex-wrap gap-4 m-4">
        <button class="px-4 py-2 bg-white rounded-full hover:bg-primary-200"
        v-for="area in selectedCityData['熱門區域']"
        :key="area"
        @click="selectDistrict(area)"
        :class="{ active: area === selectedDistrict }">
        {{ area }}
      </button>
      </div>
      <div class="text-lg font-medium">所有區域</div>
      <div class="flex flex-wrap gap-4 m-4">
        <button
          v-for="area in selectedCityData['區域']"
          :key="area"
          class="px-4 py-2 bg-white rounded-full hover:bg-primary-200 category-subitem"
          :class="{ active: area === selectedDistrict }"
          @click="selectDistrict(area)"
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

.category-subitem.active {
  color: #d23430;
  border: 1px solid #d23430;
}
</style>
