import { defineStore } from 'pinia'

export const usePlaceStore = defineStore('placeStore', {
  state: () => ({
    selectedPlace: null,
  }),
  actions: {
    setSelectedPlace(place) {
      this.selectedPlace = place
    },
  },
})
