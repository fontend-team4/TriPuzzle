<script setup>
import { ListBulletIcon, XMarkIcon, StarIcon, MapPinIcon } from "@heroicons/vue/24/solid";
import fakeLocation from "../../fakeLocation.json";
import { ref, onMounted } from "vue"

const fakeLocations = ref([]);
const items = ref([]);

const initializeItems = () => {
  items.value = fakeLocation.map((location) => ({
    id: location.id,
    url: location.image,
    title: location.name,
    rating: location.rating.toString(),
    location: location.city,
    mapUrl: location.google_map,
  }));
};

onMounted(() => {
  fakeLocations.value = fakeLocation;
  initializeItems(); // 初始化 items
});


const sideToggle = (item) => {
  console.log(123);
};


</script>



<template>
  <input type="checkbox" id="side-checkbox">
  <div class="w-full h-screen bg-gray"></div>
      <!-- 漢堡選單，點開後漢堡選單消失
    彈出熱門景點選單，上排fix下排內容
    RWD，sm的時候漢堡選單直接消失，查看地圖toggle會飄到下面-->
<!-- 漢堡 -->
  <button 
  class="fixed flex items-center w-12 h-12 px-2 transition-all duration-300 rounded-full bg-gray top-24 left-20 group hover:w-32">
  <div class="flex-shrink-0">
    <ListBulletIcon class="size-8" />
  </div>
  <span
    class="px-0 ml-2 overflow-hidden transition-all duration-300 opacity-0 whitespace-nowrap max-w-0 group-hover:opacity-100 group-hover:max-w-xs "
  >
    顯示清單
  </span>
</button>
<!-- 側欄 -->
<div class="fixed left-0 h-full w-96 ">
  <div class="w-96 h-[calc(100vh-72px)] bg-white fixed bottom-0 left-0 rounded-tr-3xl  ">
    <div class="z-20 flex items-center justify-between w-full p-4 bg-white rounded-tr-3xl ">
      <div>
        <ul class="h-6 p-0 text-gray-700 menu menu-horizontal rounded-box hover:bg-transparent">
        <li>
    <details >
      <summary class=" hover:bg-transparent active:bg-transparent active:text-gray-700">熱門景點</summary>
      <ul class="z-50 !p-0 !w-50 rounded-md !mt-1 overflow-hidden">
        <li><a class="rounded-none hover:bg-primary-200" >熱門景點</a></li>
        <li><a class="rounded-none hover:bg-primary-200" >熱門貼文</a></li>
      </ul>
    </details>
  </li>
      </ul>
      </div>
      <label for="side-checkbox" class="flex items-center justify-center w-6 h-6 rounded-full cursor-pointer bg-gray tooltip" data-tip="隱藏清單" @click.prevent="sideToggle()" >
        <XMarkIcon class="size-5"/>
      </label>
    </div>
    <div class="w-full h-full px-5 overflow-auto">
    <ul class="w-full h-full">
      <!-- 每個地點 -->
      <li v-for="item in fakeLocations" class="w-full mb-3 transition-colors rounded-md p1 bg-gray hover:bg-primary-100">
        <figure class="flex p-1 group ">
          <div class="w-40 h-40 overflow-hidden rounded-md">
            <img :src="item.image" alt="" class=" aspect-square">
          </div>
          <div class="pt-3  pl-4 pr-3 w-[176px]">
            <h3 class="font-bold">{{item.name}}</h3>
            <p class="flex items-center gap-1 text-sm leading-6"><StarIcon class="size-4 text-secondary-500"/>{{ item.rating }}</p>
            <p class="text-sm leading-6">加入行程<span class="px-1">47</span>次</p>
            <div class="inline-flex items-center justify-between w-full text-sm duration-300 opacity-0 group-hover:opacity-100">
              <div>加入景點</div>
              <a :href="item.google_map" ><MapPinIcon class="text-gray-500 size-5" /></a>
            </div>
          </div>
        </figure>
      </li>
    </ul>
  </div>
  </div>
</div>
</template>

<style scoped>
img{
  object-fit: cover;
}
</style>