<script setup>
import { ref, onMounted, inject } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import defaultUserImage from '/images/cat-2.png';

const route = useRoute();
const API_URL = process.env.VITE_HOST_URL;
const token = localStorage.getItem('token');
const balances = ref([]); // 成員攤銷金額列表
const scheduleId = inject('scheduleId');
const accounts = inject('accounts');
const bills = ref([]); // 帳目列表
// const shouldPay = ref(0);
// const paid = ref(0);
// const balance = ref(0);

// 獲取帳目資料
const fetchBills = async () => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  try {
    const response = await axios.get(
      `${API_URL}/groups/${scheduleId}/bills`,
      config
    );
    console.log('獲取帳目資料', response.data);
    bills.value = Array.isArray(response.data)
      ? response.data
      : [response.data]; // 確保 bills 是陣列
    balances.value = calculateBalances(bills.value);
  } catch (err) {
    console.error('獲取帳目失敗', err);
  }
};

// 計算成員攤銷金額
const calculateBalances = (bills) => {
  const balanceMap = {};
  bills.forEach((bill) => {
    const perPersonShare = Number(bill.price) / bill.split_among.length; // 確保 price 為數字
    bill.users_bills.forEach((userBill) => {
      const userId = userBill.user_id;
      const userName = userBill.users.name; // 成員名稱

      if (!balanceMap[userId]) {
        balanceMap[userId] = {
          name: userName,
          shouldPay: 0,
          paid: 0,
          balance: 0
        };
      }

      balanceMap[userId].shouldPay += perPersonShare; // 累加應付金額（確保為數字）
      balanceMap[userId].paid +=
        bill.created_by === userId ? Number(bill.price) : 0; // 若為創建者，則已付全額
    });
  });

  return Object.values(balanceMap).map((member) => ({
    ...member,
    balance: member.paid - member.shouldPay // 差額計算
  }));
};

onMounted(() => {
  fetchBills(); // 組件掛載時發送 API 請求
});
</script>

<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-bold text-primary-500 mb-4">攤銷金額</h2>
    <ul class="divide-y divide-gray-200">
      <li
        v-for="(member, index) in balances"
        :key="index"
        class="py-2 flex justify-between"
      >
        <div class="text-lg text-gray-800 flex flex-row items-center">
          <img
            :src="member.profile_pic_url || defaultUserImage"
            alt="Logo"
            class="w-6 mr-2 rounded-full"
          />
          {{ member.name }}
        </div>
        <div>
          <div class="text-sm text-gray-500">
            應付:
            <span class="font-bold text-primary-500">
              {{ member.shouldPay }}
            </span>
          </div>
          <div class="text-sm text-gray-500">
            已付:
            <span class="font-bold text-primary-500">{{ member.paid }}</span>
          </div>
          <div
            class="text-sm"
            :class="member.balance >= 0 ? 'text-green-500' : 'text-red-500'"
          >
            差額: {{ member.balance }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
