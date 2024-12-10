<script setup>
import { ref, inject } from 'vue';
import { ChevronDownIcon, EllipsisHorizontalIcon, XMarkIcon, ShareIcon, UserPlusIcon, TrashIcon } from '@heroicons/vue/24/outline';
import ShareScheduleModal from './ShareScheduleModal.vue';
import DeleteScheduleModal from './DeleteScheduleModal.vue';
import ScheduleCard from './ScheduleCard.vue';
import NewScheduleModal from '@/components/NewScheduleModal.vue';

// 使用 inject 取得父元件提供的函數
const listToggle = inject('listToggle');
const detailToggle = inject('detailToggle');

// 行程列表資料
const schedules = ref([
  { id: 1, title: '北海道', date: '2025/12/01-2025/12/07', img: 'https://chictirpstorageprod.blob.core.windows.net/system/2bf62bfd-5bbd-47f1-9174-492c7218dcdf.jpg', participants: 2 },
  { id: 2, title: '東京之旅', date: '2025/05/10-2025/05/20', img: 'https://chictirpstorageprod.blob.core.windows.net/travelschedule/1c4209ff-a961-49a1-bb2f-b21435a8c8b4.jpg', participants: '共編' },
  { id: 3, title: '新加坡員工旅遊', date: '2025/12/01-2025/12/07', img: 'https://chictirpstorageprod.blob.core.windows.net/system/166b42c7-fc3c-4708-ab2b-f9730bfd1b8a.jpg', participants: 5 },
]);

// 篩選條件
const checkedSchedule = ref('mine');
</script>

<template>
  <div class="overflow-x-hidden">
    <div class="schedule-list w-full lg:w-96 h-screen bg-white shadow-xl transition-all relative">
      <div class="w-screen lg:w-full p-5 bg-white">
        <!-- Header -->
        <div class="pb-3 relative bg-white">
          <div class="bg-gray-200 w-8 h-8 rounded-full absolute top-0 right-0 p-1.5 hover:cursor-pointer" @click="listToggle">
            <XMarkIcon />
          </div>
          <h2 class="text-2xl font-medium pt-10 pb-2.5">行程</h2>
          <!-- 切換選項 -->
          <div class="w-full h-10 flex gap-1 mb-5 p-1 rounded-xl bg-gray">
            <input id="mine" type="radio" name="toggle" v-model="checkedSchedule" value="mine" class="hidden" />
            <label for="mine" class="w-1/2 text-center py-1 px-2 rounded-lg hover:bg-white hover:cursor-pointer">我的行程</label>
            <input id="coedit" type="radio" name="toggle" v-model="checkedSchedule" value="coedit" class="hidden" />
            <label for="coedit" class="w-1/2 text-center py-1 px-2 rounded-lg hover:bg-white hover:cursor-pointer">與我共編</label>
          </div>
        </div>

        <!-- Schedules -->
        <div class="h-[70vh] overflow-y-scroll pb-12">
          <div class="flex flex-wrap gap-4 justify-center" v-if="checkedSchedule === 'mine'">
            <ScheduleCard
              v-for="schedule in schedules"
              :key="schedule.id"
              :title="schedule.title"
              :date="schedule.date"
              :img="schedule.img"
              :participants="schedule.participants"
              @showDetails="detailToggle"
            />
          </div>
          <div v-else class="h-52 text-center mt-7">
            <img class="w-[180px] h-[103px] mx-auto" src="https://web.chictrip.com.tw/assets/master-unlock.990b2501.png" alt="" />
            <p class="mb-6">還沒有 <span class="text-primary-600">與我共編</span> 的行程哦</p>
          </div>
        </div>

        <!-- Add Schedule Button -->
        <div class="w-full lg:w-96 h-20 px-2.5 py-5 bg-white border-gray border-t absolute bottom-0 left-0">
          <button class="w-full h-12 px-5 py-3 bg-primary-600 text-white text-center text-base rounded-3xl hover:bg-primary-700">
            建立新行程
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
