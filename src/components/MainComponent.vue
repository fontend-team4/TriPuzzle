<template>
  <div class="w-full h-screen relative bg-gray-100">
    <div class="w-full lg:w-96 h-screen bg-white absolute top-0 right-0">
      <div class="p-5 relative">
        <!-- header -->
        <div class="pb-3 relative bg-white z-10">
          <button class="bg-gray-200 w-8 h-8 rounded-full absolute top-0 right-0">
            <XMarkIcon />
          </button>
          <h2 class="text-2xl font-medium pt-10 pb-2.5">行程</h2>
          <ul class="w-full h-10 flex gap-1 mb-5 p-1 rounded-xl bg-gray-100">
            <li class="w-1/2 text-center py-1 px-2 rounded-lg bg-white">我的行程</li>
            <li class="w-1/2 text-center py-1 px-2 rounded-lg hover:bg-white">與我共編</li>
          </ul>
          <div class="flex items-center">
            <p class="text-sm font-medium">
              上次編輯時間
            </p>
            <p class="w-4 h-4"><ChevronDownIcon /></p>
          </div>
        </div>
        <!-- schedules list -->
        <div class="h-[500px] overflow-y-scroll">
          <div class="card card-compact bg-base-100 w-full border-2 mb-4">
            <figure>
              <img
                src="https://chictirpstorageprod.blob.core.windows.net/system/2bf62bfd-5bbd-47f1-9174-492c7218dcdf.jpg"
                alt="" />
            </figure>
            <div class="flex flex-row justify-between items-center px-0 py-3">
              <div class="w-4/5 px-5 border-dotted border-r-2">
                <h2 class="text-lg ">北海道</h2>
                <p class="text-sm">2025/12/01-2025/12/07</p>
              </div>
              <div class="w-16 text-center">
                <p class="w-6 h-6 mx-auto"><UserPlusIcon /></p>
                <p>2人</p>
              </div>
            </div>
          </div>
          <div class="card card-compact bg-base-100 w-full border-2 mt-4 mb-4">
            <figure>
              <img
                src="https://chictirpstorageprod.blob.core.windows.net/travelschedule/1c4209ff-a961-49a1-bb2f-b21435a8c8b4.jpg"
                alt="" />
            </figure>
            <div class="flex flex-row justify-between items-center px-0 py-3">
              <div class="w-4/5 px-5 border-dotted border-r-2">
                <h2 class="text-lg ">東京之旅</h2>
                <p class="text-sm">2025/05/10-2025/05/20</p>
              </div>
              <div class="w-16 text-center">
                <p class="w-6 h-6 mx-auto"><UserPlusIcon /></p>
                <p>共編</p>
              </div>
            </div>
          </div>
        </div>
        <!-- add schedule btn -->
        <!-- 已登入 -->
        <div class="w-full lg:w-96 h-20 px-2.5 py-5 bg-white border-t-2 fixed bottom-0 right-0">
          <button class="w-full h-12 px-5 py-3 bg-red-800 text-white text-center rounded-3xl">
            建立新行程
          </button>
        </div>
        <!-- 未登入 -->
        <!-- <div class="w-full lg:w-96 h-38 px-2.5 py-5 bg-white border-t-2 fixed bottom-0 right-0">
          <p class="mb-3 text-center font-medium">
            嗨，新朋友！
            <br>
            登入就能開始規劃你的專屬行程囉 
          </p>
          <button class="w-full h-12 px-5 py-3 bg-red-800 text-white text-center rounded-3xl">
            登入 / 註冊，建立新行程
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
import { XMarkIcon, UserPlusIcon } from '@heroicons/vue/24/outline'

</script>