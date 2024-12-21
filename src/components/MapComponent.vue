<script setup>
import { ref, onMounted, watch, nextTick, shallowRef, toRaw } from 'vue'
import {
  MagnifyingGlassIcon,
  PuzzlePieceIcon,
  MapPinIcon,
} from '@heroicons/vue/24/outline'
import PlacesModal from '@/components/PlacesModal.vue'
import { usePlacesStore } from '@/stores/fetchPlaces'
import { useSearchStore } from '../stores/searchPlaces'

const placesStore = usePlacesStore()
const searchStore = useSearchStore()
const currentLat = ref()
const currentLng = ref ()
const map = shallowRef(null)
const markers = ref([]) // 用來管理地圖上的所有圖標

// console.log(placesStore.items)

async function initMap(center) {
  const { Map } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
  const newMap = new Map(document.getElementById('map'), {
    center: center || { lat: 25.0341222, lng: 121.5640212 },
    zoom: 15,
    maxZoom: 20,
    minZoom: 3,
    streetViewControl: false,
    mapTypeControl: false,
    mapId: "83af7188f1a0650d",
  });
  map.value = newMap;

  // 為地圖新增事件監聽器
  newMap.addListener('idle', () => {
    searchStore.mapCenter = newMap.getCenter().toJSON();
  });

}



const nearbySearch = () => {
  console.log("觸發搜尋附近");
  searchStore.mapSearch()
}

// 清除地圖上的所有圖標
function clearMarkers() {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => {
      marker.setMap(null) // 從地圖移除 marker
    })
  }
  markers.value = [] // 確保 markers.value 被清空
}


// 根據 placesStore.items 新增圖標
async function updateMarkers() {
  clearMarkers(); // 確保舊的標記被清除
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

  if (!map.value) {
    console.error('地圖尚未初始化，無法新增標記');
    return;
  }

  placesStore.items.forEach((place) => {
    // 建立 HTML 節點
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = `
  <div class="relative flex flex-col items-center justify-center group">
    <!-- Hidden popup -->
    <div
      class="bg-white rounded-md p-[4px] items-center hidden group-hover:flex absolute top-16 w-auto shadow-md transition duration-150"
    >
      <div class="w-12 h-12 overflow-hidden rounded-md">
        <img
          src="https://via.placeholder.com/48"
          alt="景點圖片"
          class="aspect-square"
        />
      </div>
      <p class="mx-2 font-semibold whitespace-nowrap">${place.name}</p>
    </div>

    <!-- Static name -->
    <p
      class="absolute -top-5 mx-auto font-[600] text-primary-400 strokeText text-sm group-hover:hidden whitespace-nowrap z-50"
    >
    ${place.name}
    </p>

    <!-- Button -->
    <button
      class="inline-flex items-center justify-between bg-white rounded-full shadow-lg p-[2px] before:content-['▼'] before:absolute before:z-1 before:-bottom-2 before:text-white before:left-1/2 before:translate-x-[-50%] group-hover:bg-primary-400 group-hover:before:text-primary-400 group-hover:scale-125 transition-transform duration-150 items-center"
    >
      <div
        class="relative flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-primary-400"
      >
        <span class="text-lg text-white">❤︎</span>
      </div>
      <p class="mr-1 text-base group-hover:text-white">${place.rating}</p>
    </button>
  </div>
`;


    const marker = new AdvancedMarkerElement({
      position: place.geometry,
      map: map.value,
      content: contentDiv, // 使用 DOM 節點
    });

    markers.value.push(marker); // 將新建的 marker 加入列表
  });
}



// 定位功能
const locateUser = async() => {
  if (navigator.geolocation) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLat.value = position.coords.latitude
        currentLng.value = position.coords.longitude
        if (map.value) {
          map.value.setCenter({ lat: currentLat.value, lng: currentLng.value })
          console.log("使用者位置更新");
          
        }
        new google.maps.Marker({
          position: { lat: currentLat.value, lng: currentLng.value },
          map: map.value,
          title: '您的位置',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        })
      },
      () => {
        console.warn('使用者拒絕共享位置，使用預設中心點')
        if (map.value) {
          map.value.setCenter(searchStore.mapCenter)
        }
      }
    )
  } else {
    console.warn('瀏覽器不支援定位功能')
    if (map.value) {
      map.value.setCenter(searchStore.mapCenter)
    }
  }
}


