<script setup>
import { defineProps } from "vue"
import axios from "axios"
const props = defineProps({
  scheduleId: {
    type: [Number, String],
    required: true,
  },
  toBeDeleteId: {
    type: [Number, String],
    required: true,
  },
  updateList: {
    type: Function,
    required: true,
  },
})

const API_URL = process.env.VITE_HOST_URL
const token = localStorage.getItem("token")
// 刪除行程
const deleteSchedule = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  try {
    const response = await axios.delete(`${API_URL}/schedules/${id}`, config)
    console.log(response)
    props.updateList()
  } catch (error) {
    console.error(error.message)
  }
}
</script>

<template>
  <dialog id="deleteSchedule" class="modal">
    <div class="modal-box w-[384px] p-0">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div class="py-6 px-5 object-cover">
        <img
          class="w-48 h-48 mx-auto"
          src="../assets/images/cat-4.png"
          alt=""
        />
      </div>
      <div class="text-center">
        <p class="text-lg font-medium">確定要刪除行程嗎？</p>
        <p class="text-gray-400 pt-1">刪除後將無法復原哦</p>
      </div>
      <div class="w-full flex gap-3 px-5 py-6">
        <button
          class="w-full h-12 px-5 py-3 border border-primary-600 text-primary-600 hover:bg-primary-100 text-center rounded-3xl font-medium"
          onclick="deleteSchedule.close()"
        >
          取消
        </button>
        <button
          class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl font-medium"
          @click="deleteSchedule(toBeDeleteId)"
          onclick="deleteSchedule.close()"
        >
          刪除
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
      <button>close</button>
    </form>
  </dialog>
</template>
