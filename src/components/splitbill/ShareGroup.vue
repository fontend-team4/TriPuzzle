<script setup>
import { ref, onMounted, inject } from 'vue';
import axios from 'axios';
import defaultUserImage from '/images/cat-2.png';
import '@/assets/loading.css';
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();
const token = localStorage.getItem('token');
const API_URL = process.env.VITE_HOST_URL;

const groupMembers = inject('groupMembers'); // 從父組件獲取成員列表
const scheduleId = inject('scheduleId'); // 從父組件獲取 scheduleId
onMounted(async () => {
  loadingStore.showLoading();
  setTimeout(() => {
    loadingStore.hideLoading();
  }, 1000);
});
</script>

<template>
  <LoadingOverlay :active="loadingStore.isLoading">
    <div class="loadingio-spinner-ellipsis-nq4q5u6dq7r">
      <div class="ldio-x2uulkbinbj">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </LoadingOverlay>
  <div class="p-4 bg-white shadow-md rounded-b-lg rounded-l-lg md:rounded-lg">
    <h2 class="text-xl font-bold text-primary-500 mb-2">
      群組成員 :【{{ groupMembers.title }}】
    </h2>
    <ul class="">
      <span class="font-bold">主辦人</span>
      <li
        class="py-2 text-gray-800 flex flex-row items-center flex justify-between"
      >
        <span class="text-gray-500 flex flex-row items-center">
          <img
            :src="groupMembers.creator?.profile_pic_url || defaultUserImage"
            alt="avator"
            class="w-10 h-10 object-cover rounded-full mr-2"
          />
          {{ groupMembers.creator?.name }}
        </span>
        <span class="text-gray-500">{{ groupMembers.creator?.email }}</span>
      </li>
      <span class="font-bold">共享成員</span>
      <li
        v-for="(sharedUsers, index) in groupMembers.sharedUsers"
        :key="index"
        class="py-2 text-gray-800 flex flex-row items-center justify-between"
      >
        <span class="text-gray-500 flex flex-row items-center">
          <img
            :src="sharedUsers?.profile_pic_url || defaultUserImage"
            alt="avator"
            class="w-10 h-10 object-cover rounded-full mr-2"
          />
          {{ sharedUsers.name }}
        </span>
        <span class="text-gray-500">{{ sharedUsers.email }}</span>
      </li>
    </ul>

    <p v-if="groupMembers.totalUsers" class="mt-4">
      成員總數：{{ groupMembers.totalUsers }}
    </p>
    <p v-else class="mt-4 text-red-500">無法載入成員總數</p>
  </div>
</template>
