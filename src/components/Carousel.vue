<script setup>
import { ref, computed } from 'vue'
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/20/solid'
import { loadImage } from '@/assets/images/loadImage'

const currentIndex = ref(0)
const maxIndex = computed(() => images.length - 3)
const images = [
  loadImage('item1'),
  loadImage('item3'),
  loadImage('item4'),
  loadImage('item2'),
  loadImage('item5'),
  loadImage('item6'),
  loadImage('item7'),
]
</script>
<template>
  <section class="w-9/12 mx-auto my-20">
    <h1 class="text-4.5xl font-bold text-neutral-800 mb-1">
      攻略特輯！私藏景點全新玩法
    </h1>
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-xl font-bold text-neutral-400">
        跟著達人們走出熟悉的城市，旅圖的每一刻都將充滿新鮮發現
      </h2>
      <RouterLink to="/planner" class="btn">
        看更多熱門景點
        <ArrowRightIcon class="w-5 h-5 text-neutral-50" />
      </RouterLink>
    </div>
    <div class="relative overflow-hidden">
      <div
        class="space-x-6 w-full flex transition-transform duration-500"
        :style="{
          transform: `translateX(calc(((100% - 3rem) / 3 + 1.5rem) * -${currentIndex}))`,
        }"
      >
        <img
          :src="image"
          class="carousel-items"
          v-for="(image, index) in images"
          :key="index"
        />
      </div>
      <div
        class="chevron left-5"
        v-show="currentIndex > 0"
        @click="currentIndex--"
      >
        <ChevronLeftIcon class="w-14 h-14 text-neutral-100" />
      </div>
      <div
        class="chevron right-5"
        v-show="currentIndex < maxIndex"
        @click="currentIndex++"
      >
        <ChevronRightIcon class="w-14 h-14 text-neutral-100" />
      </div>
    </div>
  </section>
</template>
<style scoped lang="postcss">
.btn {
  @apply bg-primary-800 px-5 py-3 rounded-full text-lg font-medium text-neutral-50;
  @apply flex gap-2 content-center;
}
.carousel-items {
  @apply rounded-box object-cover aspect-3/4;
  width: calc((100% - 3rem) / 3);
}
.chevron {
  @apply p-2 rounded-full bg-neutral-800/60 absolute top-1/2 -translate-y-1/2;
}
</style>
