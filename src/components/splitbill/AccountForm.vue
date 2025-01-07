<script setup>
import { ref } from "vue";
import { defineProps } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const route = useRoute();
const scheduleId = route.params.scheduleId; // 從路由取得行程 ID

const token = localStorage.getItem("token");
const API_URL = process.env.VITE_HOST_URL;

const title = ref(""); // 花費名稱
const amount = ref(0); // 金額
const category = ref(""); // 分類
const description = ref(""); // 備註
const date = ref(""); // 日期
const payfirst = ref(""); // 代墊人
const splitAmong = ref([]); // 自訂義的分攤成員陣列

const categories = ["餐飲", "交通", "住宿", "購物"];
const payfirst_id = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Cathy" },
  { id: 4, name: "David" },
];

// 提交帳目至後端
const submitAccount = async () => {
  try {
    const selectedUser = payfirst_id.find((user) => user.name === payfirst.value);

    if (!selectedUser) {
      alert("請選擇代墊人");
      return;
    }

    if (splitAmong.value.length === 0) {
      alert("請選擇參與分攤者");
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
      remarks: description.value,
    };

    const response = await axios.post(
      `${API_URL}/groups/${scheduleId}/bills`,
      accountData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    alert("新增帳目成功");
    resetForm();
  } catch (error) {
    console.error("新增帳目失敗：", error);
    alert("新增帳目時發生錯誤，請稍後重試。");
  }
};

// 重置表單
const resetForm = () => {
  title.value = "";
  amount.value = 0;
  category.value = "";
  payfirst.value = "";
  description.value = "";
  date.value = "";
  splitAmong.value = [];
};
</script>


<template>
  <form
    @submit.prevent="submitAccount"
    class="p-4 bg-white shadow-md rounded-lg space-y-4"
  >
    <h2 class="text-xl font-bold text-primary-500 mb-4 pl-1">新增花費</h2>
    <div>
      <label for="amount" class="block pl-1 text-sm font-medium text-gray-700"
        >花費名稱</label
      >
      <input
        id="title"
        v-model="title"
        type="text"
        placeholder="請輸入花費名稱"
        class="mt-1 pl-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      />
    </div>
    <div>
      <label for="amount" class="block pl-1 text-sm font-medium text-gray-700"
        >費用</label
      >
      <input
        id="amount"
        v-model="amount"
        type="number"
        placeholder="$ 0"
        required
        class="mt-1 pl-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      />
    </div>
    <div>
      <label for="category" class="block pl-1 text-sm font-medium text-gray-700"
        >分類</label
      >
      <select
        id="category"
        v-model="category"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      >
        <option value="" class="text-gray-500" disabled selected>請選擇</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>
    <div>
      <label for="category" class="block pl-1 text-sm font-medium text-gray-700"
        >代墊人</label
      >
      <select
        id="payfirst"
        v-model="payfirst"
        class="mt-1 block  w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      >
        <option value="" class="text-gray" disabled selected>請選擇</option>
        <option v-for="pay in payfirst_id" :key="pay.id" :value="pay.name">
          {{ pay.name }}
        </option>
      </select>
    </div>
    <!-- 分攤者 -->
     <div>
      <label class="block text-sm font-medium text-gray-700">參與分攤者</label>
      <div class="flex flex-wrap gap-2 mt-2">
        <div
          v-for="user in payfirst_id"
          :key="user.id"
          class="flex items-center space-x-2"
        >
          <input
            type="checkbox"
            :value="user"
            v-model="splitAmong"
            class="rounded border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          <label>{{ user.name }}</label>
        </div>
      </div>
    </div>

    <div>
      <label for="description" class="block pl-1 text-sm font-medium text-gray-700"
        >描述</label
      >
      <input
        id="description"
        v-model="description"
        type="text"
        placeholder="補充說明"
        autocomplete="off"
        class="mt-1 pl-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      />
    </div>
    <div class="relative cursor-pointer">
    <label for="date" class="block pl-1 text-sm font-medium text-gray-700">
      日期
    </label>
    <div
      class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus-within:ring-primary-500 focus-within:border-primary-500"
    >
      <input
        ref="dateInput"
        id="date"
        v-model="date"
        type="date"
        required
        class="w-full h-full pl-1 bg-transparent cursor-pointer sm:text-sm focus:outline-none"
        @click="openDatePicker"
      />
    </div>
  </div>
    <button
      type="submit"
      class="w-full py-2 px-4 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      提交
    </button>
  </form>
</template>
