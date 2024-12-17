// stores/fetchPlaces.js
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3000'
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

export const usePlacesStore = defineStore('places', {
  state: () => ({
    places: [], // 原始地點資料
    items: [], // 處理後的顯示資料
  }),

  actions: {
    async fetchDefaultPlaces() {
        this.items = []
        const lat = 25.0341222
        const lng = 121.5640212
        // 清空舊資料
        if (this.items.length > 0) return // 防止重複加載資料
      
        try {
          const response = await axios.get(
            `${API_URL}/places/search?latitude=${lat}&longitude=${lng}&type=tourist_attraction`
          )
          this.places = response.data
          this.initializeItems() // 處理資料
        } catch (err) {
          console.error(err.message)
          alert('搜尋失敗')
        }
      },
      

    initializeItems() {
      this.items = this.places.map((location) => ({
        id: location.place_id,
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${location.photos[0]?.photo_reference}&key=${GOOGLE_API_KEY}`,
        name: location.name,
        rating: location.rating || 'N/A',
        location: location.address?.split(/[0-9]+/)[1]?.slice(2, 5) || 'Unknown',
        mapUrl: location.placeUrl,
        isFavorited: false, // 預設為未收藏
        summary: location.summary.overview,
        opening_hours: location.opening_hours,
        phone: location.phone, 
        photos: location.photos,
        types: location.types,
        geometry: location.geometry,
        address: location.address,
        website: location.website,
        placeUrl: location.placeUrl,
      }))
    },
  },

  persist: {
    path:["places" ,"items"]
  },
})
