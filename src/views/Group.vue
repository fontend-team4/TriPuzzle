<template>
  <div>
    <h1>群組管理</h1>

    <!-- 分享群組模組 -->
    <section>
      <h2>分享群組</h2>
      <ShareGroup :groupMembers="groupMembers" @update-members="updateGroupMembers" />
    </section>

    <!-- 新增帳目表單 -->
    <section>
      <h2>新增帳目</h2>
      <AccountForm :categories="categories" @add-account="addAccount" />
    </section>

    <!-- 帳目清單 -->
    <section>
      <h2>帳目清單</h2>
      <AccountList :accounts="accounts" @remove-account="removeAccount" />
    </section>

    <!-- 攤銷金額 -->
    <section>
      <h2>攤銷金額</h2>
      <BalanceSummary :balances="balances" />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 引入子組件
import ShareGroup from "../components/ShareGroup.vue";
import AccountForm from "../components/AccountForm.vue";
import AccountList from "../components/AccountList.vue";
import BalanceSummary from "../components/BalanceSummary.vue";

// 測試數據（實際應從 API 獲取）
const groupMembers = ref([
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
]);

const accounts = ref([
  { category: "餐飲", description: "晚餐", amount: 500, date: "2024-01-01" },
  { category: "交通", description: "高鐵票", amount: 1200, date: "2024-01-02" },
]);

const categories = ["餐飲", "交通", "住宿", "購物"];

const balances = ref([
  { name: "Alice", shouldPay: 1000, paid: 1200, balance: 200 },
  { name: "Bob", shouldPay: 1000, paid: 800, balance: -200 },
]);

// 方法
const addAccount = (account) => {
  accounts.value.push(account);
};

const removeAccount = (index) => {
  accounts.value.splice(index, 1);
};

const updateGroupMembers = (newMembers) => {
  groupMembers.value = newMembers;
};
</script>
