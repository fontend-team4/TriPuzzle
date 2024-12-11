<script setup>
import { computed, ref, watch } from 'vue'
import SearchBar from './SearchBar.vue'
import MapToggle from './MapToggle.vue'
import PlacesComponent from './PlacesComponent.vue'
import ScheduleSideBar from './ScheduleSideBar.vue'
import DetailModal from '@/components/DetailModal.vue';
import { useRouter, useRoute } from "vue-router";
import defaultPlaces from "../../defaultPlaces.json"
import AddPlaceModal from './AddPlaceModal.vue'
import { PlaceModalStore } from "@/stores/PlaceModal";

const modalStore = PlaceModalStore();
const router = useRouter();
const route = useRoute();


const isPlacesComponent = ref(true);


// ScheduleList
const schedulesListRef = ref(null)

// search bar 跟著右側列表伸縮寬度
const topBarSwitch = computed(()=> {
  return schedulesListRef?.value?.listOpen ? 'w-[75%] transition-all' : 'w-full lg:w-[98%]'
})

// waterfall 跟著右側列表伸縮寬度
const waterFallSwitch = computed(()=> {
  return schedulesListRef?.value?.listOpen ? 'lg:pe-[420px] transition-all' : 'px-10'
})


const isModalOpen = computed(() => route.query.action === "placeInfo");
const currentPlaceId = computed(() => route.query.placeId);
const currentPlace = computed(() =>
  defaultPlaces.find((place) => place.id === Number(currentPlaceId.value))
);

const handleOpenDetailModal = (detailId) => {
  router.push({
    path: "/planner",
    query: { action: "placeInfo", placeId: detailId },
  });
};

const closeDetailModal = () => {
  router.push({ path: "/planner" });
};



</script>

<template>
  <div class="fixed top-0 z-40 w-full h-20 bg-slate-100">
    <div class="absolute top-0 left-0 z-10 flex gap-4 transition-all item-center lg:top-5 lg:left-8 " :class="topBarSwitch" >
    <SearchBar class="flex justify-end w-full lg:ml-20 "/>
    <MapToggle 
    class="justify-start hidden mr-24 lg:flex item-center"
    v-model:isPlacesComponent="isPlacesComponent" />
    </div>
    <ScheduleSideBar ref="schedulesListRef"/>
  </div>

  <!-- 瀑布流 -->
  <Transition name="places">
      <PlacesComponent v-if="isPlacesComponent" class="absolute top-0 transition-all" :class="waterFallSwitch" @open-detail-modal="handleOpenDetailModal" />
  </Transition>




  <!-- modal區 -->
  <Transition name="detail" >
    <DetailModal class="fixed top-0 left-0 z-40 flex-auto" v-if="isModalOpen" :place="currentPlace" @close="closeDetailModal"/>
  </Transition>

  <Transition name="detail">
    <AddPlaceModal class="fixed top-0 z-50 " v-if="modalStore.isOpen" />
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