<script setup>

import { AdjustmentsHorizontalIcon, PlusIcon } from '@heroicons/vue/24/solid'
import { ref, onMounted, watch, defineEmits } from "vue";

// 定義分類資料
const defaultCategories = [
  { name: "景點", icon: "🌄" },
  { name: "收藏", icon: "❤️" },
  { name: "購物", icon: "🛍️" },
  { name: "美食", icon: "🍴" },
];

const categories = ref([...defaultCategories]);

const additionalCategories = ref([
  { name: "住宿", icon: "🏨" },
  { name: "租車站", icon: "🚗" },
  { name: "交通站", icon: "🚉" },
  { name: "充電樁", icon: "⚡" },
  { name: "機場", icon: "✈️" },
  { name: "水族館", icon: "🐠" },
  { name: "公園", icon: "🏞️" },
  { name: "動物園", icon: "🐾" },
  { name: "其他", icon: "🛠️" },
]);




const emit = defineEmits(['update-categories']);

// 新增分類
const addCategory = (category) => {
  if (!categories.value.some(item => item.name === category.name)) {
    categories.value.push(category);
    additionalCategories.value = additionalCategories.value.filter(
      (item) => item.name !== category.name
    );
    emit('update-categories', categories.value);
  }
};
// 監聽 categories 的變化
watch(categories, (newCategories) => {
  emit('update-categories', newCategories);
});


// 移除分類
const removeCategory = (index) => {
  const removed = categories.value.splice(index, 1)[0];
  if (!additionalCategories.value.some(item => item.name === removed.name)) {
    additionalCategories.value.push(removed);
  }
  emit('update-categories', categories.value);
};

// 點擊外框關閉
const closeModal = () => {
  const dialog = document.getElementById("CategoryFilter");
  dialog?.close();
};

// 保存分類
const saveCategories = () => {
  localStorage.setItem('categories', JSON.stringify(categories.value));
  closeModal();
};

onMounted(() => {
  const savedCategories = localStorage.getItem('categories');
  if (savedCategories) {
    const loadedCategories = JSON.parse(savedCategories);
    categories.value = loadedCategories;

    // 移除已經存在於 categories 中的預設分類
    additionalCategories.value = additionalCategories.value.filter(
      (item) => !categories.value.some(category => category.name === item.name)
    );
  }
});
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
    class="modal 
    flex items-center justify-center bg-black bg-opacity-50
    top-0 right-0 bottom-0 left-0"
    @click.self="closeModal"
  >
    <div class="modal-box w-1/3 max-w-[40rem] h-full p-0 bg-white rounded-lg shadow-lg">
      <header class="flex align-center justify-end">
        <form method="dialog">
          <button class="btn btn-xl btn-circle btn-ghost">
            ✕
          </button>
        </form>
      </header>

      <div class="filter-body overflow-y-auto">
        <div class="block-my overflow-y-auto inline-flex flex-col">
          <div class="flex flex-col justify-center items-center mb-2 overflow-y-auto">
            <h3 class="text-2xl font-bold text-black mb-2">我的分類</h3>
            <p class="text-sm text-gray-500 mb-4">拖動即可排序</p>
            <!-- 待新增:拖曳功能 -->
          </div>
          <!-- 分類標籤 -->
          <div class="list-group flex justify-start items-center flex-wrap gap-2 mx-4 mb-4 pb-8">
            <span
              v-for="(category, index) in categories"
              :key="category.name"
              class="list-group-item btn btn-sm bg-primary-100 text-sm text-primary-600 rounded-3xl border-transparent items-center 
              hover:bg-primary-700 
              hover:shadow-lg 
              hover:text-primary-100 
              hover:scale-105 
              hover:border-transparent"
            >
              {{ category.icon }} {{ category.name }}
              <button
                v-for="(category, index) in defaultCategories"
                :key="category.name"
                class="list-group-item btn btn-sm bg-primary-100 text-primary-600 rounded-3xl border-transparent justify-center items-center gap-0 pl-3 pr-4
                hover:bg-primary-700 
                hover:shadow-lg 
                hover:text-primary-100 
                hover:scale-105 
                hover:border-transparent"
              >
                {{ category.icon }} {{ category.name }}
              </button>
              <button
                v-for="(category, index) in categories"
                :key="category.name"
                class="list-group-item btn btn-sm bg-primary-100 text-primary-600 rounded-3xl border-transparent justify-center items-center gap-0 px-1
                hover:bg-primary-700 
                hover:shadow-lg 
                hover:text-primary-100 
                hover:scale-105 
                hover:border-transparent"
              >
                ✕
              </button>
            </span>
          </div>
        </div>
        <!-- 新增分類 -->
        <div class="block-other">
          <div class="flex flex-col justify-center items-center mb-2">
            <p class="text-xl font-bold text-black mb-2">點擊新增更多</p>
          </div>
          <div class="other-list-group flex justify-start items-center flex-wrap gap-2 mx-4 mb-4 pb-8">
            <button
              v-for="category in additionalCategories"
              :key="category.name"
              class="other-list-group-item btn btn-sm bg-primary-100 text-primary-600 rounded-3xl border-transparent flex items-center 
              hover:bg-primary-700 
              hover:shadow-lg 
              hover:text-primary-100 
              hover:scale-105 
              hover:border-transparent"
              @click="addCategory(category)"
            >
              {{ category.icon }} {{ category.name }}
            </button>
          </div>
        </div>
      </div>
      <!-- 按鈕區域 -->
      <footer class="footer-area absolute left-0 bottom-0 w-full gap-1 bg-white overflow-hidden">
        <span class="footer-btn flex items-center gap-3 py-3 px-5 ">
          <button class="btn btn-lg rounded-full w-1/2 btn-outline text-primary-700">取消</button>
          <button class="btn btn-lg rounded-full w-1/2 bg-primary-700 text-primary-100 border-transparent">儲存</button>
        </span>
      </footer>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
      <button>close</button>
    </form>
  </dialog>
</template>

<style scoped>
.list-group{
  border-bottom: 1px dashed gray;
}

.footer-area{
  border-top: 1px solid rgba(182, 174, 174, 0.897);
}

@media screen and (min-width: 1200px) {
  .block-filter {
    padding-left: 8px;
  }
}
</style>
