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
  <section class="w-9/12 max-w-7xl mx-auto my-5 md:my-20">
    <h1
      class="text-3xl text-center text-neutral-800 mb-4 md:text-[40px] lg:mb-1 lg:text-left"
    >
      攻略特輯！<br class="sm:hidden" />私藏景點全新玩法
    </h1>
    <div
      class="flex flex-col gap-10 items-center mb-8 lg:flex-row lg:justify-between"
    >
      <h2 class="text-base text-center text-neutral-400 md:text-lg">
        跟著達人們走出熟悉的城市，<br
          class="sm:hidden"
        />旅圖的每一刻都將充滿新鮮發現
      </h2>
      <RouterLink to="/planner" class="linkBtn">
        看更多熱門景點
        <ArrowRightIcon class="w-5 h-5 text-neutral-50" />
      </RouterLink>
    </div>
    <div class="relative overflow-hidden">
      <div
        class="w-full flex transition-transform duration-500 gap-4 md:hidden"
        :style="{
          transform: `translateX(calc(((100% - 1rem) / 2 + 1rem)  * -${currentIndex}))`,
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
        class="w-full transition-transform duration-500 gap-6 hidden md:flex"
        :style="{
          transform: `translateX(calc(((100% - 3rem) / 3 + 1.5rem) * -${currentIndex}))`,
        }"
      >
        <img
          :src="image"
          class="carousel-items-md"
          v-for="(image, index) in images"
          :key="index"
        />
      </div>
      <div
        class="chevron left-1 md:left-3 lg:left-5"
        v-show="currentIndex > 0"
        @click="currentIndex--"
      >
        <ChevronLeftIcon
          class="w-7 h-7 sm:w-9 sm:h-9 lg:w-14 lg:h-14 text-neutral-100"
        />
      </div>
      <div
        class="chevron right-1 md:right-3 lg:right-5"
        v-show="currentIndex < maxIndex"
        @click="currentIndex++"
      >
        <ChevronRightIcon
          class="w-7 h-7 sm:w-9 sm:h-9 lg:w-14 lg:h-14 text-neutral-100"
        />
      </div>
    </div>
  </section>
</template>
<style scoped lang="postcss">
.linkBtn {
  @apply bg-primary-800  rounded-full  font-medium text-neutral-50 px-3 py-2 text-sm flex;
  @apply md:px-5 md:py-3 md:text-lg;
  @apply hover:bg-primary-600;
}
.carousel-items {
  @apply rounded-box object-cover aspect-3/4;
  width: calc((100% - 1rem) / 2);
}
.carousel-items-md {
  @apply rounded-box object-cover aspect-3/4;
  width: calc((100% - 3rem) / 3);
}
.chevron {
  @apply p-1 rounded-full bg-neutral-800/60 absolute top-1/2 -translate-y-1/2;
}
</style>
