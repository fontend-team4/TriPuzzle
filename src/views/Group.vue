<script setup>
import { ref } from "vue"

// 引入子組件
import ShareGroup from "@/components/splitbill/ShareGroup.vue"
import AccountForm from "@/components/splitbill/AccountForm.vue"
import AccountList from "@/components/splitbill/AccountList.vue"
import BalanceSummary from "@/components/splitbill/BalanceSummary.vue"

// 測試數據（實際應從 API 獲取）
const groupMembers = ref([
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
])

const accounts = ref([
  { category: "餐飲", description: "晚餐", amount: 500, date: "2024-01-01" },
  { category: "交通", description: "高鐵票", amount: 1200, date: "2024-01-02" },
])

const categories = ["餐飲", "交通", "住宿", "購物"]

const balances = ref([
  { name: "Alice", shouldPay: 1000, paid: 1200, balance: 200 },
  { name: "Bob", shouldPay: 1000, paid: 800, balance: -200 },
])

// 方法
const addAccount = (account) => {
  accounts.value.push(account)
}

const removeAccount = (index) => {
  accounts.value.splice(index, 1)
}

const updateGroupMembers = (newMembers) => {
  groupMembers.value = newMembers
}
</script>

<template>
  <div class="group border m-4">
    <h1 class="text-lg">GroupView.vue</h1>

    <!-- 分享群組 -->
    <section>
      <h2 class="my-2">-- ShareGroup.vue: 邀請成員 --</h2>
      <ShareGroup
        :groupMembers="groupMembers"
        @update-members="updateGroupMembers"
      />
      <h2 class="my-2">--ShareGroup--</h2>
    </section>

    <!-- 新增帳目表單 -->
    <section>
      <h2 class="my-2">--AccountForm.vue : 新增帳目--</h2>
      <AccountForm :categories="categories" @add-account="addAccount" />
      <h2 class="my-2">--AccountForm--</h2>
    </section>

    <!-- 帳目清單 -->
    <section>
      <h2 class="my-2">--AccountList.vue : 顯示帳目--</h2>
      <AccountList :accounts="accounts" @remove-account="removeAccount" />
      <h2 class="my-2">--AccountList--</h2>
    </section>

    <!-- 攤銷金額 -->
    <section>
      <h2 class="my-2">--BalanceSummary.vue : 顯示攤銷金額 --</h2>
      <BalanceSummary :balances="balances" />
      <h2 class="my-2">-- BalanceSummary --</h2>
    </section>
  </div>
</template>
