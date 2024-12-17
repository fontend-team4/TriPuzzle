<script setup>
import { computed, ref, watch } from 'vue'
import SearchBar from './SearchBar.vue'
import MapToggle from './MapToggle.vue'
import PlacesComponent from './PlacesComponent.vue'
import ScheduleSideBar from './ScheduleSideBar.vue'
import DetailModal from '@/components/DetailModal.vue'
import { useRouter, useRoute } from 'vue-router'
import AddPlaceModal from './AddPlaceModal.vue'
import { PlaceModalStore } from '@/stores/PlaceModal'

import DefaultPlaces from '../../places_default.json'
const modalStore = PlaceModalStore()
const scrollPosition = ref(0)

const places  = DefaultPlaces
const router = useRouter()
const route = useRoute()

const isPlacesComponent = ref(true)

// ScheduleList
const schedulesListRef = ref(null)

// search bar 跟著右側列表伸縮寬度
const topBarSwitch = computed(() => {
  return schedulesListRef?.value?.listOpen
    ? 'w-[75%] transition-all'
    : 'w-full lg:w-[98%]'
})

// waterfall 跟著右側列表伸縮寬度
const waterFallSwitch = computed(() => {
  return schedulesListRef?.value?.listOpen
    ? 'lg:pe-[420px] transition-all'
    : 'px-10'
})

const isModalOpen = computed(() => route.query.action === 'placeInfo')
const currentPlaceId = computed(() => route.query.placeId)
const handleOpenDetailModal = (detailId) => {
  console.log('Opening Detail Modal with ID:', detailId);
  router.push({
    path: '/planner',
    query: { action: 'placeInfo', placeId: detailId }, // 傳遞地點 ID
  })
}

const currentPlace = computed(() => {
  if (!currentPlaceId.value || !places) return null // 防止無效 ID 或 places 未定義
  return places.find((place) => place.place_id === currentPlaceId.value)

  // 把place.id改成了place.place_id
})



const closeDetailModal = () => {
  router.push({ path: '/planner' })
}

// 避免打開或關掉任何Modal時往卷軸彈到最上方
watch(
  () => isModalOpen.value || modalStore.isOpen,
  (newVal) => {
    if (newVal) {
      scrollPosition.value = window.scrollY

      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPosition.value}px`
      document.body.style.width = `calc(100% - ${scrollBarWidth}px)`
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''

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
  <div class="fixed top-0 z-40 w-full h-20 bg-slate-100">
    <div
      class="absolute top-0 left-0 z-10 flex gap-4 transition-all item-center lg:top-5 lg:left-8"
      :class="topBarSwitch"
    >
      <SearchBar class="flex justify-end w-full lg:ml-20" />
      <MapToggle
        class="justify-start hidden mr-24 lg:flex item-center"
        v-model:isPlacesComponent="isPlacesComponent"
      />
    </div>
    <ScheduleSideBar ref="schedulesListRef" />
  </div>

  <!-- 瀑布流 -->
  <Transition name="places">
    <PlacesComponent
      v-if="isPlacesComponent"
      class="absolute top-0 transition-all"
      :class="waterFallSwitch"
      @open-detail-modal="handleOpenDetailModal"
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
    <AddPlaceModal class="fixed top-0 z-50" v-if="modalStore.isOpen" />
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
