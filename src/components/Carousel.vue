<script setup>
import { ArrowRightIcon } from '@heroicons/vue/20/solid'
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

    <div class="carousel carousel-center space-x-6">
      <div class="carousel-item carousel-object">
        <img src="../assets/SVG/unsplash.jpg" class="object-cover" />
      </div>
      <div class="carousel-item carousel-object">
        <img src="../assets/SVG/unsplash.jpg" class="object-cover" />
      </div>
      <div class="carousel-item carousel-object">
        <img src="../assets/SVG/unsplash.jpg" class="object-cover" />
      </div>
      <div class="carousel-item carousel-object">
        <img src="../assets/SVG/unsplash.jpg" class="object-cover" />
      </div>
      <div class="carousel-item carousel-object">
        <img src="../assets/SVG/unsplash.jpg" class="object-cover" />
      </div>
    </div>

    <!-- <div class="flex justify-between gap-8">
      <div class="rounded-3xl overflow-hidden" style="height: 500px">
        <img src="../assets/SVG/unsplash.jpg" class="object-cover" />
      </div>
      <div class="rounded-3xl overflow-hidden" style="height: 500px">
        <img src="../assets/SVG/unsplash.jpg" class="object-cover" />
      </div>
      <div class="rounded-3xl overflow-hidden" style="height: 500px">
        <img src="../assets/SVG/unsplash.jpg" class="object-cover" />
      </div>
      <div class="rounded-3xl overflow-hidden" style="height: 500px">
        <img src="../assets/SVG/unsplash.jpg" class="object-cover" />
      </div>
    </div> -->
  </section>
</template>

<style scoped lang="postcss">
.btn {
  @apply bg-primary-800 px-5 py-3 rounded-full text-lg font-bold text-neutral-50;
  @apply flex gap-2 content-center;
}
.carousel-object {
  @apply rounded-box overflow-hidden;
  width: calc((100% - 3rem) / 3);
}
</style>
