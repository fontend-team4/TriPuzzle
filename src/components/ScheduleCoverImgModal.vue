<script setup>
import { ref } from 'vue';
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import{ PhotoIcon } from'@heroicons/vue/24/outline'
import coverimage1 from "../assets/images/coverimage-1.jpg"
import coverimage2 from "../assets/images/coverimage-2.jpg"
import coverimage3 from "../assets/images/coverimage-3.jpg"
import coverimage4 from "../assets/images/coverimage-4.jpg"
import coverimage5 from "../assets/images/coverimage-5.jpg"
import coverimage6 from "../assets/images/coverimage-6.jpg"
import coverimage7 from "../assets/images/coverimage-7.jpg"
import coverimage8 from "../assets/images/coverimage-8.jpg"
import coverimage9 from "../assets/images/coverimage-9.jpg"


// 把圖片儲存成物件，讓其個別都有id，選中後不會相互影響
const imageStates = ref([
  { id: 1, isClicked: false, src: coverimage1 },
  { id: 2, isClicked: false, src: coverimage2 },
  { id: 3, isClicked: false, src: coverimage3 },
  { id: 4, isClicked: false, src: coverimage4 },
  { id: 5, isClicked: false, src: coverimage5 },
  { id: 6, isClicked: false, src: coverimage6 },
  { id: 7, isClicked: false, src: coverimage7 },
  { id: 8, isClicked: false, src: coverimage8 },
  { id: 9, isClicked: false, src: coverimage9 },
]);


// 取消所有其他圖片的選中狀態
function selectImg(clickedItem) {
  imageStates.value.forEach(item => {
    if (item.id !== clickedItem.id) {
      item.isClicked = false;
    }
  });

  clickedItem.isClicked = true
}
</script>

<template>


<button
  class="flex items-center justify-start w-full  gap-[5px] hover:bg-gray-100 transition "
  onclick="select_img.showModal()">
  <PhotoIcon class="w-[24px] h-[24px]" />
  <span class="text-[14px] truncate">從圖庫中挑選</span>
</button>
<dialog id="select_img" class="modal">
  <div class="modal-box p-0 md:max-w-[800px] md:min-w-[728px] min-w-full max-h-full md:h-[600px] rounded-none md:rounded-xl">
    <div class="md:max-w-[800px] md:min-w-[728px] h-[60px] px-[15px] py-[8px] sticky top-0 bg-white rounded-xl z-10">
      <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><XMarkIcon class="w-6 h-6" /></button>
    </form>
    </div>
    <div>
      <header>
        <span class="w-[100%] h-[36px] mb-[16px] text-2xl font-bold flex items-center justify-center ">選擇行程封面</span>
      </header>
    </div>

    <!-- 主內容區塊 -->
  <div class="h-[360px] relative overflow-hidden rounded-xl my-[50px] ">
    <div class="py-0 px-[24px] absolute inset-0 flex flex-wrap gap-[12px] overflow-y-auto">
      <div class="lg:w-[calc(33.33%-8px)] md:w-[calc(50%-8px)] sm:w-[calc(100%-8px)] overflow-hidden relative group p-[1px] cursor-pointer" @click="selectImg(item)" v-for="(item, index) in imageStates" :key="item.id">
        <img :src="item.src" alt="" class="w-full h-auto rounded-xl " />
        <!-- 圖片hover反灰 -->
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <!-- 圖片點擊變灰 -->
        <div class="absolute inset-0 bg-[#2d4057] transition-all duration-300 opacity-0 rounded-xl" :class="{ 'opacity-30': item.isClicked }"  ></div>
        <!-- 圖片點擊後紅色填滿checkbox -->
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] transition-all duration-300 opacity-0 z-10":class="{ 'opacity-100': item.isClicked }"></div>
        <!-- 圖片點擊後外框變紅 -->
        <div class="absolute inset-0 w-full h-full rounded-xl" :class="{'border-[1px] border-[#d23430] shadow-[0_0_16px_rgba(210,52,48,0.1)] transition-all ease-in-out duration-300': item.isClicked}"></div>        
        <!-- 圖片點擊後打勾 -->
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white " >
          <CheckIcon  class="w-[14px] h-[14px] text-white font-bold transition-all duration-300 opacity-0 scale-0  z-10" :class="{ 'opacity-100 scale-100 ': item.isClicked }"/>  
        </label>      
      </div>

      </div>
    </div >

    <!-- footer -->
    <div class="w-[100%] h-[80px] bottom-0 sticky border-t-[1px] border-slate-200 py-[16px] px-[24px] bg-white z-20">
      <form method="dialog" class="flex gap-[12px]">
        <button
          class="w-[50%] h-[48px] border-[1px] border-primary-600 rounded-3xl text-primary-600 font-bold text-sm justify-center items-center px-[12px] py-[8px] hover:bg-primary-100"
        >
          取消
        </button>
        <button
          class="w-[50%] h-[48px] bg-primary-600 rounded-3xl text-white font-bold text-sm justify-center items-center px-[12px] py-[8px] hover:bg-primary-700">
          完成
        </button>
      </form>
    </div>


  </div>
  <form method="dialog" class="modal-backdrop">
    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    <button>close</button>
  </form>
</dialog>

</template>
