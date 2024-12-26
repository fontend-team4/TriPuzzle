<script setup>
import { ref } from "vue";

defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const amount = ref(0); // 金額
const category = ref(""); // 分類
const description = ref(""); // 描述
const date = ref(""); // 日期

const submitAccount = () => {
  const account = {
    amount: parseFloat(amount.value),
    category: category.value,
    description: description.value,
    date: date.value,
  };
  console.log("新增帳目：", account);
};
</script>

<template>
  <form @submit.prevent="submitAccount">
    <div>
      <label>金額</label>
      <input v-model="amount" type="number" placeholder="輸入金額" required />
    </div>
    <div>
      <label>分類</label>
      <select v-model="category">
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>
    <div>
      <label>描述</label>
      <input v-model="description" type="text" placeholder="描述" />
    </div>
    <div>
      <label>日期</label>
      <input v-model="date" type="date" required />
    </div>
    <button type="submit">提交</button>
  </form>
</template>
