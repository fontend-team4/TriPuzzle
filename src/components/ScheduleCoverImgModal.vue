<script setup>
import { ref } from 'vue';
import { CheckIcon, XMarkIcon,} from "@heroicons/vue/24/solid";
import{PhotoIcon} from'@heroicons/vue/24/outline'

// 把圖片儲存成物件，讓其個別都有id，選中後不會相互影響
const imageStates = ref([
  { id: 1, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/166b42c7-fc3c-4708-ab2b-f9730bfd1b8a.jpg" },
  { id: 2, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/85cd9517-4fb3-4e98-874c-73d17803a94f.jpg" },
  { id: 3, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/8f8b5696-4619-48f9-9d1a-7f2b9168c208.jpg" },
  { id: 4, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/0a13c77b-1bef-4ddf-aa7c-e08a2ad0a35e.jpg" },
  { id: 5, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/3bb84de2-3875-42e3-a0c3-03954fd0f9fd.jpg" },
  { id: 6, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/7c67f30d-aad7-4165-a2b4-2825303693e5.jpg" },
  { id: 7, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/82b8fafd-d76b-43f1-b730-2739e55c527e.jpg" },
  { id: 8, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/7a661442-e00f-459d-aeb1-75d682b17551.jpg" },
  { id: 9, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/2bf62bfd-5bbd-47f1-9174-492c7218dcdf.jpg" },
  { id: 10, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/9899380f-153f-4384-be83-516b3b8a9b3c.jpg" },
  { id: 11, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/70bce556-122b-44bb-bc79-4eed6aa4265f.jpg" },
  { id: 12, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/be5380cd-da47-41d1-b38b-6d661b4b33d3.jpg" },
  { id: 13, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/ad39f04a-c396-4ec6-9d3d-fc66b12b4160.jpg" },
  { id: 14, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/33582d09-164f-45a2-bb29-44806de711d3.jpg" },
  { id: 15, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/91e5c1d2-81a3-4c47-9354-d8508c45766e.jpg" },
  { id: 16, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/81589db3-f900-481a-b03e-e9c079a9c42d.jpg" },
  { id: 17, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/18460b43-cc4b-43de-97b2-4b6820c44f1f.jpg" },
  { id: 18, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/adee7b7c-9206-4a73-9696-ddab50a165de.jpg" },
  { id: 19, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/87f0c114-3846-4163-b3bc-d5b292300bf2.jpg" },
  { id: 20, isClicked: false, src: "https://chictirpstorageprod.blob.core.windows.net/system/50ceeac1-5a85-41fd-875e-c5f955310a70.jpg" },
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
    onclick="select_img.showModal()"
  >
    <PhotoIcon class="w-[24px] h-[24px]" />
    <span class="text-[14px] truncate">從圖庫中挑選</span>
  </button>
<dialog id="select_img" class="modal">
  <div class="modal-box p-0 md:max-w-[800px] md:min-w-[728px] min-w-full max-h-full md:h-[740px] rounded-none md:rounded-xl">
    <div class="md:max-w-[800px] md:min-w-[728px] h-[60px] px-[15px] py-[8px] sticky top-0 bg-white rounded-xl relative z-10">
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
   <div class="h-[548.75px] relative overflow-hidden rounded-xl my-[50px] ">
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
    <div class="w-[100%] h-[80px] absolute bottom-0 sticky border-t-[1px] border-slate-200 py-[16px] px-[24px] bg-white z-20">
      <form method="dialog" class="flex gap-[12px]">
        <button
          class="w-[50%] h-[48px] border-[1px] border-primary-800 rounded-3xl text-primary-800 font-bold text-sm justify-center items-center px-[12px] py-[8px] hover:bg-primary-100"
        >
          取消
        </button>
        <button
          class="w-[50%] h-[48px] bg-primary-800 rounded-3xl text-white font-bold text-sm justify-center items-center px-[12px] py-[8px] hover:bg-primary-600">
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
