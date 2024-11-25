<script setup>
import AddPlaceBtn from "./AddPlaceBtn.vue";
import AddPlacecColps from "./AddPlacecColps.vue";
import AddPlcToNewSchedule from "./AddPlcToNewSchedule.vue";
import { ref, computed } from "vue";





const selectedButton = ref("myRunDown");


const selectMyRunDown = () => {
  selectedButton.value = "myRunDown";
};

const selectCoEdit = () => {
  selectedButton.value = "coEdit";
};

const myRunDownCls = computed(() => {
  return selectedButton.value === "myRunDown"
    ? ["text-white", "bg-primary-500"]
    : ["bg-white", "text-black", "hover:bg-primary-400"];
});

const coEditCls = computed(() => {
  return selectedButton.value === "coEdit"
    ? ["text-white", "bg-primary-500"]
    : ["bg-white", "text-black", "hover:bg-primary-400"];
});

// 控制 Tab 樣式
const tab1Cls = computed(() => {
  return selectedButton.value === "myRunDown"
    ? ["opacity-100", "relative", "z-10"]
    : ["opacity-0", "absolute", "z-0"];
});

const tab2Cls = computed(() => {
  return selectedButton.value === "coEdit"
    ? ["opacity-100", "relative", "z-10"]
    : ["opacity-0", "absolute", "z-0"];
});





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
          <span class="text-base">我的行程</span>
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
            class="absolute top-0 tab-panel p-6 transition opacity-0 duration-300 flex justify-center"
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
  
 




</template>

