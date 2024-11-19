<template>
  <div class="max-w-[1440px] h-screen flex flex-row-reverse bg-gray-100">
    <div class="w-full lg:w-96 h-screen bg-white shadow-xl translate-x-full">
      <!-- 行程 toggle -->
      <label for="schedule-list-toggle" class="schedule flex items-center text-white w-[56px] hover:w-[86px] h-10 py-2 ps-3 pe-5 bg-yellow-500 rounded-s-full shadow-lg absolute top-4 left-[-56px] hover:left-[-86px] hover:cursor-pointer">
        <span class="inline-block w-6 h-6"><GlobeAsiaAustraliaIcon/></span>
        <p class="text-sm pl-0.5 font-medium hidden">行程</p>
      </label>
      <input type="checkbox" id="schedule-list-toggle" class="hidden">
      <!-- schedule list -->
      <div class="schedule-list p-5 relative">
        <!-- header -->
        <div class="pb-3 relative bg-white z-10">
          <button class="bg-gray-200 w-8 h-8 rounded-full absolute top-0 right-0 p-1.5">
            <XMarkIcon />
          </button>
          <h2 class="text-2xl font-medium pt-10 pb-2.5">行程</h2>
          <ul class="w-full h-10 flex gap-1 mb-5 p-1 rounded-xl bg-gray-100">
            <li class="w-1/2 text-center py-1 px-2 rounded-lg bg-white">我的行程</li>
            <li class="w-1/2 text-center py-1 px-2 rounded-lg hover:bg-white">與我共編</li>
          </ul>
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
        <div class="h-[500px] overflow-y-scroll pb-20">
          <!-- v-if 有行程 -->
          <div class="flex flex-wrap gap-4 justify-center">
            <div class="card card-compact bg-base-100 sm:w-full md:w-[30%] lg:w-full h-[176px] lg:h-auto border mb-4 relative">
            <figure>
              <img
                src="https://chictirpstorageprod.blob.core.windows.net/system/2bf62bfd-5bbd-47f1-9174-492c7218dcdf.jpg"
                alt="" />
            </figure>
            <!-- 行程右上設定 icon -->
            <div class="flex gap-2 absolute top-3 right-3">
              <button class="w-6 h-6 rounded-full bg-gray-transparent text-white p-1">
                <ShareIcon />
              </button>
              <div class="dropdown">
                <!-- <div tabindex="0" role="button" class="btn m-1"></div> -->
                <button role="button" class="w-6 h-6 rounded-full bg-gray-transparent text-white p-1 relative">
                  <EllipsisHorizontalIcon />
                </button>
                <!-- dropdown-content 控制開關-->
                <ul tabindex="0" class="dropdown-content w-32 bg-white rounded border absolute right-0 top-10">
                  <li>
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray-100" href="#">
                      <span class="inline-block w-6 h-6"><DocumentDuplicateIcon/></span>
                      <p>複製行程</p>
                    </a>  
                  </li>
                  <li>
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray-100" href="#">
                      <span class="inline-block w-6 h-6"><UserPlusIcon/></span>
                      <p>邀請共編</p>
                    </a>  
                  </li>
                  <li class="border-t">
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray-100" href="#">
                      <span class="inline-block w-6 h-6"><TrashIcon/></span>
                      <p>刪除行程</p>
                    </a>  
                  </li>
                  
                </ul>
              </div>
            </div>
            <!-- 行程資訊 -->
            <div class="flex flex-row justify-between items-center px-0 py-3">
              <div class="w-4/5 px-5 border-dotted border-r-2">
                <h2 class="text-lg truncate">北海道</h2>
                <p class="text-xs">2025/12/01-2025/12/07</p>
              </div>
              <div class="w-16 text-center">
                <p class="w-6 h-6 mx-auto"><UserPlusIcon /></p>
                <p class="text-xs">2人</p>
              </div>
            </div>
            </div>
            <div class="card card-compact bg-base-100 sm:w-full md:w-[30%] lg:w-full h-[176px] lg:h-auto border mb-4 relative">
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
                      <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray-100" href="#">
                        <span class="inline-block w-6 h-6"><DocumentDuplicateIcon/></span>
                        <p>複製行程</p>
                      </a>  
                    </li>
                    <li>
                      <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray-100" href="#">
                        <span class="inline-block w-6 h-6"><UserPlusIcon/></span>
                        <p>邀請共編</p>
                      </a>  
                    </li>
                    <li class="border-t">
                      <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray-100" href="#">
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
                <div class="w-16 text-center">
                  <p class="w-6 h-6 mx-auto"><UserPlusIcon /></p>
                  <p class="text-xs">共編</p>
                </div>
              </div>
            </div>
            <div class="card card-compact bg-base-100 sm:w-full md:w-[30%] lg:w-full h-[176px] lg:h-auto border mb-4 relative">
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
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray-100" href="#">
                      <span class="inline-block w-6 h-6"><DocumentDuplicateIcon/></span>
                      <p>複製行程</p>
                    </a>  
                  </li>
                  <li>
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray-100" href="#">
                      <span class="inline-block w-6 h-6"><UserPlusIcon/></span>
                      <p>邀請共編</p>
                    </a>  
                  </li>
                  <li class="border-t">
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray-100" href="#">
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
              <div class="w-16 text-center">
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
            <button class=" font-medium text-white bg-red-800 w-44 rounded-3xl px-5 py-3">建立新行程</button>
          </div> -->
        <!-- edit together 共編-->
          <!-- v-if 已登入 -->
          <!-- <div class="w-full h-52 text-center mt-7">
            <img class="w-[180px] h-[103px] mx-auto" src="https://web.chictrip.com.tw/assets/master-unlock.990b2501.png" alt="">
            <p class="mb-6">還沒有 <spna class="text-red-800">與我共編</spna> 的行程哦</p>
          </div>  -->
          <!-- v-else 未登入 -->
          <!-- <div class="w-full lg:w-96 h-38 px-2.5 py-5 bg-white border-t-2 fixed bottom-0 right-0">
            <p class="mb-3 text-center font-medium">
              嗨，新朋友！
              <br>
              登入就能查看共編行程囉 
            </p>
            <button class="w-full h-12 px-5 py-3 bg-red-800 text-white text-center rounded-3xl">
              登入 / 註冊
            </button>
          </div> -->
        </div>
        <!-- add schedule btn 建立新行程按鈕-->
        <!-- v-if 已登入 -->
        <div class="w-full lg:w-96 h-20 px-2.5 py-5 bg-white border-t-2 fixed bottom-0 right-0">
          <button class="w-full h-12 px-5 py-3 bg-red-800 text-white text-center rounded-3xl">
            建立新行程
          </button>
        </div>
        <!-- v-else 未登入 -->
        <!-- <div class="w-full lg:w-96 h-38 px-2.5 py-5 bg-white border-t-2 fixed bottom-0 right-0">
          <p class="mb-3 text-center font-medium">
            嗨，新朋友！
            <br>
            登入就能開始規劃你的專屬行程囉 
          </p>
          <button class="w-full h-12 px-5 py-3 bg-red-800 text-white text-center rounded-3xl">
            登入 / 註冊，建立新行程
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon, EllipsisHorizontalIcon } from '@heroicons/vue/16/solid'
import { XMarkIcon, UserPlusIcon, ShareIcon, DocumentDuplicateIcon, TrashIcon, BriefcaseIcon, GlobeAsiaAustraliaIcon } from '@heroicons/vue/24/outline'

</script>

<style>
.bg-gray-transparent{
  background-color: #2d4057cc;
}
.schedule:hover > p{
  display: block;
}
#schedule-list-toggle:checked {
  .schedule-list{
    transform: translateX(0);
  }
}
</style>