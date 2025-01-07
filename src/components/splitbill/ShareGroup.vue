<script setup>
import { ref, onMounted, inject } from 'vue';
import axios from 'axios';
import defaultUserImage from '/images/cat-2.png';

const token = localStorage.getItem('token');
const API_URL = process.env.VITE_HOST_URL;

const groupMembers = inject('groupMembers'); // 從父組件獲取成員列表
const scheduleId = inject('scheduleId'); // 從父組件獲取 scheduleId

onMounted(async () => {
  console.log('mounted');
});
</script>

<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-bold text-primary-500 mb-2">
      群組成員 :【{{ groupMembers.title }}】
    </h2>
    <ul class="">
      <span class="font-bold">主辦人</span>
      <li class="py-2 text-gray-800 flex flex-row items-center">
        <img
          :src="groupMembers.creator?.profile_pic_url || defaultUserImage"
          alt="Logo"
          class="w-8 mr-2 rounded-full"
        />
        {{ groupMembers.creator?.name }} - {{ groupMembers.creator?.email }}
      </li>
      <span class="font-bold">共享成員</span>
      <li
        v-for="(sharedUsers, index) in groupMembers.sharedUsers"
        :key="index"
        class="py-2 text-gray-800 flex flex-row items-center"
      >
        <img
          :src="groupMembers.creator?.profile_pic_url || defaultUserImage"
          alt="Logo"
          class="w-8 mr-2 rounded-full"
        />
        {{ sharedUsers.name }} -
        <span class="text-gray-500">{{ sharedUsers.email }}</span>
      </li>
    </ul>

    <p v-if="groupMembers.totalUsers" class="mt-4">
      成員總數：{{ groupMembers.totalUsers }}
    </p>
    <p v-else class="mt-4 text-red-500">無法載入成員總數</p>
  </div>
</template>
