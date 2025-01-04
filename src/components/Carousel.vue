<script setup>
import { ref, computed } from "vue"
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/20/solid"
import { loadJpg } from "@/assets/images/loader"
import { useRouter } from "vue-router"
import { useLoadingStore } from "@/stores/loading"

const loadingStore = useLoadingStore()
const router = useRouter()

const goToPlanner = () => {
  loadingStore.showLoading()
  router.push("/planner")
  loadingStore.hideLoading()
}

const currentIndex = ref(0)
const maxIndex = computed(() => images.length - 3)
const images = [
  "carousel-valley",
  "carousel-spain",
  "carousel-finland",
  "carousel-japan",
  "carousel-rainforest",
  "carousel-glacier",
  "carousel-sled",
]
</script>
<template>
  <LoadingOverlay :active="loadingStore.isLoading">
    <div class="loadingio-spinner-ellipsis-nq4q5u6dq7r"><div class="ldio-x2uulkbinbj">
    <div></div><div></div><div></div><div></div><div></div>
    </div></div>
  </LoadingOverlay>
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
      <button @click="goToPlanner" class="linkBtn">
        看更多熱門景點
        <ArrowRightIcon class="w-5 h-5 text-neutral-50" />
      </button>
    </div>
    <div class="relative overflow-hidden">
      <div
        class="w-full flex transition-transform duration-500 gap-4 md:hidden"
        :style="{
          transform: `translateX(calc(((100% - 1rem) / 2 + 1rem)  * -${currentIndex}))`,
        }"
      >
        <img
          :src="loadJpg(image)"
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
          :src="loadJpg(image)"
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
@keyframes ldio-x2uulkbinbj {
  0% { transform: translate(14px,82px) scale(0); }
  25% { transform: translate(14px,82px) scale(0); }
  50% { transform: translate(14px,82px) scale(1); }
  75% { transform: translate(82px,82px) scale(1); }
  100% { transform: translate(150px,82px) scale(1); }
}
@keyframes ldio-x2uulkbinbj-r {
  0% { transform: translate(150px,82px) scale(1); }
  100% { transform: translate(150px,82px) scale(0); }
}
@keyframes ldio-x2uulkbinbj-c {
  0% { background: #b12824 }
  25% { background: #fbcecd }
  50% { background: #f17b78 }
  75% { background: #d23430 }
  100% { background: #b12824 }
}
.ldio-x2uulkbinbj div {
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transform: translate(82px,82px) scale(1);
  background: #b12824;
  animation: ldio-x2uulkbinbj 2.5s infinite cubic-bezier(0,0.5,0.5,1);
}
.ldio-x2uulkbinbj div:nth-child(1) {
  background: #d23430;
  transform: translate(150px,82px) scale(1);
  animation: ldio-x2uulkbinbj-r 0.625s infinite cubic-bezier(0,0.5,0.5,1), ldio-x2uulkbinbj-c 2.5s infinite step-start;
}.ldio-x2uulkbinbj div:nth-child(2) {
  animation-delay: -0.625s;
  background: #b12824;
}.ldio-x2uulkbinbj div:nth-child(3) {
  animation-delay: -1.25s;
  background: #d23430;
}.ldio-x2uulkbinbj div:nth-child(4) {
  animation-delay: -1.875s;
  background: #f17b78;
}.ldio-x2uulkbinbj div:nth-child(5) {
  animation-delay: -2.5s;
  background: #fbcecd;
}
.loadingio-spinner-ellipsis-nq4q5u6dq7r {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-x2uulkbinbj {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-x2uulkbinbj div { box-sizing: content-box; }
</style>
