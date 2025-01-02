<script setup>
import { ref } from "vue"

defineProps({
  categories: {
    type: Array,
    required: true,
  },
})

const amount = ref(0) // 金額
const category = ref("") // 分類
const description = ref("") // 描述
const date = ref("") // 日期

const submitAccount = () => {
  const account = {
    amount: parseFloat(amount.value),
    category: category.value,
    description: description.value,
    date: date.value,
  }
  console.log("新增帳目：", account)
}
</script>

<template>
  <form
    @submit.prevent="submitAccount"
    class="p-4 bg-white shadow-md rounded-lg space-y-4"
  >
    <div>
      <label for="amount" class="block text-sm font-medium text-gray-700"
        >金額</label
      >
      <input
        id="amount"
        v-model="amount"
        type="number"
        placeholder="輸入金額"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      />
    </div>
    <div>
      <label for="category" class="block text-sm font-medium text-gray-700"
        >分類</label
      >
      <select
        id="category"
        v-model="category"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      >
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700"
        >描述</label
      >
      <input
        id="description"
        v-model="description"
        type="text"
        placeholder="描述"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      />
    </div>
    <div>
      <label for="date" class="block text-sm font-medium text-gray-700"
        >日期</label
      >
      <input
        id="date"
        v-model="date"
        type="date"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      />
    </div>
    <button
      type="submit"
      class="w-full py-2 px-4 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      提交
    </button>
  </form>
</template>
