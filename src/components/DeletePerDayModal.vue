<script setup>
import { defineProps, defineEmits } from 'vue';
import '@/assets/loading.css';
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();
// loading 樣式已新增，刪除函式可插入 loadingStore.showLoading() 和 loadingStore.hideLoading() 使用

const props = defineProps({
  date: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['delete']);

const removeDate = async () => {
  loadingStore.showLoading();
  emit('delete', props.date);
  delete_date.close();
  loadingStore.hideLoading();
};
</script>

<template>
  <LoadingOverlay :active="loadingStore.isLoading">
    <div class="loadingio-spinner-ellipsis-nq4q5u6dq7r">
      <div class="ldio-x2uulkbinbj">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </LoadingOverlay>
  <dialog id="delete_date" class="modal">
    <div class="modal-box w-[384px] p-0">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div class="py-6 px-5 object-cover">
        <img class="w-48 mx-auto" src="../assets/images/cat-4.png" alt="" />
      </div>
      <div class="text-center">
        <p class="text-lg font-medium">確定要刪除這天所有行程嗎？</p>
        <p class="text-gray-400 pt-1">刪除後將無法復原哦</p>
      </div>
      <div class="w-full flex gap-3 px-5 py-6">
        <button
          class="w-full h-12 px-5 py-3 border border-primary-600 text-primary-600 hover:bg-primary-100 text-center rounded-3xl font-medium"
          @click="delete_date.close()"
        >
          取消
        </button>
        <button
          class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl font-medium"
          @click="removeDate()"
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
