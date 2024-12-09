import { defineStore } from 'pinia';
import { ref } from 'vue';

export const DeleteScheduleStore = defineStore('DeleteScheduleModal', () => {
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