<script setup>
import { PlusCircleIcon } from "@heroicons/vue/24/solid";
import { computed ,ref, defineProps, defineEmits } from 'vue'
import { PlaceModalStore } from "@/stores/PlaceModal";

const modalStore = PlaceModalStore();

const openAppPlaceModal = () => {
  modalStore.openModal(); // 打開 Modal
};


</script>

<template>
      <button class="inline-flex items-center justify-between p-2 pl-3 overflow-hidden text-base text-white transition-colors rounded-full bg-secondary-500 hover:bg-secondary-600" @click="openAppPlaceModal">加入行程 <PlusCircleIcon class="size-6"/> </button>
</template>