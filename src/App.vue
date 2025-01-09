<script setup>
import { RouterView } from 'vue-router';
import { useRouter } from 'vue-router';
import { processBatchUpdates } from '@/stores/favorites.js';

const router = useRouter();

router.afterEach((to) => {
  if (to.path === '/member' || to.path === '/planner') {
    processBatchUpdates();
  }
});
</script>

<template>
  <RouterView />
</template>
