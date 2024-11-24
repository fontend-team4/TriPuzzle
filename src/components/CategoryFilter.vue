<script setup>
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid'
import { ref } from "vue";


// 定義分類資料
const categories = ref([
  { name: "景點", icon: "🌄" },
  { name: "收藏", icon: "❤️" },
  { name: "口住宿", icon: "🏨" },
  { name: "美食", icon: "🍴" },
  { name: "購物", icon: "🛍️" },
  { name: "租車站", icon: "🚗" },
  { name: "交通站", icon: "🚉" },
  { name: "充電樁", icon: "⚡" },
  { name: "機場", icon: "✈️" },
  { name: "水族館", icon: "🐠" },
]);

const additionalCategories = ref([
  { name: "其他", icon: "🛠️" },
  { name: "公園", icon: "🏞️" },
  { name: "動物園", icon: "🐾" },
]);

// 新增分類
const addCategory = (category) => {
  categories.value.push(category);
  additionalCategories.value = additionalCategories.value.filter(
    (item) => item.name !== category.name
  );
};

// 移除分類
const removeCategory = (index) => {
  const removed = categories.value.splice(index, 1)[0];
  additionalCategories.value.push(removed);
};
</script>

<template>
  <div class="ml-auto pt-[3px]">
    <button
      type="button"
      class="inline-flex items-center justify-center rounded-full w-[24px] h-[24px] border-none cursor-pointer transition duration-300 p-0"
      style="box-sizing: border-box;"
      onclick="CategoryFilter.showModal()"
    >
      <AdjustmentsHorizontalIcon class="w-[1em] h-[1em] fill-current text-black" />
    </button>
  </div>

  <dialog
    id="CategoryFilter"
    class="modal flex items-center justify-center fixed inset-0 bg-black bg-opacity-50"
  >
    <div
      class="modal-box w-1/4 max-w-[40rem] h-full p-0 bg-white rounded-lg shadow-lg"
    >
        <!-- 標題與關閉按鈕 -->
      <div class="flex justify-between items-center mb-4">
        <h5 class="text-lg font-bold text-gray-700">我的分類</h5>
        <button class="text-gray-500 hover:text-gray-700 text-xl">✕</button>
      </div>

      <!-- 拖動說明文字 -->
      <p class="text-sm text-gray-500 mb-4">拖動即可排序</p>

      <!-- 分類標籤 -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="(category, index) in categories"
          :key="category.name"
          class="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
        >
          {{ category.icon }} {{ category.name }}
          <button
            @click="removeCategory(index)"
            class="ml-2 text-blue-700 hover:text-red-500 text-lg font-bold"
          >
            ✕
          </button>
        </span>
      </div>

      <!-- 新增分類 -->
      <p class="text-sm text-blue-500 mb-4">點擊新增更多</p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="category in additionalCategories"
          :key="category.name"
          class="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200"
          @click="addCategory(category)"
        >
          {{ category.icon }} {{ category.name }}
        </span>
      </div>

      <!-- 按鈕區域 -->
      <div class="flex justify-end mt-6 gap-4">
        <button class="btn btn-secondary">取消</button>
        <button class="btn btn-primary">儲存</button>
      </div>
    </div>
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>

    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
      <button>close</button>
    </form>
  </dialog>
</template>

<style scoped>
@media screen and (min-width: 1200px) {
  .block-filter {
    padding-left: 8px;
  }
}
</style>
