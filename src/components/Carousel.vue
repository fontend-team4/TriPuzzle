<script setup>
import { ref } from 'vue'
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/20/solid'
import { loadImage } from '@/assets/images/loadImage'

const index = ref(0)
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

    <!-- <div class="relative">
      <div class="carousel carousel-start space-x-6 w-full">
        <img :src="loadImage('item1')" class="carousel-item carousel-object" />
        <img :src="loadImage('item3')" class="carousel-item carousel-object" />
        <img :src="loadImage('item4')" class="carousel-item carousel-object" />
        <img :src="loadImage('item2')" class="carousel-item carousel-object" />
        <img :src="loadImage('item5')" class="carousel-item carousel-object" />
        <img :src="loadImage('item6')" class="carousel-item carousel-object" />
        <img :src="loadImage('item7')" class="carousel-item carousel-object" />
      </div>
      <div
        class="flex justify-between absolute top-1/2 -translate-y-1/2 left-5 right-5"
      >
        <div class="p-2 rounded-full bg-neutral-800/40">
          <ChevronLeftIcon class="w-14 h-14 text-neutral-100" />
        </div>
        <div class="p-2 rounded-full bg-neutral-800/40">
          <ChevronRightIcon class="w-14 h-14 text-neutral-100" />
        </div>
      </div>
    </div> -->

    <div class="relative">
      <div class="carousel carousel-start space-x-6 w-full">
        <img :src="images[index]" class="carousel-item carousel-object" />
        <img :src="images[index + 1]" class="carousel-item carousel-object" />
        <img :src="images[index + 2]" class="carousel-item carousel-object" />
        <img :src="images[index + 3]" class="carousel-item carousel-object" />
        <img :src="images[index + 4]" class="carousel-item carousel-object" />
        <img :src="images[index + 5]" class="carousel-item carousel-object" />
        <img :src="images[index + 6]" class="carousel-item carousel-object" />
      </div>

      <div
        class="p-2 rounded-full bg-neutral-800/60 absolute top-1/2 -translate-y-1/2 left-5"
        v-show="index > 0"
        @click="index--"
      >
        <ChevronLeftIcon class="w-14 h-14 text-neutral-100" />
      </div>
      <div
        class="p-2 rounded-full bg-neutral-800/60 absolute top-1/2 -translate-y-1/2 right-5"
        v-show="index < images.length - 3"
        @click="index++"
      >
        <ChevronRightIcon class="w-14 h-14 text-neutral-100" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.btn {
  @apply bg-primary-800 px-5 py-3 rounded-full text-lg font-bold text-neutral-50;
  @apply flex gap-2 content-center;
}
.carousel-object {
  @apply rounded-box object-cover bg-primary-600 aspect-3/4;
  width: calc((100% - 3rem) / 3);
}
</style>
