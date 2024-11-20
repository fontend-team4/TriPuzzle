<template>
  <button class="hover:cursor-pointer" onclick="scheduleSummaryModal.showModal()">
    <span class="inline-block w-14 h-14 p-3 bg-red-100 rounded-xl text-red-700"><ChatBubbleOvalLeftEllipsisIcon/></span>
    <p class="text-sm">行程摘要</p>
  </button>
  <dialog id="scheduleSummaryModal" class="modal">
    <div class="modal-box w-screen md:w-[480px] bg-gray-100 relative">
      <form method="dialog">
        <!-- close button -->
        <div class="w-full h-10">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </div>
        <!-- detail -->
        <div class="h-[600px] overflow-y-scroll pb-20">
          <h2 class="text-2xl font-medium text-center mb-4">行程摘要</h2>
          <div>
            <p>行程名稱：香港</p>
            <br>
            <p>第1天 (2024/11/15)</p>
            <p>08:00 蘭桂坊 (停留 01時00分)</p>
            <p>09:00 香港杜莎夫人蠟像館 (停留 01時00分)</p>
            <p>10:00 天際100 (停留 01時00分)</p>
            <br>
            <p>第2天 (2024/11/16)</p>
            <p>08:00 香港迪士尼樂園 (停留 01時00分)</p>
            <br>
            <p>第3天 (2024/11/17)</p>
            <p>08:00 巧佳小巴用品 Public Minibus Museum (停留 01時00分)</p>
            <br>
            <p>第4天 (2024/11/18)</p>
            <p>當天沒有行程</p>
            <br>
            <p>第5天 (2024/11/19)</p>
            <p>當天沒有行程</p>
            <br>
            <p>第6天 (2024/11/18)</p>
            <p>當天沒有行程</p>
            <br>
            <p>第7天 (2024/11/19)</p>
            <p>當天沒有行程</p>
          </div>
        </div>
        <!-- bottob btn -->
        <div class="w-full flex gap-3 h-20 px-6 py-4 bg-white border-t-2 fixed bottom-0 right-0">
          <button class="w-full h-12 px-5 py-3 border border-red-800 text-red-800 text-center rounded-3xl font-medium">
            取消
          </button>
          <button class="w-full h-12 px-5 py-3 bg-red-800 text-white text-center rounded-3xl font-medium">
            複製摘要
          </button>
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
import { ChatBubbleOvalLeftEllipsisIcon, ExclamationCircleIcon, ShareIcon, DocumentArrowDownIcon} from '@heroicons/vue/24/outline'

</script>