<script setup>
import { ref,defineProps } from 'vue';
import {
  ShareIcon,
  EllipsisHorizontalIcon,
  DocumentDuplicateIcon,
  UserPlusIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';
import ShareScheduleModal from './ShareScheduleModal.vue';
import DeleteScheduleModal from './DeleteScheduleModal.vue';

// Props
const props = defineProps({
  title: String,        // 行程標題
  dates: String,        // 行程日期
  imageUrl: String,     // 行程封面圖片
  participants: Number, // 參與者數量
  isCollaborative: Boolean, // 是否為共編
});

const shareSchedule = ref(false);
const deleteSchedule = ref(false);
</script>

<template>
  <div class="card card-compact bg-base-100 border border-gray mb-4 relative hover:cursor-pointer">
    <!-- 行程封面 -->
    <figure>
      <img :src="imageUrl" alt="行程封面圖片" class="w-full h-40 object-cover" />
    </figure>

    <!-- 右上方圖標操作 -->
    <div class="flex gap-2 absolute top-3 right-3">
      <button
        class="w-6 h-6 rounded-full bg-gray-transparent text-white p-1"
        @click="shareSchedule = true"
      >
        <ShareIcon />
      </button>
      <ShareScheduleModal />
      <div class="dropdown">
        <button
          role="button"
          class="w-6 h-6 rounded-full bg-gray-transparent text-white p-1"
        >
          <EllipsisHorizontalIcon />
        </button>
        <ul
          tabindex="0"
          class="dropdown-content w-32 bg-white rounded border border-gray absolute right-0 top-10"
        >
          <li>
            <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray">
              <DocumentDuplicateIcon class="w-6 h-6" />
              <p>複製行程</p>
            </a>
          </li>
          <li>
            <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray">
              <UserPlusIcon class="w-6 h-6" />
              <p>邀請共編</p>
            </a>
          </li>
          <li class="border-t border-gray">
            <a
              class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray"
              @click="deleteSchedule = true"
            >
              <TrashIcon class="w-6 h-6" />
              <p>刪除行程</p>
            </a>
          </li>
          <DeleteScheduleModal />
        </ul>
      </div>
    </div>

    <!-- 行程內容 -->
    <div class="flex flex-row justify-between items-center px-0 py-3">
      <div class="w-4/5 px-5 border-dotted border-r-2 border-gray">
        <h2 class="text-lg truncate">{{ title }}</h2>
        <p class="text-xs">{{ date }}</p>
      </div>
      <div class="w-16 text-center hover:cursor-pointer">
        <p class="w-6 h-6 mx-auto">
          <UserPlusIcon />
        </p>
        <p class="text-xs">
          {{ isCollaborative ? '共編' : `${participants} 人` }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-gray-transparent {
  background-color: #2d4057cc;
}
.card > figure > img {
  transform: scale(1);
  transition: all 1s;
}
.card:hover > figure > img {
  transform: scale(1.25);
  transition: all 1s;
}
</style>
