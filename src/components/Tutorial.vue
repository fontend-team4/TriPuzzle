<script setup>
import { ref, computed } from 'vue'

const tabs = [
  {
    label: '探索靈感',
    title: '海量行程攻略隨手抓',
    text: '不確定要去哪玩？上「探索靈感」搜尋大家的行程路線，海量行程複製下來照著玩，省心又省力！',
    image: 'src/assets/SVG/Mockup.svg',
  },
  {
    label: '創建行程',
    title: '預訂航班和住宿加入行程',
    text: '先為你的行程取個有趣的名字，再來預訂好航班機票和飯店，就可以開始你的每日行程安排了！世界各國旅遊都能用去趣規劃！',
    image: 'src/assets/SVG/Mockup.svg',
  },
  {
    label: '好友共編',
    title: '與好友共編行程',
    text: '分享行程給旅伴一起編輯，討論行程路線更快速方便。「下一站要去哪？」打開去 趣立馬就知道！',
    image: 'src/assets/SVG/Mockup.svg',
  },
  {
    label: '搜尋景點',
    title: '全球景點你都能找到',
    text: '國內外景點、餐廳美食、飯店民宿、購物商場...用去趣你能找到最多人去的/評分最高的/最多人收藏的，還有更多寶藏景點。想去就直接加入行程表！',
    image: 'src/assets/SVG/Mockup.svg',
  },
  {
    label: '加入行程',
    title: '一鍵排序生成路線',
    text: '你只要狂加景點，讓去趣自動幫你生成路線！參考「全行程最順路」提示加入行程，景點路線走法一清二楚，還能再自己編輯調整！',
    image: 'src/assets/SVG/Mockup.svg',
  },
  {
    label: '行前準備',
    title: '一站搞定所有最簡單輕鬆',
    text: '景點門票、超多日本優惠券、租車、叫車、旅平險，用去趣都能一指搞定。All in one 的強大旅圖，罩著你的玩！',
    image: 'src/assets/SVG/Mockup.svg',
  },
  {
    label: '製作小書',
    title: '把行程做成旅遊回憶小書',
    text: '將排好的行程轉成旅遊小書。並依個人喜好和創意加入貼圖、文字、照片，並且於小書中編輯個人筆記。',
    image: 'src/assets/SVG/Mockup.svg',
  },
]
const activeTab = ref(0)
const currentTab = computed(() => tabs[activeTab.value])
</script>

<template>
  <!-- Background -->
  <section class="bg-primary-50">
    <!-- Container -->
    <div class="w-9/12 mx-auto pt-14 pb-20">
      <h1 class="text-4.5xl font-bold text-neutral-800 mb-1">
        如何使用旅圖規劃行程?
      </h1>
      <h2 class="text-xl font-bold text-neutral-400 mb-14">
        安排旅行就是這麼輕鬆！建立行程、加入景點、路線與交通時間交給旅圖
      </h2>

      <div class="">
        <!-- Tab Buttons -->
        <div class="tabs flex justify-between mb-8">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            class="tab"
            :class="{ active: activeTab === index }"
            @click="activeTab = index"
          >
            {{ tab.label }}
          </div>
        </div>
        <!-- Tab Content -->
        <div class="canvas">
          <div class="flex flex-col gap-6 h-72">
            <h1 class="text-7xl font-bold">{{ activeTab + 1 }}.</h1>
            <h2 class="text-4xl font-bold">{{ currentTab.title }}</h2>
            <p class="text-2xl font-bold">{{ currentTab.text }}</p>
          </div>
          <img :src="currentTab.image" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.tab {
  @apply px-10 py-5 border border-primary-500 rounded-full cursor-pointer text-lg text-primary-500 bg-primary-100 font-bold content-center;
  @apply hover:bg-primary-800 hover:text-neutral-50 hover:border-primary-800;

  &.active {
    @apply bg-primary-600 text-neutral-50 border-primary-100;
  }
}

.canvas {
  @apply bg-white shadow-3xl rounded-3xl px-52 py-14;
  @apply flex gap-8 items-center;
  height: 600px;
}
</style>
