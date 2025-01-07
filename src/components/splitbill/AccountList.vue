<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import{ EllipsisHorizontalIcon, ShareIcon,}from "@heroicons/vue/24/outline";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const scheduleId = route.params.scheduleId; // 從路徑參數獲取行程 ID
const accounts = ref([]); // 響應式帳目列表
const showDropdown = ref(null); // 控制下拉選單的顯示
const dropdownRefs = ref([]); // 儲存每個下拉選單元素
const token = localStorage.getItem("token");
const API_URL = process.env.VITE_HOST_URL;

// 開啟/關閉下拉選單
const toggleDropdown = (index) => {
  showDropdown.value = showDropdown.value === index ? null : index;
  console.log("showDropdown", showDropdown.value);
};

// 點擊選單外部關閉選單
const onClickOutside = (event) => {
  const dropdownElement = dropdownRefs.value[showDropdown.value];
  if (showDropdown.value !== null && (!dropdownElement || !dropdownElement.contains(event.target))) {
    showDropdown.value = null; // 點擊選單外部時關閉選單
  }
};

// 修改帳目
const editAccount = (account) => {
  alert(`修改帳目，帳目 ID：${account.id}，標題：${account.description}`);
  // 此處可以觸發 Modal 或跳轉到帳目編輯頁面
};


// 獲取帳目列表
const fetchAccounts = async () => {
  try {
    const response = await axios.get(`${API_URL}/groups/${scheduleId}/bills`, {
      headers: {
        Authorization: token,
      },
    });
    accounts.value = response.data; // 將 API 返回的帳目資料設為 `accounts.value`
    console.log("帳目列表：", accounts.value);
  } catch (error) {
    console.error("獲取帳目資料失敗：", error);
    alert("無法獲取帳目資料，請稍後重試。");
  }
};

// 刪除帳目
const removeAccount = async (accountId) => {
  try {
    await axios.delete(`${API_URL}/groups/${scheduleId}/bills/${accountId}`, {
      headers: {
        Authorization: token,
      },
    });
    accounts.value = accounts.value.filter((account) => account.id !== accountId); // 從列表中移除
    alert("帳目已刪除");
  } catch (error) {
    console.error("刪除帳目失敗：", error);
    alert("刪除帳目時發生錯誤，請稍後重試。");
  }
};

// 添加/移除事件監聽
onMounted(() => {
  document.addEventListener("click", onClickOutside);
  fetchAccounts();
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
});

</script>

<template>
  <div class="p-4 bg-white shadow-md rounded-lg" 
  >
    <h2 class="text-xl font-bold text-primary-500">帳目清單</h2>
    <ul class="divide-y divide-gray-200">
      <li
        v-for="(account, index) in accounts"
        :key="index"
        class="py-2 flex justify-between items-center relative h-24"
        ref="dropdownRefs"
      >
        <!-- 帳目資訊 -->
        <div class="flex flex-col text-center  justify-between">
          <span class="text-[12px] text-gray-800 bg-gray rounded px-2 py-1">
            {{ account.category }}
          </span>
          <div class="text-m text-gray-500">{{ account.title }}</div>
        </div>

        <!-- 帳目金額與日期 -->
        <div class="text-right">
          <div class="text-lg font-bold text-primary-500">
            {{ account.price }} 元
          </div>
          <div class="text-sm text-gray-400">{{ account.date.split("T")[0] }}</div>
        </div>

        <!-- 下拉式選單 -->
        <div class="absolute right-2 top-0">
          <button
            @click="toggleDropdown(index)"
            class="relative w-4 h-4 p-1 ml-4 px-2 py-1 0 text-black text-sm rounded"
            >
          <span class="inline-block w-6 h-6" >
            <EllipsisHorizontalIcon/></span>
          </button>
          <div
            v-if="showDropdown === index"
            class="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-10"
          >
            <ul>
              <li
                @click="editAccount(account)"
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
      </li>
    </ul>
  </div>
</template>