<script setup>
import { RouterView } from 'vue-router';
import { useRouter } from 'vue-router';
import { processBatchUpdates } from '@/stores/favorites.js';

const router = useRouter();

router.afterEach((to, from) => {
  // 判斷從 `/planner` 路徑變更到 `/member` 路徑
  if (from.path.startsWith('/planner') && to.path.startsWith('/member')) {
    console.log('從 /planner 變更到 /member，發送批量更新請求');
    processBatchUpdates(); // 發送批量請求
  }
});
</script>

<template>
  <RouterView />
</template>
