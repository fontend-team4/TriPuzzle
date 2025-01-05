<script setup>
import { provide } from "vue"
import { ChevronDownIcon } from "@heroicons/vue/24/solid"
import SearchCategoryNav from "./SearchCategoryNav.vue"
// import SearchAreaBar from "../components/SearchAreaBar.vue"

// 點擊外框關閉
const closeModal = () => {
  const dialog = document.getElementById("SearchArea")
  dialog?.close()
}
provide("closeModal", closeModal)
</script>

<template>
  <!-- 區域選擇按鈕 -->
  <div class="flex items-center justify-center px-2 block-area">
    <button
      class="inline-flex items-center justify-center h-4 mx-0 mt-0 border-transparent cursor-pointer btn btn-sm rounded-3xl w-30 bg-primary-600 hover:bg-primary-500"
      onclick="SearchArea.showModal()"
    >
      <span
        class="flex items-center justify-center overflow-hidden font-medium text-white text-ellipsis"
        >選擇區域
        <ChevronDownIcon class="w-4 h-4 pl-1 text-white Icon-SelectArea" />
      </span>
    </button>

    <!-- 彈窗 -->
    <dialog
      id="SearchArea"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal"
      @click.self="closeModal"
    >
      <div
        class="modal-box w-full max-w-[64rem]  p-0 bg-white rounded-lg shadow-lg relative"
      >
        <!-- 搜尋欄 -->
        <!-- <SearchAreaBar class="fixed top-0" /> -->
        <!-- 主體內容 -->
        <div class="flex h-full overflow-hidden dialog-body bg-gray">
          <!-- 左側選單 -->
          <SearchCategoryNav />
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.btn:hover {
  border-color: transparent;
}
</style>
