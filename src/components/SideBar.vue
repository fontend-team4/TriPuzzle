<script setup>
import { ref } from 'vue';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  StarIcon,
  LightBulbIcon,
  UserCircleIcon,
  Bars3Icon,
} from '@heroicons/vue/24/solid';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="relative">
    <button
      class="lg:hidden fixed top-4 left-20 z-60 bg-white text-black p-2 rounded-lg shadow"
      @click="toggleMenu"
      aria-label="Toggle Menu"
      :aria-expanded="isMenuOpen"
    >
      <Bars3Icon class="w-6 h-6" />
    </button>
    <div
      id="menu"
      :class="[
        'flex-col items-start p-4 space-y-4 bg-white shadow-2xl h-screen transition-all duration-200 w-20 hover:w-52 group fixed top-0 z-50',
        isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <div class="flex items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
          alt="Logo"
          class="w-10 h-10"
        />
      </div>
      <ul class="space-y-2 w-full">
        <li class="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500 rounded-lg transition-all">
          <MagnifyingGlassIcon class="w-6 h-6" />
          <span
            class="ml-3 font-medium opacity-0 group-hover:opacity-100 hidden group-hover:inline-block transition-opacity duration-500 delay-500 whitespace-nowrap"
          >
            發現
          </span>
        </li>
        <li class="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500 rounded-lg transition-all">
          <ShoppingCartIcon class="w-6 h-6" />
          <span
            class="ml-3 font-medium opacity-0 group-hover:opacity-100 hidden group-hover:inline-block transition-opacity duration-500 delay-500 whitespace-nowrap"
          >
            商城
          </span>
        </li>
        <li class="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500 rounded-lg transition-all">
          <StarIcon class="w-6 h-6" />
          <span
            class="ml-3 font-medium opacity-0 group-hover:opacity-100 hidden group-hover:inline-block transition-opacity duration-500 delay-500 whitespace-nowrap"
          >
            去趣星榜單
          </span>
        </li>
        <li class="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500 rounded-lg transition-all">
          <LightBulbIcon class="w-6 h-6" />
          <span
            class="ml-3 font-medium opacity-0 group-hover:opacity-100 hidden group-hover:inline-block transition-opacity duration-500 delay-500 whitespace-nowrap"
          >
            認識去趣
          </span>
        </li>
        <hr class="border-t border-gray-300 my-4 w-full" />
        <li class="flex items-center p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500 rounded-lg transition-all">
          <UserCircleIcon class="w-6 h-6" />
          <span
            class="ml-3 font-medium opacity-0 group-hover:opacity-100 hidden group-hover:inline-block transition-opacity duration-500 delay-500 whitespace-nowrap"
          >
            會員
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  #menu {
    transform: none !important;
  }
}
</style>