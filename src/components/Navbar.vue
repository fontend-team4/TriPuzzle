<script setup>
import { defineEmits } from 'vue'
import { PuzzlePieceIcon } from '@heroicons/vue/20/solid'
import { Logo } from '@/components/svg/exportSvg.js'

const emit = defineEmits(['clickTab'])
const clickTab = (sectionName) => {
  emit('clickTab', sectionName)
}
</script>

<template>
  <nav class="border-b-2 border-neutral-200 bg-white z-10">
    <div class="w-9/12 py-4 mx-auto flex justify-between items-center">
      <Logo class="flex-none cursor-pointer" @click="clickTab('top')" />

      <ul class="flex gap-4 text-neutral-800 font-bold">
        <li class="px-4.5 py-4 cursor-pointer" @click="clickTab('carousel')">
          達人旅圖
        </li>
        <li class="px-4.5 py-4 cursor-pointer" @click="clickTab('features')">
          功能特點
        </li>
        <li class="px-4.5 py-4 cursor-pointer" @click="clickTab('tutorial')">
          關於旅圖
        </li>
        <li class="px-4.5 py-4 cursor-pointer" @click="clickTab('register')">
          註冊會員
        </li>
      </ul>

      <RouterLink
        to="/planner"
        class="w-28 flex gap-1 bg-primary-800 px-4 py-2 text-sm font-bold text-neutral-50 rounded-lg"
      >
        <PuzzlePieceIcon class="w-5 h-5 text-neutral-50" />
        拼湊旅圖
      </RouterLink>
    </div>
  </nav>
</template>
