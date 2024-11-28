<template>
  <button class="hover:cursor-pointer" onclick="exportSchedule.showModal()">
    <span class="inline-block w-14 h-14 p-3 bg-primary-100 rounded-xl text-primary-600"><DocumentArrowDownIcon/></span>
    <p class="text-sm">匯出 PDF</p>
  </button>
  <dialog id="exportSchedule" class="modal">
    <div class="modal-box w-screen md:w-[480px] relative">
      <form method="dialog">
        <!-- close button -->
        <div class="w-full h-10">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </div>
        <!-- detail -->
        <div class="h-[400px]">
          <h2 class="text-2xl font-medium text-center mb-6">匯出行程 PDF 檔</h2>
          <button class="block w-20 mb-6 hover:cursor-pointer mx-auto">
            <span class="block w-20 h-20 mb-3 mx-auto"><DocumentArrowDownIcon/></span>
            <p class="text-center">點擊下載</p>
          </button>
          <div class="border-t pt-4">
            <h3 class="text-2xl font-medium text-center mb-4">寄送 Email</h3>
            <input type="text" placeholder="輸入要寄送的 Email" class="input input-bordered w-full px-6 focus:outline-primary-600" />
          </div>
          <!-- bottom btn -->
          <div class="w-full flex gap-3 h-20 px-6 py-4 bg-white border-t fixed bottom-0 right-0">
            <button class="w-full h-12 px-5 py-3 border border-primary-600 text-primary-600 text-center rounded-3xl font-medium hover:bg-primary-100">
              取消
            </button>
            <button class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl font-medium">
              寄送
            </button>
          </div>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup>
import { DocumentArrowDownIcon } from '@heroicons/vue/24/outline'

</script>