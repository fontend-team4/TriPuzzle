<script setup>
import { computed, ref } from 'vue'
import SearchBar from './SearchBar.vue'
import MapToggle from './MapToggle.vue'
import PlacesComponent from './PlacesComponent.vue'
import ScheduleSideBar from './ScheduleSideBar.vue'
import DetailModal from '@/components/DetailModal.vue';
import { useRouter } from 'vue-router';
const router = useRouter();


const isPlacesComponent = ref(true);

// 改用 v-if 不然下面會佔位 //但這樣動畫會不見（跪地
// const placesComponentCls = computed(() => {
//     return isPlacesComponent.value ? [""] : ["translate-y-full opacity-0"];
// });

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

const handleOpenPlaceDetails = (detailId) => {
  router.push({ path: '/planner', query: { action: 'placeInfo', placeId: detailId } });
};
</script>

<template>
 
  <DetailModal class="absolute top-0 left-0 z-50 flex-auto "/>
  <div class="absolute top-0 left-0 z-10 flex gap-4 transition-all item-center lg:top-5 lg:left-8" :class="topBarSwitch">
    <SearchBar class="flex justify-end w-full lg:ml-20"/>
    <MapToggle 
    class="justify-start hidden mr-24 lg:flex item-center"
    v-model:isPlacesComponent="isPlacesComponent" />
    <MapToggle 
      class="fixed bottom-5 left-1/2 -translate-x-1/2 justify-center item-center md:left-[44%] lg:hidden"
      v-model:isPlacesComponent="isPlacesComponent" />
  </div>
  <PlacesComponent v-if="isPlacesComponent" class="absolute top-0 transition-all" :class="waterFallSwitch" @open-detail-modal="handleOpenPlaceDetails" />
  <ScheduleSideBar ref="schedulesListRef"/>

</template>

<style>

</style>