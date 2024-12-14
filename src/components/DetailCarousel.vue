<script setup>
import { PhotoIcon } from "@heroicons/vue/24/outline";
import { defineProps } from "vue";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
});
</script>

<template>
 
  <div class="flex w-full">
  <div class="w-full carousel carousel-center">
    <div id="slide1" class="relative w-full carousel-item ">
    <img
      src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
      class="w-full" />
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <span></span>
      <a href="#slide2" class="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide2" class="relative w-full carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
      class="w-full" />
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" class="btn btn-circle">❮</a>
      <a href="#slide3" class="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide3" class="relative w-full carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
      class="w-full" />
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" class="btn btn-circle">❮</a>
      <!-- <a href="#slide4" class="btn btn-circle">❯</a> -->
    </div>
  </div>
</div>
        </div> 
</template>

<style>
.carousel-item {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  will-change: transform;
}

</style>