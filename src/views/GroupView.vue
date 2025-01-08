<script setup>
import { ref, onMounted, defineProps, provide } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';
import backIcon from '/images/solid-1.png';
import axios from 'axios';
import '@/assets/loading.css';
import { useLoadingStore } from '@/stores/loading';
import { MessageModalStore } from '@/stores/MessageModal';

const loadingStore = useLoadingStore();

// 引入子組件
import ShareGroup from '@/components/splitbill/ShareGroup.vue';
import AccountForm from '@/components/splitbill/AccountForm.vue';
import AccountList from '@/components/splitbill/AccountList.vue';
import BalanceSummary from '@/components/splitbill/BalanceSummary.vue';

const router = useRouter();
const route = useRoute();
const scheduleId = route.params.scheduleId; // 獲取路徑參數中的 scheduleId
console.log('當前行程 ID:', scheduleId);
const groupMembers = ref([]);
const accounts = ref([]);
const token = localStorage.getItem('token');
const API_URL = process.env.VITE_HOST_URL;
const messageStore = MessageModalStore();

const schedules = ref([]);

const getSchedules = async () => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  try {
    const response = await axios.get(
      `${API_URL}/schedules/${scheduleId}`,
      config
    );

    // 確保 schedules 是物件而非陣列
    schedules.value = response.data;

    // 切割日期時間格式，僅保留日期
    if (schedules.value.start_date) {
      schedules.value.start_date = schedules.value.start_date.split('T')[0];
    }
    if (schedules.value.end_date) {
      schedules.value.end_date = schedules.value.end_date.split('T')[0];
    }

    console.log('格式化後的 schedules', schedules.value);
  } catch (error) {
    console.error(error.message);
  }
};

const getGroupData = async () => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  try {
    const { data } = await axios.get(
      `${API_URL}/usersSchedules/${scheduleId}/users`,
      config
    );
    console.log('獲取成員資料：', data);
    // 保留原始資料並整合 `creator` 和 `sharedUsers`
    groupMembers.value = {
      ...data,
      groupUsers: [
        {
          id: data.creator.id,
          name: data.creator.name,
          email: data.creator.email,
          profile_pic_url: data.creator.profile_pic_url,
          role: '創建者' // 可選：標識角色
        },
        ...data.sharedUsers.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          profile_pic_url: user.profile_pic_url,
          role: '參與者' // 可選：標識角色
        }))
      ]
    };

    console.log('更新後的 getGroupData', groupMembers.value);
  } catch (err) {
    console.error('獲取成員資料失敗：', err.message);
  }
};

// 獲取帳目列表
const getAccount = async () => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  try {
    console.log('scheduleId', scheduleId);
    const response = await axios.get(
      `${API_URL}/groups/${scheduleId}/bills`,
      config
    );
    accounts.value = response.data; // 將 API 返回的帳目資料設為 `accounts.value`
    console.log('帳目列表：', accounts.value);
  } catch (error) {
    console.error('獲取帳目資料失敗：', error);
    messageStore.messageModal({
      message: '無法獲取帳目資料，請稍後重試。',
      status: 'error'
    });
  }
};

// 提供資料給子組件
provide('groupMembers', groupMembers);
provide('accounts', accounts);
provide('scheduleId', scheduleId); // 提供 scheduleId 給子組件使用

onMounted(async () => {
  loadingStore.showLoading();
  await getGroupData(); // 組件掛載時請求成員資料
  await getAccount(); // 組件掛載時請求帳目資料
  await getSchedules();
  router.push(`/groups/${scheduleId}/account-form`);
  loadingStore.hideLoading();
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
  <div
    class="bg-primary-700 h-[100vh] w-full flex justify-center items-center overflow-y-auto overflow-x-hidden"
  >
    <div
      class="border-round bg-primary-700 md:w-20px w-[52rem] mx-auto h-full items-center justify-center"
    >
      <div class="title">
        <div
          class="flex flex-row w-full text-center justify-center items-center relative p-2"
        >
          <button
            class="btn-primary absolute left-4 top-2 md:left-4 md:top-0 p-0 justify-center"
          >
            <router-link to="/planner">
              <div class="flex flex-row items-center justify-center mx-2">
                <ArrowLeftIcon class="w-6 my-2 text-white md:hidden" />
                <img :src="backIcon" class="w-20 mt-2 hidden md:block" />
              </div>
            </router-link>
          </button>
          <img
            src="../assets/svg/logo-light.svg"
            alt="Logo"
            class="w-10 mr-1"
          />
          <h1
            class="text-[24px] md:text-[36px] text-center font-bold text-white my-2"
          >
            TriAccount 旅費分帳
          </h1>
        </div>
        <h2 class="text-[40px] font-bold text-center text-primary-50">
          {{ groupMembers.title }}
        </h2>
        <p class="text-l text-white text-center mb-8">
          {{ schedules.start_date }} ~ {{ schedules.end_date }}
        </p>
      </div>

      <nav
        class="flex justify-center space-x-4 flex-row bg-primary-700 w-full px-4"
      >
        <ul class="flex flex-row text-white gap-1 md:gap-20">
          <li
            :class="{
              'text-primary-700 bg-white rounded-t-lg':
                $route.name === 'AccountForm'
            }"
            class="md:hover:text-primary-100 md:hover:bg-primary-600 rounded-t-lg"
          >
            <router-link
              :to="{ name: 'AccountForm', params: { scheduleId: scheduleId } }"
              class="nav-link"
            >
              新增花費
            </router-link>
          </li>
          <li
            :class="{
              'text-primary-700 bg-white rounded-t-lg':
                $route.name === 'AccountList'
            }"
            class="md:hover:text-primary-100 md:hover:bg-primary-600 rounded-t-lg"
          >
            <router-link
              :to="{ name: 'AccountList', params: { scheduleId: scheduleId } }"
              class="nav-link"
            >
              花費列表
            </router-link>
          </li>
          <li
            :class="{
              'text-primary-700 bg-white rounded-t-lg':
                $route.name === 'BalanceSummary'
            }"
            class="md:hover:text-primary-100 md:hover:bg-primary-600 rounded-t-lg"
          >
            <router-link
              :to="{
                name: 'BalanceSummary',
                params: { scheduleId: scheduleId }
              }"
              class="nav-link"
            >
              分帳狀態
            </router-link>
          </li>
          <li
            :class="{
              'text-primary-700 bg-white rounded-t-lg':
                $route.name === 'ShareGroup'
            }"
            class="md:hover:text-primary-100 md:hover:bg-primary-600 rounded-t-lg"
          >
            <router-link
              :to="{ name: 'ShareGroup', params: { scheduleId: scheduleId } }"
              class="nav-link"
            >
              群組成員
            </router-link>
          </li>
        </ul>
      </nav>

      <main class="px-4 w-full bg-primary-700 border-none">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  justify-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
  color: rgb(162, 157, 157);
}

.nav-link {
  text-decoration: none;
  padding: 10px 10px;
  width: 96px;
  text-align: center;
  display: flex;
  justify-content: center;
}

.nav-linkActive {
  background-color: white;
  border: none;
  color: #1f2937;
  border-radius: 5px 5px 0px 0px;
}
</style>
