<script setup>
import ScheduleCoverImgModal from "./ScheduleCoverImgModal.vue";
</script>

<template>
  <button class="btn" onclick="my_modal_2.showModal()">建立行程</button>
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box p-0 w-[480px]">
      <div class="w-[480px] h-[60px] px-[15px] py-[8px] sticky top-0">
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
      <div class="pt-0 px-[20px] pb-[130px] w-[480px] h-[632.75px] gap-y-5">
        <div>
          <p class="text-base">封面照片</p>
          <img
            src="https://chictirpstorageprod.blob.core.windows.net/system/166b42c7-fc3c-4708-ab2b-f9730bfd1b8a.jpg"
            alt=""
            class="w-full h-auto img-1 rounded-xl"
          />
        </div>
        <div>
          <p>行程名稱</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="幫行程取個名字吧"
            class="border-solid border-2 border-secondary-100 rounded-lg w-[436px] h-[40px] py-2 px-5"
          />
        </div>

        <div class="w-[480px]">
          <div>
            <p class="mb-2 font-bold">行程日期</p>
          </div>
          <div class="flex items-center gap-2">
      
            <input
              type="date"
              placeholder="出發日"
              class="border-solid border-2 border-secondary-100 rounded-lg w-[198px] h-[40px] py-2 px-5"
            />

  
            <span class="text-gray-500">到</span>

   
            <input
              type="date"
              placeholder="結束日"
              class="border-solid border-2 border-secondary-100 rounded-lg w-[198px] h-[40px] py-2 px-5"
            />
          </div>
        </div>
      </div>

      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<style></style>
