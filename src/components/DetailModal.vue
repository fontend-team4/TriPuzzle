<script setup>
import {
  CalendarIcon,
  ClockIcon,
  PhoneIcon,
  GlobeAltIcon,
  MapPinIcon,
  ShareIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  LinkIcon,
  PaperAirplaneIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/24/outline"
import { HeartIcon } from "@heroicons/vue/24/solid"
import { HeartIcon as OutlineHeartIcon } from "@heroicons/vue/24/outline"
import { StarIcon } from "@heroicons/vue/24/solid"
// import DetailCarousel from "./DetailCarousel.vue"
// import Waterfall from "./Waterfall.vue"
import AddPlaceBtn from "./AddPlaceBtn.vue"
import { useRoute } from "vue-router"
import { usePlacesStore } from "@/stores/fetchPlaces"
import { PlaceModalStore } from "@/stores/PlaceModal"
import { useCopyWebsiteStore } from "@/stores/copywebsite"
import axios from "axios"
import { computed, ref, defineProps, defineEmits, onMounted, watch } from "vue"
import { generateQRCode } from "@/utils/QRcode"
import { addPlace } from "@/stores/addPlaces"
import {
  loadFavorites,
  toggleFavoriteStatus,
  generateImageUrl } from "@/stores/favorites"

const API_URL = process.env.VITE_HOST_URL
const token = localStorage.getItem("token")

// 控制modal、照片顯示等狀態
const qrcodeCanvas = ref(null)
const qrCodeDataUrl = ref("")
const showPhoto = ref(false)
const place = ref({})
const places = ref([])
const favorites = ref(JSON.parse(localStorage.getItem("favorites") || "[]"))

const onShareClick = async () => {
  const placeId = currentPlaceId.value || place.value?.id // 不同頁面獲取的place_id
  await createQRCode(placeId)
}

// Props & Emits
const props = defineProps({
  place: {
    type: Object,
    required: false,
  },
})

defineEmits(["close"])

// Stores 和路由
const modalStore = PlaceModalStore()
const placesStore = usePlacesStore()
const { copyToClipboard } = useCopyWebsiteStore()
const route = useRoute()
const items = ref(JSON.parse(localStorage.getItem("items") || "[]"));

// 切換收藏狀態的按鈕事件處理
const handleToggleFavorite = async (place,item) => {
  let formattedPlace;

    formattedPlace = { ...place, place_id: placeId }; // 不更改 place_id
    console.log("formattedPlace", formattedPlace);

  // 執行收藏切換操作
  await toggleFavoriteStatus(formattedPlace);

  // 更新收藏狀態以刷新顯示
  place.isFavorited = formattedPlace.isFavorited;

};
// 計算屬性
const currentPlaceId = computed(() => route.query.placeId)
const placeData = computed(() => props.place || place.value)
// member 路由判斷
const isMemberRoute = computed(() => route.path.startsWith("/member"));
const placeId = currentPlaceId.value || place.value?.id

// 生成 QR Code 並下載
const createQRCode = async (placeId) => {
  try {
    qrCodeDataUrl.value = await generateQRCode(placeId)
  } catch (error) {
    console.error("生成 QR Code 出錯:", error)
  }
}
const downloadQRCode = () => {
  if (!qrCodeDataUrl.value) {
    alert("QR Code 尚未生成！")
    return
  }
  const blob = dataURLToBlob(qrCodeDataUrl.value)
  const blobUrl = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = blobUrl
  link.download = `${place.value.name}_QRCode.png`
  link.click()
  URL.revokeObjectURL(blobUrl)
}
const dataURLToBlob = (dataURL) => {
  const [header, base64] = dataURL.split(",")
  const mime = header.match(/:(.*?);/)[1]
  const binary = atob(base64)
  const array = []
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: mime })
}

// 動態更新 QR Code 圖片
watch(qrCodeDataUrl, (newUrl) => {
  if (newUrl) {
    const canvas = qrcodeCanvas.value
    const ctx = canvas.getContext("2d")
    const image = new Image()
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    }
    image.src = newUrl
  }
})

// 其他功能：照片切換、複製連結
// const changeShowPhoto = () => {
//   showPhoto.value = !showPhoto.value
// }


// 控制 CSS 樣式
// const isPhotoShow = computed(() =>
//   showPhoto.value
//     ? ["h-screen", "md:translate-x-0", "opacity-100", "bottom-0"]
//     : [
//         "h-0",
//         "md:translate-x-full",
//         "md:translate-y-0",
//         "opacity-0",
//         "-bottom-12",
//       ]
// )
const overflowStatus = computed(() =>
  showPhoto.value ? ["overflow-hidden"] : [""]
)

const copyPlaceUrl = () => {
  const placeId = currentPlaceId.value || place.value?.id
  if (!placeId) {
    alert("無法獲取地點 ID！")
    return
  }
  copyToClipboard(placeId)
}

