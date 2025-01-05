import { defineStore, storeToRefs } from "pinia"
import { ref, nextTick } from "vue"

const PlaceModalStore = defineStore("PlaceModal", () => {
  const isOpen = ref(false)
  const selectedPlace = ref(null)

  const savePlace = (place) => {
    selectedPlace.value = place
  }
  const openModal = async () => {
    isOpen.value = true
    // await nextTick()
    // console.log("Modal opened, waiting for initialization...")
    // // 給予額外時間讓 modal 完全打開
    // await new Promise((resolve) => setTimeout(resolve, 100))
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
