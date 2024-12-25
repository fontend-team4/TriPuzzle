<script setup>
  import { ref } from 'vue'
  import { XMarkIcon, ChevronLeftIcon, ArrowUpTrayIcon, UsersIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, BookmarkIcon, CalendarIcon, DocumentDuplicateIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
  import { EllipsisHorizontalIcon, MapPinIcon } from '@heroicons/vue/24/solid'
  import draggable from 'vuedraggable'
  import MoveToOtherDateModal from './MoveToOtherDateModal.vue'
  import EditPlaceModal from './EditPlaceModal.vue'
  import DeletePerPlaceModal from './DeletePerPlaceModal.vue'

  const listAndDetailToggle = inject('listAndDetailToggle')
  const detailToggle = inject('detailToggle')
  const transportationToggle = inject('transportationToggle')

  // 定義響應式陣列
  const place = ref([
    { id: 1, name: '香港迪士尼樂園', time: '08:00', stayhour: 1,imgUrl:"https://lh3.googleusercontent.com/places/ANJU3Ds3MXRcZf77xt6ejMr5CyGxuySKPa3n9yUWJ5EqShizmd3EPHhQNT8_xFYRuOpksBffhO-lOh21FWclCl_ZQv94ZzST19IrWtM=s1600-w480",transhour:0},
    { id: 2, name: '香港杜莎夫人蠟像館', time: '09:00', stayhour: 1,imgUrl:"https://chictirpstorageprod.blob.core.windows.net/poi/8d8b0e7e-b654-4e7f-91b8-096097b84246.jpg", transhour: 0},
    { id: 3, name: '天際 100', time: '10:00', stayhour: 1 ,imgUrl:"https://lh3.googleusercontent.com/places/ANJU3DsUY2LM1fuJKUAmH-PF1rJfdcdHY1r2gLmSddnr24aqnSDDkNAG5oMI5BNaQ1xXBbtxiJTyTnixNTKAyl541gqVjZax6o9DbsM=s1600-w480",transhour:0},
  ])

  //交通時間送出請求

// 拖曳狀態
const drag = ref(false)
</script>



<template>
      <!-- place & transportation -->
      <draggable 
        v-model="place" 
        :animation="250"
        group="local" 
        @start="drag=true" 
        @end="drag=false"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="place-transportation container">
          <div class="pt-2 px-5 pb-1 overflow-y-hidden  overflow-x-hidden bg-white">
          <div :key="element.id" class="place w-full bg-gray rounded-xl border border-gray mt-4">
            <div class="flex p-1">
              <img class="w-[108px] h-[108px] rounded-xl object-cover" :src="element.imgUrl">
              <div class="w-cal flex justify-between">
                <ul class="px-4 flex flex-col gap-0.5 justify-center">
                  <li class="text-sm font-medium text-orange-400">{{ element.time }}</li>
                  <li class="font-medium">{{ element.name }}</li>
                  <li class="text-xs text-gray-400">{{ `停留 ${element.stayhour} 時` }}</li>
                </ul>
                <div class="dropdown p-1">
                  <button role="button" class="w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 text-white relative">
                    <EllipsisHorizontalIcon />
                  </button>
                  <!-- dropdown 控制開關 -->
                  <ul tabindex="0" class="dropdown-content w-32 bg-white rounded border absolute right-[-12px] top-8 shadow-xl">
                    <li @click="moveDate.showModal()">
                      <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray" href="#">
                        <span class="inline-block w-6 h-6"><CalendarIcon/></span>
                        <p>移到別天</p>
                      </a>  
                    </li>
                    <MoveToOtherDateModal />
                    <li>
                      <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray" href="#">
                        <span class="inline-block w-6 h-6"><DocumentDuplicateIcon/></span>
                        <p>複製</p>
                      </a>  
                    </li>
                    <li class="border-t" @click="delete_place.showModal()">
                      <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray" href="#">
                        <span class="inline-block w-6 h-6"><TrashIcon/></span>
                        <p>刪除</p>
                      </a>  
                    </li>
                    <DeletePerPlaceModal />
                  </ul>
                </div>
              </div>
            </div>
            <!-- hover:relative feature -->
            <div class="more lg:hidden">
              <div class="h-10 flex justify-between items-center border-t border-white">
                <ul class="flex gap-4 p-3">
                  <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer" @click="edit_place.showModal()">
                    <span class="w-3 h-3"><PencilIcon/></span>
                    <p class="text-xs">編輯</p>
                  </li>
                  <EditPlaceModal />
                  <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer">
                    <span class="w-3 h-3"><MagnifyingGlassIcon/></span>
                    <p class="text-xs">周邊</p>
                  </li>
                  <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer" @click="place_note_1.showModal()">
                    <span class="w-3 h-3"><BookmarkIcon/></span>
                    <p class="text-xs">筆記</p>
                  </li>
              <!-- place & transportation -->
                  <!-- place note -->
                  <dialog id="place_note_1" class="modal">
                    <div class="modal-box min-w-full md:min-w-[480px] min-h-screen md:min-h-[90%]">
                      <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h2 class="text-2xl font-medium text-center pt-6 mb-4">景點筆記</h2>
                      <textarea class="w-full h-[500px] textarea textarea-lg focus:border-0 focus:outline-none" placeholder="還沒有寫筆記哦"></textarea>
                      <div class="w-full flex gap-3 h-20 px-6 py-4 bg-white border-t border-gray fixed bottom-0 right-0">
                        <button class="w-full h-12 px-5 py-3 border border-primary-600 text-primary-600 text-center rounded-3xl font-medium hover:bg-primary-100">
                          取消
                        </button>
                        <button class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl font-medium">
                          儲存
                        </button>
                      </div>
                    </div>
                    <form method="dialog" class="modal-backdrop">
                      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      <button>close</button>
                    </form>
                  </dialog> 
                </ul>
                <span class="w-10 h-10 text-gray-500 p-3 border-l border-white hover:cursor-pointer"><MapPinIcon/></span>
              </div>
            </div>
            </div>
          </div>
          <p v-if="element !== place[place.length - 1]" class="w-full ml-3 py-4 ps-3 border-l border-dashed border-gray hover:cursor-pointer" @click="transportationToggle">{{ `自訂交通 ${element.transhour} 分` }}</p>
        </div>
        </template>
      </draggable>
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