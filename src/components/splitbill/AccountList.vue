<template>
  <div>
    <h2>帳目清單</h2>
    <ul>
      <li v-for="(account, index) in accounts" :key="index">
        <div>
          <strong>{{ account.category }}</strong> - {{ account.description }}
        </div>
        <div>
          金額: {{ account.amount }} | 日期: {{ account.date }}
        </div>
        <button @click="removeAccount(index)">刪除</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 測試數據（實際應從父組件或 API 獲取）
const accounts = ref([
  { category: "餐飲", description: "晚餐", amount: 500, date: "2024-01-01" },
  { category: "交通", description: "高鐵票", amount: 1200, date: "2024-01-02" },
]);

const removeAccount = (index) => {
  accounts.value.splice(index, 1); // 從列表中移除帳目
};
</script>
