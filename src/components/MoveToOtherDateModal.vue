<template>
  <dialog id="moveDate" class="modal">
    <div class="modal-box min-w-full md:min-w-[480px] min-h-screen md:min-h-[90%]">
      <!-- close button -->
      <form method="dialog">
        <div class="w-full h-10">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </div>
      </form>
      <!-- title -->
      <h2 class="text-2xl font-medium text-center mb-6">要移到哪天？</h2>
      <!-- detail -->
      <ul class="h-[70vh] flex flex-col gap-2 overflow-y-scroll">
        <li class="w-full py-2 px-3 bg-[#EEEEEE] opacity-40 rounded-lg">
          <p class="text-base font-medium mb-1">第 1 天</p>
          <p class="text-sm text-gray-500">11/15 週五 ．2 個景點</p>
        </li>
        <li class="w-full py-2 px-3 bg-[#EEEEEE] opacity-70 hover:opacity-100 rounded-lg">
          <p class="text-base font-medium mb-1">第 2 天</p>
          <p class="text-sm text-gray-500">11/16 週六 ．3 個景點</p>
        </li>
        <li class="w-full py-2 px-3 bg-[#EEEEEE] opacity-70 hover:opacity-100 rounded-lg">
          <p class="text-base font-medium mb-1">第 3 天</p>
          <p class="text-sm text-gray-500">11/17 週日 ．3 個景點</p>
        </li>
        <li class="w-full py-2 px-3 bg-[#EEEEEE] opacity-70 hover:opacity-100 rounded-lg">
          <p class="text-base font-medium mb-1">第 4 天</p>
          <p class="text-sm text-gray-500">11/18 週一 ．2 個景點</p>
        </li>
        <li class="w-full py-2 px-3 bg-[#EEEEEE] opacity-70 hover:opacity-100 rounded-lg">
          <p class="text-base font-medium mb-1">第 5 天</p>
          <p class="text-sm text-gray-500">11/19 週二 ．2 個景點</p>
        </li>
        <li class="w-full py-2 px-3 bg-[#EEEEEE] opacity-70 hover:opacity-100 rounded-lg">
          <p class="text-base font-medium mb-1">第 6 天</p>
          <p class="text-sm text-gray-500">11/20 週三 ．2 個景點</p>
        </li>
        <li class="w-full py-2 px-3 bg-[#EEEEEE] opacity-70 hover:opacity-100 rounded-lg">
          <p class="text-base font-medium mb-1">第 7 天</p>
          <p class="text-sm text-gray-500">11/21 週四 ．2 個景點</p>
        </li>
      </ul>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <button>close</button>
    </form>
  </dialog>
</template>