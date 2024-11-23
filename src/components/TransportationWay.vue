<template>
  <div class="min-w-full h-screen flex flex-row-reverse bg-[#EEEEEE] z-10">
    <div class="w-full lg:w-96 h-screen bg-white shadow-xl">
      <!-- header -->
      <div class="w-full flex items-center justify-between p-4">
        <button class="w-4 h-4 hover:cursor-pointer"><ChevronLeftIcon /></button>
        <p class="font-medium">交通方式</p>
        <p></p>
      </div>
      <!-- point to point -->
      <div class="mx-5 mb-3 px-3 py-2 border rounded-lg">
        <div class="flex items-center gap-2 relative">
          <span class="w-6 h-6 mb-2 text-orange-400"><MapPinIcon /></span>
          <p class="w-full font-medium pb-2">香港杜莎夫人蠟像館</p>
          <span class="w-3 h-3 text-gray-400 absolute bottom-[-6px] left-[5px]"><ChevronDoubleDownIcon /></span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-6 h-6 pt-1 text-[#D23430]"><MapPinIcon /></span>
          <p class="w-full font-medium pt-2 border-t border-dashed">天際 100</p>
        </div>
      </div>
      <!-- transportation way option -->
      <div class="w-full flex overflow-x-scroll gap-2 px-5 pb-3">
        <ul class="flex gap-2">
          <li class="flex whitespace-nowrap items-center py-1 px-3 bg-[#EEEEEE] rounded-full hover:cursor-pointer hover:bg-[#FDE4E3] hover:text-[#D23430]">
            <i class="iconoir-car me-1"></i>
            <p class="text-sm font-medium">--</p>
          </li>
          <li class="flex whitespace-nowrap items-center py-1 px-3 bg-[#EEEEEE] rounded-full hover:cursor-pointer hover:bg-[#FDE4E3] hover:text-[#D23430]">
            <i class="iconoir-motorcycle me-1"></i>
            <p class="text-sm font-medium">24 分</p>
          </li>
          <li class="flex whitespace-nowrap items-center py-1 px-3 bg-[#EEEEEE] rounded-full hover:cursor-pointer hover:bg-[#FDE4E3] hover:text-[#D23430]">
            <i class="iconoir-bus me-1"></i>
            <p class="text-sm font-medium">30 分</p>
          </li>
          <li class="flex whitespace-nowrap items-center py-1 px-3 bg-[#EEEEEE] rounded-full hover:cursor-pointer hover:bg-[#FDE4E3] hover:text-[#D23430]">
            <i class="iconoir-walking me-1"></i>
            <p class="text-sm font-medium">--</p>
          </li>
        </ul>
        <div class="flex whitespace-nowrap items-center py-1 px-3 bg-[#EEEEEE] rounded-full hover:cursor-pointer hover:bg-[#FDE4E3] hover:text-[#D23430]">
          <i class="iconoir-edit-pencil me-1"></i>
          <p class="text-sm font-medium">自訂</p>
        </div>
      </div>
      <!-- transportation routes option -->
      <div class="min-h-[600px] overflow-y-scroll bg-[#EEEEEE]">

      </div>
      <!-- bottom btn -->
      <div class="w-full lg:w-96 h-20 px-2.5 py-5 bg-white border-t fixed bottom-0 right-0">
        <button class="w-full h-12 px-5 py-3 bg-[#D23430] hover:bg-[#B12824] text-white text-center rounded-3xl">
          儲存
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, MapPinIcon, ChevronDoubleDownIcon } from '@heroicons/vue/24/solid'
</script>