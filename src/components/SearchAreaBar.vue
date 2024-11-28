<template>
<header class="dialog-header relative gap-1 pt-2  pr-2  pb-2  pl-5 m-0 flex items-center justify-start z-[1]">
  <div class="input-group  relative inline-flex items-center w-full">
    <MagnifyingGlassIcon class="absolute top-2 left-2 w-5 h-5 text-gray-400" />
    <input 
      class="input input-bordered h-10 text-sm pl-8 pr-8 w-full rounded-full bg-white focus:ring-2 focus:ring-primary-500"
      type="text"
      autocomplete="off"
      placeholder="輸入國家/城市/地區" />
  </div>
  <div class="flex items-center justify-end">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost">✕</button>
    </form>
  </div>
</header>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';


</script>

<style scoped>
.dialog-header{
  box-shadow: 0 4px 12px rgb(231, 226, 226);
}
</style>
