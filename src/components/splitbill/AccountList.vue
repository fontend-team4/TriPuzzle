<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue';
import {
  EllipsisHorizontalIcon,
  ShareIcon,
  CakeIcon,
  TicketIcon,
  HomeIcon,
  ShoppingBagIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const scheduleId = inject('scheduleId');
const accounts = inject('accounts');

const showDropdown = ref(null); // 控制下拉選單的顯示
const dropdownRefs = ref([]); // 儲存每個下拉選單元素
const token = localStorage.getItem('token');
const API_URL = process.env.VITE_HOST_URL;

// 根據分類設置顏色類別
const categoryClass = (category) => {
  switch (category) {
    case '餐飲':
      return 'bg-red-400';
    case '交通':
      return 'bg-sky-600';
    case '住宿':
      return 'bg-lime-600';
    case '購物':
      return 'bg-orange-500';
    case '票卷':
      return 'bg-blue-500';
    default:
      return 'bg-gray-300'; // 默認顏色
  }
};

// 根據分類返回 Icon
const categoryIcon = (category) => {
  switch (category) {
    case '餐飲':
      return CakeIcon; // 食物圖示
    case '交通':
      return; // 飛機圖示
    case '住宿':
      return HomeIcon; // 房屋圖示
    case '購物':
      return ShoppingBagIcon; // 購物袋圖示
    case '票卷':
      return TicketIcon; // 票卷圖示
    default:
      return EllipsisHorizontalIcon; // 預設圖示
  }
};

// 開啟/關閉下拉選單
const toggleDropdown = (index) => {
  showDropdown.value = showDropdown.value === index ? null : index;
  console.log('showDropdown', showDropdown.value);
};

// 點擊選單外部關閉選單
const onClickOutside = (event) => {
  const dropdownElement = dropdownRefs.value[showDropdown.value];
  if (
    showDropdown.value !== null &&
    (!dropdownElement || !dropdownElement.contains(event.target))
  ) {
    showDropdown.value = null; // 點擊選單外部時關閉選單
  }
};

const showEditModal = ref(null); // 控制 Modal 顯示狀態
const selectedAccount = ref(null); // 儲存當前選擇的帳目

// 點擊外框關閉
const closeModal = () => {
  const dialog = document.getElementById('edit_modal');
  dialog?.close();
};

// 提交修改
const submitEdit = async () => {
  const selected = accounts.value[0].id;
  try {
    const config = {
      headers: { Authorization: token }
    };
    // 發送 PUT 請求
    const response = await axios.patch(
      `${API_URL}/groups/${scheduleId}/bills/${selected}`,
      {
        title: selectedAccount.title,
        price: selectedAccount.price,
        category: selectedAccount.category,
        date: selectedAccount.date,
        created_by: selectedAccount.created_by,
        split_among: selectedAccount.split_among,
        is_personal: selectedAccount.is_personal,
        remarks: selectedAccount.remarks
      },
      config
    );

    alert('帳目已更新成功');
    console.log('更新結果:', response.data);

    // 關閉 Modal 並清空選擇
    closeModal();
  } catch (error) {
    console.error('更新帳目失敗', error);
    alert('更新帳目失敗，請稍後重試');
  }
};

// 獲取帳目列表
const fetchAccounts = async () => {
  try {
    const response = await axios.get(`${API_URL}/groups/${scheduleId}/bills`, {
      headers: {
        Authorization: token
      }
    });
    accounts.value = response.data; // 將 API 返回的帳目資料設為 `accounts.value`
    console.log('帳目列表：', accounts.value);
  } catch (error) {
    console.error('獲取帳目資料失敗：', error);
    alert('無法獲取帳目資料，請稍後重試。');
  }
};

// 刪除帳目
const removeAccount = async (accountId) => {
  try {
    await axios.delete(`${API_URL}/groups/${scheduleId}/bills/${accountId}`, {
      headers: {
        Authorization: token
      }
    });
    accounts.value = accounts.value.filter(
      (account) => account.id !== accountId
    ); // 從列表中移除
    showDropdown.value = null;
    alert('帳目已刪除');
  } catch (error) {
    console.error('刪除帳目失敗：', error);
    alert('刪除帳目時發生錯誤，請稍後重試。');
  }
};

// 添加/移除事件監聽
onMounted(() => {
  document.addEventListener('click', onClickOutside);
  fetchAccounts();
  console.log('accounts', accounts.value[0].id);
});

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside);
});
</script>

