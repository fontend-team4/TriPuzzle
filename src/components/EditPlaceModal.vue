<template>
  <dialog id="edit_place" class="modal">
    <div class="modal-box min-w-full md:min-w-[480px] min-h-screen md:min-h-[90%] px-0">
      <!-- close button -->
      <form method="dialog">
        <div class="w-full h-10">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </div>
      </form>
      <div class="h-[400px]">
        <h2 class="text-2xl font-medium text-center mb-6">編輯</h2>
        <!-- place title -->
        <div class="flex flex-col gap-2.5 px-5 pb-5 border-b-4">
          <input type="text" value="香港杜莎夫人蠟像館" class="w-full text-2xl font-medium p-1 focus:border-0 focus:border-b focus:outline-none">
          <div class="flex items-center">
            <span class="w-6 h-6"><MapPinIcon /></span>
            <p class="p-0.5">Shop P101, The Peak Tower, No, 128 Peak Rd, The Pea</p>
          </div>
          <!-- <div class="dropdown">
          <div tabindex="0" role="button" class="mb-4 w-32 min-h-7 flex items-center justify-center">
            <p class="text-sm font-medium p-1 me-2">景點</p>
            <span class="inline-block w-4 h-4 p-0.5"><ChevronDownIcon /></span>
          </div>
          <ul tabindex="0" class="dropdown-content menu w-24 h-28 flex-nowrap bg-base-100 rounded-sm border z-[1] py-2 px-0 shadow-lg overflow-y-scroll">
            <li><a class="rounded-none bg-gray text-primary-600 font-medium">景點</a></li>
            <li><a class="rounded-none hover:bg-gray font-medium">美食</a></li>
            <li><a class="rounded-none hover:bg-gray font-medium">購物</a></li>
            <li><a class="rounded-none hover:bg-gray font-medium">住宿</a></li>
            <li><a class="rounded-none hover:bg-gray font-medium">美食</a></li>
            <li><a class="rounded-none hover:bg-gray font-medium">購物</a></li>
            <li><a class="rounded-none hover:bg-gray font-medium">住宿</a></li>
          </ul>
          </div> -->
        </div>
        <!-- details -->
        <div class="h-[60vh] flex flex-col gap-3 p-5 pb-40 overflow-y-auto relative">
          <div>
            <p class="mb-2">抵達時間</p>
            <div class="px-5 bg-gray rounded-lg">
              <div class="py-3 flex flex-row-reverse justify-between border-b-2 border-dashed">
                <input type="radio" name="arrival-time" id="default" checked class="radio bg-white checked:bg-primary-600">
                <label for="default" class="w-5/6 flex gap-1 items-center font-medium py-1 text-gray-400">
                  <p class="pl-2">系統規劃</p>
                  <p class="time w-32 px-3 ms-10 text-sm">08:00</p>
                </label>
              </div>
              <div class="py-3 flex flex-row-reverse justify-between border-b-2 border-dashed text-gray-400">
                <input type="radio" name="arrival-time" id="user-setting" class="radio bg-white checked:bg-primary-600">
                <label for="user-setting" class="w-5/6 flex gap-1 items-center font-medium">
                  <p class="pl-2">手動設定</p>
                  <input type="time" name="" id="" value="08:00" class="time w-36 text-sm rounded-full border-2 px-4 py-1 ms-2">
                </label>
              </div>
            </div>
          </div>
          <div>
            <p class="mb-2">此景點</p>
            <div class="px-5 bg-gray rounded-lg">
              <div class="py-3 flex flex-row-reverse justify-between border-b-2 border-dashed">
                <input type="radio" name="during-time" id="stay" checked class="radio bg-white checked:bg-primary-600">
                <label for="stay" class="w-5/6 flex gap-1 items-center font-medium text-gray-400">
                  <p class="pl-2">停留時間</p>
                  <input type="time" name="" id="" value="08:00" class="time w-36 text-sm rounded-full border-2 px-4 py-1 ms-2">
                </label>
              </div>
              <div class="py-3 flex flex-row-reverse justify-between border-b-2 border-dashed text-gray-400">
                <input type="radio" name="during-time" id="leave" class="radio bg-white checked:bg-primary-600">
                <label for="leave" class="w-5/6 flex gap-1 items-center font-medium">
                  <p class="pl-2">離開時間</p>
                  <input type="time" name="" id="" value="09:00" class="time w-36 text-sm rounded-full border-2 px-4 py-1 ms-2">
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- bottob btn -->
        <div class="w-full flex gap-3 h-20 px-6 py-4 bg-white border-t fixed bottom-0 right-0">
          <button class="w-full h-12 px-5 py-3 border border-primary-600 text-primary-600 hover:bg-primary-100 text-center rounded-3xl font-medium">
            取消
          </button>
          <button class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl font-medium">
            儲存
          </button>
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
import { MapPinIcon } from '@heroicons/vue/24/outline';
</script>

<style>
input[type='radio']:checked ~ label > p{
  color: #2d4057
}
input[type='radio']:checked ~ label > .time{
  color: #D23430;
}
</style>