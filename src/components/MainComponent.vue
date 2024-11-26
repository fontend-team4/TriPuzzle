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
  <div class="flex w-full py-2 item-center gap-2 ">
    <SearchBar class="flex w-4/5 justify-end"/>
    <MapToggle 
      class="flex justify-start item-center"
      v-model:isPlacesComponent="isPlacesComponent" />
  </div>

  <div class="relative h-screen overflow-hidden">
    <MapComponent />
    <PlacesComponent class="absolute top-0 z-10 transition-all " :class="placesComponentCls" />
    <PlacesModal class="hidden md:block"/>
  </div>
</template>
