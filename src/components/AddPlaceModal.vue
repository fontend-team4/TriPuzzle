<script setup>
import AddPlaceBtn from "./AddPlaceBtn.vue";
import { ref, computed } from "vue";
import { XMarkIcon, ChevronDownIcon, HandThumbUpIcon  } from "@heroicons/vue/24/outline";
import { PlusCircleIcon} from "@heroicons/vue/24/solid";




// Tab的部分
const selectedButton = ref("myRunDown");


const selectMyRunDown = () => {
  selectedButton.value = "myRunDown";
};

const selectCoEdit = () => {
  selectedButton.value = "coEdit";
};

const myRunDownCls = computed(() => {
  return selectedButton.value === "myRunDown"
    ? ["text-white", "bg-primary-600"]
    : ["bg-white", "text-black", "hover:bg-primary-400"];
});

const coEditCls = computed(() => {
  return selectedButton.value === "coEdit"
    ? ["text-white", "bg-primary-600"]
    : ["bg-white", "text-black", "hover:bg-primary-400"];
});

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






const currentPage = ref('page1');


const switchToPage = (page) => {
  currentPage.value = page;
};

</script>

<template>
  <AddPlaceBtn onclick="my_modal.showModal()" />

  <dialog id="my_modal" class="modal ">
  
    <div 
      v-if="currentPage === 'page1'"
      id="page1" class=
        "relative h-[100vh] mt-[-24px] w-full md:max-h-[800px] md:max-w-[1000px] md:mx-auto md:mb-[calc(100vh/8)] bg-white md:flex md:rounded-md overflow-hidden">
      <div class="hidden md:block md:w-2/3 md:bg-[#f4f4f4]">
          <div class="flex h-full">
            <img src="https://web.chictrip.com.tw/assets/join_placeholder.2950886f.png" class="m-auto">
          </div>
      </div>    
      <div class="w-full h-full px-[15px] py-[8px] sticky top-0 mr-0 md:w-1/3 flex-wrap" >
        <form method="dialog">
          <h2 class="mt-[30px] ml-[10px] text-2xl text-black font-semibold ">要加在哪?</h2>
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">
            <XMarkIcon class="text-gray"/>
          </button>
        </form>



      <div
        class="relative w-full mt-[1rem] mx-auto h-[2.5rem] grid grid-cols-2 items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden shadow-md shadow-[#eeeeee] transition bg-white"
      >
        <!-- 我的行程 -->
        <button
          @click="selectMyRunDown"
          class="relative block h-10 px-6 tab rounded-full transition duration-300"
          :class="myRunDownCls"
        >
          <span class="text-base">我的行程</span>
        </button>
      
        <!-- 與我共編 -->
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
<!-- 行程一 -->
<!-- 行程一二只能擇一打開 -->
<!--打開的時候會變成 <ChevronUpIcon class="size-3" /> -->
            <div class="collapse ml-[-0.5rem] mr-[0.5rem] transition-opacity">
                <input type="checkbox" />
                <div class=" collapse-title flex justify-between items-center p-0 pl-[1rem]">
                  <div class="hover:bg-primary-100 cursor-pointer group">
                    <h2 class=" group-hover:text-primary-600 text-xl font-bold  text-stone-950">行程一</h2>
                    <p class=" group-hover:text-primary-600 text-sm  text-gray-600 ">2024/11/01</p>
                  </div> 
                  <ChevronDownIcon class="size-3" />
                </div>
                <div class="collapse-content p-0 pl-[1rem]">
                    <div  id="openDay1" @click="switchToPage('Day1')"
                      class="relative  p-2 my-[0.5rem] bg-[#f4f4f4] rounded-xl cursor-pointer hover:bg-primary-100 box-border"
                      >
                      <label for="" class="absolute top-0 right-0 bg-secondary-500 text-white
                      flex items-center gap-1 p-[0.25rem] rounded-bl-xl text-xs overflow-hidden
                      ">
                        <HandThumbUpIcon class="size-3 ml-[0.25rem]"/>加在這天最順
                      </label>
                      <h3 class="text-black text-semibold">第一天</h3>
                      <!-- 景點數量要跟我的行程連動 -->
                      <p>11/01 週五，4個景點</p>
                    </div>
                    <div id="openDay2" @click="switchToPage('Day2')"
                      class="p-2  my-[0.5rem] bg-[#f4f4f4] rounded-xl cursor-pointer hover:bg-primary-100"
                      >
                      <h3 class="text-black text-semibold">第二天</h3>
                      <p>11/02 週六，0個景點</p>
                    </div>
                </div>
            </div>
            <!-- 行程二 -->
            <div class="collapse ml-[-0.5rem] mr-[0.5rem] transition-opacity pt-1 mt-[0.5rem] border-t-2 border-dashed border-gray rounded-none">
                <input type="checkbox" />
                <div class=" collapse-title flex justify-between items-center p-0 pl-[1rem]">
                  <div class="hover:bg-primary-100 cursor-pointer group">
                    <h2 class=" group-hover:text-primary-600 text-xl font-bold  text-stone-950">行程二</h2>
                    <p class=" group-hover:text-primary-600 text-sm  text-gray-600 ">2024/11/01</p>
                  </div> 
                  <ChevronDownIcon class="size-3" />
                </div>
                <div class="collapse-content p-0 pl-[1rem]">
                    <div class=" p-2 my-[0.5rem] bg-[#f4f4f4] rounded-xl cursor-pointer hover:bg-primary-100"
                      >
                      <h3 class="text-black text-semibold">第一天</h3>
                      <!-- 景點數量要跟我的行程連動 -->
                      <p>11/30 週六，0個景點</p>
                    </div>
                    <div  class="p-2 my-[0.5rem] bg-[#f4f4f4] rounded-xl cursor-pointer hover:bg-primary-100"
                      >
                      <h3 class="text-black text-semibold">第二天</h3>
                      <p>12/01 週日，0個景點</p>
                    </div>
                </div>
            </div>
            
          
            <button class="btn p-0 border-white bg-white flex mt-[1rem] shadow-none hover:bg-white hover:border-white  group items-center" >
              <PlusCircleIcon  class="size-5 fill-primary-600 mr-[0.5rem] " />
              <p class= "group-hover:text-primary-500 text-black text-md text-bold ">建立新行程</p></button>
          

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
  

