<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import CategoryNav from '../components/CategoryNav.vue';
import SearchAreaContent from '../components/SearchAreaContent.vue';
import SearchAreaBar from '../components/SearchAreaBar.vue';

</script>

<template>
  <div class="box-border">
    <!-- 區域選擇按鈕 -->
    <div class="block-area pr-2">
      <div class="btn btn-sm border-transparent inline-flex items-center justify-between h-4 rounded-3xl cursor-pointer mt-0 mx-0 mb-1 w-22 bg-primary-600" onclick="SearchArea.showModal()">
        <span class="text-gray flex font-medium overflow-hidden text-ellipsis">選擇區域
          <ChevronDownIcon class="Icon-SelectArea w-4 h-4 pl-1 text-white text-primary-800"/>
        </span>
      </div>
    </div>

    <!-- 彈窗 -->
    <dialog id="SearchArea" class="modal flex items-center justify-center fixed inset-0 bg-black bg-opacity-50">
      <div class="modal-box w-full max-w-[64rem] h-full p-6 bg-white rounded-lg shadow-lg">
        <!-- 搜尋欄 -->
        <header class="dialog-header flex max-w-[58rem]">
          <SearchAreaBar />
        </header>

        <!-- 主體內容 -->
        <div class="dialog-body flex">
          <!-- 左側選單 -->
          <CategoryNav />
          <!-- 右側內容 -->
          <SearchAreaContent />
        </div>

        <!-- 關閉按鈕 -->
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-5 top-6">✕</button>
        </form>
      </div>
      <!-- 點擊外框關閉 -->
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<style scoped>
/* 此處保留樣式與原有相同 */
</style>
