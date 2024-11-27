<script setup>
import { ref } from 'vue';
import LoginDialog from './LoginDialog.vue';
import {
  MagnifyingGlassIcon,
  LightBulbIcon,
  UserCircleIcon,
  Bars3Icon,
} from '@heroicons/vue/24/solid';

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
  <div>
    <button
      class="fixed top-2 left-5 z-60 bg-white text-black p-2 rounded-lg shadow lg:hidden"
      @click="toggleMenu"
      aria-label="Toggle Menu"
      :aria-expanded="isMenuOpen ? 'true' : 'false' "
    >
      <Bars3Icon class="w-4 h-4" />
    </button>
    <div
      id="menu"
      :class="[
        'flex-col items-start p-4 bg-white shadow-2xl h-screen transition-all duration-200 w-20 hover:w-52 group fixed top-0 z-50',
        isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
      @mouseover="isMenuOpen = true"
      @mouseleave="isMenuOpen = false"
    >
      <div class="flex items-center">
        <RouterLink to="/planner">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
            alt="Logo"
            class="w-10 mb-3"
          />
        </RouterLink>
      </div>
      <ul class="space-y-2 w-full">
        <li class="flex items-center p-2 hover:bg-primary-100 hover:text-primary-800 rounded-lg transition-all">
          <button class="flex w-full">
            <RouterLink to="/planner">
              <div class="flex">
                <MagnifyingGlassIcon class="w-6 h-6 flex-none" />
                <span
                  class="ml-3 font-medium opacity-0 group-hover:opacity-100 hidden group-hover:inline-block transition-opacity duration-500 delay-500 whitespace-nowrap"
                >
                  發現
                </span>
              </div>
            </RouterLink>
          </button>
        </li>
        <li class="flex items-center p-2 hover:bg-primary-100 hover:text-primary-800 rounded-lg transition-all">
          <button class="flex w-full">
            <RouterLink to="/home">
              <div class="flex">
                <LightBulbIcon class="w-6 h-6 flex-none" />
                <span
                  class="ml-3 font-medium opacity-0 group-hover:opacity-100 hidden group-hover:inline-block transition-opacity duration-500 delay-500 whitespace-nowrap"
                >
                  認識旅圖
                </span>
              </div>
            </RouterLink>
          </button>
        </li>
        <hr class="border-t my-4 w-full" />
        <li class="flex items-center p-2 hover:bg-primary-100 hover:text-primary-800 rounded-lg transition-all">
          <button class="flex w-full" @click="openLoginDialog">
            <UserCircleIcon class="w-6 h-6 flex-none" />
            <span
              class="ml-3 font-medium opacity-0 group-hover:opacity-100 hidden group-hover:inline-block transition-opacity duration-500 delay-500 whitespace-nowrap"
            >
              會員
            </span>
          </button>
        </li>
      </ul>
    </div>
    <LoginDialog v-if="isLoginDialogOpen" @close="closeLoginDialog" />
  </div>
</template>

<style scoped>

</style>