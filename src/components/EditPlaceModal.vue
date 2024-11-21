<template>
  <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer" onclick="edit_place.showModal()">
    <span class="w-3 h-3"><PencilIcon/></span>
    <p class="text-xs">編輯</p>
  </li>
  <dialog id="edit_place" class="modal">
    <div class="modal-box w-screen md:w-[480px]">
      <!-- close button -->
      <form method="dialog">
        <div class="w-full h-10">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </div>
      </form>
      <div class="h-[400px]">
        <h2 class="text-2xl font-medium text-center mb-6">編輯</h2>
        <!-- place title -->
        <div class="flex flex-col gap-2.5 px-5 pb-5">
          <input type="text" value="香港杜莎夫人蠟像館" class="w-full text-2xl font-medium p-1 focus:border-0 focus:border-b focus:outline-none">
          <div class="flex ">
            <span></span>
            <p>Shop P101, The Peak Tower, No, 128 Peak Rd, The Pea</p>
          </div>
          <div class="dropdown">
          <div tabindex="0" role="button" class="mb-4 w-32 min-h-7 flex items-center justify-center">
            <p class="text-sm font-medium p-1 me-2">景點</p>
            <span class="inline-block w-4 h-4 p-0.5"><ChevronDownIcon /></span>
          </div>
          <ul tabindex="0" class="dropdown-content menu w-24 h-28 flex-nowrap bg-base-100 rounded-sm border z-[1] py-2 px-0 shadow-lg overflow-y-scroll">
            <li><a class="rounded-none bg-[#EEEEEE] text-[#D23430] font-medium">景點</a></li>
            <li><a class="rounded-none hover:bg-[#EEEEEE] font-medium">美食</a></li>
            <li><a class="rounded-none hover:bg-[#EEEEEE] font-medium">購物</a></li>
            <li><a class="rounded-none hover:bg-[#EEEEEE] font-medium">住宿</a></li>
            <li><a class="rounded-none hover:bg-[#EEEEEE] font-medium">美食</a></li>
            <li><a class="rounded-none hover:bg-[#EEEEEE] font-medium">購物</a></li>
            <li><a class="rounded-none hover:bg-[#EEEEEE] font-medium">住宿</a></li>
          </ul>
          </div>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
</script>