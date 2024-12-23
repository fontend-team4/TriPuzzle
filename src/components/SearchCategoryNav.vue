<script setup>
import taiwanLocation from "../../taiwanLocation.json"
import { ref } from "vue";

// 從 taiwanLocation 中提取出市名作為分類
const categories = ref(Object.keys(taiwanLocation));
</script>

<template>
  <div class="flex">
    <nav class="relative flex block-category shrink-0" >
    <ul class="flex flex-col gap-1 bg-white category-list">
      <li
        v-for="item in categories"
        :key="item"
        class="relative flex px-6 py-3 text-sm font-medium cursor-pointer category-item leading-2 hover:bg-gray"
        :class="{ active: item === $route.params.category }"
      >
        <p class="w-auto h-4 leading-4 ">
          {{ item }}
        </p>
      </li>
    </ul>
    </nav>
    <div class="h-full p-8 ">
      <div class="text-lg font-medium">推薦區域</div>
      <div class="flex flex-wrap gap-4 m-4">
        <a href="#">
          <div class="relative overflow-hidden rounded-2xl">
          <img src="https://fakeimg.pl/200x200/200">
          <p class="absolute text-white bottom-3 left-3">信義區</p>
          </div>
        </a>
        <a href="#">
          <div class="relative overflow-hidden rounded-2xl">
          <img src="https://fakeimg.pl/200x200/200">
          <p class="absolute text-white bottom-3 left-3">信義區</p>
          </div>
        </a>
        <a href="#">
          <div class="relative overflow-hidden rounded-2xl">
          <img src="https://fakeimg.pl/200x200/200">
          <p class="absolute text-white bottom-3 left-3">信義區</p>
          </div>
        </a>
        <a href="#">
          <div class="relative overflow-hidden rounded-2xl">
          <img src="https://fakeimg.pl/200x200/200">
          <p class="absolute text-white bottom-3 left-3">信義區</p>
          </div>
        </a>
        <a href="#">
          <div class="relative overflow-hidden rounded-2xl">
          <img src="https://fakeimg.pl/200x200/200">
          <p class="absolute text-white bottom-3 left-3">信義區</p>
          </div>
        </a>
      </div>
      <div class="text-lg font-medium">所有區域</div>
      <div class="flex gap-4 m-4">
        <button class="px-4 py-2 bg-white rounded-full ">信義區</button>
        <button class="px-4 py-2 bg-white rounded-full ">信義區</button>
        <button class="px-4 py-2 bg-white rounded-full ">信義區</button>
      </div>
    </div>
  </div>
</template>



<style scoped>

.category-item.active {
  color: #d23430;
  border-left: 5px solid #d23430;
  border-radius: 3px;
  background-color: #EEEEEE;
}

</style>
