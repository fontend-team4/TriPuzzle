<script setup>
import ScheduleCoverImgModal from "./ScheduleCoverImgModal.vue";
import { ref } from "vue";
import { XMarkIcon,PencilSquareIcon,ArrowLongRightIcon,PencilIcon,ArrowUpTrayIcon,ChevronDownIcon } from "@heroicons/vue/24/solid";
import{PhotoIcon} from'@heroicons/vue/24/outline'




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
  <button class="w-full h-12 px-5 py-3 bg-red-800 text-white text-center text-base rounded-3xl" onclick="my_modal_2.showModal()">建立新行程
    </button>
  <dialog id="my_modal_2" class="modal ">
    <div class="modal-box p-0 w-full md:max-w-[480px] sm:max-w-[100%] sm:max-h-[100%] max-md:rounded-none ">
      <div class="max-w-[480px] md:max-w-[480px] sm:max-w-[100%] h-[60px] px-[15px] py-[8px] sticky top-0 bg-white relative ">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </form>
      </div>

      <div>
        <header>
          <span class="text-2xl font-bold flex items-center justify-center">行程設定</span>
        </header>
      </div>

      <!-- 主內容區塊 -->
      <div class="pt-0 px-[20px] pb-[50px] max-w-[480px] md:max-w-[480px] sm:max-w-[100%] md:max-h-[552.75px] sm:max-h-[100%] flex flex-col gap-[20px] relative">
        <!-- 封面照片 -->
        <div class="relative">
          <p class="font-bold mb-[5px]">封面照片</p>
          <!-- 隱藏的 Checkbox -->
          <input type="checkbox" id="dropdown-toggle" class="hidden peer" />

          <!-- 使用 Label 包裹按鈕 -->
          <label
            for="dropdown-toggle" class="w-[82px] h-[32px] absolute right-[20px] bottom-[16px] z-10 flex items-center justify-center gap-2 border-[1px] border-white rounded-3xl py-[4px] px-[12px] cursor-pointer">
            <PencilIcon class="size-5 font-bold text-white" />
            <p class="font-bold text-sm text-white">更換</p>
          </label>

          <!-- 下拉選單(插入更換圖片modal) -->
          <ul class="font-bold replace-img-btn absolute right-0 top-full mt-2 w-[153px] h-[80px] bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out max-h-0 overflow-hidden opacity-0 peer-checked:max-h-[150px] peer-checked:opacity-100 z-10" @click="replaceImgLabelClick">
            <li class="h-[50%] px-[20px] py-[8px] hover:bg-gray-100 cursor-pointer flex items-center" >
              <ScheduleCoverImgModal />
            </li>

            <label for="file-upload" @click="replaceImgLabelClick" class="cursor-pointer w-full">
            <li class="h-[50%] px-[20px] py-[8px] hover:bg-gray-100 cursor-pointer flex items-center border-t-[1px] border-slate-200">
                <ArrowUpTrayIcon class="w-[24px] h-[24px]"/>
                <span class="pl-[5px] text-[14px]">上傳照片</span>
                <input id="file-upload" type="file" class="hidden"/>
            </li>
            </label>
          </ul>

          <div class="relative w-full h-auto rounded-xl overflow-hidden">
            <img
              src="https://chictirpstorageprod.blob.core.windows.net/system/166b42c7-fc3c-4708-ab2b-f9730bfd1b8a.jpg"
              alt="封面照片"
              class="w-full h-full object-cover"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
          </div>
        </div>

        <!-- 行程名稱 -->
        <div>
          <p class="mb-2 font-bold">行程名稱</p>
          <input
            type="text"
            placeholder="幫行程取個名字吧"
            class="border-solid border border-[#EEEEEE] rounded-lg w-[100%] h-[40px] py-2 px-5"/>
        </div>

        <!-- 行程日期 -->
        <div class="w-[100%]">
          <div>
            <p class="mb-2 font-bold">行程日期</p>
          </div>
          <div class="flex flex-erap gap-[20px] justify-between items-center ">
            <input
              type="date"
              placeholder="出發日"
              class="border-solid border border-[#EEEEEE] rounded-lg w-[calc(50%-20px)] h-[40px] py-2 px-5"
            />
            <span>
                <ArrowLongRightIcon class="size-5 text-stone-400"/>             
            </span>
            <input
              type="date"
              placeholder="結束日"
              class="border-solid border border-[#EEEEEE] rounded-lg w-[calc(50%-20px)] h-[40px] py-2 px-5"/>
          </div>
        </div>

        <!-- 主要交通方式 -->

        <div>
          <p class="mb-2 font-bold">主要交通方式</p>
          <div
            class="relative w-[100%] h-[40px] border border-[#EEEEEE] rounded-lg px-[20px] py-[8px] flex items-center justify-between cursor-pointer"
            :class="{ 'red-frame': isChecked }"
            @click="transportationLabelClick">
            <span>自訂</span>
            <input type="checkbox" id="toggle-transportation" class="hidden" />
            <label for="toggle-transportation" class="cursor-pointer">                
                <ChevronDownIcon class="w-5 h-5 transition-transform"/>
            </label>
            <!-- 選定透過script綁定邏輯 -->
            <transition name="fade-slide">
              <ul
                v-show="isChecked"
                class="h-[212px] transportation-area absolute left-0 bottom-[50px] mb-1 w-full bg-white shadow-lg flex-col gap-[5px] py-[5px] rounded-lg ">
                <li class="px-4 py-2 cursor-pointer h-[40px]" @click="closeDropdown">走路</li>
                <li class="px-4 py-2 cursor-pointer h-[40px]" @click="closeDropdown">汽車</li>
                <li class="px-4 py-2 cursor-pointer h-[40px]" @click="closeDropdown">大眾運輸</li>
                <li class="px-4 py-2 cursor-pointer h-[40px]" @click="closeDropdown">機車</li>
                <li class="px-4 py-2 cursor-pointer bg-primary-300 text-primary-800 font-bold" @click="closeDropdown">自訂</li>
              </ul>
            </transition>           
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="w-[100%] h-[80px] absolute bottom-0 sticky border-t-[1px] border-slate-200 py-[16px] px-[24px] z-20">
        <form method="dialog" class="flex gap-[12px]">
          <button class="w-[50%] h-[48px] border-[1px] border-primary-800 rounded-3xl text-primary-800 font-bold text-sm justify-center items-center px-[12px] py-[8px] hover:bg-primary-100">
            取消
          </button>
          <button class="w-[50%] h-[48px] bg-primary-800 rounded-3xl text-white font-bold text-sm justify-center items-center px-[12px] py-[8px] hover:bg-primary-600">
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

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* 圖標旋轉 */
#toggle-transportation:checked + label svg {
  transform: rotate(180deg);
}

.transportation-area li:hover,
.replace-img-btn li:hover {
  background-color: #EEEEEE;
}
input {
  border: 2px solid transparent;
  border-radius: 4px;
  outline: none;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

input:focus {
  border-color: #d23430;
  box-shadow: 0 0 4px rgba(210, 52, 48, 0.5),
    /* 內層的陰影 */ 0 0 8px rgba(210, 52, 48, 0.3),
    /* 中間的陰影 */ 0 0 16px rgba(210, 52, 48, 0.1); /* 外層的陰影 */
}

.red-frame {
  border-color: #d23430;
  box-shadow: 0 0 4px rgba(210, 52, 48, 0.5),
    /* 內層的陰影 */ 0 0 8px rgba(210, 52, 48, 0.3),
    /* 中間的陰影 */ 0 0 16px rgba(210, 52, 48, 0.1); /* 外層的陰影 */
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

</style>
