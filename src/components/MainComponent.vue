<script setup>
import PlacesComponent from './PlacesComponent.vue';
import MapComponent from './MapComponent.vue';
import MapToggle from './MapToggle.vue';
import PlacesModal from './PlacesModal.vue';
import SearchBar from './SearchBar.vue';

import { computed, ref, provide } from 'vue'
import { ChevronDownIcon, EllipsisHorizontalIcon } from '@heroicons/vue/16/solid'
import { XMarkIcon, UserPlusIcon, ShareIcon, DocumentDuplicateIcon, TrashIcon, BriefcaseIcon, GlobeAsiaAustraliaIcon } from '@heroicons/vue/24/outline'
import ShareScheduleModal from './ShareScheduleModal.vue'
import ScheduleDetail from '@/components/ScheduleDetail.vue'
import TransportationWay from './TransportationWay.vue'
import DeleteScheduleModal from './DeleteScheduleModal.vue'

const checkedSchedule = ref('mine')

// schedule list 開關
const listOpen = ref(false)
const scheduleToggleShow = ref(true)
const listToggle = () => {
  listOpen.value = !listOpen.value
  scheduleToggleShow.value = !scheduleToggleShow.value
}

const listSwitch = computed(() => {
  return listOpen.value ? 'translate-x-0 transition-all' : 'translate-x-full'
})
const scheduleToggleSwitch = computed(() => {
  return scheduleToggleShow.value ? 'block' : 'hidden'
})

// schedule detail 開關
const detailOpen = ref(false)
const detailToggle = () => {
  detailOpen.value = !detailOpen.value
}
// 給 ScheduleDetail 關閉自己
provide('detailToggle', detailToggle)
const detailSwitch = computed(() => {
  return detailOpen.value ? 'translate-x-full transition-all' : 'translate-x-[200%]'
})
// 給 ScheduleDetail 關閉全部
provide('listToggle', () => {
  listOpen.value = !listOpen.value
  scheduleToggleShow.value = !scheduleToggleShow.value
  detailOpen.value = !detailOpen.value
})

// TransportationWay 開關
const transportationOpen = ref(false)
const transportationToggle = () => {
  transportationOpen.value = !transportationOpen.value
}
// 給 ScheduleDetail & TransportationWay 使用
provide('transportationToggle', transportationToggle)
const transportationSwitch = computed(() => {
  return transportationOpen.value ? 'translate-x-[200%] transition-all' : 'translate-x-[300%]'
})

const isPlacesComponent = ref(true);

const placesComponentCls = computed(() => {
    return isPlacesComponent.value ? [""] : ["translate-y-full opacity-0"];
});

</script>

