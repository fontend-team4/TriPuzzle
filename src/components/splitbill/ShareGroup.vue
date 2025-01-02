<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-bold text-primary-500 mb-4">分享群組</h2>
    <div class="mb-4 flex items-center">
      <input
        id="email"
        v-model="inviteEmail"
        type="email"
        placeholder="輸入好友的 Email"
        class="flex-1 p-2 border border-secondary-500 rounded text-gray-800"
      />
      <button
        @click="sendInvite"
        class="ml-4 px-4 py-2 bg-primary-500 text-white font-medium rounded hover:bg-primary-600"
      >
        邀請
      </button>
    </div>
    <ul class="divide-y divide-gray-200">
      <li
        v-for="(member, index) in groupMembers"
        :key="index"
        class="py-2 text-gray-800"
      >
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

const inviteEmail = ref("")

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
