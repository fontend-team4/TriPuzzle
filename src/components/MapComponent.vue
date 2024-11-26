<script setup>
import{ MagnifyingGlassIcon, PuzzlePieceIcon } from "@heroicons/vue/24/outline";

</script>

<template>
  <!-- 地圖 -->
  <div class="w-screen h-screen bg-slate-100"></div>
  <!-- 搜尋此區域 -->
  <button class="bg-white inline-flex px-4 py-2 rounded-full shadow-lg fixed left-1/2 top-[100px] -translate-x-1/2 text-sm font-medium hover:bg-slate-100 transition-all duration-200 leading-6 active:bg-slate-300" >
    <MagnifyingGlassIcon class="mr-1 size-5 text-primary-400" />
    <p>搜尋此區域</p>
  </button>
  <!-- 地點卡片 -->
   <div class="absolute top-1/2 left-1/2">
    <div class="flex flex-col items-center justify-center group">
      <div class="flex flex-col items-center justify-center">
        <div class=" bg-white rounded-md p-[4px] items-center hidden group-hover:flex absolute -top-16 w-auto shadow-md">
          <div class="w-12 h-12 overflow-hidden rounded-md ">
            <img src="https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg" alt="" class=" aspect-square">
          </div>
          <p class="mx-2 font-semibold whitespace-nowrap">沙巴巴中東美食</p>
        </div>
      </div>
      <p class="absolute -top-5 z-10 mx-auto font-[400] text-primary-400 strokeText text-sm group-hover:hidden whitespace-nowrap">沙巴巴中東美食</p>
      <button class="inline-flex items-center justify-between bg-white rounded-full shadow-lg p-[2px]
      before:content-['▼'] before:absolute before:z-10 before:-bottom-3 before:text-white before:left-1/2 before:translate-x-[-50%]
      group-hover:bg-primary-400 group-hover:before:text-primary-400 group-hover:scale-125 transition-transform duration-100
      " >
        <div class="relative flex items-center w-6 h-6 mr-1 rounded-full bg-primary-400">
          <PuzzlePieceIcon class="absolute mr-1 text-white size-5 left-[1px]"/>
        </div>
        <p class="mr-1 group-hover:text-white">4.2</p>
      </button>
    </div>
   </div>



</template>

<style scoped>
.strokeText::before{
  position: absolute;
  content: "沙巴巴中東美食";
  -webkit-text-stroke: 2px #ffffff;
  z-index: -1;
  filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.25));
}

img{
  object-fit: cover
}
</style>