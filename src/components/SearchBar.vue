<script setup>
import { ref,watch } from 'vue';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/vue/24/solid';
import CategoryFilter from './CategoryFilter.vue';
import SearchArea from './SearchArea.vue';

// 預設為分類模式
const isCategoryMode = ref(true);

const categories = ref(['景點','收藏', '美食', '購物', '住宿', '租車站', '交通站', '充電樁', '我的最愛']);
const Mdcategories = ref(['景點','收藏', '美食', '購物', '住宿']);

const activeCategory = ref(categories.value[0]);
const activeMdCategory = ref(Mdcategories.value[0]);

//切換模式
const toggleMode = () => {
  isCategoryMode.value = !isCategoryMode.value;
};

//活動分類
const setActiveCategory = (category) => {
  activeCategory.value = category;
};

const setActiveMdCategory = (Mdcategory) => {
  activeMdCategory.value = Mdcategory;
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
    class="flex" 
    @click.self="switchToCategoryMode">
    <div 
      class="flex w-full border-none rounded-none bg-white shadow-md 
      lg:rounded-full lg:border lg:border-gray-200">
      <!-- 顯示分類模式或關鍵字模式 -->
      <div 
        class="relative flex justify-center items-center h-10 w-full pr-2">
        <template 
          v-if="isCategoryMode">
          <!-- 分類模式 -->
          <SearchArea />
          <div 
            class="hidden items-center w-28 pl-2 cursor-pointer lg:flex" 
            style="border-right:1px solid;" 
            @click="toggleMode">
            <MagnifyingGlassIcon class="w-6 h-6 text-gray-400" />
            <span class="text-gray-500 font-normal text-sm leading-6">搜尋...</span>
          </div>
          <div 
            class="relative overflow-hidden item-center justify-center scrollbar-none p-2
            md:p-3 whitespace-nowrap">
            <ul class="flex gap-4">
              <!-- 電腦版 -->
              <li
                v-for="(category, index) in categories"
                :key="index.name"
                :class="[
                  'hidden font-medium text-sm leading-6 py-1 cursor-pointer transition border-b-2 border-transparent whitespace-nowrap md:inline-flex',
                  activeCategory === category
                    ? 'text-black border-b-red-500'
                    : 'text-gray-400 hover:text-gray-500 hover:border-b-red-500'
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
                    : 'hover:text-gray-500 hover:border-b-red-500'
                ]"
                @click="setActiveMdCategory(Mdcategory)"
                >
                {{ Mdcategory }}
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