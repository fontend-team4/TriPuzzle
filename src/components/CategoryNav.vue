<script setup>
import { ref } from "vue";
const categories = ref(["推薦", "台灣", "日本", "韓國"]);
</script>


<template>
  <nav class="block-category relative flex" >
    <ul class="category-list flex flex-col gap-1 bg-white">
      <li
        v-for="item in categories"
        :key="item"
        class="category-item flex relative font-medium text-sm leading-2 py-3 pr-8 pl-3 cursor-pointer "
        :class="{ active: item === $route.params.category }"
      >
        <router-link
          :to="{ name: 'CategoryView', params: { category: item } }"
          class="w-10 h-4 leading-4"
        >
          {{ item }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>


<style scoped>

.category-item.active {
  color: #d23430;
  border-left: 5px solid #d23430;
  border-radius: 3px;
  background-color: #EEEEEE;
}

</style>