<template>
<div class="main-content">
  <!-- 搜尋欄 -->
  <div class="flex relative w-full item-center gap-2">
    <SearchBar class="flex lg:w-[75%]  justify-end w-full  lg:ml-20"/>
    <MapToggle 
      class="hidden lg:absolute top-0 right-0  justify-start item-center mr-24 lg:flex"
      v-model:isPlacesComponent="isPlacesComponent" />
      <!-- 行程 toggle -->
    <div 
    class="schedule  flex items-center  lg:absolute top-0 right-0 text-white w-[56px] hover:w-[86px] h-10 py-2 ps-3 pe-5 bg-yellow-500 rounded-s-full shadow-lg  hover:cursor-pointer" 
    @click="listToggle" 
    :class="scheduleToggleSwitch">
      <span class="inline-block w-6 h-6"><GlobeAsiaAustraliaIcon/></span>
      <p class="text-sm pl-0.5 font-medium hidden">行程</p>
    </div>
  </div>
 

  <div class="min-w-full h-screen flex flex-row-reverse bg-gray overflow-x-hidden">
    <div class="schedule-list w-full lg:w-96 h-screen bg-white shadow-xl transition-all" :class="listSwitch">
      <!-- schedule list -->
      <div class="p-5 relative">
        <!-- header -->
        <div class="pb-3 relative bg-white z-10">
          <div class="bg-gray-200 w-8 h-8 rounded-full absolute top-0 right-0 p-1.5 hover:cursor-pointer" @click="listToggle">
            <XMarkIcon />
          </div >
          <h2 class="text-2xl font-medium pt-10 pb-2.5">行程</h2>
          <div class="w-full h-10 flex gap-1 mb-5 p-1 rounded-xl bg-gray">
            <input id="mine" type="radio" name="toggle" v-model="checkedSchedule" value="mine" class="hidden" checked>
            <label for="mine" class="mine-toggle w-1/2 text-center py-1 px-2 rounded-lg hover:bg-white hover:cursor-pointer">我的行程</label>
            <input id="coedit" type="radio" name="toggle" v-model="checkedSchedule" value="coedit" class="hidden">
            <label for="coedit" class="coedit-toggle w-1/2 text-center py-1 px-2 rounded-lg hover:bg-white hover:cursor-pointer">與我共編</label>
          </div>
          <div class="dropdown">
            <div tabindex="0" role="button" class="flex items-center relative">
              <p class="text-sm font-medium">
              上次編輯時間
              </p>
              <p class="w-4 h-4"><ChevronDownIcon /></p>
            </div>
            <ul tabindex="0" class="dropdown-content menu bg-white rounded-sm z-[1] w-44 p-0 border absolute top-8 left-0">
              <li><a class="rounded-none" href=""> 上次編輯時間</a></li>
              <li><a class="rounded-none" href=""> 建立時間（從近到遠）</a></li>
              <li><a class="rounded-none" href=""> 建立時間（從遠到近）</a></li>
            </ul>
          </div>
        </div>
        <!-- schedules list 行程列表-->
        <div class="h-[70vh] overflow-y-scroll pb-12">
          <!-- 我的行程 -->
          <!-- v-if 有行程 -->
          <div class="flex flex-wrap gap-4 justify-center" v-if="checkedSchedule === 'mine'">
            <div class="card card-compact bg-base-100 sm:w-full md:w-[30%] lg:w-full h-[176px] lg:h-auto border mb-4 relative hover:cursor-pointer">
            <figure @click="detailToggle">
              <img
                src="https://chictirpstorageprod.blob.core.windows.net/system/2bf62bfd-5bbd-47f1-9174-492c7218dcdf.jpg"
                alt="" />
            </figure>
            <!-- 行程右上設定 icon -->
            <div class="flex gap-2 absolute top-3 right-3">
              <span class="w-6 h-6 rounded-full bg-gray-transparent text-white p-1 hover:cursor-pointer" onclick="shareSchedule.showModal()">
                <ShareIcon />
              </span>
              <ShareScheduleModal />
              <div class="dropdown">
                <button role="button" class="w-6 h-6 rounded-full bg-gray-transparent text-white p-1 relative">
                  <EllipsisHorizontalIcon />
                </button>
                <!-- dropdown-content 控制開關-->
                <ul tabindex="0" class="dropdown-content w-32 bg-white rounded border absolute right-0 top-10">
                  <li>
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray" href="#">
                      <span class="inline-block w-6 h-6"><DocumentDuplicateIcon/></span>
                      <p>複製行程</p>
                    </a>  
                  </li>
                  <li>
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray" href="#">
                      <span class="inline-block w-6 h-6"><UserPlusIcon/></span>
                      <p>邀請共編</p>
                    </a>  
                  </li>
                  <li class="border-t" onclick="delete_schedule.showModal()">
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray" href="#">
                      <span class="inline-block w-6 h-6"><TrashIcon/></span>
                      <p>刪除行程</p>
                    </a>  
                  </li>
                  <DeleteScheduleModal />
                </ul>
              </div>
            </div>
            <!-- 行程資訊 -->
            <div class="flex flex-row justify-between items-center px-0 py-3">
              <div class="w-4/5 px-5 border-dotted border-r-2">
                <h2 class="text-lg truncate">北海道</h2>
                <p class="text-xs">2025/12/01-2025/12/07</p>
              </div>
              <div class="w-16 text-center hover:cursor-pointer">
                <p class="w-6 h-6 mx-auto"><UserPlusIcon /></p>
                <p class="text-xs">2人</p>
              </div>
            </div>
            </div>
            <div class="card card-compact bg-base-100 sm:w-full md:w-[30%] lg:w-full h-[176px] lg:h-auto border mb-4 relative hover:cursor-pointer">
              <figure>
                <img
                  src="https://chictirpstorageprod.blob.core.windows.net/travelschedule/1c4209ff-a961-49a1-bb2f-b21435a8c8b4.jpg"
                  alt="" />
              </figure>
              <!-- 行程右上設定 icon -->
              <div class="flex gap-2 absolute top-3 right-3">
                <button class="w-6 h-6 rounded-full bg-gray-transparent text-white p-1">
                  <ShareIcon />
                </button>
                <div class="dropdown">
                  <!-- <div tabindex="0" role="button" class="btn m-1"></div> -->
                  <button role="button" class="w-6 h-6 rounded-full bg-gray-transparent text-white p-1">
                    <EllipsisHorizontalIcon />
                  </button>
                  <!-- dropdown-content 控制開關-->
                  <ul tabindex="0" class="dropdown-content w-32 bg-white rounded border absolute right-0 top-10">
                    <li>
                      <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray" href="#">
                        <span class="inline-block w-6 h-6"><DocumentDuplicateIcon/></span>
                        <p>複製行程</p>
                      </a>  
                    </li>
                    <li>
                      <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray" href="#">
                        <span class="inline-block w-6 h-6"><UserPlusIcon/></span>
                        <p>邀請共編</p>
                      </a>  
                    </li>
                    <li class="border-t">
                      <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray" href="#">
                        <span class="inline-block w-6 h-6"><TrashIcon/></span>
                        <p>刪除行程</p>
                      </a>  
                    </li>
                    
                  </ul>
                </div>
              </div>
              <div class="flex flex-row justify-between items-center px-0 py-3">
                <div class="w-4/5 px-5 border-dotted border-r-2">
                  <h2 class="text-lg truncate">東京之旅</h2>
                  <p class="text-xs">2025/05/10-2025/05/20</p>
                </div>
                <div class="w-16 text-center hover:cursor-pointer">
                  <p class="w-6 h-6 mx-auto"><UserPlusIcon /></p>
                  <p class="text-xs">共編</p>
                </div>
              </div>
            </div>
            <div class="card card-compact bg-base-100 sm:w-full md:w-[30%] lg:w-full h-[176px] lg:h-auto border mb-4 relative hover:cursor-pointer">
            <figure>
              <img
                src="https://chictirpstorageprod.blob.core.windows.net/system/166b42c7-fc3c-4708-ab2b-f9730bfd1b8a.jpg"
                alt="" />
            </figure>
            <!-- 行程右上設定 icon -->
            <div class="flex gap-2 absolute top-3 right-3">
              <button class="w-6 h-6 rounded-full bg-gray-transparent text-white p-1">
                <ShareIcon />
              </button>
              <div class="dropdown">
                <!-- <div tabindex="0" role="button" class="btn m-1"></div> -->
                <button role="button" class="w-6 h-6 rounded-full bg-gray-transparent text-white p-1">
                  <EllipsisHorizontalIcon />
                </button>
                <!-- dropdown-content 控制開關-->
                <ul tabindex="0" class="dropdown-content w-32 bg-white rounded border absolute right-0 top-10">
                  <li>
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray" href="#">
                      <span class="inline-block w-6 h-6"><DocumentDuplicateIcon/></span>
                      <p>複製行程</p>
                    </a>  
                  </li>
                  <li>
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray" href="#">
                      <span class="inline-block w-6 h-6"><UserPlusIcon/></span>
                      <p>邀請共編</p>
                    </a>  
                  </li>
                  <li class="border-t">
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray" href="#">
                      <span class="inline-block w-6 h-6"><TrashIcon/></span>
                      <p>刪除行程</p>
                    </a>  
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex flex-row justify-between items-center px-0 py-3">
              <div class="w-4/5 px-5 border-dotted border-r-2">
                <h2 class="text-lg truncate">新加坡員工旅遊</h2>
                <p class="text-xs">2025/12/01-2025/12/07</p>
              </div>
              <div class="w-16 text-center hover:cursor-pointer">
                <p class="w-6 h-6 mx-auto"><UserPlusIcon /></p>
                <p class="text-xs">5人</p>
              </div>
            </div>
            </div>
          </div>
          <!-- v-else 尚無行程 -->
          <!-- <div class="w-full h-52 text-center mt-7">
            <img class="w-[180px] h-[90] mx-auto" src="https://web.chictrip.com.tw/assets/monster_empty.3a44f172.png" alt="">
            <p class="mb-6">還沒有安排新行程哦</p>
            <button class=" font-medium text-white bg-primary-600 hover:bg-primary-700 w-44 rounded-3xl px-5 py-3">建立新行程</button>
          </div> -->
        <!-- 與我共編-->
          <!--已登入 -->
          <div class="w-full h-52 text-center mt-7" v-else>
            <img class="w-[180px] h-[103px] mx-auto" src="https://web.chictrip.com.tw/assets/master-unlock.990b2501.png" alt="">
            <p class="mb-6">還沒有 <span class="text-primary-600">與我共編</span> 的行程哦</p>
          </div>
          <!-- 未登入 -->
          <!-- <div class="w-full lg:w-96 h-38 px-2.5 py-5 bg-white border-t fixed bottom-0 right-0">
            <p class="mb-3 text-center font-medium">
              嗨，新朋友！
              <br>
              登入就能查看共編行程囉 
            </p>
            <button class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl">
              登入 / 註冊
            </button>
          </div> -->
        </div>
        <!-- add schedule btn 建立新行程按鈕-->
        <!--已登入 -->
        <div class="w-full lg:w-96 h-20 px-2.5 py-5 bg-white border-t fixed bottom-0 right-0">
          <button class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl">
            建立新行程
          </button>
        </div>
        <!-- 未登入 -->
        <!-- <div class="w-full lg:w-96 h-38 px-2.5 py-5 bg-white border-t fixed bottom-0 right-0">
          <p class="mb-3 text-center font-medium">
            嗨，新朋友！
            <br>
            
            登入就能開始規劃你的專屬行程囉 
          </p>
          <button class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl">
            登入 / 註冊，建立新行程
          </button>
        </div> -->
      </div>
    </div>
    <!-- <ScheduleDetail/> -->
    <!-- <TransportationWay/> -->
    <ScheduleDetail :class="detailSwitch"/>
    <TransportationWay :class="transportationSwitch"/> 
  </div>
  <div>
    <!-- 地圖/景點牆 -->
    <div class="relative h-screen overflow-hidden">
      <MapComponent />
      <PlacesComponent class="absolute top-0 z-10 transition-all " :class="placesComponentCls" />
      <PlacesModal class="hidden md:block"/>
    </div>
    <MapToggle 
      class="absolute bottom-[1rem] left-[37%] z-20 justify-center item-center md:left-[44%] xl:hidden"
      v-model:isPlacesComponent="isPlacesComponent" />
  </div>
  
</div>
</template>

<style>
.bg-gray-transparent{
  background-color: #2d4057cc;
}
.schedule:hover > p{
  display: block;
}
#schedule-list-toggle:checked ~ .schedule-list{
  transform: translateX(0);

  /* 關閉按鈕做好之後就可以打開 */
  /* .schedule{
    display: none;
  } */
}
.card > figure > img {
  transform: scale(1);
  transition: all 1s;
}
.card:hover > figure > img {
  transform: scale(1.25);
  transition: all 1s;
}
#mine:checked ~ .mine-toggle {
  background-color: #fff;
}
#coedit:checked ~ .coedit-toggle {
  background-color: #fff;
}
</style>


