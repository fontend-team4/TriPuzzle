<template>
  <div>
    <h2>分享群組</h2>
    <div>
      <label for="email">邀請好友 (Email):</label>
      <input id="email" v-model="inviteEmail" type="email" placeholder="輸入好友的 Email" />
      <button @click="sendInvite">邀請</button>
    </div>
    <ul>
      <li v-for="(member, index) in groupMembers" :key="index">
        {{ member.name }} - {{ member.email }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 測試數據（實際應從父組件或 API 獲取）
const groupMembers = ref([
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
]);

const inviteEmail = ref("");

const sendInvite = () => {
  if (inviteEmail.value) {
    groupMembers.value.push({ name: "新用戶", email: inviteEmail.value });
    inviteEmail.value = ""; // 清空輸入框
    alert("邀請已發送！");
  } else {
    alert("請輸入有效的 Email");
  }
};
</script>
