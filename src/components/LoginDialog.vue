<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <div class="">
    <div class="relative min-h-screen bg-white flex flex-col items-center justify-center">
      <button class="absolute top-4 right-4">
        <XMarkIcon class="h-8 w-8 text-gray-500 hover:text-gray-700" />
      </button>
      <div class="text-center">
        <div class="mb-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
            alt="Logo"
            class="h-12 mx-auto"
          />
        </div>
        <h1 class="text-xl font-bold text-gray-800">歡迎使用 TriPuzzle</h1>
        <p class="text-sm text-gray-500 mt-2">暢你的旅遊 照你的玩</p>
      </div>

      <div class="mt-8 p-6 rounded-lg">
        <div class="flex items-center justify-center mb-4">
          <input
            type="checkbox"
            id="agreement"
            class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label for="agreement" class="ml-2 text-gray-600 text-sm">
            我已閱讀並同意 <a href="#" class="text-blue-500 underline">去趣會員服務條款</a>
          </label>
        </div>
        <button
          class="w-80 bg-primary-600 text-white py-3 rounded-full font-medium hover:bg-primary-700"
        >
          去趣會員登入/註冊
        </button>
      </div>
      <div class="flex items-center gap-4 mt-6">
        <button class="h-10 w-10 bg-gray-100 rounded-full shadow">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
            alt="Google"
            class="h-6 w-6 mx-auto"
          />
        </button>
        <button class="h-10 w-10 bg-gray-100 rounded-full shadow">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
            alt="LINE"
            class="h-6 w-6 mx-auto"
          />
        </button>
        <button class="h-10 w-10 bg-gray-100 rounded-full shadow">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
            alt="Apple"
            class="h-6 w-6 mx-auto"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
