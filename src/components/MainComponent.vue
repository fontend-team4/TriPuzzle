<script setup>
import { computed, ref } from 'vue'
import SearchBar from './SearchBar.vue'
import MapToggle from './MapToggle.vue'
import PlacesComponent from './PlacesComponent.vue'
import ScheduleSideBar from './ScheduleSideBar.vue'
import DetailModal from '@/components/DetailModal.vue';
import { useRouter, useRoute } from "vue-router";
import fakeLocation from "../../fakeLocation.json";

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

// const handleOpenPlaceDetails = (detailId) => {
//   router.push({ path: '/planner', query: { action: 'placeInfo', placeId: detailId } });
// };


const isModalOpen = computed(() => route.query.action === "placeInfo");
const currentPlaceId = computed(() => route.query.placeId);
const currentPlace = computed(() =>
  fakeLocation.find((place) => place.id === Number(currentPlaceId.value))
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
 
  <DetailModal class="absolute top-0 left-0 z-50 flex-auto " v-if="isModalOpen" :place="currentPlace" @close="closeDetailModal"/>
  <div class="absolute top-0 left-0 z-10 flex gap-4 transition-all item-center lg:top-5 lg:left-8" :class="topBarSwitch">
    <SearchBar class="flex justify-end w-full lg:ml-20"/>
    <MapToggle 
    class="justify-start hidden mr-24 lg:flex item-center"
    v-model:isPlacesComponent="isPlacesComponent" />
    <MapToggle 
      class="fixed bottom-5 left-1/2 -translate-x-1/2 justify-center item-center md:left-[44%] lg:hidden"
      v-model:isPlacesComponent="isPlacesComponent" />
  </div>
  <PlacesComponent v-if="isPlacesComponent" class="absolute top-0 transition-all" :class="waterFallSwitch" @open-detail-modal="handleOpenDetailModal" />
  <ScheduleSideBar ref="schedulesListRef"/>



</template>

<style>

</style>