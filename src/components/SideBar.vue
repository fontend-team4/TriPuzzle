<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import LoginDialog from "./LoginDialog.vue"
import {
  MagnifyingGlassIcon,
  LightBulbIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/vue/24/solid"
import { LoginModalStore } from "@/stores/LoginModal.js"
const LoginStore = LoginModalStore()

const router = useRouter()
// 判斷是否為登入狀態，未登入才會跳登入彈窗，已登入直接進到 member 頁面
const checkIfIsLogin = () => {
  const token = localStorage.getItem("token")
  if (!token) {
    LoginStore.openModal()
  } else {
    router.push("/member")
  }
}

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="fixed z-10 p-2 text-black bg-white shadow top-0 left-0 w-full lg:hidden">
    <div class="flex justify-between">
      <button
        @click="toggleMenu"
        aria-label="Toggle Menu"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
      >
        <Bars3Icon class="w-5 h-5" />
      </button>
      <router-link to='/'>
        <img class="w-20" src="../assets/svg/Logo.svg" alt="">
      </router-link>
    </div>
  </div>
  <div
    id="menu"
    :class="[
      'flex-col items-start p-4 pt-6 bg-white shadow-2xl h-screen transition-all duration-700 w-20 hover:w-52 group fixed top-0 z-50',
      isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
    @mouseover="isMenuOpen = true"
    @mouseleave="isMenuOpen = false"
  >
    <div class="flex items-center">
        <RouterLink to="/planner">
          <img v-if="!isMenuOpen" src="../assets/svg/logo-dark.svg" alt="Logo" class="w-12 mb-3" />
          <img src="../assets/svg/Logo.svg" alt="Logo" 
            class="hidden ml-1 mb-4 font-medium group-hover:inline-block whitespace-nowrap text-slate-500 transform transition-transform duration-300" />
        </RouterLink>
    </div>
    <ul class="w-full space-y-2">
      <li
        class="flex items-center p-2 transition-all rounded-lg hover:bg-primary-100"
      >
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
      <li
        class="flex items-center p-2 transition-all rounded-lg hover:bg-primary-100"
      >
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
      <li
        class="flex items-center p-2 transition-all rounded-lg hover:bg-primary-100"
      >
        <button class="flex w-full" @click="checkIfIsLogin">
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
  <LoginDialog
    class="z-20"
    v-if="LoginStore.isOpen"
    @close="LoginStore.closeModal"
  />
  <div></div>
</template>

<style scoped></style>
