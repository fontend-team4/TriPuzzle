
<script setup>
import { ref } from 'vue';
import { MapPinIcon } from '@heroicons/vue/24/solid';

const areas = ref([
  { id: 1, image: 'https://fakeimg.pl/100x100/100' },
  { id: 2, image: 'https://fakeimg.pl/100x100/100' },
  { id: 3, image: 'https://fakeimg.pl/100x100/100' },
  { id: 4, image: 'https://fakeimg.pl/100x200/100' },
]);
</script>


<template>
  <div class="block-content flex flex-col w-full pt-3 pl-4 bg-grey text-black">
    <div class="section section-current">
      <p class="title pb-2">目前位置</p>
      <div class="tag-list mb-6 w-full">
        <button
          class="btn btn-sm bg-primary-100 text-primary-600 rounded-3xl border-transparent flex items-center gap-1 px-4 py-2 
          hover:bg-primary-700 
          hover:shadow-lg 
          hover:text-primary-100
          hover:scale-105
          hover:border-transparent"
        >
          <MapPinIcon class="flex items-center w-4 h-4" />
          <span>找附近</span>
        </button>
      </div>
    </div>

    <!-- 熱門目的地 -->
    <div class="section mt-4">
      <p class="title pb-2">熱門目的地</p>
      <div class="area-list flex flex-wrap gap-2">
        <div class="area-item" v-for="area in areas" :key="area.id">
          <img :src="area.image" alt="熱門地點" class="rounded-md shadow-md" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.section-current{
  border-bottom: 1px dashed gray;
  margin-bottom: 4px;
}

.btn:hover{
  border: transparent;
}

.area-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
