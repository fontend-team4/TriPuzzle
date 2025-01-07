<script setup>
import { computed, ref, watch, onMounted, defineProps } from "vue"
import SearchBar from "./SearchBar.vue"
import MapToggle from "./MapToggle.vue"
import PlacesComponent from "./PlacesComponent.vue"
import ScheduleSideBar from "./ScheduleSideBar.vue"
import DetailModal from "@/components/DetailModal.vue"
import { useRouter, useRoute } from "vue-router"
import AddPlaceModal from "./AddPlaceModal.vue"
import { PlaceModalStore } from "@/stores/PlaceModal"
import { usePlacesStore } from "@/stores/fetchPlaces"
import { useSearchStore } from "@/stores/searchPlaces"

const placesStore = usePlacesStore()
const searchStore = useSearchStore()
const modalStore = PlaceModalStore()
const scrollPosition = ref(0)
const places = ref([])
const router = useRouter()
const route = useRoute()

const isPlacesComponent = ref(true)

const schedulesListRef = ref(null)

// search bar 跟著右側列表伸縮寬度
const topBarSwitch = computed(() => {
  return schedulesListRef?.value?.listOpen
    ? "w-[75%] transition-all"
    : "w-full lg:w-[98%]"
})

// waterfall 跟著右側列表伸縮寬度
const waterFallSwitch = computed(() => {
  return schedulesListRef?.value?.listOpen
    ? "lg:pe-[420px] transition-all"
    : "px-10"
})

const searchBarBg = computed(() => {
  return isPlacesComponent.value?"bg-slate-100": ""
})

const isModalOpen = computed(() => route.query.action === "placeInfo")
const currentPlaceId = computed(() => route.query.placeId)
const handleOpenDetailModal = (detailId) => {
  router.push({
    path: "/planner",
    query: { action: "placeInfo", placeId: detailId }, 
  })
}

const currentPlace = computed(() => {
  if (!currentPlaceId.value || !places.value.length) return null
  return places.value.find((place) => place.id === currentPlaceId.value)
})

const closeDetailModal = () => {
  router.push({ path: "/planner" })
}

// 監聽searchData
watch(
  () => searchStore.searchData,
  (newData) => {
    if (newData.length > 0) {
      placesStore.updateFromSearch(newData)
    }
  },
  { immediate: true }
)

const handleUpdateIsPlacesComponent = (value) => {
  isPlacesComponent.value = value  
}

// 避免打開或關掉任何Modal時往卷軸彈到最上方
watch(
  () => isModalOpen.value || modalStore.isOpen,
  (newVal) => {
    if (newVal) {
      scrollPosition.value = window.scrollY

      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollPosition.value}px`
      document.body.style.width = `calc(100% - ${scrollBarWidth}px)`
    } else {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""

      // 等瀑布流渲染完成再恢復滾動（不然會置頂）
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition.value,
        })
      }, 0)
    }
  }
)
</script>

<template>
  <div class="fixed z-40 w-full top-11 lg:top-0 lg:h-20" :class="searchBarBg">
    <div
      class="absolute top-0 left-0 z-10 flex gap-4 transition-all item-center lg:top-5 lg:left-8"
      :class="topBarSwitch"
    >
      <SearchBar class="flex justify-end w-full lg:ml-20" />
      <MapToggle
        class="justify-start hidden mr-24 lg:flex item-center"
        v-model:isPlacesComponent="isPlacesComponent"
      />
      <MapToggle
        class="fixed bottom-5 left-1/2 -translate-x-1/2 justify-center item-center md:left-[44%] lg:hidden"
        v-model:isPlacesComponent="isPlacesComponent"
      />
    </div>
    <ScheduleSideBar ref="schedulesListRef" class="z-20"/>
  </div>

  <!-- 瀑布流 -->
  <Transition name="places">
    <PlacesComponent
      v-if="isPlacesComponent"
      class="absolute top-0 transition-all"
      :class="waterFallSwitch"
      @open-detail-modal="handleOpenDetailModal"
      @updateIsPlacesComponent="handleUpdateIsPlacesComponent"
    />
  </Transition>

  <!-- modal區 -->
  <Transition name="detail">
    <DetailModal
      class="fixed top-0 left-0 z-40 flex-auto"
      v-if="isModalOpen"
      :place="currentPlace"
      @close="closeDetailModal"
    />
  </Transition>

  <Transition name="detail">
    <AddPlaceModal
      class="fixed top-0 z-50"
      v-if="modalStore.isOpen"
      :map="map"
    />
  </Transition>
</template>

<style scoped>
.places-enter-active,
.places-leave-active {
  transition: all 0.3s ease;
}

.places-enter-from,
.places-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.detail-enter-active,
.detail-leave-active {
  transition: all 0.3s ease;
}

.detail-enter-from,
.detail-leave-to {
  opacity: 0;
  transform: translateY(-5%);
}
</style>
