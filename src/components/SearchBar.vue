<script setup>
import { ref, onMounted } from "vue"
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/vue/24/solid"
import CategoryFilter from "./CategoryFilter.vue"
import SearchArea from "./SearchArea.vue"
import { useSearchStore } from "../stores/searchPlaces"

// 預設為分類模式
const isCategoryMode = ref(true)

// 定義預設分類資料
const defaultCategories = [
  {
    name: "景點",
    icon: "🌄",
    params: ["tourist_attraction", "museum", "campground", "church"],
  },
  { name: "住宿", icon: "🏨", params: ["lodging", "embassy"] },
  { name: "美食", icon: "🍴", params: ["food", "restaurant", "cafe", "bar"] },
  {
    name: "購物",
    icon: "🛍️",
    params: ["department_store", "store", "shopping_mall", "supermarket"],
  },
]

const categories = ref([...defaultCategories])
const Mdcategories = ref([...defaultCategories])

const activeCategory = ref(categories.value[0])
const activeMdCategory = ref(Mdcategories.value[0])

//切換模式
const toggleMode = () => {
  isCategoryMode.value = !isCategoryMode.value
}

//活動分類
const setActiveCategory = (category) => {
  activeCategory.value = category
  searchStore.selectedTab = activeCategory.value.params
  searchStore.typeSearch()
}

const setActiveMdCategory = (Mdcategory) => {
  searchStore.selectedTab = ""
  activeMdCategory.value = Mdcategory
  searchStore.selectedMdTab = activeMdCategory.value.params
  searchStore.typeSearch()
}

const switchToCategoryMode = () => {
  isCategoryMode.value = true
}

const searchStore = useSearchStore()
const inputKeyword = () => {
  searchStore.textSearch()
}

// 監聽 CategoryFilter 的 update-categories 事件
const updateCategories = (newCategories) => {
  categories.value = newCategories
  activeCategory.value = newCategories[0]
}
onMounted(() => {
  searchStore.selectedTab = activeCategory.value.params
})
</script>

<template>
  <!-- 搜尋列 -->
  <div class="flex" @click.self="switchToCategoryMode">
    <div
      class="flex w-full border-none rounded-none bg-white shadow-md lg:rounded-full lg:border lg:border-gray-200"
    >
      <!-- 顯示分類模式或關鍵字模式 -->
      <div class="relative flex justify-center items-center h-10 w-full pr-2">
        <template v-if="isCategoryMode">
          <!-- 分類模式 -->
          <SearchArea />
          <div
            class="hidden items-center w-28 pl-2 cursor-pointer lg:flex"
            style="border-right: 1px solid"
            @click="toggleMode"
          >
            <MagnifyingGlassIcon class="w-6 h-6 text-gray-400" />
            <span class="text-gray-500 font-normal text-sm leading-6"
              >搜尋...</span
            >
          </div>
          <div
            class="relative overflow-hidden item-center justify-center scrollbar-none p-2 md:p-3 whitespace-nowrap"
          >
            <ul class="flex gap-4">
              <!-- 電腦版 -->
              <li
                v-for="(category, index) in categories"
                :key="index.name"
                :class="[
                  'hidden font-medium text-sm leading-6 py-1 cursor-pointer transition border-b-2 border-transparent whitespace-nowrap md:inline-flex',
                  activeCategory === category
                    ? 'text-black border-b-red-500'
                    : 'text-gray-400 hover:text-gray-500 hover:border-b-red-500',
                ]"
                @click="setActiveCategory(category)"
              >
                {{ category.name }}
              </li>
              <!-- 手機板 -->
              <li
                v-for="(Mdcategory, index) in Mdcategories"
                :key="index"
                :class="[
                  'font-medium text-sm leading-6 py-1 cursor-pointer transition border-b-2 border-transparent whitespace-nowrap md:hidden',
                  activeMdCategory === Mdcategory
                    ? 'text-black border-b-red-500'
                    : 'hover:text-gray-500 hover:border-b-red-500',
                ]"
                @click="setActiveMdCategory(Mdcategory)"
              >
                {{ Mdcategory.name }}
              </li>
            </ul>
          </div>
          <CategoryFilter @update-categories="updateCategories" />
        </template>

        <template v-else>
          <!-- 關鍵字模式 -->
          <div class="relative flex items-center w-full">
            <MagnifyingGlassIcon
              class="absolute left-2 top-2 w-4 h-4 text-gray-400"
            />
            <input
              class="w-full h-8 text-sm font-normal leading-6 text-gray-700 border-none bg-transparent outline-none pl-8 pr-4"
              type="text"
              autocomplete="off"
              placeholder="輸入關鍵字"
              @blur="switchToCategoryMode"
              v-model="searchStore.keyword"
              @keyup.enter="inputKeyword"
            />
            <XCircleIcon
              class="absolute right-4 top-2 w-4 h-4 text-gray-400 cursor-pointer"
              @click="toggleMode"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
