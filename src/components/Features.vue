<template>
  <section class="w-9/12 max-w-7xl mx-auto mt-20 mb-12">
    <h1
      class="text-center text-3xl font-bold text-neutral-800 mb-4 md:text-[40px] lg:text-left"
    >
      旅圖網站！<br class="sm:hidden" />自助旅行的最佳夥伴
    </h1>
    <h2
      class="text-base text-center text-neutral-400 mb-10 md:text-lg lg:text-left"
    >
      各種需求一應俱全，<br class="sm:hidden" />一個旅圖網站抵十個旅遊工具
    </h2>
    <div
      class="flex flex-wrap gap-16 justify-center mx-auto text-neutral-800 font-bold md:mx-4 lg:justify-between lg:gap-0"
    >
      <div class="basis-1/3 lg:px-8 lg:mb-10">
        <div class="features">
          <div class="imgBG"></div>
          <img
            src="@/assets/svg/FeaturesIllustration1.svg"
            class="absolute top-6 -left-6"
          />
          <h3 class="text-[22px]">搜尋附近推薦美食景點</h3>
          <p class="text-lg">
            超多景點和美食等你來發掘，快來看看熱門打卡地點吧！
          </p>
        </div>
      </div>
      <div class="basis-1/3 lg:px-8 lg:mb-10">
        <div class="features">
          <div class="imgBG"></div>
          <img
            src="@/assets/svg/FeaturesIllustration2.svg"
            class="absolute -top-4 left-1"
          />
          <h3 class="text-[22px]">排出超順行程無須動腦</h3>
          <p class="text-lg">
            依照旅圖推薦的景點順路安排<br />無腦加景點卻又超有規劃！
          </p>
        </div>
      </div>
      <div class="basis-1/3 lg:px-8 lg:mb-10">
        <div class="features">
          <div class="imgBG"></div>
          <img
            src="@/assets/svg/FeaturesIllustration3.svg"
            class="absolute -top-1 left-0"
          />
          <h3 class="text-[22px]">與好友們共同安排行程</h3>
          <p class="text-lg">
            好友一起線上編輯行程<br />大家的願望清單通通加進來！
          </p>
        </div>
      </div>
      <div class="basis-1/3 lg:px-8 lg:mb-10">
        <div class="features">
          <div class="imgBG"></div>
          <img
            src="@/assets/svg/FeaturesIllustration4.svg"
            class="absolute top-4 -left-11"
          />
          <h3 class="text-[22px]">複製別人的行程玩法</h3>
          <p class="text-lg">快速複製別人的行程<br />讓你瞬間成為旅遊達人！</p>
        </div>
      </div>
      <div class="basis-1/3 lg:px-8 lg:mb-10">
        <div class="features">
          <div class="imgBG"></div>
          <img
            src="@/assets/svg/FeaturesIllustration5.svg"
            class="absolute -top-2 left-7"
          />
          <h3 class="text-[22px]">Google Maps 景點新增</h3>
          <p class="text-lg">
            Google Maps存很多景點？<br />分享給旅圖加進行程吧！
          </p>
        </div>
      </div>
      <div class="basis-1/3 lg:px-8 lg:mb-10">
        <div class="features">
          <div class="imgBG"></div>
          <img
            src="@/assets/svg/FeaturesIllustration6.svg"
            class="absolute -top-1 -left-6"
          />
          <h3 class="text-[22px]">自製網美旅遊小書</h3>
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
  @apply w-60 mx-auto relative flex flex-col gap-4 items-center text-center;
  @apply hover:scale-110 transition duration-500 ease-in-out;
}
.imgBG {
  @apply bg-gradient-to-tr from-primary-100 rounded-3xl;
  width: 214px;
  height: 214px;
}
</style>
