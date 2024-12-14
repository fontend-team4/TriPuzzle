import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';

export const PlaceModalStore = defineStore('PlaceModal', () => {
  const isOpen = ref(false);

  const openModal = () => {
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  const toggleModal = () => {
    isOpen.value = !isOpen.value;
  };

  return { isOpen, openModal, closeModal, toggleModal };
});