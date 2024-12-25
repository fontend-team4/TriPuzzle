<script setup>
import { ref, computed } from "vue"
import { loadPNG } from "@/assets/images/loadImage"

const tabs = [
  {
    label: "探索靈感",
    title: "海量行程攻略隨手抓",
    text: "不確定要去哪玩？上「探索靈感」搜尋大家的行程路線，海量行程複製下來照著玩，省心又省力！",
    image: loadPNG("mockup-1"),
  },
  {
    label: "創建行程",
    title: "預訂航班和住宿加入行程",
    text: "先為你的行程取個有趣的名字，再來預訂好航班機票和飯店，就可以開始你的每日行程安排了！世界各國旅遊都能用去趣規劃！",
    image: loadPNG("mockup-2"),
  },
  {
    label: "好友共編",
    title: "與好友共編行程",
    text: "分享行程給旅伴一起編輯，討論行程路線更快速方便。「下一站要去哪？」打開去 趣立馬就知道！",
    image: loadPNG("mockup-3"),
  },
  {
    label: "搜尋景點",
    title: "全球景點你都能找到",
    text: "國內外景點、餐廳美食、飯店民宿、購物商場...用去趣你能找到最多人去的/評分最高的/最多人收藏的，還有更多寶藏景點。想去就直接加入行程表！",
    image: loadPNG("mockup-4"),
  },
  {
    label: "加入行程",
    title: "一鍵排序生成路線",
    text: "你只要狂加景點，讓去趣自動幫你生成路線！參考「全行程最順路」提示加入行程，景點路線走法一清二楚，還能再自己編輯調整！",
    image: loadPNG("mockup-5"),
  },
  {
    label: "行前準備",
    title: "一站搞定所有最簡單輕鬆",
    text: "景點門票、超多日本優惠券、租車、叫車、旅平險，用去趣都能一指搞定。All in one 的強大旅圖，罩著你的玩！",
    image: loadPNG("mockup-6"),
  },
  {
    label: "製作小書",
    title: "把行程做成旅遊回憶小書",
    text: "將排好的行程轉成旅遊小書。並依個人喜好和創意加入貼圖、文字、照片，並且於小書中編輯個人筆記。",
    image: loadPNG("mockup-7"),
  },
]
const activeTab = ref(0)
const currentTab = computed(() => tabs[activeTab.value])
</script>

<template>
  <section class="bg-primary-50 hidden md:block">
    <div class="w-9/12 max-w-7xl mx-auto pt-14 pb-14 lg:pb-20">
      <h1
        class="text-center text-3xl font-bold text-neutral-800 mb-4 md:text-[40px] lg:text-left"
      >
        如何使用旅圖規劃行程?
      </h1>
      <h2
        class="text-base text-center text-neutral-400 mb-10 md:text-lg lg:text-left"
      >
        安排旅行就是這麼輕鬆！建立行程、加入景點、路線與交通時間交給旅圖
      </h2>
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(98px,1fr))] justify-items-center gap-4 mb-8 xl:grid-cols-[repeat(auto-fit,minmax(138px,1fr))]"
      >
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="featuresTab"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          {{ tab.label }}
        </div>
      </div>
      <div class="canvas">
        <div class="flex flex-col gap-3 max-w-[560px] lg:gap-6">
          <h1
            class="font-bold text-neutral-800 text-3xl lg:text-[40px] 2xl:text-5xl"
          >
            {{ activeTab + 1 }}.
          </h1>
          <h2
            class="font-bold text-neutral-800 text-2xl lg:text-[28px] 2xl:text-[32px]"
          >
            {{ currentTab.title }}
          </h2>
          <p class="font-bold text-neutral-800 text-base 2xl:text-xl">
            {{ currentTab.text }}
          </p>
        </div>
        <img
          :src="currentTab.image"
          class="lg:w-[400px] xl:w-[450px] 2xl:w-[500px]"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.featuresTab {
  @apply px-4 py-2 border border-primary-500 rounded-full cursor-pointer text-base text-primary-500 bg-primary-100 font-bold;
  @apply hover:bg-primary-800 hover:text-neutral-50 hover:border-primary-800;
  @apply xl:px-8 xl:py-3 xl:text-lg;

  &.active {
    @apply bg-primary-600 text-neutral-50 border-primary-100;
  }
}
.canvas {
  @apply bg-white shadow-canvas rounded-3xl flex gap-7 items-center px-7 py-7;
  @apply lg:h-[420px] xl:h-[480px] 2xl:h-[560px];
  @apply md:flex-col lg:flex-row lg:gap-10;
  @apply lg:px-8 xl:px-20 2xl:px-36;
}
</style>
