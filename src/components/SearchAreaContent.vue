
<script setup>
import { ref } from 'vue';
import { MapPinIcon } from '@heroicons/vue/24/solid';

const areas = ref([
  { id: 1, image: 'https://fakeimg.pl/100x100/100' },
  { id: 2, image: 'https://fakeimg.pl/100x100/100' },
  { id: 3, image: 'https://fakeimg.pl/100x100/100' },
  { id: 4, image: 'https://fakeimg.pl/100x100/100' },
]);
</script>


<template>
  <div class="block-content flex flex-col w-full py-3">
    <div class="section">
      <p class="title pb-2">目前位置</p>
      <div class="tag-list  mb-6 w-full">
        <button class="btn btn-sm bg-primary-700 rounded-3xl border-transparent">
          <MapPinIcon class="bg-primary-700 flex items-center w-4 h-4" />
          <span>找附近</span>
        </button>
      </div>
    </div>

    <!-- 熱門目的地 -->
    <div class="section">
      <p class="title pb-1">熱門目的地</p>
      <div class="area-list flex flex-wrap gap-2">
        <div class="area-item" v-for="area in areas" :key="area.id">
          <img :src="area.image" alt="熱門地點" class="rounded-md shadow-md" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.area-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
