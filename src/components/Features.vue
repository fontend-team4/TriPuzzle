<script setup>
import {
  FeaturesIllustration1,
  FeaturesIllustration2,
  FeaturesIllustration3,
  FeaturesIllustration4,
  FeaturesIllustration5,
  FeaturesIllustration6,
} from '@/components/svg/exportSvg.js'
</script>

<template>
  <section class="w-9/12 max-w-7xl mx-auto mt-20 mb-12">
    <h1
      class="text-center text-3xl font-bold text-neutral-800 mb-4 md:text-4.5xl md:text-left"
    >
      旅圖網站！<br class="sm:hidden" />自助旅行的最佳夥伴
    </h1>
    <h2
      class="text-base text-center text-neutral-400 mb-14 md:text-lg md:text-left"
    >
      各種需求一應俱全，<br class="sm:hidden" />一個旅圖網站抵十個旅遊工具
    </h2>

    <div class="flex flex-col gap-16">
      <div
        class="flex flex-col gap-16 justify-between mx-auto text-neutral-800 font-bold md:mx-10 sm:flex-row sm:flex-wrap"
      >
        <div class="features">
          <div class="imgBG"></div>
          <FeaturesIllustration1 class="absolute top-6 -left-6" />
          <h3 class="text-1.5xl">搜尋附近推薦美食景點</h3>
          <p class="text-lg">
            超多景點和美食等你來發掘，快來看看熱門打卡地點吧！
          </p>
        </div>
        <div class="features">
          <div class="imgBG"></div>
          <FeaturesIllustration2 class="absolute -top-4 left-1" />
          <h3 class="text-1.5xl">排出超順行程無須動腦</h3>
          <p class="text-lg">
            依照旅圖推薦的景點順路安排<br />無腦加景點卻又超有規劃！
          </p>
        </div>
        <div class="features">
          <div class="imgBG"></div>
          <FeaturesIllustration3 class="absolute -top-1 left-0" />
          <h3 class="text-1.5xl">與好友們共同安排行程</h3>
          <p class="text-lg">
            好友一起線上編輯行程<br />大家的願望清單通通加進來！
          </p>
        </div>
      </div>
      <div
        class="flex flex-wrap justify-between text-neutral-800 font-bold mx-10"
      >
        <div class="features">
          <div class="imgBG"></div>
          <FeaturesIllustration4 class="absolute top-4 -left-11" />
          <h3 class="text-1.5xl">複製別人的行程玩法</h3>
          <p class="text-lg">快速複製別人的行程<br />讓你瞬間成為旅遊達人！</p>
        </div>
        <div class="features">
          <div class="imgBG"></div>
          <FeaturesIllustration5 class="absolute -top-2 left-7" />
          <h3 class="text-1.5xl">Google Maps 景點新增</h3>
          <p class="text-lg">
            Google Maps存很多景點？<br />分享給旅圖加進行程吧！
          </p>
        </div>
        <div class="features">
          <div class="imgBG"></div>
          <FeaturesIllustration6 class="absolute -top-1 -left-6" />
          <h3 class="text-1.5xl">自製網美旅遊小書</h3>
          <p class="text-lg">
            行程筆記加入可愛貼圖、照片截圖，珍藏每一趟旅行回憶！
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.features {
  @apply w-60 relative flex flex-col gap-4 items-center text-center;
  @apply hover:scale-110 transition duration-500 ease-in-out;
}
.imgBG {
  @apply bg-gradient-to-tr from-primary-100 rounded-3xl;
  width: 214px;
  height: 214px;
}
</style>
