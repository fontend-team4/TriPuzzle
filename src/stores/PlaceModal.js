import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

const PlaceModalStore = defineStore('PlaceModal', () => {
  const isOpen = ref(false)
  const selectedPlace = ref(null)

  const savePlace = (place) => {
    selectedPlace.value = place
  }
  const openModal = () => {
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
  }

  const toggleModal = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    selectedPlace,
    savePlace,
    openModal,
    closeModal,
    toggleModal,
  }
})

export { PlaceModalStore }
