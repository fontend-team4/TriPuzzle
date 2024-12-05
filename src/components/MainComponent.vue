<script setup>
import { computed, ref } from 'vue'
import SearchBar from './SearchBar.vue'
import MapToggle from './MapToggle.vue'
import PlacesComponent from './PlacesComponent.vue'
import ScheduleSideBar from './ScheduleSideBar.vue'

const isPlacesComponent = ref(true);

// 改用 v-if 不然下面會佔位
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
</script>

<template>
  <div class="flex item-center gap-4 absolute top-0 lg:top-5 left-0 lg:left-8 transition-all z-10" :class="topBarSwitch">
    <SearchBar class="w-full flex justify-end lg:ml-20"/>
    <MapToggle 
    class="hidden lg:flex justify-start item-center mr-24"
    v-model:isPlacesComponent="isPlacesComponent" />
    <MapToggle 
      class="fixed bottom-5 left-1/2 -translate-x-1/2 justify-center item-center md:left-[44%] lg:hidden"
      v-model:isPlacesComponent="isPlacesComponent" />
  </div>
  <PlacesComponent v-if="isPlacesComponent" class="absolute top-0 transition-all" :class="waterFallSwitch" />
  <ScheduleSideBar ref="schedulesListRef"/>
</template>

<style>

</style>