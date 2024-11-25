<script setup>
import { ref } from "vue";
import { PlusCircleIcon } from "@heroicons/vue/24/solid";
import ScheduleCoverImgModal from "./ScheduleCoverImgModal.vue";
import { XMarkIcon,ArrowLongRightIcon,PencilIcon,ArrowUpTrayIcon,ChevronDownIcon } from "@heroicons/vue/24/solid";

const replaceImgLabelClick = () => {
  // 點擊收回下拉式選單(再點擊一次)
  document.getElementById("dropdown-toggle").click();
};

//點選選擇交通方式紅框
const isChecked = ref(false);
const transportationLabelClick = () => {
  const checkbox = document.getElementById("toggle-transportation");
  if (checkbox) {
    checkbox.checked = !checkbox.checked; // 切換 checked 狀態
    isChecked.value = checkbox.checked; // 更新 Vue 狀態
  }
};

const closeDropdown = () => {
  isChecked.value = false; // 收起選單
};
</script>

<template>
              <!-- 按這裡要去NewScheduleModal的Modal -->
              <!-- <div class="">
                <button class="">
                  
                </button>
              </div> -->
              
              <button class="btn p-0 border-white bg-white flex mt-[1rem] shadow-none hover:bg-white hover:border-white  group" onclick="my_modal_2.showModal()"><PlusCircleIcon  class="size-5 fill-primary-500 mr-[0.5rem] mt-[0.1rem]" />
                <p class= "group-hover:text-primary-500 text-black text-md text-bold ">建立新行程</p></button>
              
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box p-0 w-[480px] bg-white ">
      <div class="w-[480px] h-[30px] px-[15px] py-[8px] sticky top-0 bg-white">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </form>
      </div>

      <div>
        <header>
          <span class="mb-[0.5rem] text-2xl font-bold flex items-center justify-center text-[#494949]">行程設定</span>
        </header>
      </div>

      <!-- 主內容區塊 -->
      <div class="pt-0 px-[20px] pb-[50px] w-[480px] h-[552.75px] flex flex-col gap-[20px] relative">
        <!-- 封面照片 -->
        <div class="relative">
          <p class="font-bold">封面照片</p>
          <!-- 隱藏的 Checkbox -->
          <input type="checkbox" id="dropdown-toggle" class="hidden peer" />

          <!-- 使用 Label 包裹按鈕 -->
          <label
            for="dropdown-toggle" class="w-[82px] h-[32px] absolute right-[20px] bottom-[16px] z-10 flex items-center justify-center gap-2 border-[1px] border-white hover:border-secondary-300 rounded-3xl py-[4px] px-[12px] cursor-pointer group">
            <PencilIcon class="size-4 font-bold text-white group-hover:text-secondary-300" />
            <p class="font-bold text-sm text-white  group-hover:text-secondary-300">更換</p>
          </label>

          <!-- 下拉選單(插入更換圖片modal) -->
          <ul class="font-bold replace-img-btn absolute right-0 top-full mt-[-0.5rem] w-[153px] h-[60px] bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out max-h-0 overflow-hidden opacity-0 peer-checked:max-h-[150px] peer-checked:opacity-100 z-10" @click="replaceImgLabelClick">
              <ScheduleCoverImgModal/>
              <!-- <label
                for="dropdown-toggle"
                class="flex items-center cursor-pointer w-full"
              @click="replaceImgLabelClick">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-[24px] h-[24px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <span class="pl-[5px] text-[14px] ">從圖庫中挑選</span>
              </label> -->
            
            <li class="h-[50%] px-[20px] pt-[1rem] hover:bg-gray-100 cursor-pointer border-t-[1px]  border-slate-200">
              <label
                for="file-upload"
               @click="replaceImgLabelClick"
                class="flex items-center cursor-pointer w-full \">
                <ArrowUpTrayIcon class="w-[24px] h-[24px]"/>
                <span class="pl-[5px] text-[14px]">上傳照片</span>
              </label>
              <input id="file-upload" type="file" class="hidden"/>
            </li>
          </ul>

          <div class="relative w-full h-auto rounded-xl overflow-hidden">
            <img
              src="https://chictirpstorageprod.blob.core.windows.net/system/166b42c7-fc3c-4708-ab2b-f9730bfd1b8a.jpg"
              alt="封面照片"
              class="w-full h-full object-cover "/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
          </div>
        </div>

        <!-- 行程名稱 -->
        <div>
          <p class="mb-2 font-bold text-[#494949]">行程名稱</p>
          <input
            type="text"
            placeholder="幫行程取個名字吧"
            class="border-[1px] border-[#cdcdcd] bg-[#f4f4f4] rounded-lg w-[100%] h-[40px] py-2 px-5"/>
        </div>

        <!-- 行程日期 -->
        <div class="w-[100%]">
          <div>
            <p class="mb-2 font-bold text-[#494949]">行程日期</p>
          </div>
          <div class="flex justify-between items-center">
            <input
              type="date"
              placeholder="出發日"
              class="border-solid border  border-primary-100 rounded-lg w-[198px] h-[40px] py-2 px-5"
            />
            <span>
                <ArrowLongRightIcon class="size-5 text-primary-400"/>             
            </span>
            <input
              type="date"
              placeholder="結束日"
              class="border-solid border border-primary-100 rounded-lg w-[198px] h-[40px] py-2 px-5"/>
          </div>
        </div>

        <!-- 主要交通方式 -->

        <div>
          <p class="mb-2 font-bold text-[#494949]">主要交通方式</p>
          <div
            class="relative w-[100%] h-[40px] border-[1px] border-[#cdcdcd] bg-[#f4f4f4] rounded-lg px-[20px] py-[8px] flex items-center justify-between cursor-pointer"
            :class="{ 'red-frame': isChecked }"
            @click="transportationLabelClick">
            <span>自訂</span>
            <input type="checkbox" id="toggle-transportation" class="hidden " />
            <label for="toggle-transportation" class="cursor-pointer">                
                <ChevronDownIcon class="w-5 h-5 transition-transform"/>
            </label>
            <!-- hover透過script綁定邏輯 -->
            <transition
              name="fade-slide">
              <ul
                class="h-[212px] transportation-area absolute left-0 bottom-[50px] mb-1 w-full bg-white shadow-lg flex-col gap-[5px] py-[5px] rounded-lg transition-all duration-200 ease-in-out"
                :class="{
                  'opacity-100 translate-y-0': isChecked,
                  'opacity-0 translate-y-[20px]': !isChecked,
                }"
                v-show="isChecked">
                <li class="px-4 py-2 cursor-pointer h-[40px] text-[#494949] " @click="closeDropdown">走路</li>
                <li class="px-4 py-2 cursor-pointer h-[40px] text-[#494949]" @click="closeDropdown">汽車</li>
                <li class="px-4 py-2 cursor-pointer h-[40px] text-[#494949]" @click="closeDropdown">大眾運輸</li>
                <li class="px-4 py-2 cursor-pointer h-[40px] text-[#494949]" @click="closeDropdown">機車</li>
                <li class="px-4 py-2 cursor-pointer bg-primary-300 text-primary-800 font-bold" @click="closeDropdown">自訂</li>
              </ul>
            </transition>
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="w-[100%] h-[80px] absolute bottom-0 sticky border-t-[1px] border-slate-200 py-[16px] px-[24px] z-20">
        <form method="dialog" class="flex gap-[12px]">
          <button class="w-[50%] h-[48px] border-[1px] border-primary-500 rounded-3xl text-primary-500 font-bold text-sm justify-center items-center px-[12px] py-[8px]">
            取消
          </button>
          <button class="w-[50%] h-[48px] bg-primary-500 rounded-3xl text-white font-bold text-sm justify-center items-center px-[12px] py-[8px]">
            完成
          </button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>