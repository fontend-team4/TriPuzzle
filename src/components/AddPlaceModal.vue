<script setup>
import { PlusCircleIcon  } from "@heroicons/vue/24/solid";
import { ChevronDownIcon  } from "@heroicons/vue/24/outline"

</script>

<template>
  <!-- Button上顯示的字要跟已存在行程連動，預設是"加入行程" -->
  <button class="btn overflow-hidden text-white text-lg bg-secondary-500 rounded-full
  hover:bg-secondary-600" 
  onclick="my_modal.showModal()">加入行程 <PlusCircleIcon class="size-6"/>  </button>

  <dialog id="my_modal" class="modal">
    <div class=
        " h-[100vh] mt-[-24px] w-full lg:max-h-[800px] lg:max-w-[1000px] lg:mx-auto lg:mb-[calc(100vh/8)] bg-white lg:flex md:rounded-md overflow-hidden">
      <div class="hidden lg:block lg:w-2/3 lg:bg-[#f7f1ec]">
          <div class="flex h-full">
            <img src="https://web.chictrip.com.tw/assets/join_placeholder.2950886f.png" class="m-auto">
          </div>
      </div>    
      <div class="w-full h-full px-[15px] py-[8px] sticky top-0 mr-0 lg:w-1/3 flex-wrap" >
        <form method="dialog">
          <h2 class="mt-[30px] ml-[10px] text-2xl text-black lg:text-2xl font-semibold ">要加在哪?</h2>
          <button
           class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
           <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
             />
           </svg>
          </button>
        </form>
        <!-- 測試 -->

       <div  class=" my-[20px] p-2 w-full h-100vh box-border ">
          <div 
            role="tablist"
            aria-label="tabs"
            class="relative w-full mx-auto h-[2.5rem] grid grid-cols-2 items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden shadow-2xl shadow-900/20 transition  bg-[#f7f1ec]"
          >
          <input class="toggle absolute indicator h-11 my-auto top-0 bottom-0 left-0 rounded-full shadow-md"></input>
          <button
            role="tab"
            aria-selected="true"
            aria-controls="panel-1"
            id="tab-1"
            tabindex="0" 
            class="relative block h-10 px-6 tab rounded-full  text-white bg-primary-500"
          >
            <span class="text-base">我的行程</span>
          </button>
          <button
            role="tab"
            aria-selected="false"
            aria-controls="panel-2"
            id="tab-2"
            tabindex="-1"
            class="relative block h-10 px-6 tab rounded-full "
          >
            <span class="text-base">與我共編</span>
          </button>
       </div>
        <div class="mt-8 relative h-full ">
          <div
            role="tabpanel"
            id="panel-1"
            class="tab-panel transition duration-300"
          >
          <div class="collapse m-[-1rem] ">
              <input type="checkbox"/>
              <div class="collapse-title flex justify-between">
                <div>
                 <h2 class="text-xl font-bold text-stone-950">行程一</h2>
                 <p class="text-sm text-gray-600">2024/11/01</p>
                </div> 
                <ChevronDownIcon class="size-3" />
              </div>
              <div class="collapse-content ">
                  <div class="p-2 my-[0.5rem] bg-[#f7f1ec] rounded-xl">
                    <h3 class="text-black text-semibold">第一天</h3>
                    <!-- 景點數量要跟我的行程連動 -->
                    <p>11/01 週五，4個景點</p>
                  </div>
                  <div class="p-2  my-[0.5rem] bg-[#f7f1ec] rounded-xl">
                    <h3 class="text-black text-semibold">第二天</h3>
                    <p>11/02 週六，0個景點</p>
                  </div>
                  <div class="p-2  my-[0.5rem] bg-[#f7f1ec] rounded-xl">
                    <h3 class="text-black text-semibold">第三天</h3>
                    <p>11/03 週日，0個景點</p>
              </div>
            </div>
          </div>
              <!-- 按這裡要去NewScheduleModal的Modal -->
              <div class="">
                <a class="bg-white flex mt-[1rem]">
                  <PlusCircleIcon  class="size-5 fill-primary-500 mr-[0.5rem] mt-[0.1rem]" />
                  <p class= " hover:text-primary-500 text-black text-md text-bold ">建立新行程</p>
                </a>
              </div>
          </div>
          <div
            role="tabpanel"
            id="panel-2"
            class="absolute top-0 tab-panel p-6 transition opacity-0 duration-300">
            <!-- <img src="https://web.chictrip.com.tw/assets/join_placeholder.2950886f.png" alt=""> -->
          </div>
        </div>
      </div>
        </div>
    </div>
 


      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  
 




</template>