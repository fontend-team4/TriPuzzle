import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useSearchStore = defineStore('searchStore', () => {
  const keyword = ref('')
  const region = ref('')
  const selectedTab = ref('')
  const selectedMdTab = ref('')
  const mapCenter = ref({ lat: 24.998564, lng: 121.576222 })

  const fetchData = async (params) => {
    try {
      const { data } = await axios.get('http://localhost:3000/places/search', {
        params,
      })
      console.log(params)
      console.log(data)
      return data
    } catch (error) {
      console.log(params)
      throw error
    }
  }

  const textSearch = () => {
    fetchData({
      query: keyword.value,
      latitude: mapCenter.value.lat,
      longitude: mapCenter.value.lng,
    })
  }

  const mapSearch = () => {
    fetchData({
      type: selectedTab.value || selectedMdTab.value,
      latitude: mapCenter.value.lat,
      longitude: mapCenter.value.lng,
    })
  }

  const typeSearch = () => {
    fetchData({
      type: selectedTab.value || selectedMdTab.value,
      latitude: mapCenter.value.lat,
      longitude: mapCenter.value.lng,
    })
  }

  const regionSearch = () => {
    fetchData({
      city: region.value,
      type: selectedTab.value || selectedMdTab.value,
    })
  }

  return {
    keyword,
    region,
    selectedTab,
    selectedMdTab,
    mapCenter,
    fetchData,
    textSearch,
    mapSearch,
    typeSearch,
    regionSearch,
  }
})