<script setup>
import ScheduleCoverImgModal from "./ScheduleCoverImgModal.vue";
</script>

<template>
  <button class="btn" onclick="my_modal_2.showModal()">建立行程</button>
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box p-0 w-[480px]">
      <div class="w-[480px] h-[60px] px-[15px] py-[8px] sticky top-0 bg-white">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
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
          <span class="text-2xl font-bold flex items-center justify-center"
            >行程設定</span
          >
        </header>
      </div>

      <!-- 主內容區塊，設置 gap-[20px] -->
      <div
        class="pt-0 px-[20px] pb-[50px] w-[480px] h-[552.75px] flex flex-col gap-[20px] relative"
      >
        <!-- 封面照片 -->
        <div class="relative">
          <p class="font-bold">封面照片</p>
          <div class="absolute right-[20px] bottom-[16px] z-10 flex items-center justify-center gap-2">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            class="size-5 font-bold text-white "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          <p class="font-bold text-sm text-white ">更換</p>
        </div>
         

        <div class="relative w-full h-auto rounded-xl overflow-hidden">
      <img
        src="https://chictirpstorageprod.blob.core.windows.net/system/166b42c7-fc3c-4708-ab2b-f9730bfd1b8a.jpg"
        alt="封面照片"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
    </div>
        </div>

        <!-- 行程名稱 -->
        <div >
          <p class="mb-2 font-bold">行程名稱</p>
          <input
            type="text"
            placeholder="幫行程取個名字吧"
            class="border-solid border border-primary-100 rounded-lg w-[100%] h-[40px] py-2 px-5"
          />
        </div>

        <!-- 行程日期 -->
        <div class="w-[100%]">
          <div>
            <p class="mb-2 font-bold">行程日期</p>
          </div>
          <div class="flex justify-between items-center">
            <input
              type="date"
              placeholder="出發日"
              class="border-solid border border-primary-100 rounded-lg w-[198px] h-[40px] py-2 px-5"
            />
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="4"
                stroke="currentColor"
                class="size-3.5 text-stone-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
            <input
              type="date"
              placeholder="結束日"
              class="border-solid border border-primary-100 rounded-lg w-[198px] h-[40px] py-2 px-5"
            />
          </div>
        </div>

        <!-- 主要交通方式 -->
        <div>
          <p class="mb-2 font-bold">主要交通方式</p>
          <div
            class="relative w-[100%] h-[40px] border border-primary-100 rounded-lg px-[20px] py-[8px] flex items-center justify-between"
          >
            <span class="text-gray-400">自訂</span>
            <input type="checkbox" id="toggle-transportation" class="hidden" />
            <label for="toggle-transportation" class="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 transition-transform"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>

              <!-- hover透過script綁定邏輯 -->
            </label>
            <ul
              class="transportation-area absolute left-0 bottom-[50px] mb-1 w-full bg-white border-primary-100 rounded-lg shadow-lg hidden transition-all duration-500 opacity-0"
            >
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">走路</li>
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">汽車</li>
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                大眾運輸
              </li>
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">機車</li>
              <li
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer bg-primary-100"
              >
                自訂
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="w-[100%] h-[80px] absolute bottom-0 sticky border-t-[1px] border-slate-200">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
        
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
  </dialog>
</template>

<style>
/* 顯示選單 */
#toggle-transportation:checked + label + .transportation-area {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

/* 隱藏選單 */
.transportation-area {
  transform: translateY(-10px);
}

/* 圖標旋轉 */
#toggle-transportation:checked + label svg {
  transform: rotate(180deg);
}
</style>
