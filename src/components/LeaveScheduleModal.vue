<script setup>
import { defineProps } from 'vue'
import axios from 'axios'
import '@/assets/loading.css'
import { useLoadingStore } from "@/stores/loading"

const loadingStore = useLoadingStore()
const props = defineProps({
  scheduleId: {
    type: [Number, String],
    required: true,
  },
  toBeLeavedId: {
    type: [Number, String],
    required: true,
  },
  updateList: {
    type: Function,
    required: true,
  },
})

const API_URL = process.env.VITE_HOST_URL
const token = localStorage.getItem('token')

const leaveSchedule = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  loadingStore.showLoading()
  try {
    await axios.delete(`${API_URL}/usersSchedules/${id}`, config)
    props.updateList()
    loadingStore.hideLoading()
  } catch (error) {
    console.error(error.message)
  }
}
</script>

<template>
  <LoadingOverlay :active="loadingStore.isLoading">
    <div class="loadingio-spinner-ellipsis-nq4q5u6dq7r"><div class="ldio-x2uulkbinbj">
    <div></div><div></div><div></div><div></div><div></div>
    </div></div>
  </LoadingOverlay>
  <dialog id="leaveSchedule" class="modal">
    <div class="modal-box w-[384px] p-0">
      <form method="dialog">
        <button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
          ✕
        </button>
      </form>
      <div class="object-cover px-5 py-6">
        <img
          class="mx-auto w-48"
          src="../assets/images/cat-4.png"
          alt=""
        />
      </div>
      <div class="text-center">
        <p class="text-lg font-medium">確定要退出共編嗎？</p>
        <p class="pt-1 text-gray-400">退出後將無法復原哦</p>
      </div>
      <div class="flex w-full gap-3 px-5 py-6">
        <button
          class="w-full h-12 px-5 py-3 font-medium text-center border border-primary-600 text-primary-600 hover:bg-primary-100 rounded-3xl"
          onclick="leaveSchedule.close()"
        >
          取消
        </button>
        <button
          class="w-full h-12 px-5 py-3 font-medium text-center text-white bg-primary-600 hover:bg-primary-700 rounded-3xl"
          @click="leaveSchedule(toBeLeavedId)"
          onclick="leaveSchedule.close()"
        >
          確定
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
        ✕
      </button>
      <button>close</button>
    </form>
  </dialog>
</template>
