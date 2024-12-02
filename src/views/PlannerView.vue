<script setup>
import { computed, ref } from 'vue'
import SideBar from '@/components/SideBar.vue';
import MainComponent from '@/components/MainComponent.vue';
import SearchBar from '@/components/SearchBar.vue';
import MapToggle from '@/components/MapToggle.vue';
import PlacesComponent from '@/components/PlacesComponent.vue';
import MapComponent from '@/components/MapComponent.vue';

const isPlacesComponent = ref(true);


const placesComponentCls = computed(() => {
    return isPlacesComponent.value ? [""] : ["translate-y-full opacity-0"];
});

</script>

<template>
  <div class="main-container">
    <SideBar />
    <div class="flex relative w-screen item-center gap-2  bg-slate-100">
      <!-- 搜尋欄 -->
      <SearchBar class="flex lg:w-[75%]  justify-end w-full  lg:ml-20"/>
      <MapToggle 
        class="hidden top-0 right-4 justify-start item-center mr-24 lg:absolute lg:flex"
        v-model:isPlacesComponent="isPlacesComponent" />
    </div>
    <div class="relative w-screen ">
      <!-- 地圖/景點牆 -->
      <div class="absolute h-screen overflow-x-hidden lg:pl-12">
        <MapComponent />
        <PlacesComponent class="absolute top-0  transition-all" 
        :class="placesComponentCls" />
      </div>
      <MapToggle 
        class="fixed bottom-0 left-[40%] justify-center item-center md:left-[44%] lg:hidden"
        v-model:isPlacesComponent="isPlacesComponent" />
    </div>
    <MainComponent />
  </div>
</template>