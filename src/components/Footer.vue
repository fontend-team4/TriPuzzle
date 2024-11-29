<script setup>
import {
  Logo,
  FooterIllustration1,
  FooterIllustration2,
} from '@/components/svg/exportSvg.js'
</script>

<template>
  <footer class="bg-gradient-to-b from-primary-50 pt-5 md:pt-10">
    <div class="w-full px-4 mx-auto relative md:w-9/12 md:max-w-7xl md:px-0">
      <div class="flex justify-center items-center gap-3 mb-5 md:flex-col">
        <Logo class="scale-75 md:mx-auto md:mb-3 md:scale-100" />
        <h1
          class="text-lg font-bold text-neutral-800 text-left sm:text-xl md:text-3xl md:mb-10 md:text-center"
        >
          <span class="text-primary-800">旅圖</span>
          ，旅程從這裡開始<br />讓我們一起拚湊出你的旅途
        </h1>
      </div>
      <form
        action="get"
        class="mb-7 flex justify-center items-center gap-5 md:mb-14"
      >
        <input
          type="email"
          name="mail"
          id="mail"
          placeholder="請輸入信箱"
          class="emailInput"
        />
        <RouterLink to="/member" class="emailBtn">旅圖啟程</RouterLink>
      </form>
      <div class="py-4 border-t-2 border-neutral-200 md:py-7">
        <p class="text-primary-800 text-[9px] text-center font-bold md:text-sm">
          ©2024 旅圖 TriPuzzle, all rights reserved. Powered by NO.4
          Corporation.
        </p>
      </div>
      <FooterIllustration1
        class="scale-75 absolute top-32 -left-[150px] hidden lg:block xl:scale-100 xl:top-[100px] xl:-left-32"
      />
      <FooterIllustration2
        class="scale-75 absolute top-14 -right-[150px] hidden lg:block xl:scale-100 xl:top-5 xl:-right-[120px]"
      />
    </div>
  </footer>
</template>

<style scoped lang="postcss">
.emailInput {
  @apply border-neutral-300 border text-xs bg-white px-4 rounded-full w-56 h-8 md:px-5 md:py-3 sm:w-96 md:h-12 md:text-base;
  @apply focus:border-primary-600 focus:outline-none focus:bg-primary-50;
}
.emailBtn {
  @apply px-4 py-2 text-xs text-neutral-50 bg-primary-800 rounded-full md:px-6 md:text-base md:py-3 md:font-bold;
}
</style>
