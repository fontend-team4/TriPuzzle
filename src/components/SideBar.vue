<script setup>
import { ref } from 'vue';
import LoginDialog from './LoginDialog.vue';
import {
  MagnifyingGlassIcon,
  LightBulbIcon,
  UserCircleIcon,
  Bars3Icon,
} from '@heroicons/vue/24/solid';
import { LoginModalStore } from '@/stores/LoginModal.js'
const LoginStore = LoginModalStore()


const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const isLoginDialogOpen = ref(false);
const openLoginDialog = () => {
  isLoginDialogOpen.value = true;
};
const closeLoginDialog = () => {
  isLoginDialogOpen.value = false;
};
</script>

<template>
  <button
    class="fixed z-50 p-2 text-black bg-white rounded-lg shadow top-4 left-5 lg:hidden"
    @click="toggleMenu"
    aria-label="Toggle Menu"
    :aria-expanded="isMenuOpen ? 'true' : 'false' "
  >
    <Bars3Icon class="w-4 h-4" />
  </button>
  <div
    id="menu"
    :class="[
      'flex-col items-start p-4 pt-6 bg-white shadow-2xl h-screen transition-all duration-200 w-20 hover:w-52 group fixed top-0 z-50',
      isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
    @mouseover="isMenuOpen = true"
    @mouseleave="isMenuOpen = false"
  >
    <div class="flex items-center">
      <RouterLink to="/planner">
        <img
          src="https://web.chictrip.com.tw/assets/logo.26916d07.svg"
          alt="Logo"
          class="w-10 mb-3"
        />
      </RouterLink>
    </div>
    <ul class="w-full space-y-2">
      <li class="flex items-center p-2 transition-all rounded-lg hover:bg-primary-100">
        <button class="flex w-full">
          <RouterLink to="/planner">
            <div class="flex">
              <MagnifyingGlassIcon class="flex-none w-6 h-6 text-slate-500" />
              <span
                class="hidden ml-3 font-medium transition-opacity duration-500 delay-500 opacity-0 group-hover:opacity-100 group-hover:inline-block whitespace-nowrap text-slate-500 hover:text-primary-800"
              >
                發現
              </span>
            </div>
          </RouterLink>
        </button>
      </li>
      <li class="flex items-center p-2 transition-all rounded-lg hover:bg-primary-100">
        <button class="flex w-full">
          <RouterLink to="/">
            <div class="flex">
              <LightBulbIcon class="flex-none w-6 h-6 text-slate-500" />
              <span
                class="hidden ml-3 font-medium transition-opacity duration-500 delay-500 opacity-0 group-hover:opacity-100 group-hover:inline-block whitespace-nowrap text-slate-500 hover:text-primary-800"
              >
                認識旅圖
              </span>
            </div>
          </RouterLink>
        </button>
      </li>
      <hr class="w-full my-4 border-t border-gray" />
      <li class="flex items-center p-2 transition-all rounded-lg hover:bg-primary-100">
        <button class="flex w-full" @click="LoginStore.openModal()">
          <UserCircleIcon class="flex-none w-6 h-6 text-slate-500" />
          <span
            class="hidden ml-3 font-medium transition-opacity duration-500 delay-500 opacity-0 group-hover:opacity-100 group-hover:inline-block whitespace-nowrap text-slate-500 hover:text-primary-800"
          >
            會員
          </span>
        </button>
      </li>
    </ul>
  </div>
  <!-- <LoginDialog class="z-20" v-if="isLoginDialogOpen" @close="closeLoginDialog" /> -->
  <LoginDialog class="z-20" v-if="LoginStore.isOpen" @close="LoginStore.closeModal" />
  <div>
  </div>
</template>

<style scoped>

</style>