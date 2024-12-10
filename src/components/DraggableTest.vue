<script setup>
import { ref,inject } from 'vue'
import draggable from 'vuedraggable'
import { ChevronDownIcon, EllipsisHorizontalIcon, XMarkIcon, ShareIcon, UserPlusIcon, TrashIcon } from '@heroicons/vue/24/outline';
import ShareScheduleModal from './ShareScheduleModal.vue';
import DeleteScheduleModal from './DeleteScheduleModal.vue';
import ScheduleCard from './ScheduleCard.vue';
import NewScheduleModal from '@/components/NewScheduleModal.vue';

// 定義響應式陣列
const myList = ref([
  { id: 1, name: '小明' },
  { id: 2, name: '小華' },
  { id: 3, name: '小李' },
  { id: 4, name: '小王' }
])

// 使用 inject 取得父元件提供的函數
const listToggle = inject('listToggle');
const detailToggle = inject('detailToggle');

// 行程列表資料
const schedules = ref([
  { id: 1, title: '北海道', date: '2025/12/01-2025/12/07', img: 'https://chictirpstorageprod.blob.core.windows.net/system/2bf62bfd-5bbd-47f1-9174-492c7218dcdf.jpg', participants: 2 },
  { id: 2, title: '東京之旅', date: '2025/05/10-2025/05/20', img: 'https://chictirpstorageprod.blob.core.windows.net/travelschedule/1c4209ff-a961-49a1-bb2f-b21435a8c8b4.jpg', participants: '共編' },
  { id: 3, title: '新加坡員工旅遊', date: '2025/12/01-2025/12/07', img: 'https://chictirpstorageprod.blob.core.windows.net/system/166b42c7-fc3c-4708-ab2b-f9730bfd1b8a.jpg', participants: 5 },
]);

const checkedSchedule = ref('mine');


// 拖曳狀態
const drag = ref(false)
</script>



<template>
  <div class="draggable-container">
    <draggable 
      v-model="myList" 
      group="people" 
      @start="drag=true" 
      @end="drag=false"
      item-key="id"
    >
      <template #item="{ element }">
        <div class="list-item">
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
<!-- 
    <div class="schedule-list w-full lg:w-96 h-screen bg-white shadow-xl transition-all relative">
      <draggable 
      v-model="schedules" 
      group="schedule" 
      @start="drag=true" 
      @end="drag=false"
      item-key="id"
      >
        <div class="w-screen lg:w-full p-5 bg-white">
          Schedules
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
        </div>
      </draggable>
    </div> 
-->
</template>


<style scoped>
.draggable-container {
  width: 300px;
  margin: 0 auto;
}

.list-item {
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 5px;
  background-color: #f9f9f9;
  cursor: move;
}

.list-item:hover {
  background-color: #f0f0f0;
}
</style>