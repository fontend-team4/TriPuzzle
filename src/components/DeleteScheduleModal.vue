<script setup>
import { inject } from 'vue'
import axios from 'axios'
import { DeleteScheduleStore } from '@/stores/DeleteModal'

const modalStore = DeleteScheduleStore()

const itemId = inject('itemId')

const API_URL = 'http://localhost:3000'
const deleteSchedule = async (id) => {
  try {
    await axios.delete(`${API_URL}/schedules/${id}`)
    console.log('刪除成功')
  } catch (error) {
    console.error(error.message)
  }
}
</script>

<template>
  <div
    class="absolute top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-25"
    @click.stop="modalStore.closeModal"
  >
    <div class="modal-box w-[384px] p-0">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="modalStore.closeModal"
        >
          ✕
        </button>
      </form>
      <div class="py-6 px-5 object-cover">
        <img
          class="w-72 h-36 mx-auto"
          src="https://web.chictrip.com.tw/assets/master-img-warn.198cfcdc.png"
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
        >
          取消
        </button>
        <button
          class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl font-medium"
          @click.prevent="deleteSchedule(itemId)"
        >
          刪除
        </button>
      </div>
    </div>
  </div>
</template>
