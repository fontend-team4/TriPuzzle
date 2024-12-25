import { defineStore } from "pinia"
import axios from "axios"

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

const API_URL = import.meta.env.VITE_HOST_URL


export const usePlacesStore = defineStore("places", {
  state: () => ({
    places: [], // 原始地點資料
    items: [], // 處理後的顯示資料
  }),

  actions: {
    async fetchDefaultPlaces(lat = 25.0341222, lng = 121.5640212) {
      this.items = []
      try {
        const response = await axios.get(
          `${API_URL}/places/search?latitude=${lat}&longitude=${lng}&type=tourist_attraction`
        )
        this.places = response.data
        this.initializeItems()
      } catch (err) {
        console.error(err.message)
        alert("搜尋失敗")
      }
    },

    initializeItems() {
      this.items = this.places.map((location) => ({
        id: location.place_id,
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${location.photos[0]?.photo_reference}&key=${GOOGLE_API_KEY}`,
        name: location.name,

        rating: location.rating || "",
        location: location.address?.split(/[0-9]+/)[1]?.slice(2, 5) || "",
        mapUrl: location.placeUrl,
        isFavorited: false,
        summary: location.summary.overview,
        opening_hours: location.opening_hours,
        phone: location.phone,
        photos: location.photos,
        photos_length: location.photos ? location.photos.length : 0,
        types: location.types,
        geometry: location.geometry,
        address: location.address,
        website: location.website,
        placeUrl: location.placeUrl,
      }))
    },
    updateFromSearch(searchData) {
      this.places = searchData
      this.initializeItems()
    },
  },

  persist: {
    path: ["places", "items"],
  },
})
