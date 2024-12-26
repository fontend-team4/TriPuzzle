<script setup>
import DetailCarousel from "./DetailCarousel.vue"
import { computed, ref, defineEmits, onMounted } from "vue"
import { useRoute } from "vue-router"
import {
  CalendarIcon,
  ClockIcon,
  PhoneIcon,
  GlobeAltIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ShareIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  PhotoIcon,
  ChevronLeftIcon,
  ArrowDownTrayIcon,
  LinkIcon,
} from "@heroicons/vue/24/outline"
import { StarIcon } from "@heroicons/vue/24/solid"
import Waterfall from "./Waterfall.vue"
import AddPlaceBtn from "./AddPlaceBtn.vue"
import { PlaceModalStore } from "@/stores/PlaceModal"
import { usePlacesStore } from "@/stores/fetchPlaces"
import axios from "axios"
import { defineProps } from "vue"
import { generateImageUrl } from "@/stores/favorites"
import { useCopyWebsiteStore } from "@/stores/copywebsite"


const API_URL = process.env.VITE_HOST_URL
const token = localStorage.getItem("token")


const modalStore = PlaceModalStore()
const placesStore = usePlacesStore()
const { copyToClipboard, copySuccess } = useCopyWebsiteStore();

const route = useRoute()
const showPhoto = ref(false)

// CSS區
const isPhotoShow = computed(() => {
  return showPhoto.value
    ? ["h-screen", "md:translate-x-0", "opacity-100", "bottom-0"]
    : [
        "h-0",
        "md:translate-x-full",
        "md:translate-y-0",
        "opacity-0",
        "-bottom-12",
      ]
})

const overflowStatus = computed(() => {
  return showPhoto.value ? ["overflow-hidden"] : [""]
})
const changeShowPhoto = () => {
  return (showPhoto.value = !showPhoto.value)
}

// 接收Place物件
const props = defineProps({
  place: {
    type: Object,
    required: false, // 改為非必需，避免報錯
  },
})

const places = ref([])
const place = ref({})
const favorites = ref(JSON.parse(localStorage.getItem("favorites") || "[]"));


//關閉detailModal
defineEmits(["close"])
// 紀錄：打算改成用網址來渲染detailModal
onMounted(async () => {
  try {
    // 如果本地 placesStore.items 中有數據
    places.value = placesStore.items;

    // 嘗試從 placesStore 中找到對應的 place
    place.value = places.value.find((p) => p.id === currentPlaceId.value) || {};

    // 如果本地未找到，嘗試從 favorites 中查找
    if (Object.keys(place.value).length === 0 && favorites.value.length > 0) {
      console.log("Searching in favorites...");
      favorites.value = JSON.parse(localStorage.getItem("favorites") || "[]");
      place.value = favorites.value.find((f) => f.place_id === currentPlaceId.value) || {};
      console.log("Found in favorites:", place.value.image_url);
    }

    // 如果仍未找到，從遠程加載
    if (Object.keys(places.value).length === 0) {
      console.log("Fetching place details from API...");
      const response = await axios.get(`${API_URL}/places`, {
        headers: { Authorization: token },
      });
      place.value = response.data;
    }

    console.log("Loaded place details:", place.value);
  } catch (error) {
    console.error("Failed to load place details:", error);
    place.value = {};
  }
});



