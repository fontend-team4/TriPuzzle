<template>
  <dialog id="delete_place" class="modal">
    <div class="modal-box w-[384px] p-0">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div class="py-6 px-5 object-cover">
        <img class="w-48 mx-auto" src="../assets/images/cat-4.png" alt="">
      </div>
      <div class="text-center">
        <p class="text-lg font-medium">確定要刪除 {景點名稱} 嗎？</p>
        <p class="text-gray-400 pt-1">刪除後將無法復原哦</p>
      </div>
      <div class="w-full flex gap-3 px-5 py-6">
        <button class="w-full h-12 px-5 py-3 border border-primary-600 text-primary-600 hover:bg-primary-100 text-center rounded-3xl font-medium">
          取消
        </button>
        <button class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl font-medium">
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