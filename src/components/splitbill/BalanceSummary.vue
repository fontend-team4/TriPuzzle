<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const balances = ref([]); // 成員攤銷金額列表
const scheduleId = route.params.scheduleId; // 行程 ID

// 計算成員攤銷金額
const calculateBalances = (bills) => {
  const balanceMap = {};

  // 初始化每位成員的應付金額與已付金額
  bills.forEach((bill) => {
    const perPersonShare = bill.price / bill.split_among.length; // 每人分攤金額
    bill.users_bills.forEach((userBill) => {
      const userId = userBill.user_id;

      if (!balanceMap[userId]) {
        balanceMap[userId] = { name: "", shouldPay: 0, paid: 0, balance: 0 };
      }

      balanceMap[userId].shouldPay += perPersonShare; // 累加應付金額
      balanceMap[userId].paid += userBill.amount_paid || 0; // 累加已付金額
    });
  });

  // 計算差額並生成格式化數據
  return Object.values(balanceMap).map((member) => ({
    ...member,
    balance: member.paid - member.shouldPay,
  }));
};

// 獲取帳目資料
const fetchBills = async () => {
  try {
    const response = await axios.get(`/api/groups/${scheduleId}/bills`);
    const bills = response.data; // 獲取帳目資料
    balances.value = calculateBalances(bills); // 計算每位成員的攤銷金額
  } catch (err) {
    console.error("獲取帳目失敗", err);
  }
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
        <div class="text-lg text-gray-800">{{ member.name }}</div>
        <div>
          <div class="text-sm text-gray-500">
            應付:
            <span class="font-bold text-primary-500">{{
              member.shouldPay
            }}</span>
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

