<template>
  <div>
    <h2>攤銷金額</h2>
    <ul>
      <li v-for="(member, index) in balanceSummary" :key="index">
        <div>
          <strong>{{ member.name }}</strong>
        </div>
        <div>
          應付: {{ member.shouldPay }} | 已付: {{ member.paid }} | 差額: {{ member.balance }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 測試數據（實際應從父組件或 API 獲取）
const balanceSummary = ref([
  { name: "Alice", shouldPay: 1000, paid: 1200, balance: 200 },
  { name: "Bob", shouldPay: 1000, paid: 800, balance: -200 },
]);
</script>
