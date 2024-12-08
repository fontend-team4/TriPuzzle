import { defineStore } from "pinia";

export const PlaceModalStore = defineStore("PlaceModal", {
  state: () => ({
    isOpen: false, // Modal 狀態
  }),
  actions: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
  },
});
