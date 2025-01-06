<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const groupMembers = ref([])
const token = localStorage.getItem("token");
const API_URL = process.env.VITE_HOST_URL;


onMounted(async() => {
  console.log('mounted');
  await getMember();
})


const getMember = async()=>{
  const config = {
    headers: {
      Authorization: token,
    },
  };

  // 更新shareMembers
  try {
    const {data} = await axios.get(
      `${API_URL}/usersSchedules/1/users`,
      config
    );
    groupMembers.value = data;
    console.log("groupMembers", groupMembers.value);
  } catch (err) {
    console.error(err.message);
  }
}

</script>

<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-bold text-primary-500 mb-2">{{ groupMembers.title}} - 群組成員</h2>
    <p class="text-gray-800 mb-4"></p>
    <ul class="">
        <span class="font-bold">主辦人</span>
      <li class="py-2 text-gray-800 flex flex-row items-center">
        <img src="@/assets/svg/logo-light.svg" alt="Logo" class="w-8" />
            {{ groupMembers.creator?.name }} - {{ groupMembers.creator?.email }}
      </li>
        <span class="font-bold">共享成員</span>
      <li
        v-for="(sharedUsers, index) in groupMembers.sharedUsers"
        :key="index"
        class="py-2 text-gray-800 flex flex-row items-center"
      >
        <img src="@/assets/svg/logo-light.svg" alt="Logo" class="w-8" />
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

