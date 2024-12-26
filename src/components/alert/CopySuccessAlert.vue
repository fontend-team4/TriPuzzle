<!-- CopySuccessAlert.vue -->
<script setup>
import { ref } from 'vue';

const show = ref(false);
const message = ref('');

const showAlert = (msg, duration = 2000) => {
  message.value = msg;
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, duration);
};

defineExpose({ showAlert });
</script>

<template>
  <div v-if="show" role="alert" class="alert alert-success fixed bottom-4 right-4 shadow-lg z-50">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>{{ message }}</span>
  </div>
</template>

<style scoped>
.alert {
  animation: fadeIn 0.3s ease-in-out, fadeOut 0.3s ease-in-out 1.7s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
