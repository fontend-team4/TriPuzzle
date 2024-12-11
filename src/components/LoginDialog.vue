<script setup>
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/solid';

const showModal = ref(true);
</script>

<template>
  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
    <div class="bg-white pb-6 w-full h-full md:w-96 md:h-max md:rounded-2xl md:mb-20">
      <div class="relative">
        <button @click="$emit('close')" class="absolute right-2 top-2">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
      <div class="flex justify-center items-center mt-8 sm:mt-8 md:mt-8 overflow-auto">
        <div class="text-center">
          <div class="mb-4">
            <img
              src="https://web.chictrip.com.tw/assets/logo.26916d07.svg"
              alt="Logo"
              class="h-12 w-auto mx-auto"
            />
          </div>
          <h2 class="text-xl font-bold">歡迎使用旅圖</h2>
          <p class="text-sm mt-2">暢你的旅遊 照你的玩</p>
        </div>
      </div>
           




      <div class="flex justify-center items-center mt-20">
        <div class="text-center">
          <div class="flex items-center justify-center mb-4">
            <input
              type="checkbox"
              id="agreement"
              class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label for="agreement" class="ml-2 text-sm">
              我已閱讀並同意 <a href="#" class="text-blue-500 underline">旅圖會員服務條款</a>
            </label>
          </div>
          <button
            class="w-full bg-primary-600 text-white py-3 rounded-full font-medium hover:bg-primary-700"
          >
            旅圖會員登入/註冊
          </button>
        </div>
      </div>

      <div class="flex justify-center items-center gap-6 mt-5">
        <button class="h-8 w-8 rounded-full shadow flex justify-center items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
            alt="Google"
            class="h-5 w-5"
          />
        </button>
        <button class="h-8 w-8 rounded-full shadow flex justify-center items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
            alt="LINE"
            class="h-5 w-5"
          />
        </button>
        <button class="h-8 w-8 rounded-full shadow flex justify-center items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
            alt="Apple"
            class="h-5 w-5"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>