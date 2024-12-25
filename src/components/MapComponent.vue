<script setup>
import { ref, onMounted, watch, nextTick, shallowRef, toRaw } from "vue"
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/vue/24/outline"
import PlacesModal from "@/components/PlacesModal.vue"
import { usePlacesStore } from "@/stores/fetchPlaces"
import { useSearchStore } from "../stores/searchPlaces"

const placesStore = usePlacesStore()
const searchStore = useSearchStore()
const currentLat = ref()
const currentLng = ref()
const map = shallowRef(null)
const markers = ref([])

async function initMap(center) {
  const { Map } = await google.maps.importLibrary("maps")
  const newMap = new Map(document.getElementById("map"), {
    center: center || { lat: 25.0341222, lng: 121.5640212 },
    zoom: 15,
    maxZoom: 20,
    minZoom: 3,
    streetViewControl: false,
    mapTypeControl: false,
    mapId: "83af7188f1a0650d",
  })
  map.value = newMap

  newMap.addListener("idle", () => {
    searchStore.mapCenter = newMap.getCenter().toJSON()
  })
}

const nearbySearch = () => {
  searchStore.mapSearch()
}

// 清除地圖上的所有圖標
function clearMarkers() {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => {
      marker.setMap(null)
    })
  }
  markers.value = []
}

// 根據 placesStore.items 新增Marker
async function updateMarkers() {
  clearMarkers()
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")

  if (!map.value) {
    console.error("地圖尚未初始化，無法新增標記")
    return
  }

  placesStore.items.forEach((place) => {
    // 自定義Marker
    const contentDiv = document.createElement("div")
    contentDiv.innerHTML = `
  <div class="relative flex flex-col items-center justify-center group allBtn">
    <!-- Hidden popup -->
    <div
      class="bg-white rounded-md p-[4px] items-center hidden group-hover:flex absolute -top-16 w-auto shadow-md transition duration-150"
    >
      <div class="w-12 h-12 overflow-hidden rounded-md">
        <img
          src="${place.url}"
          alt="景點圖片"
          class="aspect-square smallImg"
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
      class="inline-flex items-center justify-between bg-white rounded-full shadow-lg p-[2px] before:content-['▼'] before:absolute before:z-1 before:-bottom-2 before:text-white before:left-1/2 before:translate-x-[-50%] group-hover:bg-primary-400 group-hover:before:text-primary-400 group-hover:scale-125 transition-transform duration-150 items-center "
    >
      <div
        class="relative flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-primary-400"
      >
        <span class="text-lg text-white">❤︎</span>
      </div>
      <p class="mr-1 text-base group-hover:text-white">${place.rating}</p>
    </button>
  </div>
`

    const marker = new AdvancedMarkerElement({
      position: place.geometry,
      map: map.value,
      content: contentDiv,
      draggable: false,
    })

    markers.value.push(marker)
  })
}

const locateUser = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLat.value = position.coords.latitude
        currentLng.value = position.coords.longitude
        if (map.value) {
          map.value.setCenter({ lat: currentLat.value, lng: currentLng.value })
        }
        new google.maps.Marker({
          position: { lat: currentLat.value, lng: currentLng.value },
          map: map.value,
          title: "您的位置",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        })
      },
      () => {
        if (map.value) {
          map.value.setCenter(searchStore.mapCenter)
        }
      }
    )
  } else {
    if (map.value) {
      map.value.setCenter(searchStore.mapCenter)
    }
  }
}

onMounted(async () => {
  // 先設定mapCenter會被定位覆蓋
  let initialCenter = searchStore.mapCenter
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

  await initMap(initialCenter)
  searchStore.mapCenter = initialCenter
  searchStore.mapSearch()
  locateUser()

  watch(
    () => placesStore.items,
    (newItems, oldItems) => {
      if (JSON.stringify(newItems) !== JSON.stringify(oldItems)) {
        if (map.value) {
          updateMarkers()
        } else {
          console.warn("地圖尚未初始化")
        }
      }
    },
    { immediate: true }
  )
})

// 如果偵測到searchPlaces的mapCenter.value改變，那就重新set center
watch(
  () => searchStore.placeGeometry,
  (newCenter, oldCenter) => {
    if (
      newCenter &&
      oldCenter &&
      (newCenter.lat !== oldCenter.lat || newCenter.lng !== oldCenter.lng)
    ) {
      if (map.value) {
        map.value.setCenter(newCenter)
      } else {
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <!-- 地圖 -->
  <div class="h-screen google-map min-w-screen" id="map"></div>
  <!-- 搜尋此區域 -->
  <button
    class="bg-white inline-flex px-4 py-2 rounded-full shadow-lg fixed left-1/2 top-[100px] -translate-x-1/2 text-sm font-medium hover:bg-slate-100 transition-all duration-200 leading-6 active:bg-slate-300"
    @click="nearbySearch"
  >
    <MagnifyingGlassIcon class="mr-1 size-5 text-primary-400" />
    <p>搜尋此區域</p>
  </button>
  <button
    @click="locateUser"
    class="fixed px-2 py-2 bg-white rounded-md right-3 bottom-28 hover:bg-slate-100"
  >
    <MapPinIcon class="size-5 text-primary-400" />
  </button>
  <PlacesModal class="hidden md:block" />
</template>

<style>
.strokeText::before {
  position: absolute;
  content: "景點名稱";
  -webkit-text-stroke: 2px #ffffff;
  z-index: -1;
  filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.25));
}
img {
  object-fit: cover;
}

.allBtn-btn:hover {
  transform: scale(1.25);
  background-color: #f17b78;
}
.smallImg {
  aspect-ratio: 1;
  width: 48px;
}

.allBtn {
  pointer-events: auto;
  z-index: 1000;
}
</style>
