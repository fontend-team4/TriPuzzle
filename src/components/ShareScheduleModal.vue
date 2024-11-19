<template>
  <button class="btn" onclick="my_modal_2.showModal()">open</button>
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box w-screen md:w-[480px] bg-gray-100">
      <!-- close button -->
      <form method="dialog">
        <div class="w-full h-10">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </div>
      </form>
      <!-- share & invite toggle -->
      <ul class="w-full h-10 flex gap-1 mb-5 p-1 rounded-xl bg-gray-200">
        <li class="w-1/2 text-center py-1 px-2 rounded-lg bg-red-500 text-white">分享行程</li>
        <li class="w-1/2 text-center py-1 px-2 rounded-lg hover:bg-red-500 hover:text-white">邀請共編</li>
      </ul>
      <!-- share detail -->
      <!-- <div class="rounded-xl bg-white w-[432px]  pt-10 px-5 pb-6">
        <div>
          <img class="w-40 h-40 mb-4 mx-auto" src="../assets/qrcode.svg" alt="">
          <p class="mb-8 text-center">手機掃描條碼，即可查看此行程</p>
        </div>
        <div>
          <p class="w-[310px] m-auto text-sm text-center mb-8 text-gray-400 relative before:inline-block before:h-[1px] before:w-1/3 before:bg-gray-400 before:absolute before:top-2 before:left-0 after:inline-block after:h-[1px] after:w-1/3 after:bg-gray-400 after:absolute after:top-2 after:right-0">其他方式</p>
          <ul class="w-[310px] m-auto flex justify-around">
            <li>
              <button class="hover:cursor-pointer">
                <span class="inline-block w-14 h-14 p-3 bg-red-100 rounded-xl text-red-700"><LinkIcon/></span>
                <p class="text-sm">複製連結</p>
              </button>
            </li>
            <li>
              <button class="hover:cursor-pointer">
                <span class="inline-block w-14 h-14 p-3 bg-red-100 rounded-xl text-red-700"><ChatBubbleOvalLeftEllipsisIcon/></span>
                <p class="text-sm">行程摘要</p>
              </button>
            </li>
            <li>
              <button class="hover:cursor-pointer">
                <span class="inline-block w-14 h-14 p-3 bg-red-100 rounded-xl text-red-700"><EnvelopeIcon/></span>
                <p class="text-sm">匯出 PDF</p>
              </button>
            </li>
          </ul>
        </div>
      </div> -->
      <!-- invite detail -->
      <div class="rounded-xl bg-white w-[432px] pt-10 px-5 pb-6">
        <div class="text-center">
          <div class="dropdown">
            <div tabindex="0" role="button" class="mb-4 w-32 min-h-7 flex items-center justify-center rounded-full bg-red-100 text-red-700">
              <p class="text-sm font-medium p-1 me-2">僅供檢視</p>
              <span class="inline-block w-4 h-4 p-0.5"><ChevronDownIcon /></span>
            </div>
            <ul tabindex="0" class="dropdown-content menu w-32 bg-base-100 rounded-sm border z-[1] py-2 px-0">
              <li><a class="rounded-none bg-gray-100 text-red-700 font-medium">僅供檢視</a></li>
              <li><a class="rounded-none hover:bg-gray-100 font-medium">可編輯</a></li>
            </ul>
          </div>
          <img class="w-40 h-40 mb-4 mx-auto" src="../assets/qrcode.svg" alt="">
          <p>手機掃描條碼，即可查看此行程</p>
          <p class="text-sm mb-8 text-gray-400">24 小時內有效</p>
        </div>
        <button class="w-full flex justify-center items-center text-red-700 border border-red-700 rounded-full py-2 px-4">
          <span class="inline-block w-6 h-6 me-1"><LinkIcon/></span>
          <p class="text-sm">複製連結</p>
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup>
// import {  } from '@heroicons/vue/16/solid'
import { LinkIcon, ChatBubbleOvalLeftEllipsisIcon, EnvelopeIcon} from '@heroicons/vue/24/outline'
import { ShareIcon, ChevronDownIcon } from '@heroicons/vue/24/solid';

</script>