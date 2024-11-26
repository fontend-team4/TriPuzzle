<script setup>
import { MapIcon, Squares2X2Icon } from "@heroicons/vue/24/outline";


const props = defineProps(["isPlacesComponent"]);

</script>

<template>
  <div>
    <input
      type="checkbox"
      id="switch"
      class="hidden toggle"
      :checked="isPlacesComponent"
      @change="$emit('update:isPlacesComponent', !isPlacesComponent)"
    />
    <label
      for="switch"
      class="inline-flex items-center justify-center px-4 py-2 text-white rounded-full shadow-md cursor-pointer bg-primary-950"
    >
      <div v-show="isPlacesComponent" class="flex items-center">
        <MapIcon class="text-white size-6" />
        <p class="ml-2">查看地圖</p>
      </div>
      <div v-show="!isPlacesComponent" class="flex items-center">
        <Squares2X2Icon class="size-6" />
        <p class="ml-2">查看景點牆</p>
      </div>
    </label>
  </div>
</template>
