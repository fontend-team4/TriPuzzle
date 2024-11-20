<template>
  <div class="max-w-[1440px] h-screen flex flex-row-reverse bg-gray-100">
    <div class="w-full lg:w-96 h-screen bg-white shadow-xl">
      <!-- header -->
      <div class="bg-red-700 z-10 py-4 ps-4 pe-14 relative">
        <div class="flex items-center justify-between gap-0.5">
          <div class="flex items-center">
            <span class="inline-block w-4 h-4 text-white"><ChevronLeftIcon /></span>
            <h2 class="text-white text-sm">行程列表</h2>
          </div>
          <div class="w-5 h-5 text-white" onclick="shareScheduleModal.showModal()"><ArrowUpTrayIcon /></div>
          <ShareScheduleModal />
        </div>
        <button class="bg-red-100 text-white w-8 h-8 rounded-full absolute top-2.5 right-4 p-1.5">
          <XMarkIcon />
        </button>
      </div>
      <!-- date tab -->
      <div class="w-full h-12 flex pt-2 px-8 overflow-x-scroll border-b">
        <!-- <p class="me-4 whitespace-nowrap pb-2 text-gray-500 font-medium text-sm">總覽頁</p> -->
        <ul class="flex gap-4">
          <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-800 font-medium text-sm border-b-2 border-red-800">總覽頁</a></li>
          <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-red-800">第1天</a></li>
          <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-red-800">第2天</a></li>
          <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-red-800">第3天</a></li>
          <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-red-800">第4天</a></li>
          <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-red-800">第5天</a></li>
          <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-red-800">第6天</a></li>
          <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-red-800">第7天</a></li>
        </ul>
      </div>
      <!-- overview -->
      <!-- schedule title -->
      <!-- <div class="w-full pt-5 px-6 pb-8">
        <div class="flex items-center gap-2">
          <p class="text-xl font-medium mb-2">香港</p>
          <span class="inline-block w-4 h-4 mb-2"><PencilIcon /></span>
        </div>
        <p class="text-sm mb-3">2024/11/15 - 2024/11/29</p>
        <p class="text-sm text-gray-500 border-l border-gray-400 ps-3" onclick="schedul_note.showModal()">還沒有寫筆記哦...
          <span class="text-red-700 font-medium">編輯筆記</span>
        </p> -->
        <!-- schedule note -->
        <!-- <dialog id="schedul_note" class="modal">
          <div class="modal-box w-screen md:w-[480px]">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h2 class="text-2xl font-medium text-center pt-6 mb-4">行程筆記</h2>
            <textarea class="w-full h-[500px] textarea textarea-lg focus:border-0 focus:outline-none" placeholder="記下重要的旅行細節吧"></textarea>
            <div class="w-full flex gap-3 h-20 px-6 py-4 bg-white border-t-2 fixed bottom-0 right-0">
              <button class="w-full h-12 px-5 py-3 border border-red-800 text-red-800 text-center rounded-3xl font-medium">
                取消
              </button>
              <button class="w-full h-12 px-5 py-3 bg-red-800 text-white text-center rounded-3xl font-medium">
                儲存
              </button>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <button>close</button>
          </form>
        </dialog> 
      </div> -->
      <!-- my tool -->
      <!-- <div class="p-5">
        <div class="flex items-center gap-1 mb-3">
          <span class="inline-block w-5 h-5"><UsersIcon/></span>
          <p>我的工具</p>
        </div>
        <ul class="flex justify-between">
          <li class="w-[100px] pt-4 px-2.5 pb-2.5 bg-gray-100 rounded-xl hover:cursor-pointer hover:bg-red-100 hover:text-red-700">
            <img src="https://web.chictrip.com.tw/assets/img-myfavorite.42ac10ec.svg" class="mx-auto" alt="">
            <p class="text-center font-medium mt-2">收藏</p>
          </li>
          <li class="w-[100px] pt-4 px-2.5 pb-2.5 bg-gray-100 rounded-xl hover:cursor-pointer hover:bg-red-100 hover:text-red-700">
            <img src="https://web.chictrip.com.tw/assets/img-share.7c89cdf8.svg" class="mx-auto" alt="">
            <p class="text-center font-medium mt-2">共編</p>
          </li>
          <li class="w-[100px] pt-4 px-2.5 pb-2.5 bg-gray-100 rounded-xl hover:cursor-pointer hover:bg-red-100 hover:text-red-700">
            <img src="https://web.chictrip.com.tw/assets/img-exportbook.a62ae1d0.svg" class="mx-auto" alt="">
            <p class="text-center font-medium mt-2">分帳</p>
          </li>
        </ul>
      </div> -->
      <!-- everyday schedule -->
      <!-- date -->
      <div class="pt-5 px-5 mb-3">
        <div class="date w-28 flex gap-1 cursor-pointer">
          <p class="font-medium">11/15 週五</p>
          <div class="dropdown hidden">
            <div class="w-6 h-6" tabindex="0" role="button">
              <EllipsisHorizontalIcon/>
            </div>
            <div tabindex="0" class=" dropdown-content flex gap-2 bg-base-100 rounded z-[1] w-32 p-2 shadow">
              <span class="w-6 h-6"><TrashIcon /></span>
              <p>刪除這天</p>
            </div>
          </div>
        </div>
      </div>
      <!-- places -->
      <div class="pt-2.5 pm-5 px-5">
        <div class="w-full bg-gray-100 rounded-xl border">
          <div class="flex p-1">
            <img class="w-[108px] h-[108px] rounded-xl object-cover" src="https://lh3.googleusercontent.com/places/ANJU3Ds3MXRcZf77xt6ejMr5CyGxuySKPa3n9yUWJ5EqShizmd3EPHhQNT8_xFYRuOpksBffhO-lOh21FWclCl_ZQv94ZzST19IrWtM=s1600-w480">
            <ul class="px-4 flex flex-col gap-0.5 justify-center">
              <li class="text-sm font-medium text-orange-400">08:00</li>
              <li class="font-medium">香港迪士尼樂園</li>
              <li class="text-xs text-gray-400">停留 1 時</li>
            </ul>
          </div>
          <!-- hover:relative feature -->
          <div class="h-10 flex justify-between items-center border-t">
            <ul class="flex gap-4 p-3">
              <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer">
                <span class="w-3 h-3"><PencilIcon/></span>
                <p class="text-xs">編輯</p>
              </li>
              <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer">
                <span class="w-3 h-3"><MagnifyingGlassIcon/></span>
                <p class="text-xs">周邊</p>
              </li>
              <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer">
                <span class="w-3 h-3"><BookmarkIcon/></span>
                <p class="text-xs">筆記</p>
              </li>
            </ul>
            <span class="w-10 h-10 text-gray-500 p-3 border-l"><MapPinIcon/></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon, ChevronLeftIcon, ArrowUpTrayIcon, UsersIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, BookmarkIcon } from '@heroicons/vue/24/outline'
import ShareScheduleModal from './ShareScheduleModal.vue'
import { EllipsisHorizontalIcon, MapPinIcon } from '@heroicons/vue/24/solid';
</script>

<style>
.date:hover > .dropdown{
  display: inline;
}
</style>