<script setup>
import { ref } from 'vue'
import axios from 'axios'
import SideBar from '@/components/SideBar.vue'
import MapComponent from '@/components/MapComponent.vue'
import MainComponent from '@/components/MainComponent.vue'

const activeCategory = ref('')
const activeMdCategory = ref('')
const searchQuery = ref('')
const mapCenter = ref({ lat: 25.033964, lng: 121.564468 })

const fetchData = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/places/search?
      latitude=${mapCenter.value.lat}
      &longitude=${mapCenter.value.lng}
      &query=101`
    )
    console.log(data)
    return data
  } catch (error) {
    console.error(error.response?.data || error.message)
    throw error
  }
}

const updateMapCenter = (center) => {
  mapCenter.value = center
  fetchData()
}
const updateFilters = (filters) => {
  activeCategory.value = filters.selectedTab
  searchQuery.value = filters.searchQuery
  fetchData()
}
</script>

<template>
  <SideBar />
  <MapComponent @coordinate-changed="updateMapCenter" />
  <MainComponent
    class="h-screen overflow-hidden"
    @filters-updated="updateFilters"
  />
</template>

<!-- {
  type: activeCategory.value || activeMdCategory.value,
  query: searchQuery.value,
  latitude: mapCenter.value.lat,
  longitude: mapCenter.value.lng,
    &type=${activeCategory.value || activeMdCategory.value}
      &query=${searchQuery.value}`
} -->
