import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useSearchStore = defineStore('searchStore', () => {
  const keyword = ref('')
  const region = ref('')
  const selectedTab = ref('')
  const selectedMdTab = ref('')
  const mapCenter = ref({ lat: 0, lng: 0 })

  const fetchData = async (params) => {
    try {
      const { data } = await axios.get('http://localhost:3000/places/search', {
        params,
      })
      console.log(params)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const getCoordinates = () => {
    mapCenter.value = map.value.getCenter().toJSON()
  }

  const textSearch = () => {
    fetchData({
      query: keyword.value,
      latitude: 25.0335715,
      longitude: 121.5649428,
      // latitude: mapCenter.value.lat,
      // longitude: mapCenter.value.lng,
    })
  }

  const mapSearch = () => {
    fetchData({
      // type: selectedTab.value || selectedMdTab.value,
      type: 'restaurant',
      latitude: mapCenter.value.lat,
      longitude: mapCenter.value.lng,
    })
  }

  const typeSearch = () => {
    fetchData({
      type: selectedTab.value || selectedMdTab.value,
      // latitude: mapCenter.value.lat,
      // longitude: mapCenter.value.lng,
      latitude: 25.0335715,
      longitude: 121.5649428,
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
    getCoordinates,
    textSearch,
    mapSearch,
    typeSearch,
    regionSearch,
  }
})
