<script setup>
import PlacesComponent from './PlacesComponent.vue';
import MapComponent from './MapComponent.vue';
import MapToggle from './MapToggle.vue';
import PlacesModal from './PlacesModal.vue';
import SearchBar from './SearchBar.vue';

import { ref, computed } from "vue";

const isPlacesComponent = ref(true);

const placesComponentCls = computed(() => {
    return isPlacesComponent.value ? [""] : ["translate-y-full opacity-0"];
});


</script>

<template>
  <div class="flex relative w-full item-center gap-2">
    <SearchBar class="flex w-full justify-end"/>
    <MapToggle 
      class="hidden justify-start item-center xl:flex"
      v-model:isPlacesComponent="isPlacesComponent" />
  </div>

  <div class="relative h-screen overflow-hidden">
    <MapComponent />
    <PlacesComponent class="absolute top-0 z-10 transition-all " :class="placesComponentCls" />
    <PlacesModal class="hidden md:block"/>
  </div>
  <MapToggle 
    class="absolute bottom-[1rem] left-[37%] z-20 justify-center item-center md:left-[44%] xl:hidden"
    v-model:isPlacesComponent="isPlacesComponent" />
</template>
