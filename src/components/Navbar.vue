<script setup>
import { defineEmits, ref } from "vue"
import { useRouter } from "vue-router"
import { PuzzlePieceIcon, Bars3Icon } from "@heroicons/vue/20/solid"
import { useLoadingStore } from "@/stores/loading"

const loadingStore = useLoadingStore()
const isOpen = ref(false)
const router = useRouter()

const openDropdown = () => {
  isOpen.value = !isOpen.value
}
const emit = defineEmits(["clickTab"])
const clickTab = (sectionName) => {
  emit("clickTab", sectionName)
}
const goToPlanner = () => {
  loadingStore.showLoading()
  router.push("/planner")
  loadingStore.hideLoading()
}
</script>

<template>
  <LoadingOverlay :active="loadingStore.isLoading">
    <div class="loadingio-spinner-ellipsis-nq4q5u6dq7r"><div class="ldio-x2uulkbinbj">
    <div></div><div></div><div></div><div></div><div></div>
    </div></div>
  </LoadingOverlay>
  <nav
    class="border-b border-neutral-200 bg-white z-10 w-screen fixed top-0 md:hidden"
  >
    <div class="relative flex justify-end items-center my-3 mx-3">
      <div class="flex items-center flex-1">
        <Bars3Icon class="w-6 h-6 text-neutral-800" @click="openDropdown" />
        <img src="@/assets/svg/Logo.svg" class="ml-3 w-auto h-8" />
      </div>
      <button
        @click="goToPlanner"
        class="flex gap-1 items-center bg-primary-800 px-2 py-[6px] text-xs text-neutral-50 rounded-full hover:bg-primary-600"
      >
        <PuzzlePieceIcon class="w-4 h-4 text-neutral-50" />
        拼湊旅圖
      </button>
    </div>
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="absolute top-14 left-0 w-full bg-primary-50 shadow-xl rounded-2xl"
    >
      <ul class="flex flex-col p-3 gap-2 text-sm font-bold text-neutral-800">
        <li
          class="p-2 hover:bg-primary-100 hover:text-primary-800"
          @click="clickTab('carousel')"
        >
          達人旅圖
        </li>
        <li
          class="p-2 hover:bg-primary-100 hover:text-primary-800"
          @click="clickTab('features')"
        >
          功能特點
        </li>
        <li
          class="p-2 hover:bg-primary-100 hover:text-primary-800"
          @click="clickTab('register')"
        >
          註冊會員
        </li>
      </ul>
    </div>
  </nav>

  <nav
    class="border-b-2 border-neutral-200 bg-white z-10 sticky top-0 hidden md:block"
  >
    <div
      class="w-9/12 max-w-7xl min-w-max py-4 mx-auto flex justify-between items-center"
    >
      <img
        src="@/assets/svg/Logo.svg"
        class="flex-none cursor-pointer"
        @click="clickTab('top')"
      />
      <ul class="flex gap-4 text-neutral-800">
        <li
          class="px-[18px] py-4 cursor-pointer hover:text-primary-800"
          @click="clickTab('carousel')"
        >
          達人旅圖
        </li>
        <li
          class="px-[18px] py-4 cursor-pointer hover:text-primary-800"
          @click="clickTab('features')"
        >
          功能特點
        </li>
        <li
          class="px-[18px] py-4 cursor-pointer hover:text-primary-800"
          @click="clickTab('tutorial')"
        >
          關於旅圖
        </li>
        <li
          class="px-[18px] py-4 cursor-pointer hover:text-primary-800"
          @click="clickTab('register')"
        >
          註冊會員
        </li>
      </ul>
      <button
        @click="goToPlanner"
        class="flex gap-1 items-center bg-primary-800 px-5 py-2 ml-4 text-base text-neutral-50 rounded-full hover:bg-primary-600"
      >
        <PuzzlePieceIcon class="w-5 h-5 text-neutral-50" />
        拼湊旅圖
      </button>
    </div>
  </nav>
</template>

<style>
@keyframes ldio-x2uulkbinbj {
  0% { transform: translate(14px,82px) scale(0); }
  25% { transform: translate(14px,82px) scale(0); }
  50% { transform: translate(14px,82px) scale(1); }
  75% { transform: translate(82px,82px) scale(1); }
  100% { transform: translate(150px,82px) scale(1); }
}
@keyframes ldio-x2uulkbinbj-r {
  0% { transform: translate(150px,82px) scale(1); }
  100% { transform: translate(150px,82px) scale(0); }
}
@keyframes ldio-x2uulkbinbj-c {
  0% { background: #b12824 }
  25% { background: #fbcecd }
  50% { background: #f17b78 }
  75% { background: #d23430 }
  100% { background: #b12824 }
}
.ldio-x2uulkbinbj div {
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transform: translate(82px,82px) scale(1);
  background: #b12824;
  animation: ldio-x2uulkbinbj 2.5s infinite cubic-bezier(0,0.5,0.5,1);
}
.ldio-x2uulkbinbj div:nth-child(1) {
  background: #d23430;
  transform: translate(150px,82px) scale(1);
  animation: ldio-x2uulkbinbj-r 0.625s infinite cubic-bezier(0,0.5,0.5,1), ldio-x2uulkbinbj-c 2.5s infinite step-start;
}.ldio-x2uulkbinbj div:nth-child(2) {
  animation-delay: -0.625s;
  background: #b12824;
}.ldio-x2uulkbinbj div:nth-child(3) {
  animation-delay: -1.25s;
  background: #d23430;
}.ldio-x2uulkbinbj div:nth-child(4) {
  animation-delay: -1.875s;
  background: #f17b78;
}.ldio-x2uulkbinbj div:nth-child(5) {
  animation-delay: -2.5s;
  background: #fbcecd;
}
.loadingio-spinner-ellipsis-nq4q5u6dq7r {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-x2uulkbinbj {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-x2uulkbinbj div { box-sizing: content-box; }
</style>