// 找到網址id
const currentPlaceId = computed(() => route.query.placeId)
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
          <img :src="place.url ||generateImageUrl(place.image_url)" alt="" class="object-contain w-full" />
        </div>
        <button
          for="showPhoto"
          class="absolute flex gap-1 bg-gray-100 py-[3px] px-2.5 rounded-full top-4 right-16 h-[32px] text-sm items-center bg-opacity-75 bg-white md:right-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          @click="changeShowPhoto"
          @updatePhotoCount="updatePhotoCount"
        >
          <PhotoIcon class="size-5" />{{ place.photos_length }}
        </button>
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
        <h2 class="text-xl font-medium">{{ place.name }}</h2>
        <div class="flex">
          <div
            class="inline-flex items-center gap-1 pr-3 text-sm align-middle border-r-2"
          >
            Google 評價
            <StarIcon class="text-yellow-400 size-4" v-if="place.rating != 'N/A'" />
            <span class="text-yellow-400">{{ place.rating }}</span>
            (<span class="underline">34</span>)
          </div>
          <div class="inline-flex gap-1 pl-3 pr-3 text-sm align-middle">
            加入行程<span>45</span>次
          </div>
        </div>
        <div
          class="flex pt-2.5 pb-3.5 border-b-slate-200 border-b-[1px]"
          v-if="place.address != 'N/A'"
        >
          <MapPinIcon class="size-5" />
          <p class="pl-8 text-sm">{{ place.location }}</p>
        </div>
        <div
          class="flex pt-2.5 pb-3.5 border-b-slate-200 border-b-[1px]"
          v-if="place.summary && place.summary != 'N/A'"
        >
          <CalendarIcon class="flex flex-shrink-0 size-5" />
          <p class="pl-8 text-sm">{{ place.summary }}</p>
        </div>
        <div
          class="flex pt-2.5 pb-3.5 border-b-slate-200 border-b-[1px]"
          v-if="place.phone && place.phone != 'N/A'"
        >
          <PhoneIcon class="size-5" />
          <p class="pl-8 text-sm">{{ place.phone }}</p>
        </div>
        <div
          class="flex pt-2.5 pb-3.5 border-b-slate-200 border-b-[1px] w-full"
          v-if="place.website && place.website != 'N/A'"
        >
          <GlobeAltIcon class="flex-shrink-0 size-5" />
          <p
            class="pl-8 overflow-hidden text-sm truncate-text whitespace-nowrap text-ellipsis"
          >
            <a :href="place.website" target="_blank">{{ place.website }}</a>
          </p>
        </div>
        <div
            class="flex pt-2.5 pb-3.5 w-full"
            v-if="(place.opening_hours && place.opening_hours != '')"
        >
          <ClockIcon class="flex-shrink-0 size-5" />
          <div>
            <div>
              <div
                v-for="(summary, index) in place.opening_hours"
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
      <!-- fiexd 的那玩意 -->
      <div
        class="fixed md:absolute bottom-0 right-0 w-full md:w-[368px] h-[50px] border-t-2 border-t-gray inline-flex items-center justify-between px-2 bg-white"
      >
        <div class="inline-flex items-center gap-2">
          <div class="tooltip" data-tip="分享" onclick="my_modal_2.showModal()">
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
                    <img src="../assets/share_location_QRcode.png" alt="" />
                  </div>
                  <p class="text-base text-stone-900">
                    手機掃描條碼，即可查看此景點
                  </p>
                  <div class="flex flex-col w-full gap-3 pt-8 md:flex-row">
                    <button
                      class="inline-flex justify-center w-full px-4 py-[11px] transition-all border rounded-full text-primary-600 border-primary-600 hover:bg-primary-100"
                    >
                      <ArrowDownTrayIcon class="mr-1 size-6" /><span
                        >下載QRcode</span
                      >
                    </button>
                    <button
                      class="inline-flex justify-center w-full px-4 py-[11px] text-white border rounded-full bg-primary-600 border-primary-600 hover:bg-primary-700"
                      @click="copyToClipboard"
                      >
                      <LinkIcon class="mr-1 size-6" /><span>複製連結</span>
                    </button>
                    <p v-if="copySuccess" class="col-green font-medium mt-10 success-message">已複製網址到剪貼簿！</p>
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
          <div class="tooltip" data-tip="加到最愛">
            <HeartIcon class="cursor-pointer size-6" />
          </div>
          <div class="tooltip" data-tip="導航">
            <PaperAirplaneIcon class="cursor-pointer size-6" />
          </div>
        </div>
        <AddPlaceBtn />
      </div>
      <!-- 照片區 -->
      <div
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
        <Waterfall
          class="mt-16"
          v-if="Object.keys(place).length"
          :place="place"
        />
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
