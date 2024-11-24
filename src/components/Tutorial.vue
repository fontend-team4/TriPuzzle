<script setup>
import { ref, computed } from 'vue'

const tabs = [
  {
    label: '探索靈感',
    title: '海量行程攻略隨手抓',
    text: '不確定要去哪玩？上「探索靈感」搜尋大家的行程路線，海量行程複製下來照著玩，省心又省力！',
    image: 'https://via.placeholder.com/300x200?text=Tab+1+Image',
  },
  {
    label: '創建行程',
    title: 'Tab 2 標題',
    text: '這是 Tab 2 的內容描述。',
    image: 'https://via.placeholder.com/300x200?text=Tab+2+Image',
  },
  {
    label: '好友共編',
    title: 'Tab 3 標題',
    text: '這是 Tab 3 的內容描述。',
    image: 'https://via.placeholder.com/300x200?text=Tab+3+Image',
  },
  {
    label: '搜尋景點',
    title: 'Tab 4 標題',
    text: '這是 Tab 4 的內容描述。',
    image: 'https://via.placeholder.com/300x200?text=Tab+4+Image',
  },
  {
    label: '加入行程',
    title: 'Tab 5 標題',
    text: '這是 Tab 5 的內容描述。',
    image: 'https://via.placeholder.com/300x200?text=Tab+5+Image',
  },
  {
    label: '行前準備',
    title: 'Tab 6 標題',
    text: '這是 Tab 6 的內容描述。',
    image: 'https://via.placeholder.com/300x200?text=Tab+6+Image',
  },
  {
    label: '製作小書',
    title: 'Tab 7 標題',
    text: '這是 Tab 7 的內容描述。',
    image: 'https://via.placeholder.com/300x200?text=Tab+7+Image',
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
        <div class="tabs flex justify-between mb-7">
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
        <div style="height: 580px" class="bg-white shadow-3xl rounded-3xl">
          <!-- <h2>{{ currentTab.title }}</h2>
          <p>{{ currentTab.text }}</p>
          <img :src="currentTab.image" :alt="currentTab.title" /> -->
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tab {
  @apply px-10 py-5 border border-primary-500 rounded-full;
  @apply hover:bg-primary-800 text-neutral-50;
  @apply cursor-pointer;
  @apply text-lg text-primary-500 bg-primary-100 font-bold content-center;
}

.tab:hover {
  background-color: #982623;
  color: #f6f6f6;
}

.tab.active {
  background-color: #e6514d;
  border: solid 1px #fde4e3;
  color: white;
}
</style>
