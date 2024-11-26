<script setup>
import DetailCarousel from './DetailCarousel.vue';
import { CalendarIcon, ClockIcon, PhoneIcon, GlobeAltIcon, MapPinIcon, MagnifyingGlassIcon, HeartIcon, ShareIcon ,PaperAirplaneIcon, XMarkIcon, PhotoIcon } from "@heroicons/vue/24/outline";
import { StarIcon } from "@heroicons/vue/24/solid";

// 愛心顏色的切換可參考PlacesComponent，為避免重複同樣功能這邊就不放了，之後可統一做移動到stores去

</script>

<template>
  
  <div class="w-screen h-screen p-0 m-0 bg-black md:pt-[15vh] bg-opacity-25">
    <div class=" h-full md:h-[calc(100vh-160px)] lg:max-w-[1032px]  lg:mb-[50px] mx-0 md:mx-auto lg:mx-auto bg-white md:flex md:rounded-md overflow-hidden ">
      <div class="bg-black md:w-[calc(100%-368px)] h-[360px] md:h-full md:overflow-hidden flex justify-center relative ">
        <!--輪播圖  -->
        <DetailCarousel />
        <div class="absolute flex gap-1 bg-gray-100 py-[3px] px-2.5 rounded-full top-4 right-16 h-[32px] text-sm items-center bg-opacity-75"><PhotoIcon class="size-5"/>3</div>
        <div class="absolute flex gap-1 bg-gray-100 py-[3px] px-2.5 rounded-full top-4 right-5 h-[32px] w-[32px] text-sm items-center bg-opacity-75"><XMarkIcon class="absolute right-1 size-5 -translate-x-[2px] "/></div>
      </div>
      <div class="relative px-5 py-5 md:py-16  md:w-[368px] flex flex-wrap flex-col gap-2.5  ">
        <h2 class="text-xl font-medium">機場捷運泰山站</h2>
        <div class="flex ">
          <div class="inline-flex items-center gap-1 pr-3 text-sm align-middle border-r-2 ">Google 評價
            <StarIcon  class="text-yellow-400 size-4"/>
            <span class="text-yellow-400">4.5</span>
            (<span class="underline">34</span>)
            
          </div>
          <div class="inline-flex gap-1 pl-3 pr-3 text-sm align-middle">加入行程<span>45</span>次</div>
        </div>
        <div class="flex pt-2.5 pb-3.5 border-b-slate-200 border-b-[1px]">
          <MapPinIcon class="size-5"/>
          <p class="pl-10 text-sm">台灣 北部</p>
        </div>
        <div class="flex pt-2.5 pb-3.5 border-b-slate-200 border-b-[1px]">
          <CalendarIcon class="size-5"/>
          <p class="pl-10 text-sm">簡介</p>
        </div>
        <div class="flex pt-2.5 pb-3.5 border-b-slate-200 border-b-[1px]">
          <PhoneIcon class="size-5"/>
          <p class="pl-10 text-sm">09001122233</p>
        </div>
        <div class="flex pt-2.5 pb-3.5  border-b-slate-200 border-b-[1px]">
          <MagnifyingGlassIcon class="size-5"/>
          <div class="inline-flex items-center gap-1 pl-10 text-sm">
            <div class="pr-3.5">Google</div>
            <div><button class="px-4 py-1 rounded-full bg-gray">評論</button></div>
            <div><button class="px-4 py-1 rounded-full bg-gray">照片</button></div>
            <div><button class="px-4 py-1 rounded-full bg-gray">文章</button></div>
          </div>
        </div>
        <div class="flex pt-2.5 pb-3.5 border-b-slate-200 border-b-[1px]">
          <GlobeAltIcon class="size-5"/>
          <p class="pl-10 text-sm">網址</p>
        </div>
        <div class="flex pt-2.5 pb-3.5 flex-wrap">
          <ClockIcon class="size-5"/>
          <div class="pl-10 mb-1 text-sm"><span class="mr-2">星期一</span><span class="ml-5">00:00-24:00</span></div>
          <div class="pl-10 ml-5 text-sm leading-7"><span >星期二</span><span class="ml-7">00:00-24:00</span></div>
          <div class="pl-10 ml-5 text-sm leading-7"><span >星期三</span><span class="ml-7">00:00-24:00</span></div>
          <div class="pl-10 ml-5 text-sm leading-7"><span >星期四</span><span class="ml-7">00:00-24:00</span></div>
          <div class="pl-10 ml-5 text-sm leading-7"><span >星期五</span><span class="ml-7">00:00-24:00</span></div>
        </div>
      <button class="absolute top-3.5 right-3.5 hidden md:block"><XMarkIcon class="size-6"/></button>
      <div class="fixed md:absolute bottom-0 left-0 w-full h-[50px] border-t-2 border-t-gray inline-flex items-center justify-between px-2">
        <div class="inline-flex items-center gap-2 ">
          <div class="tooltip" data-tip="分享"><ShareIcon class="cursor-pointer size-6"/></div>
          <div class="tooltip" data-tip="加到最愛"><HeartIcon class="cursor-pointer size-6"/></div>
          <div class="tooltip" data-tip="導航"><PaperAirplaneIcon class="cursor-pointer size-6" /></div>
        </div>
        <div>加入行程按鈕</div>
      </div>
    </div>
    </div>

  </div>
</template>

<style>
img{
  object-fit: contain;
}

@keyframes slide {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

</style>