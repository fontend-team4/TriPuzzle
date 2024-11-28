<script setup>
import { RouterLink, RouterView } from 'vue-router'



</script>

<template>
    <RouterView />
    <nav class="flex gap-6 text-xl font-bold text-orange-800 underline ">
      <RouterLink to="/">HOME</RouterLink>
      <RouterLink to="/planner">PLANNER</RouterLink>
      <RouterLink to="/member">MEMBER</RouterLink>
    </nav>
</template>


