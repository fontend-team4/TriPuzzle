<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { MessageModalStore } from '@/stores/MessageModal'

const messageStore = MessageModalStore()
const API_URL = process.env.VITE_HOST_URL
const route = useRoute();
const router = useRouter();
const shareToken = ref(route.params.shareToken);
const loading = ref(true);
const scheduleTitle = ref("");
const scheduleImg = ref("");
const scheduleDate = ref("");
const token = localStorage.getItem("token");
const loadingForBtn = ref(false)

onMounted(async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    messageStore.messageModal({
      message: '登入後才能加入共編喔！',
      status: "error",
    })
    router.push("/planner");
    return; 
  }

  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.get(
      `${API_URL}/usersSchedules/join/${shareToken.value}`,
      config
    );
    scheduleTitle.value = response.data.schedule.title;
    scheduleImg.value = response.data.schedule.image_url;
    const initStartDate = response.data.schedule.start_date.split("T")[0]
    const initEndDate = response.data.schedule.end_date.split("T")[0]
    scheduleDate.value = `${initStartDate} ~ ${initEndDate}`;
    console.log(response);
    
  } catch (err) {
    console.error("Error verifying share token:", err.message);

    const status = err.response?.status;
    const errorMessage = err.response?.data?.error || "發生未知錯誤";

    if (status === 401) {
      messageStore.messageModal({
        message: '登入後才能加入共編喔！',
        status: "error",
      })
    } else {
      messageStore.messageModal({
        message: errorMessage,
        status: "error",
      })
    }
    router.push("/planner");
  } finally {
    loading.value = false;
  }
});

const joinSchedule = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  loadingForBtn.value = true
  try {
    await axios.post(
      `${API_URL}/usersSchedules/join/${shareToken.value}`,
      {},
      config
    );
  loadingForBtn.value = false
    messageStore.messageModal({
      message: '您已成功加入行程',
      status: "success",
    })
    router.push("/planner");
  } catch (err) {
    console.error("Error joining schedule:", err.message);
    loadingForBtn.value = false
    const errorMessage = err.response?.data?.error || "發生未知錯誤";
    messageStore.messageModal({
      message: errorMessage,
      status: "error",
    })
  }
};

const redirectToHome = () => {
  router.push("/planner");
};
</script>

<template>
  <div v-if="loading" class="flex items-center justify-center h-screen">
    <p>Loading...</p>
  </div>
  <div
    v-else
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen overflow-hidden bg-black bg-opacity-25"
  >
    <div
      class="pb-10 md:pb-0 h-full md:h-[380px] md:w-[480px] mx-0 md:mx-auto bg-white md:flex md:rounded-xl md:overflow-hidden overflow-auto flex-col py-10 px-5 relative"
    >
      <h2 class="flex items-center justify-center mb-4 text-2xl font-bold">
        確認要加入共編嗎？
      </h2>
      <div class="relative w-full mb-4 overflow-hidden rounded-lg h-[200px]">
        <img
          :src="scheduleImg"
          class="object-cover w-full h-64"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
        ></div>
        <p
          class="absolute z-10 text-lg font-bold text-white bottom-8 left-4"
        >
          {{ scheduleTitle }}
        </p>
        <p
          class="absolute z-10 text-sm font-bold text-white bottom-3 left-4"
        >
          {{ scheduleDate }}
        </p>
      </div>
      <div class="absolute bottom-0 left-0 inline-flex w-full h-16 gap-4 px-5 pt-2 border-t-2 border-gray">
        <button
          @click="redirectToHome"
          class="w-[50%] h-[48px] border-[1px] border-primary-600 rounded-3xl text-primary-600 font-bold text-sm justify-center items-center px-[12px] py-[8px] hover:bg-primary-100"
        >
          我再想想
        </button>
        <button
          v-if="!loadingForBtn"
          @click="joinSchedule"
          class="w-[50%] h-[48px] bg-primary-600 rounded-3xl text-white font-bold text-sm justify-center items-center px-[12px] py-[8px] hover:bg-primary-700"
        >
          確定加入！
        </button>
        <button
          v-else
          class="w-[50%] h-[48px] bg-primary-600 rounded-3xl text-white font-bold text-sm justify-center items-center px-[12px] py-[8px] hover:bg-primary-700"
        >
          <span class="loading loading-dots loading-md"></span>
        </button>
      </div>
    </div>
  </div>
</template>
