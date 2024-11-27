<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import SearchCategoryNav from './SearchCategoryNav.vue';
import SearchAreaContent from '../components/SearchAreaContent.vue';
import SearchAreaBar from '../components/SearchAreaBar.vue';

// 點擊外框關閉
const closeModal = () => {
  const dialog = document.getElementById("SearchArea");
  dialog?.close();
};


</script>

<template>
    <!-- 區域選擇按鈕 -->
    <div class="block-area flex justify-center items-center pr-2">
      <button 
        class="btn btn-sm border-transparent inline-flex items-center justify-center h-4 rounded-3xl cursor-pointer mt-0 mx-0 w-30 bg-primary-600
        hover:bg-primary-500" 
        onclick="SearchArea.showModal()"
      >
        <span class="text-gray flex font-medium overflow-hidden text-ellipsis justify-center items-center
          ">選擇區域
          <ChevronDownIcon class="Icon-SelectArea w-4 h-4 pl-1 text-white text-primary-800"/>
        </span>
      </button>

    <!-- 彈窗 -->
    <dialog 
      id="SearchArea" 
      class="modal flex items-center justify-center fixed inset-0 bg-black bg-opacity-50"
      @click.self="closeModal"
      >
      <div class="modal-box w-full max-w-[64rem] h-full p-0 bg-white rounded-lg shadow-lg">
        <!-- 搜尋欄 -->
        <SearchAreaBar />
        <!-- 主體內容 -->
        <div class="dialog-body flex h-full bg-gray">
          <!-- 左側選單 -->
          <SearchCategoryNav />
          <!-- 右側內容 -->
          <SearchAreaContent/>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.btn:hover{
  border-color: transparent;
}
</style>