<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-bold text-primary-500">帳目清單</h2>
    <ul class="divide-y divide-gray-200">
      <li
        v-for="(account, index) in accounts"
        :key="index"
        class="flex justify-between items-center relative h-24"
        ref="dropdownRefs"
      >
        <!-- 帳目資訊 -->
        <div class="flex items-center gap-2">
          <div
            class="text-[12px] text-white justify-center items-center rounded px-2 py-1"
            :class="categoryClass(account.category)"
          >
            <span :class="categoryClass(account.category)">
              <component
                :is="categoryIcon(account.category)"
                class="w-6 h-5 text-white justify-center items-center"
              ></component>
              {{ account.category }}
            </span>
          </div>
          <div class="px-1 py-1 text-xl text-gray-500">{{ account.title }}</div>
        </div>

        <!-- 帳目金額與日期 -->
        <div class="text-right">
          <div class="text-lg font-bold text-primary-500">
            $ {{ account.price }} 元
          </div>
          <div class="text-sm text-gray-400">
            {{ account.date.split('T')[0] }}
          </div>
        </div>

        <!-- 下拉式選單 -->
        <div class="absolute right-2 top-0">
          <button
            @click="toggleDropdown(index)"
            class="relative w-4 h-4 p-1 ml-4 px-2 py-1 0 text-black text-sm rounded"
          >
            <span class="inline-block w-6 h-6">
              <EllipsisHorizontalIcon />
            </span>
          </button>
          <div
            v-if="showDropdown === index"
            class="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-10"
          >
            <ul>
              <li
                onclick="edit_modal.showModal()"
                @click="toggleDropdown(index)"
                class="px-4 py-2 text-gray-700 hover:bg-gray cursor-pointer"
              >
                修改帳目
              </li>
              <li
                @click="removeAccount(account.id)"
                class="px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
              >
                刪除帳目
              </li>
            </ul>
          </div>
        </div>
        <!-- 修改帳目 Modal  -->
        <dialog
          id="edit_modal"
          class="modal fixed inset-0 flex items-center justify-center bg-black/30"
          @click.self="closeModal"
        >
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <XMarkIcon class="w-6 h-6" />
            </button>
          </form>
          <div
            class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
          >
            <h2 class="text-xl font-bold mb-4">修改帳目</h2>
            <label class="block mb-2 text-sm font-medium">標題</label>
            <input
              type="text"
              v-model="title"
              class="border border-gray-300 rounded w-full px-4 py-2"
            />

            <label class="block mt-4 mb-2 text-sm font-medium">金額</label>
            <input
              type="number"
              v-model="price"
              class="border border-gray-300 rounded w-full px-4 py-2"
            />

            <label class="block mt-4 mb-2 text-sm font-medium">分類</label>
            <select
              v-model="category"
              class="border border-gray-300 rounded w-full px-4 py-2"
            >
              <option value="餐飲">餐飲</option>
              <option value="交通">交通</option>
              <option value="住宿">住宿</option>
              <option value="購物">購物</option>
              <option value="票卷">票卷</option>
            </select>

            <label class="block mt-4 mb-2 text-sm font-medium">日期</label>
            <input
              type="date"
              v-model="date"
              class="border border-gray-300 rounded w-full px-4 py-2"
            />

            <label class="block mt-4 mb-2 text-sm font-medium">備註</label>
            <textarea
              v-model="remarks"
              class="border border-gray-300 rounded w-full px-4 py-2"
            ></textarea>

            <div class="flex justify-end gap-4 mt-6">
              <button @click="closeModal" class="bg-gray-200 px-4 py-2 rounded">
                取消
              </button>
              <button
                @click="submitEdit"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                確認修改
              </button>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              close
            </button>
          </form>
        </dialog>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.bg-red-500 {
  background-color: #ef4444;
}
.bg-blue-500 {
  background-color: #3b82f6;
}
.bg-green-500 {
  background-color: #10b981;
}
.bg-yellow-500 {
  background-color: #facc15;
}
.bg-gray-300 {
  background-color: #d1d5db;
}
</style>
