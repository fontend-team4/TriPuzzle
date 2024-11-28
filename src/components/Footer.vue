<script setup>
import {
  Logo,
  FooterIllustration1,
  FooterIllustration2,
} from '@/components/svg/exportSvg.js'
</script>

<template>
  <footer class="bg-gradient-to-b from-primary-50 pt-10">
    <div class="mx-20 relative">
      <Logo class="flex-none mx-auto mb-5 md:mb-7" />
      <h1
        class="text-xl font-bold text-neutral-800 text-center mb-5 md:text-3xl md:mb-10"
      >
        <span class="text-primary-800">旅圖</span>
        ，旅程從這裡開始<br />讓我們一起拚湊出你的旅途
      </h1>
      <form action="get" class="mb-8 flex justify-center md:mb-14">
        <input
          type="email"
          name="mail"
          id="mail"
          placeholder="請輸入信箱"
          class="emailInput"
        />
        <RouterLink to="/member" class="btn">旅圖啟程</RouterLink>
      </form>
      <div class="py-7 border-t-2 border-neutral-200">
        <p class="text-primary-800 text-xs text-center font-bold md:text-sm">
          ©2024 旅圖 TriPuzzle, all rights reserved. Powered by NO.4
          Corporation.
        </p>
      </div>
      <FooterIllustration1
        class="absolute top-20 left-6 translate-y-2 w-64 hidden md:block"
      />
      <FooterIllustration2
        class="absolute top-2 right-4 w-64 hidden md:block"
      />
    </div>
  </footer>
</template>

<style scoped lang="postcss">
.emailInput {
  @apply border-neutral-300 bg-white px-3 py-1 rounded-full w-96 md:px-6 md:py-3;
  @apply focus:border-primary-600 focus:outline-none focus:bg-primary-50;
}
.btn {
  @apply ml-4 px-3 md:px-7 text-sm font-bold text-neutral-50 bg-primary-800 rounded-full;
}
</style>
