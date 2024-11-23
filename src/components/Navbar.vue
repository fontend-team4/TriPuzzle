<script setup>
import { PuzzlePieceIcon } from '@heroicons/vue/20/solid'
import logo from '@/assets/images/Logo.png'
</script>

<template>
  <nav class="bg-white border-b-2 border-neutral-200">
    <div class="w-4/5 py-4 mx-auto flex justify-between items-center">
      <img :src="logo" alt="Logo" class="flex-none" />

      <ul class="flex gap-4 text-neutral-800 font-bold">
        <li class="px-4.5 py-4">達人旅圖</li>
        <li class="px-4.5 py-4">功能特點</li>
        <li class="px-4.5 py-4">關於旅圖</li>
        <li class="px-4.5 py-4">註冊會員</li>
      </ul>

      <RouterLink
        to="/planner"
        class="w-28 flex gap-1 bg-primary-800 px-4 py-2 text-sm text-neutral-50 rounded-lg"
      >
        <PuzzlePieceIcon class="w-5 h-5 text-neutral-50" />
        拼湊旅圖
      </RouterLink>
    </div>
  </nav>
</template>
