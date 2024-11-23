<template>
  <div class="input-group relative flex items-center h-10 w-full">
    <MagnifyingGlassIcon class="absolute top-2 left-2 w-5 h-5 text-gray-400" />
    <input 
      class="input input-bordered h-10 text-sm pl-8 pr-8 w-full rounded-full bg-white focus:ring-2 focus:ring-primary-500"
      type="text"
      autocomplete="off"
      placeholder="輸入國家/城市/地區" />
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';


</script>

<style scoped>
.input-group {
  position: relative;
}
</style>
