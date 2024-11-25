<script setup>
 import { ChevronDownIcon  } from "@heroicons/vue/24/outline";

</script>

<template>
<div class="collapse m-[-1rem] ">
              <input type="checkbox" />
              <div class="collapse-title flex justify-between items-center p-0 pl-[1rem]">
                <div>
                 <h2 class="text-xl font-bold text-stone-950">行程一</h2>
                 <p class="text-sm text-gray-600">2024/11/01</p>
                </div> 
                <ChevronDownIcon class="size-3" />
              </div>
              <div class="collapse-content p-0 pl-[1rem]">
                  <div class="p-2 my-[0.5rem] bg-[#f4f4f4] rounded-xl" onclick="Day1.showModal()">
                    <h3 class="text-black text-semibold">第一天</h3>
                    <!-- 景點數量要跟我的行程連動 -->
                    <p>11/01 週五，4個景點</p>
                    
          <dialog id="Day1" class="modal">
    <div class=
        " h-[100vh] mt-[-24px] w-full lg:max-h-[800px] lg:max-w-[1000px] lg:mx-auto lg:mb-[calc(100vh/8)] bg-white lg:flex md:rounded-md overflow-hidden">
      <div class="hidden lg:block lg:w-2/3 lg:bg-[#f4f4f4]">
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

<!-- 要放在哪 -->
      <div
        class="relative w-full mt-[1rem] mx-auto h-[2.5rem] grid grid-cols-2 items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden shadow-md shadow-[#eeeeee] transition bg-white"
      >
        <!-- “我的行程”按钮 -->
        <button
          @click="selectMyRunDown"
          class="relative block h-10 px-6 tab rounded-full transition duration-300"
          :class="myRunDownCls"
        >
          <span class="text-base">我的咪咪</span>
        </button>
      
        <!-- “與我共編”按钮 -->
        <button
          @click="selectCoEdit"
          class="relative block h-10 px-6 tab rounded-full transition duration-300"
          :class="coEditCls"
        >
          <span class="text-base">與我共編</span>
        </button>
      </div>


<!-- Tab One -->
        <div class="mt-8 relative h-full ">
          <div
            role="tabpanel"
            id="panel-1"
            class="tab-panel transition duration-300"
            :class="tab1Cls"
          >
          <AddPlacecColps />
          <AddPlcToNewSchedule />
          

          </div>
<!-- Tab Two -->
          <div
            role="tabpanel"
            id="panel-2"
            class="absolute top-0 tab-panel p-6 transition opacity-0 duration-300"
            :class="tab2Cls"
            >
             <img src="https://web.chictrip.com.tw/assets/join_placeholder.2950886f.png" alt=""> 
          </div>
        </div>
      </div>
    </div>
    
 


      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
                  </div>
                  <div class="p-2  my-[0.5rem] bg-[#f4f4f4] rounded-xl">
                    <h3 class="text-black text-semibold">第二天</h3>
                    <p>11/02 週六，0個景點</p>
                  </div>
              </div>
          </div>

</template>