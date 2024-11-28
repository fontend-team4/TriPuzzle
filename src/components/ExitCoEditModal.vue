<template>
  <!-- <button class="btn" onclick="my_modal_2.showModal()">open modal</button> -->
  <dialog id="exitToggle" class="modal">
    <div class="modal-box w-[384px] p-0">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div class="py-6 px-5 object-cover">
        <img class="w-72 h-36 mx-auto" src="https://web.chictrip.com.tw/assets/master-img-warn.198cfcdc.png" alt="">
      </div>
      <p class="text-xl font-medium">確定要退出嗎？</p>
      <!-- bottom btn -->
        <div class="w-full flex gap-3 px-5 py-6">
          <button class="w-full h-12 px-5 py-3 border border-primary-600 text-primary-600 hover:bg-primary-100 text-center rounded-3xl font-medium">
            取消
          </button>
          <button class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl font-medium">
            退出
          </button>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <button>close</button>
    </form>
  </dialog>
</template>