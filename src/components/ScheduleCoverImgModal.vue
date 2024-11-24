<template>

  <div class="max-w-[800px] bg-primary-100 rounded-xl " >
    <div class="max-w-[800px] h-[60px] px-[15px] py-[8px] sticky top-0 bg-white rounded-xl relative">
      <form method="dialog ">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 flex justify-center item-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </form>
    </div>

    <div>
      <header>
        <span
          class="w-[100%] h-[36px] mb-[16px] text-2xl font-bold flex items-center justify-center"
          >選擇行程封面</span
        >
      </header>
    </div>

    <!-- 主內容區塊 -->
    <div
      class="pt-0 px-[20px] pb-[50px] max-w-[800px] h-[548.75px] flex flex-col gap-[20px] relative "
    ></div>

    <div
      class="w-[100%] h-[80px] absolute bottom-0 sticky border-t-[1px] border-slate-200 py-[16px] px-[24px] bg-white z-20"
    >
      <form method="dialog" class="flex gap-[12px]">
        <button
          class="w-[50%] h-[48px] border-[1px] border-primary-800 rounded-3xl text-primary-800 font-bold text-sm justify-center items-center px-[12px] py-[8px]"
        >
          取消
        </button>
        <button
          class="w-[50%] h-[48px] bg-primary-800 rounded-3xl text-white font-bold text-sm justify-center items-center px-[12px] py-[8px]"
        >
          完成
        </button>
      </form>
    </div>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</template>

<style></style>
