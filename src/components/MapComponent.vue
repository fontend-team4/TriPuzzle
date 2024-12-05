<script setup>
import { ref, onMounted } from 'vue'
import{ MagnifyingGlassIcon, PuzzlePieceIcon } from "@heroicons/vue/24/outline";
import PlacesModal from '@/components/PlacesModal.vue';

const map = ref(null)
// 預設經緯度在信義區附近
const lat = ref(24.998564)
const lng = ref(121.576222)

// 建立地圖
const initMap = () => {
  // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
  map.value = new google.maps.Map(document.getElementById("map"), {
    // 設定地圖的中心點經緯度位置
    center: { lat: lat.value, lng: lng.value },
    // 設定地圖縮放比例 0-20
    zoom: 15,
    // 限制使用者能縮放地圖的最大比例
    maxZoom: 20,
    // 限制使用者能縮放地圖的最小比例
    minZoom: 3,
    // 設定是否呈現右下角街景小人
    streetViewControl: false,
    // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
    mapTypeControl: false
  });
}
// 建立地標
const setMarker = () => {
  // 建立一個新地標
  const marker = new google.maps.Marker({
    // 設定地標的座標
    position: { lat: lat.value, lng: lng.value },
    // 設定地標要放在哪一個地圖
    map: map.value
  });
  // 透過 InfoWindow 物件建構子建立新訊息視窗
  const infowindow = new google.maps.InfoWindow({
    // 設定想要顯示的內容
    content: `
      <div id="content" class="w-96">
        <p id="firstHeading" class="firstHeading p-4">台北市立動物園動物區</p>
      </div>
    `,
    // 設定訊息視窗最大寬度
    maxWidth: 200
  });
  // 在地標上監聽點擊事件
  marker.addListener("click", () => {
    // 指定在哪個地圖和地標上開啟訊息視窗
    infowindow.open(map.value, marker);
  });
}

onMounted(() => {
  initMap();
  // setMarker();
})

</script>

<template>
  <!-- 地圖 -->
  <div class="google-map min-w-screen h-screen" id="map"></div>
  <!-- 搜尋此區域 -->
  <button class="bg-white inline-flex px-4 py-2 rounded-full shadow-lg fixed left-1/2 top-[100px] -translate-x-1/2 text-sm font-medium hover:bg-slate-100 transition-all duration-200 leading-6 active:bg-slate-300" >
    <MagnifyingGlassIcon class="mr-1 size-5 text-primary-400" />
    <p>搜尋此區域</p>
  </button>
  <!-- 地點卡片 -->
  <div class="absolute top-1/2 left-1/2">
    <div class="flex flex-col items-center justify-center group">
      <div class="flex flex-col items-center justify-center">
        <div class=" bg-white rounded-md p-[4px] items-center hidden group-hover:flex absolute top-16 w-auto shadow-md">
          <div class="w-12 h-12 overflow-hidden rounded-md ">
            <img src="https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg" alt="" class=" aspect-square">
          </div>
          <p class="mx-2 font-semibold whitespace-nowrap">沙巴巴中東美食</p>
        </div>
      </div>
      <p class="absolute -top-5 mx-auto font-[400] text-primary-400 strokeText text-sm group-hover:hidden whitespace-nowrap">沙巴巴中東美食</p>
      <button class="inline-flex items-center justify-between bg-white rounded-full shadow-lg p-[2px]
      before:content-['▼'] before:absolute before:z-1 before:-bottom-3 before:text-white before:left-1/2 before:translate-x-[-50%]
      group-hover:bg-primary-400 group-hover:before:text-primary-400 group-hover:scale-125 transition-transform duration-100
      " >
        <div class="relative flex items-center w-6 h-6 mr-1 rounded-full bg-primary-400">
          <PuzzlePieceIcon class="absolute mr-1 text-white size-5 left-[1px]"/>
        </div>
        <p class="mr-1 group-hover:text-white">4.2</p>
      </button>
    </div>
  </div>
  <PlacesModal class="hidden md:block  "/>
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