<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-2xl p-6 w-full max-w-md h-auto">
      <div class="relative bg-white rounded-2xl w-full max-w-md h-auto">
        <button class="absolute right-1" >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
      <div class="text-center mt-8">
        <div class="mb-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
            alt="Logo"
            class="h-12 w-auto mx-auto"
          />
        </div>
        <h1 class="text-xl font-bold">歡迎使用 TriPuzzle</h1>
        <p class="text-sm mt-2">暢你的旅遊 照你的玩</p>
      </div>
      <div class="mt-12 sm:mt-24">
        <div class="flex items-center justify-center mb-4">
          <input
            type="checkbox"
            id="agreement"
            class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label for="agreement" class="ml-2 text-sm">
            我已閱讀並同意 <a href="#" class="text-blue-500 underline">TriPuzzle會員服務條款</a>
          </label>
        </div>
        <button
          class="w-full bg-primary-600 text-white py-3 rounded-full font-medium hover:bg-primary-700"
        >
          去趣會員登入/註冊
        </button>
      </div>
      <div class="flex items-center gap-6 mt-2 justify-center">
        <button class="border h-8 w-8 rounded-full shadow flex justify-center items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
            alt="Google"
            class="h-5 w-5"
          />
        </button>
        <button class="border h-8 w-8 rounded-full shadow flex justify-center items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
            alt="LINE"
            class="h-5 w-5"
          />
        </button>
        <button class="border h-8 w-8 rounded-full shadow flex justify-center items-center">
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
