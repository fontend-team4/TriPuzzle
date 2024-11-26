<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { GlobeAsiaAustraliaIcon } from '@heroicons/vue/24/solid'
import MapToggle from './components/MapToggle.vue'
import DetailModal from './components/DetailModal.vue'
import DetailCarousel from './components/DetailCarousel.vue'
import PlacesComponent from './components/PlacesComponent.vue'
import PlacesModal from './components/PlacesModal.vue'
import MapComponent from './components/MapComponent.vue'
import SearchBar from './components/SearchBar.vue';


</script>

<template>
    <RouterView />
    <nav class="flex gap-6 text-xl font-bold text-orange-800 underline ">
      <RouterLink to="/">HOME</RouterLink>
      <RouterLink to="/planner">PLANNER</RouterLink>
      <RouterLink to="/member">MEMBER</RouterLink>
    </nav>
</template>


