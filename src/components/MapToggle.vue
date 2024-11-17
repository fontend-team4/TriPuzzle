<script setup>
import { ref } from "vue";
import { MapIcon, Squares2X2Icon } from "@heroicons/vue/24/outline";

const isChecked = ref(false);
</script>

<template>
  <div>
    <input
      type="checkbox"
      id="switch"
      class="hidden toggle"
      v-model="isChecked"
    />
    <label
      for="switch"
      class="inline-flex items-center justify-center px-4 py-2 text-white bg-blue-400 rounded-full shadow-md cursor-pointer"
    >
      <div v-show="!isChecked" class="flex items-center">
        <MapIcon class="text-white size-6" />
        <p class="ml-2">查看地圖</p>
      </div>
      <div v-show="isChecked" class="flex items-center">
        <Squares2X2Icon class="size-6" />
        <p class="ml-2">查看景點牆</p>
      </div>
    </label>
  </div>
</template>
<!-- 問題：可以把rgba(0, 0, 0, 0.24) 2px 2px 8px 0px 寫進tailwind自定義裡嗎？-->