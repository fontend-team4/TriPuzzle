<template>
  <nav class="block-category relative top-2 flex w-16">
    <ul class="category-list flex flex-col gap-2">
      <li v-for="item in categories" :key="item" class="category-item flex-row font-medium text-sm p-1.5 cursor-pointer
" :class="{ active: item === selected }">
        {{ item }}
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
const categories = ref(['推薦', '台灣', '日本', '韓國'])
const selected = ref('推薦')

</script>

<style scoped>
.category-item {
  transition: 0.3s;
}

.category-item.active {
  color: #d23430;
  border-left: 2px solid #d23430;
}
</style>