<!-- 頁面二 -->

      <div v-if="currentPage === 'Day1'" id="day1"
        class="relative h-[100vh] mt-[-24px] w-full md:max-h-[800px] md:max-w-[1000px] md:mx-auto md:mb-[calc(100vh/8)] bg-white md:flex md:rounded-md overflow-hidden"
        >
        <div class="hidden md:block md:w-2/3 md:bg-[#f4f4f4]">
          <div class="flex h-full">
          
          </div>
      </div>    
      <div class="w-full h-full px-[15px] py-[8px] sticky top-0 mr-0 md:w-1/3 flex-wrap" >
        <form method="dialog">
          <h2 class="mt-[30px] ml-[10px]  text-black text-3xl font-bold ">要加在哪?<br>要進放Emma寫的Day1內容</h2>
          <button @click="switchToPage('page1')" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
        返回 Page 1
      </button>
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">
            <XMarkIcon class="text-gray"/>
          </button>
        </form>
      </div>
    </div>

<!-- Day2 -->
          <div
        v-if="currentPage === 'Day2'" id="day2"
        class="relative h-[100vh] mt-[-24px] w-full md:max-h-[800px] md:max-w-[1000px] md:mx-auto md:mb-[calc(100vh/8)] bg-white md:flex md:rounded-md overflow-hidden"
      >
        <div class="hidden md:block md:w-2/3 md:bg-[#f4f4f4]">
          <div class="flex h-full">
          </div>
        </div>
        <div
          class="w-full h-full px-[15px] py-[8px] sticky top-0 mr-0 md:w-1/3 flex-wrap"
        >
          <form method="dialog">
            <h2
              class="mt-[30px] ml-[10px] text-2xl text-black md:text-2xl font-semibold"
            >
              要加在哪？<br>要進放Emma寫的Day Default狀態
            </h2>
            <button @click="switchToPage('page1')" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
        返回 Page 1
      </button>
            <button
              @click="switchToPage('page1')"
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <XMarkIcon class="text-gray" />
            </button>
          </form>
        </div>
      </div>

    </dialog>



 




</template>

