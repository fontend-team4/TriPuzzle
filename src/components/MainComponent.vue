<script setup>
import PlacesComponent from './PlacesComponent.vue';
import MapComponent from './MapComponent.vue';
import MapToggle from './MapToggle.vue';
import PlacesModal from './PlacesModal.vue';
import { ref, computed } from "vue";

const isPlacesComponent = ref(true);

const placesComponentCls = computed(() => {
    return isPlacesComponent.value ? [""] : ["translate-y-full opacity-0"];
});


</script>

<template>
  <div class="relative h-screen overflow-hidden">
    <MapComponent />
    <PlacesComponent class="absolute top-0 z-10 transition-all " :class="placesComponentCls" />
    <MapToggle class="absolute z-20 -translate-x-1/2 bottom-10 left-1/2" v-model:isPlacesComponent="isPlacesComponent" />
    <PlacesModal />
  </div>
</template>
