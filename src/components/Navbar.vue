<script setup>
import { defineEmits } from 'vue'
import { PuzzlePieceIcon, Bars3Icon } from '@heroicons/vue/20/solid'
import { Logo } from '@/components/svg/exportSvg.js'

const emit = defineEmits(['clickTab'])
const clickTab = (sectionName) => {
  emit('clickTab', sectionName)
}
</script>

<template>
  <nav
    class="border-b border-neutral-200 bg-white z-10 w-screen fixed top-0 md:hidden"
  >
    <div class="flex justify-end items-center my-3 mx-3">
      <div class="flex items-center flex-1">
        <Bars3Icon class="w-6 h-6 text-neutral-800" />
        <Logo class="ml-3 w-auto h-8" />
      </div>
      <RouterLink
        to="/planner"
        class="flex gap-1 items-center bg-primary-800 px-2 py-[6px] text-xs text-neutral-50 rounded-full"
      >
        <PuzzlePieceIcon class="w-4 h-4 text-neutral-50" />
        拼湊旅圖
      </RouterLink>
    </div>
  </nav>

  <nav
    class="border-b-2 border-neutral-200 bg-white z-10 sticky top-0 hidden md:block"
  >
    <div
      class="w-9/12 max-w-7xl min-w-max py-4 mx-auto flex justify-between items-center"
    >
      <Logo class="flex-none cursor-pointer" @click="clickTab('top')" />
      <ul class="flex gap-4 text-neutral-800">
        <li class="px-[18px] py-4 cursor-pointer" @click="clickTab('carousel')">
          達人旅圖
        </li>
        <li class="px-[18px] py-4 cursor-pointer" @click="clickTab('features')">
          功能特點
        </li>
        <li class="px-[18px] py-4 cursor-pointer" @click="clickTab('tutorial')">
          關於旅圖
        </li>
        <li class="px-[18px] py-4 cursor-pointer" @click="clickTab('register')">
          註冊會員
        </li>
      </ul>
      <RouterLink
        to="/planner"
        class="flex gap-1 items-center bg-primary-800 px-5 py-2 ml-4 text-base text-neutral-50 rounded-full"
      >
        <PuzzlePieceIcon class="w-5 h-5 text-neutral-50" />
        拼湊旅圖
      </RouterLink>
    </div>
  </nav>
</template>
