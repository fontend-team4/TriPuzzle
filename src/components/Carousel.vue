<script setup>
import { ArrowRightCircleIcon } from '@heroicons/vue/24/outline'
</script>
<template>
  <section class="w-9/12 mx-auto my-20">
    <h1 class="text-4.5xl font-bold text-neutral-800 mb-1">
      攻略特輯！私藏景點全新玩法
    </h1>
    <div class="flex justify-between">
      <h2 class="text-xl font-bold text-neutral-400 mb-14">
        跟著達人們走出熟悉的城市，旅圖的每一刻都將充滿新鮮發現
      </h2>
      <RouterLink
        to="/planner"
        class="self-start flex gap-1 bg-primary-800 px-5 py-3 text-1.5xl font-bold text-neutral-50 rounded-full"
      >
        看更多熱門景點
        <ArrowRightCircleIcon class="w-7 h-7 text-neutral-50" />
      </RouterLink>
    </div>
    <div class="flex gap-6">
      <div class="basis-1/3 rounded-3xl overflow-hidden" style="height: 500px">
        <img src="../assets/unsplash.jpg" class="object-cover" />
      </div>
      <div class="basis-1/3 rounded-3xl overflow-hidden" style="height: 500px">
        <img src="../assets/unsplash.jpg" class="object-cover" />
      </div>
      <div class="basis-1/3 rounded-3xl overflow-hidden" style="height: 500px">
        <img src="../assets/unsplash.jpg" class="object-cover" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
