<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-bold text-primary-500 mb-4">帳目清單</h2>
    <ul class="divide-y divide-gray-200">
      <li
        v-for="(account, index) in accounts"
        :key="index"
        class="py-2 flex justify-between items-center"
      >
        <div class="flex flex-col text-center gap-4 justify-between">
          <div class="text-sm text-gray-800 bg-gray rounded px-2 py-1">
            {{ account.category }}
          </div>
          <div class="text-m text-gray-500">{{ account.description }}</div>
        </div>
        <div class="text-right">
          <div class="text-lg font-bold text-primary-500">
            {{ account.amount }}
          </div>
          <div class="text-sm text-gray-400">{{ account.date }}</div>
          <button
            @click="removeAccount(index)"
            class="ml-4 px-3 py-1 bg-red-500 text-white text-sm font-sm rounded hover:bg-red-600"
          >
            刪除
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue"

const accounts = ref([
  { category: "餐飲", description: "晚餐", amount: 500, date: "2024-01-01" },
  { category: "交通", description: "高鐵票", amount: 1200, date: "2024-01-02" },
])

const removeAccount = (index) => {
  accounts.value.splice(index, 1)
}
</script>
