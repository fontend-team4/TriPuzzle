<script setup>
import { PlusCircleIcon } from "@heroicons/vue/24/solid";
import { PlaceModalStore } from "@/stores/PlaceModal";
import { LoginModalStore } from "@/stores/LoginModal.js"

const LoginStore = LoginModalStore()
const modalStore = PlaceModalStore();

const openAppPlaceModal = async() => {
  // console.log('Opening modal') // 新增除錯訊息
  // await nextTick()
  const token=localStorage.getItem('token')
  if(!token){
    LoginStore.openModal()
  }else
  modalStore.openModal(); // 打開 Modal
};


</script>

<template>
      <button class="inline-flex items-center justify-between p-2 pl-3 overflow-hidden text-base text-white transition-colors rounded-full bg-secondary-500 hover:bg-secondary-600" @click="openAppPlaceModal">加入行程 <PlusCircleIcon class="size-6"/> </button>
</template>