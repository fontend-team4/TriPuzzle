import { defineStore } from "pinia"

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

export const usePlacesStore = defineStore("places", {
  state: () => ({
    places: [], // 原始地點資料
    items: [], // 處理後的顯示資料
  }),

  actions: {
    initializeItems() {
      this.items = this.places.map((location) => ({
        id: location.place_id,
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${location.photos}&key=${GOOGLE_API_KEY}`,
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
})
