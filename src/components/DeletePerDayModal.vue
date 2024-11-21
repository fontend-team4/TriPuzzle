<template>
  <dialog id="delete_date" class="modal">
    <div class="modal-box w-[384px] p-0">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div class="py-6 px-5 object-cover">
        <img class="w-72 h-36 mx-auto" src="https://web.chictrip.com.tw/assets/master-img-warn.198cfcdc.png" alt="">
      </div>
      <div class=" text-center">
        <p class="text-lg font-medium">確定要刪除第 1 天及這天所有行程嗎？</p>
        <p class="text-gray-400 pt-1">刪除後將無法復原哦</p>
      </div>
      <div class="w-full flex gap-3 px-5 py-6">
        <button class="w-full h-12 px-5 py-3 border border-[#D23430] text-[#D23430] text-center rounded-3xl font-medium">
          取消
        </button>
        <button class="w-full h-12 px-5 py-3 bg-[#D23430] text-white text-center rounded-3xl font-medium">
          刪除
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <button>close</button>
    </form>
  </dialog>
</template>