// 加載地點詳情
const fetchPlaceDetails = async () => {
  try {
    // 優先從 props 或本地 store 中加載資料
    places.value = placesStore.items
    place.value = places.value.find((p) => p.id === currentPlaceId.value) || {}
    if (props.place) {
      place.value = props.place
      return
    }
    // 從收藏列表中查找
    if (!Object.keys(place.value).length && favorites.value.length > 0) {
      favorites.value = JSON.parse(localStorage.getItem("favorites") || "[]")
      place.value =
        favorites.value.find((f) => f.place_id === currentPlaceId.value) || {}
    }
    // 從 API 中獲取地點詳情
    if (!Object.keys(place.value).length && currentPlaceId.value) {
      const response = await axios.get(
        `${API_URL}/places/${currentPlaceId.value}`,
        { headers: { Authorization: token } }
      )
      place.value = response.data
    }
    // 若所有途徑都無法獲取地點詳情
    if (!Object.keys(place.value).length) {
      alert(Error("無法加載景點資訊，請再試一次。"))
    }
  } catch (error) {
    alert(Error("無法加載景點資訊，請再試一次。"))
    console.error("無法加載地點詳情:", error)
  }
}

// 初始加載
onMounted(fetchPlaceDetails)
</script>


<template>
  <div
    class="fixed z-50 flex items-center justify-center w-screen h-screen overflow-hidden bg-black bg-opacity-25"
    @click="$emit('close')"
  >
    <div
      class="pb-10 md:pb-0 h-full md:h-[calc(100vh-160px)] md:w-[1032px] mx-0 md:mx-auto bg-white md:flex md:rounded-md md:overflow-hidden overflow-auto relative"
      :class="overflowStatus"
      @click.stop
    >
      <div
        class="bg-black md:w-[calc(100%-368px)] h-[360px] md:h-full md:overflow-hidden flex justify-center relative group"
      >
        <!--輪播圖  -->
        <!-- <DetailCarousel /> -->
        <div
          class="inline-flex items-center justify-center w-full h-full overflow-hidden bg-black" 
        >
          <img
            :src="placeData.url || generateImageUrl(placeData.image_url)"
            alt=""
            class="object-contain w-full h-full"
          />

        </div>
        <button
          class="absolute flex gap-1 bg-gray-100 py-[3px] px-2.5 rounded-full top-4 right-5 h-[32px] w-[32px] text-sm items-center bg-opacity-75 bg-white md:hidden"
          @click="$emit('close')"
        >
          <XMarkIcon class="absolute right-1 size-5 -translate-x-[2px]" />
        </button>
      </div>
      <div
        class="relative px-5 py-5 md:py-16 md:w-[368px] flex flex-col gap-2.5 md:h-[calc(100% - 64px)] pb-20 overflow-y-auto"
      >
        <h2 class="text-xl font-medium">{{ placeData.name }}</h2>
        <div class="flex">
          <div
            class="inline-flex items-center gap-1 pr-3 text-sm align-middle border-r-2"
          >
            Google 評價
            <StarIcon
              class="text-yellow-400 size-4"
              v-if="placeData.rating != 'N/A'"
            />
            <span class="text-yellow-400">{{ placeData.rating }}</span>
            (<span class="underline">34</span>)
          </div>
          <div class="inline-flex gap-1 pl-3 pr-3 text-sm align-middle">
            加入行程<span>45</span>次
          </div>
        </div>
        <div
          class="flex pt-2.5 pb-3.5 border-b-slate-200 border-b-[1px]"
          v-if="placeData.address != 'N/A'"
        >
          <MapPinIcon class="size-5" />
          <p class="pl-8 text-sm">{{ placeData.location }}</p>
        </div>
        <div
          class="flex pt-2.5 pb-3.5 border-b-slate-200 border-b-[1px]"
          v-if="placeData.summary && placeData.summary != 'N/A'"
        >
          <CalendarIcon class="flex flex-shrink-0 size-5" />
          <p class="pl-8 text-sm">{{ placeData.summary }}</p>
        </div>
        <div
          class="flex pt-2.5 pb-3.5 border-b-slate-200 border-b-[1px]"
          v-if="placeData.phone && placeData.phone != 'N/A'"
        >
          <PhoneIcon class="size-5" />
          <p class="pl-8 text-sm">{{ placeData.phone }}</p>
        </div>
        <div
          class="flex pt-2.5 pb-3.5 border-b-slate-200 border-b-[1px] w-full"
          v-if="placeData.website && placeData.website != 'N/A'"
        >
          <GlobeAltIcon class="flex-shrink-0 size-5" />
          <p
            class="pl-8 overflow-hidden text-sm truncate-text whitespace-nowrap text-ellipsis"
          >
            <a :href="placeData.website" target="_blank">{{
              placeData.website
            }}</a>
          </p>
        </div>
        <div
          class="flex pt-2.5 pb-3.5 w-full"
          v-if="placeData.opening_hours && placeData.opening_hours != ''"
        >
          <ClockIcon class="flex-shrink-0 size-5" />
          <div>
            <div>
              <div
                v-for="(summary, index) in placeData.opening_hours"
                :key="index"
                class="flex pl-4 ml-4 text-sm leading-7"
              >
                <span class="whitespace-nowrap">{{
                  summary.split(": ")[0]
                }}</span>
                <span class="ml-7">{{ summary.split(": ")[1] }}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          class="absolute top-3.5 right-3.5 hidden md:block"
          @click="$emit('close')"
        >
          <XMarkIcon class="size-6" />
        </button>
      </div>
      <!-- 功能區 -->
      <div
        class="fixed md:absolute bottom-0 right-0 w-full md:w-[368px] h-[50px] border-t-2 border-t-gray inline-flex items-center justify-between px-2 bg-white"
      >
        <div class="inline-flex items-center gap-2">
          <div
            class="tooltip"
            data-tip="分享"
            onclick="my_modal_2.showModal()"
            @click="addPlace(placeData), onShareClick()"
          >
            <ShareIcon class="cursor-pointer size-6" />
          </div>
          <dialog id="my_modal_2" class="modal">
            <div
              class="modal-box min-w-full md:min-w-[480px] min-h-full md:min-h-[464px] bg-gray relative rounded-none md:rounded-xl"
            >
              <form method="dialog">
                <button
                  class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
                >
                  ✕
                </button>
              </form>
              <!-- 框框內容 -->
              <div class="flex flex-col items-center mt-8">
                <h3 class="pb-4 text-2xl font-medium">分享</h3>
                <div
                  class="flex flex-col items-center w-full px-5 pt-10 pb-6 mb-8 bg-white rounded-xl"
                >
                  <div class="mb-4">
                    <canvas ref="qrcodeCanvas" class="block w-48 h-48"></canvas>
                  </div>
                  <p class="text-base text-stone-900">
                    手機掃描條碼，即可查看此景點
                  </p>
                  <div class="flex flex-col w-full gap-3 pt-8 md:flex-row">
                    <button
                      class="inline-flex justify-center w-full px-4 py-[11px] transition-all border rounded-full text-primary-600 border-primary-600 hover:bg-primary-100"
                      @click="downloadQRCode"
                    >
                      <ArrowDownTrayIcon class="mr-1 size-6" />
                      <span>下載 QR Code </span>
                    </button>
                    <button
                      class="inline-flex justify-center w-full px-4 py-[11px] text-white border rounded-full bg-primary-600 border-primary-600 hover:bg-primary-700"
                      @click="copyPlaceUrl"

                    >
                      <LinkIcon class="mr-1 size-6" /><span>複製連結</span>
                    </button>
                    <!-- 複製成功警告組件 -->
                    <div
                      class="absolute right-0 top-1/2 md:w-[100px] md:h-[100px] w-[80px] h-[80px] -translate-y-full md:-translate-y-1/2"
                    >
                      <img
                        src="../assets/monster_take_phone.png"
                        alt=""
                        class="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form method="dialog" class="modal-backdrop">
              <button
                class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
              >
                ✕
              </button>
              <button>close</button>
            </form>
          </dialog>
          <div class="tooltip" 
            :data-tip="place.isFavorited ? '移除收藏' : '加入收藏'">
            <button class="cursor-pointer" @click="handleToggleFavorite (place)">
              <component
                :is="place.isFavorited ? HeartIcon : OutlineHeartIcon"
                :class="place.isFavorited ? 'text-red-500' : 'text-gray-500'"
                class="size-6"
              />
            </button>
            </div>
          <div class="tooltip" data-tip="導航">
            <PaperAirplaneIcon class="cursor-pointer size-6" />
          </div>
        </div>
        <AddPlaceBtn 
          v-if="!isMemberRoute && Object.keys(place).length"
        />
      </div>
      <!-- 照片區 -->
      <!-- <div
        class="absolute md:top-0 right-0 z-40 w-screen h-0 transition-all duration-300 transform bg-white md:w-[368px] md:right-0 overflow-auto"
        :class="isPhotoShow"
      >
        <div
          class="flex justify-between px-5 py-4 bg-white border-b-[2px] border-b-slate-100 fixed top-0 w-screen"
        >
          <div class="flex text-base">
            <button @click="changeShowPhoto">
              <ChevronLeftIcon class="size-6" />
            </button>
            <p class="peer-checked:text-red-600">{{ place.location }}</p>
          </div>
          <button><XMarkIcon class="size-6" /></button>
        </div>
        <!-- <Waterfall
          class="mt-16"
          v-if="Object.keys(place).length"
          :place="place"
        /> -->
      </div>
    </div>
  </div>
</template>

<style>
img {
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

/* 定義進入和離開的動畫效果 */
.photo-fade-enter-active,
.photo-fade-leave-active {
  transition: all 0.3s ease;
}

.photo-fade-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.photo-fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.photo-fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.photo-fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

img {
  object-fit: contain;
}

/* 禁止滾動 */
</style>
@/service/QRcode @/service/QRcode @/utils/QRcode