onMounted(async () => {
//   // 先設定mapCenter會被定位覆蓋
  let initialCenter = searchStore.mapCenter 
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // 取得使用者定位
  await new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          currentLat.value = position.coords.latitude
          currentLng.value = position.coords.longitude
          initialCenter = { lat: currentLat.value, lng: currentLng.value }
          resolve()
        },
        () => {
          console.warn("拒絕使用位置，使用預設中心點")
          resolve()
        }
      )
    } else {
      console.warn("瀏覽器不支援定位功能")
      resolve()
    }
  })

// 初始化地圖
  await initMap(initialCenter)



    // 搜索附近地點
  searchStore.mapCenter = initialCenter
  searchStore.mapSearch()
  locateUser()
  // 監聽 placesStore.items 的變化，動態更新標記
  watch(
  () => placesStore.items,
  (newItems, oldItems) => {
    if (JSON.stringify(newItems) !== JSON.stringify(oldItems)) {
      if (map.value) {
        updateMarkers();
      } else {
        console.warn('地圖尚未初始化，無法更新標記');
      }
    }
  },
  { immediate: true }
);

})

 

</script>

<template>
  <!-- 地圖 -->
  <div class="h-screen google-map min-w-screen " id="map"></div>
  <!-- 搜尋此區域 -->
  <button
    class="bg-white inline-flex px-4 py-2 rounded-full shadow-lg fixed left-1/2 top-[100px] -translate-x-1/2 text-sm font-medium hover:bg-slate-100 transition-all duration-200 leading-6 active:bg-slate-300"
    @click="nearbySearch"
  >
    <MagnifyingGlassIcon class="mr-1 size-5 text-primary-400" />
    <p>搜尋此區域</p>
  </button>
  <!-- 定位按鈕 -->
  <button
    @click="locateUser"
    class="fixed px-2 py-2 bg-white rounded-md right-3 bottom-28 hover:bg-slate-100"
  >
    <MapPinIcon class="size-5 text-primary-400" />
  </button>
  <!-- 圖標樣式 -->
  <!-- <div class="absolute top-1/2 left-1/2" id="locationCard">
    <div class="flex flex-col items-center justify-center group">
      <div class="flex flex-col items-center justify-center">
        <div
          class="bg-white rounded-md p-[4px] items-center hidden group-hover:flex absolute top-16 w-auto shadow-md"
        >
          <div class="w-12 h-12 overflow-hidden rounded-md">
            <img
              src="https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg"
              alt=""
              class="aspect-square"
            />
          </div>
          <p class="mx-2 font-semibold whitespace-nowrap">景點名稱</p>
        </div>
      </div>
      <p
        class="absolute -top-5 mx-auto font-[600] text-primary-400 strokeText text-sm  group-hover:hidden whitespace-nowrap"
      >
      景點名稱
      </p>
      <button
        class="inline-flex items-center justify-between bg-white rounded-full shadow-lg p-[2px] before:content-['▼'] before:absolute before:z-1 before:-bottom-2 before:text-white before:left-1/2 before:translate-x-[-50%] group-hover:bg-primary-400 group-hover:before:text-primary-400 group-hover:scale-125 transition-transform duration-100"
      >
        <div
          class="relative flex items-center w-6 h-6 mr-1 rounded-full bg-primary-400"
        >
          <PuzzlePieceIcon class="absolute mr-1 text-white size-5 left-[1px]" />
        </div>
        <p class="mr-1 group-hover:text-white ">4.2</p>
      </button>
    </div>
  </div> -->
  <PlacesModal class="hidden md:block" />
</template>

<style>
.strokeText::before {
  position: absolute;
  content: '景點名稱';
  -webkit-text-stroke: 2px #ffffff;
  z-index: -1;
  filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.25));
}
img {
  object-fit: cover;
}
</style>
