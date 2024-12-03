<script setup>
import { computed, ref } from 'vue'
import SearchBar from './SearchBar.vue'
import MapToggle from './MapToggle.vue'
import PlacesComponent from './PlacesComponent.vue'
import ScheduleSideBar from './ScheduleSideBar.vue'

const isPlacesComponent = ref(true);

const placesComponentCls = computed(() => {
    return isPlacesComponent.value ? [""] : ["translate-y-full opacity-0"];
});

// ScheduleList
const schedulesListRef = ref(null)

// search bar 跟著右側列表伸縮寬度
const topBarSwitch = computed(()=> {
  return schedulesListRef?.value?.listOpen ? 'w-[75%] transition-all' : 'w-[98%]'
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
  </div>
  <PlacesComponent class="absolute top-0 transition-all" :class="waterFallSwitch, placesComponentCls" />
  <ScheduleSideBar ref="schedulesListRef"/>
  
  <!-- <div class="flex relative w-screen item-center gap-2  bg-slate-100"> -->
  <!-- 搜尋欄 -->
  <!-- <SearchBar class="flex lg:w-[75%]  justify-end w-full  lg:ml-20"/>
  <MapToggle 
    class="hidden top-0 right-4 justify-start item-center mr-24 lg:absolute lg:flex"
    v-model:isPlacesComponent="isPlacesComponent" />
  </div> -->
  <!-- 地圖/景點牆 -->
  <!-- <div class="relative w-screen ">
    <div class="absolute h-screen overflow-x-hidden lg:pl-12">
      <MapComponent />
      <PlacesComponent class="absolute top-0  transition-all" 
      :class="placesComponentCls" />
    </div>
    <MapToggle 
      class="fixed bottom-0 left-[40%] justify-center item-center md:left-[44%] lg:hidden"
      v-model:isPlacesComponent="isPlacesComponent" />
  </div> -->
</template>

<style>

</style>