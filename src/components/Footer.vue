<script setup>
import logo from '@/assets/images/Logo.png'
</script>

<template>
  <footer class="bg-white">
    <img :src="logo" alt="Logo" />
    <h1 class="text-3xl font-bold text-neutral-800">
      <span class="text-primary-800">旅圖</span>
      ，旅程從這裡開始<br />讓我們一起拚湊出你的旅途
    </h1>
    <form action="">
      <input type="mail" placeholder="請輸入信箱" />
      <button
        class="ml-2 px-5 py-2 text-sm text-neutral-50 bg-primary-800 rounded-full"
      >
        旅圖啟程
      </button>
    </form>
    <p class="text-primary-800 text-sm">
      ©2024 旅圖 TriPuzzle, all rights reserved. Powered by NO.4 Corporation.
    </p>
  </footer>
</template>

<style scoped></style>
