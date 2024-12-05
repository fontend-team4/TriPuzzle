<script setup>
import { ref } from 'vue';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/vue/24/solid';
import CategoryFilter from './CategoryFilter.vue';
import SearchArea from './SearchArea.vue';

// 預設為分類模式
const isCategoryMode = ref(true);
const categories = ['景點', '美食', '購物', '住宿', '租車站', '交通站', '充電樁', '我的最愛'];

const activeCategory = ref(categories[0]);

//切換模式
const toggleMode = () => {
  isCategoryMode.value = !isCategoryMode.value;
};

//活動分類
const setActiveCategory = (category) => {
  activeCategory.value = category;
};

const switchToCategoryMode = () => {
  isCategoryMode.value = true;
}

// 監聽 CategoryFilter 的 update-categories 事件
const updateCategories = (newCategories) => {
  categories.value = newCategories;
  activeCategory.value = newCategories[0];
};

</script>

<template >
  <!-- 搜尋列 -->
  <div 
    class="flex pt-4 justify-center" 
    @click.self="switchToCategoryMode">
    <div class="w-3/4 bg-white border border-gray-200 shadow-md rounded-full">
      <!-- 顯示分類模式或關鍵字模式 -->
      <div class="relative flex items-center h-10 w-full px-1">
        <template v-if="isCategoryMode">
          <!-- 分類模式 -->
          <SearchArea />
          <div class="flex items-center w-28 pl-2 cursor-pointer" style="border-right:1px solid;" @click="toggleMode">
            <MagnifyingGlassIcon class="w-6 h-6 text-gray-400" />
            <span class="text-gray-500 font-normal text-sm leading-6">搜尋...</span>
          </div>
          <div class="relative overflow-x-auto scrollbar-none p-2">
            <ul class="flex gap-4 pr-4">
              <li
                v-for="(category, index) in categories"
                :key="index.name"
                :class="[
                  'font-medium text-sm leading-6 py-1 cursor-pointer transition border-b-2 border-transparent whitespace-nowrap',
                  activeCategory === category
                    ? 'text-red-500 border-red-500'
                    : 'hover:text-gray-500 hover:border-red-500'
                ]"
                @click="setActiveCategory(category)"
                >
              {{ category.name }}
              </li>
            </ul>
          </div>
          <CategoryFilter @update-categories="updateCategories" />
        </template>
        
        <template v-else>
          <!-- 關鍵字模式 -->
          <div class="relative flex items-center w-full">
            <MagnifyingGlassIcon class="absolute left-2 top-2 w-4 h-4 text-gray-400" />
            <input
              class="w-full h-8 text-sm font-normal leading-6 text-gray-700 border-none bg-transparent outline-none pl-8 pr-4"
              type="text"
              autocomplete="off"
              placeholder="輸入關鍵字"
              @blur="switchToCategoryMode"
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