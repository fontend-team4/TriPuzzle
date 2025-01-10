<script setup>
import { ref, inject, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import '@/assets/loading.css';
import { useLoadingStore } from '@/stores/loading';
import { MessageModalStore } from '@/stores/MessageModal';
import defaultUserImage from '/images/cat-2.png';

const messageStore = MessageModalStore();
const loadingStore = useLoadingStore();
const loadingForBtn = ref(false);
const route = useRoute();
const scheduleId = route.params.scheduleId; // 從路由取得行程 ID
const token = localStorage.getItem('token');
const API_URL = process.env.VITE_HOST_URL;

const getGroupData = inject('groupMembers'); // 從父組件 inject 獲取

const title = ref(''); // 花費名稱
const amount = ref(0); // 金額
const category = ref(''); // 分類
const description = ref(''); // 備註
const date = ref(new Date());
// In case of a range picker, you'll receive [Date, Date]
const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}/${month}/${day}`;
};

const payfirst = ref(''); // 代墊人
const payfirst_id = getGroupData.value; // 代墊人 ID 列表
const splitAmong = ref([]); // 自訂義的分攤成員陣列

const categories = ['餐飲', '交通', '住宿', '購物', '票卷', '其他'];

const dateInput = ref(null);
const openDatePicker = () => {
  dateInput.value?.showPicker(); // 確保ref存在後再執行.showPicker()
};

// 提交帳目至後端
const submitAccount = async () => {
  loadingForBtn.value = true;
  try {
    console.log('代墊人 ID 列表', payfirst_id.groupUsers);
    const selectedUser = payfirst_id.groupUsers.find(
      (user) => user.id === payfirst.value
    );

    if (!selectedUser) {
      loadingForBtn.value = false;
      messageStore.messageModal({
        message: '請選擇代墊人',
        status: 'error'
      });
      return;
    }

    if (splitAmong.value.length === 0) {
      loadingForBtn.value = false;
      messageStore.messageModal({
        message: '請選擇參與分攤者',
        status: 'error'
      });
      return;
    }

    const accountData = {
      title: title.value,
      price: parseFloat(amount.value),
      category: category.value,
      date: date.value,
      created_by: selectedUser.id, // 創建者 ID
      split_among: splitAmong.value.map((user) => user.id), // 分攤者 ID 列表
      is_personal: false,
      remarks: description.value
    };

    // 發送請求
    const response = await axios.post(
      `${API_URL}/groups/${scheduleId}/bills`,
      accountData,
      {
        headers: {
          Authorization: token
        }
      }
    );
    loadingForBtn.value = false;
    messageStore.messageModal({
      message: '新增帳目成功',
      status: 'success'
    });
    resetForm(); // 只在成功提交後重置表單
  } catch (error) {
    loadingForBtn.value = false;
    console.error('新增帳目失敗：', error);

    // 提示具體的錯誤訊息
    if (error.response && error.response.data && error.response.data.error) {
      messageStore.messageModal({
        message: `錯誤: ${error.response.data.error}`,
        status: 'error'
      });
    } else {
      messageStore.messageModal({
        message: '新增帳目時發生未知錯誤，請稍後重試。',
        status: 'error'
      });
    }
  }
};

// 重置表單
const resetForm = () => {
  title.value = '';
  amount.value = 0;
  category.value = '';
  payfirst.value = '';
  description.value = '';
  date.value = '';
  splitAmong.value = [];
};

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
  <form
    @submit.prevent="submitAccount"
    class="p-4 bg-white shadow-md md:rounded-lg rounded-b-lg rounded-r-lg space-y-4"
  >
    <h2 class="text-xl font-bold text-primary-500 mb-4 pl-1">新增花費</h2>
    <div>
      <label for="amount" class="block pl-1 text-sm font-medium text-gray-700">
        花費名稱
      </label>
      <input
        id="title"
        v-model="title"
        type="text"
        placeholder="請輸入花費名稱"
        class="mt-1 pl-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      />
    </div>
    <div>
      <label for="amount" class="block pl-1 text-sm font-medium text-gray-700">
        費用
      </label>
      <input
        id="amount"
        v-model="amount"
        type="number"
        placeholder="$ 0"
        required
        class="mt-1 pl-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      />
    </div>
    <div>
      <label
        for="category"
        class="block pl-1 text-sm font-medium text-gray-700"
      >
        分類
      </label>
      <select
        id="category"
        v-model="category"
        class="mt-1 block h-8 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      >
        <option value="" class="text-gray-500" disabled selected>請選擇</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>
    <!-- 代墊人 -->
    <div>
      <label for="payfirst" class="block text-sm font-medium text-gray-700">
        代墊人
      </label>
      <select
        id="payfirst"
        v-model="payfirst"
        class="mt-1 h-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      >
        <option value="" disabled selected>請選擇</option>
        <!-- 使用 groupUsers 作為選項 -->
        <option
          v-for="groupUser in payfirst_id.groupUsers"
          :key="groupUser.id"
          :value="groupUser.id"
        >
          {{ groupUser.name }} - {{ groupUser.email }}
        </option>
      </select>
    </div>

    <!-- 參與分攤者 -->
    <div>
      <label class="block text-sm font-medium text-gray-700">參與分攤者</label>
      <div class="flex flex-col items-start md:flex-wrap gap-2 mt-2">
        <!-- 使用 groupUsers 作為多選選項 -->
        <div
          v-for="user in payfirst_id.groupUsers"
          :key="user.id"
          class="flex flex-row items-center justify-between space-x-1 w-full"
        >
          <label
            class="cursor-pointer label flex-row items-between"
            :for="`user-${user.id}`"
          >
            <input
              type="checkbox"
              :value="user"
              v-model="splitAmong"
              class="checkbox md:checkbox-md mr-2 checkbox-error md:mr-4 rounded shadow-sm [--chkfg:white] focus:border-primary-500 focus:ring-primary-500"
              :id="`user-${user.id}`"
            />
            <img
              :src="user.profile_pic_url || defaultUserImage"
              alt="User avatar"
              class="w-10 h-10 ml-2 md:ml-0 mr-2 object-cover rounded-full"
            />
            <span class="label-text text-lg mr-2">
              {{ user.name }}
            </span>
          </label>
          <span class="label-text text-lg mr-2 hidden md:block">
            {{ user.email }}
          </span>
        </div>
      </div>
    </div>

    <div>
      <label
        for="description"
        class="block pl-1 text-sm font-medium text-gray-700"
      >
        備註
      </label>
      <input
        id="description"
        v-model="description"
        type="text"
        placeholder="補充說明"
        autocomplete="off"
        class="mt-2 pl-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      />
    </div>
    <div class="relative cursor-pointer">
      <label for="date" class="block pl-1 text-sm font-medium text-gray-700">
        日期
      </label>
      <VueDatePicker
        v-model="date"
        required
        auto-apply
        :enable-time-picker="false"
        :format="format"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      ></VueDatePicker>
    </div>
    <button
      v-if="!loadingForBtn"
      type="submit"
      class="w-full py-2 px-4 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      提交
    </button>
    <button
      v-else
      class="w-full py-2 px-4 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      <span class="loading loading-dots loading-md"></span>
    </button>
  </form>
</template>
