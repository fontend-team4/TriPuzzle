<script setup>
import { ref, onMounted, computed, defineEmits } from 'vue'
import {
  ListBulletIcon,
  XMarkIcon,
  StarIcon,
  MapPinIcon,
  PlusCircleIcon,
} from '@heroicons/vue/24/solid'
import { usePlacesStore } from '@/stores/fetchPlaces'
import { useRouter } from 'vue-router'
import AddPlaceBtn from './AddPlaceBtn.vue'


const placesStore = usePlacesStore() 
const router = useRouter()

const defaultPlacesData = ref([]) // 存放抓取的資料
const emit = defineEmits(['open-detail-modal'])

const sideBarIsOpen = ref(true)

// 計算側邊欄樣式
const sideCls = computed(() => {
  return sideBarIsOpen.value ? [''] : ['translate-x-[-100%] opacity-0']
})
const hamburgerCls = computed(() => {
  return sideBarIsOpen.value ? ['opacity-0'] : ['']
})

// 切換側邊欄
const sideToggle = () => {
  sideBarIsOpen.value = !sideBarIsOpen.value
}

// 開啟詳細資訊
const openDetailModal = (detailId) => {
  router.push({
    path: '/planner',
    query: { action: 'placeInfo', placeId: detailId },
  })
}

// 初始化並抓取資料
onMounted(async () => {
  await placesStore.fetchDefaultPlaces() // 抓取資料
  defaultPlacesData.value = placesStore.items // 賦值給本地變數
})
</script>


<template>
  <!-- 漢堡選單 -->
  <div
    class="fixed items-center hidden w-12 h-12 px-2 transition-all duration-300 bg-white rounded-full shadow-md cursor-pointer top-24 left-10 lg:left-28 group hover:w-32 md:flex"
    @click="sideToggle"
    :cls="hamburgerCls"
  >
    <div class="flex-shrink-0">
      <ListBulletIcon class="size-8" />
    </div>
    <span
      class="px-0 ml-2 overflow-hidden opacity-0 whitespace-nowrap max-w-0 group-hover:opacity-100 group-hover:max-w-xs"
    >
      顯示清單
    </span>
  </div>

  <!-- 側欄 -->
  <!-- fixed -->
  <div class="hidden h-full w-96 md:block">
    <div
      class="w-96 h-[calc(100vh-72px)] bg-white absolute bottom-0 left-0 lg:left-20 rounded-tr-3xl drop-shadow-md transition-all duration-300"
      :class="sideCls"
    >
      <div
        class="z-20 flex items-center justify-between w-full p-4 bg-white rounded-tr-3xl"
      >
        <div></div>
        <button
          class="flex items-center justify-center w-6 h-6 rounded-full cursor-pointer bg-gray tooltip"
          data-tip="隱藏清單"
          @click="sideToggle"
        >
          <XMarkIcon class="size-5" />
        </button>
      </div>
      <div class="w-full h-[calc(100%-60px)] px-5 overflow-auto">
        <ul class="w-full h-full">
          <li
            v-for="item in defaultPlacesData"
            key:item.id
            class="w-full mb-3 transition-colors rounded-md p1 bg-gray hover:bg-primary-100"
          >
            <a href="#" @click="openDetailModal(item.place_id)">
              <figure class="flex p-1 group">
                <div class="w-40 h-auto overflow-hidden rounded-md">
                  <img
                    :src="item.url"
                    alt=""
                    class="aspect-square"
                  />
                </div>
                <div
                  class="pt-3 pl-4 pr-3 w-[176px] flex flex-col justify-between relative"
                >
                  <div>
                    <h3 class="font-bold text-slate-900">
                      {{ item.name }}
                    </h3>
                    <p v-if="item.rating"
                      class="flex items-center gap-1 text-sm leading-6 text-slate-500"
                    >
                      <StarIcon class="size-4 text-secondary-500" />{{
                        item.rating
                      }}
                    </p>
                    <p class="text-sm leading-6 text-slate-500">
                      加入行程<span class="px-1">47</span>次
                    </p>
                  </div>
                  <div
                    class="absolute inline-flex items-center justify-between w-[147px] h-auto mt-2 text-sm duration-300 opacity-0 group-hover:opacity-100 bottom-2"
                  >
                    <AddPlaceBtn @click.stop />
                    <!-- <AddPlaceModal /> -->
                    <a :href="item.googleMapsUri" target="_blank">
                      <MapPinIcon class="text-gray-500 size-5" />
                    </a>
                  </div>
                </div>
              </figure>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  object-fit: cover;
}
</style>
