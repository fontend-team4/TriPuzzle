import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"

const API_URL = import.meta.env.VITE_HOST_URL


export const useSearchStore = defineStore("searchStore", () => {
  const keyword = ref("")
  const region = ref("")
  const selectedTab = ref("")
  const selectedMdTab = ref("")
  const mapCenter = ref({ lat: 25.0341222, lng: 121.5640212 })
  const searchParams = ref({})
  const searchData = ref([])
  const placeGeometry = ref({})



  const fetchData = async (params) => {
    try {
      const { data } = await axios.get(`${API_URL}/places/search`, {
        params,
      })

      searchParams.value = params
      searchData.value = data
      return data
    } catch (error) {
      return null
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
    searchParams,
    searchData,
    placeGeometry,
  }
})
