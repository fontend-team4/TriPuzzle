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

<script setup>
import { ref } from "vue"

const balances = ref([
  { name: "Alice", shouldPay: 1000, paid: 1200, balance: 200 },
  { name: "Bob", shouldPay: 1000, paid: 800, balance: -200 },
])
</script>
