<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-bold text-primary-500 mb-2">群組成員</h2>
    <ul class="divide-y divide-gray-200">
      <li
        v-for="(member, index) in groupMembers"
        :key="index"
        class="py-2 text-gray-800 flex flex-row items-center"
      >
        <img src="@/assets/svg/logo-light.svg" alt="Logo" class="w-8" />
        {{ member.name }} -
        <span class="text-gray-500">{{ member.email }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue"

const groupMembers = ref([
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
])

const sendInvite = () => {
  if (inviteEmail.value) {
    groupMembers.value.push({ name: "新用戶", email: inviteEmail.value })
    inviteEmail.value = "" // 清空輸入框
    alert("邀請已發送！")
  } else {
    alert("請輸入有效的 Email")
  }
}
</script>
