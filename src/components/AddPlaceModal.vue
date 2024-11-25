<script setup>
import { ref } from "vue";
import AddPlaceBtn from "./AddPlaceBtn.vue";
import AddPlacecColps from "./AddPlacecColps.vue";
import AddPlcToNewSchedule from "./AddPlcToNewSchedule.vue";





</script>

<template>
  <!-- Button上顯示的字要跟已存在行程連動，預設是"加入行程" -->
  <AddPlaceBtn onclick="my_modal.showModal()" />

  <dialog id="my_modal" class="modal">
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

<!-- 測試2 -->
          <div 
            class="relative w-full mt-[1rem] mx-auto h-[2.5rem] grid grid-cols-2 items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden shadow-md shadow-[#eeeeee] transition  bg-white"
          >
         
          <button
            @click="myRunDown"
            class=" relative block h-10 px-6 tab rounded-full  text-white bg-primary-500 hover:bg-primary-400"
            >
            <span class="text-base">我的行程</span>
          </button>
          <button
            @click="coEdit"
            class=" relative block h-10 px-6 tab rounded-full bg-white text-black hover:bg-primary-400 hover:text-white"
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
          <AddPlacecColps />
          <AddPlcToNewSchedule />
          

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
    
 


      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  
 




</template>

