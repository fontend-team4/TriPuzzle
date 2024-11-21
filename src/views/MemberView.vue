<script setup>
import SideBar from '@/components/SideBar.vue';
import {
  HeartIcon,
  PencilIcon,
  Cog8ToothIcon
} from '@heroicons/vue/24/solid';
</script>

<template>
  <div class="flex min-h-screen bg-white">
    <SideBar />
    <div class="flex-1 p-2 main-content">
      <div class="ml-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
          alt="User Avatar"
          class="w-10 h-10 mt-2">
      </div>
      <div class="bg-white p-2 rounded-lg mb-4">
        <div class="inline-block pb-1 mb-4 items-center space-x-4 lg:flex lg:p-0">
          <div class="flex">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
              alt="User avatar"
              class="w-32 h-32 rounded-full border border-gray-300 ml-2"
            >
            <div>
              <div class="block mt-2 mr-20 pl-4">
                <p class="text-xl font-semibold mt-4">XXX</p>
                <p class="text-gray-500 mt-4">0行程 ・ 0旅遊小書</p>
                <div class="flex justify-between items-center mt-4 gap-4">
                  <button class="px-4 py-1 text-gray-500 border rounded-full hover:text-blue-500 transition flex items-center">
                    <PencilIcon class="w-4 h-4 mr-2" />
                    <span>編輯</span>
                  </button>
                  <button class="w-8 h-8 text-gray-500 border rounded-full transition items-center justify-center flex">
                    <Cog8ToothIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex mt-4 pl-10 text-gray-700 pb-0 md:pb-0  lg:pb-20 lg:pl-0">
            <div class="flex gap-6 ">
              <div>
                <span class="font-semibold">0</span> 粉絲
              </div>
              <div>
                <span class="font-semibold">0</span> 追蹤中
              </div>
              <div>
                <span class="font-semibold">0</span> 影音
              </div>
            </div>
          </div>
        </div>

        <!-- 想要更多專屬功能區塊 -->
        <div class="ml-3 p-2 rounded-lg flex items-center bg-gray-100 justify-between w-full sm:max-w-80 sm:w-auto">
          <div class="flex flex-col mr-4">
            <p class="mt-2 font-medium mb-1 text-sm">想要更多專屬功能？</p>
            <p class="mb-2 text-sm">快速登入/註冊去趣會員</p>
          </div>
          <button class="px-6 py-2 bg-yellow-500 text-white rounded-full transition">
            立即升級
          </button>
        </div>

        <div class="p-8">
          <h2 class="flex font-semibold text-lg text-gray-800"><HeartIcon class="w-6 h-6"/>收藏</h2>
          <hr>
        </div>

        <div class="text-center p-6 rounded-lg">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
            alt="Empty collection"
            class="w-20 h-20 mx-auto mb-4"
          >
          <p class="text-gray-500 mb-4">「收藏」中還沒有景點哦</p>
          <button class="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
            探索景點
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  margin-left: 4rem;
  transition: margin 0.3s ease;
}
@media (max-width: 1024px) {
  .main-content {
    margin-left: 0;
  }
  .sm\:max-w-80 {
    max-width: none;
  }
}
</style>
