<script setup>
import { ref } from 'vue';

const isClicked=ref(false)

function clickImg(){
  isClicked.value=!isClicked.value
}
</script>

<template>
  <div class="max-w-[800px] bg-whiterounded-xl " >
    <div class="max-w-[800px] h-[60px] px-[15px] py-[8px] sticky top-0 bg-white rounded-xl relative">
      <form method="dialog ">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 flex justify-center item-center">
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
        <span class="w-[100%] h-[36px] mb-[16px] text-2xl font-bold flex items-center justify-center">選擇行程封面</span>
      </header>
    </div>

    <!-- 主內容區塊 -->
   <div class="max-w-[800px] h-[548.75px] relative overflow-hidden rounded-xl my-[50px]">
    <div class="py-0 px-[24px] absolute inset-0 flex flex-wrap gap-[12px] overflow-y-auto">

      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/166b42c7-fc3c-4708-ab2b-f9730bfd1b8a.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/85cd9517-4fb3-4e98-874c-73d17803a94f.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/8f8b5696-4619-48f9-9d1a-7f2b9168c208.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/0a13c77b-1bef-4ddf-aa7c-e08a2ad0a35e.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/3bb84de2-3875-42e3-a0c3-03954fd0f9fd.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/7c67f30d-aad7-4165-a2b4-2825303693e5.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/82b8fafd-d76b-43f1-b730-2739e55c527e.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/7a661442-e00f-459d-aeb1-75d682b17551.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/2bf62bfd-5bbd-47f1-9174-492c7218dcdf.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/9899380f-153f-4384-be83-516b3b8a9b3c.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/70bce556-122b-44bb-bc79-4eed6aa4265f.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/be5380cd-da47-41d1-b38b-6d661b4b33d3.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/ad39f04a-c396-4ec6-9d3d-fc66b12b4160.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <div class="cursor-pointer w-[calc(33.33%-8px)] overflow-hidden relative group p-[1px]" @click="clickImg">
        <img src="https://chictirpstorageprod.blob.core.windows.net/system/33582d09-164f-45a2-bb29-44806de711d3.jpg" alt="" class="w-full h-auto rounded-xl" />
        <div class="absolute inset-0 bg-[#2d4057] opacity-0 transition-opacity duration-200 group-hover:opacity-15 rounded-xl" ></div>
        <div class="absolute inset-0 bg-[#2d4057] duration-200 opacity-30 rounded-xl" v-show="isClicked"  ></div>
        <div class="absolute top-[13px] left-[13px] w-[22px] h-[22px] rounded-full bg-[#D23430] z-10" v-show="isClicked"></div>
        <div class="absolute inset-0 w-full h-full rounded-xl " :class="{'red-frame':isClicked}"></div>
        <label class="absolute top-3 left-3 w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white/30 border-[1px] border-white cursor-pointer">
          <input type="checkbox" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[14px] h-[14px] text-white font-bold z-10" v-show="isClicked">  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>   
        </label>      
      </div>
      <!-- 其他圖片用v-for顯示 -->
      </div>
    </div >

    <!-- footer -->
    <div class="w-[100%] h-[80px] absolute bottom-0 sticky border-t-[1px] border-slate-200 py-[16px] px-[24px] bg-white z-20">
      <form method="dialog" class="flex gap-[12px]">
        <button
          class="w-[50%] h-[48px] border-[1px] border-primary-800 rounded-3xl text-primary-800 font-bold text-sm justify-center items-center px-[12px] py-[8px]"
        >
          取消
        </button>
        <button
          class="w-[50%] h-[48px] bg-primary-800 rounded-3xl text-white font-bold text-sm justify-center items-center px-[12px] py-[8px]">
          完成
        </button>
      </form>
    </div>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</template>

<style>
.red-frame {
	border-width: 1px solid;
  border-color: #d23430;
  box-shadow: 0 0 4px rgba(210, 52, 48, 0.5),
    /* 內層的陰影 */ 0 0 8px rgba(210, 52, 48, 0.3),
    /* 中間的陰影 */ 0 0 16px rgba(210, 52, 48, 0.1); /* 外層的陰影 */
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}
</style>
