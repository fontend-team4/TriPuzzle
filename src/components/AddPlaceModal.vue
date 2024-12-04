<script setup>
import NewScheduleModal from "./NewScheduleModal.vue";
import { ref, computed } from "vue";
import { XMarkIcon, ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, HandThumbUpIcon  } from "@heroicons/vue/24/outline";
import { PlusCircleIcon,  MapPinIcon} from "@heroicons/vue/24/solid";

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
    : ["bg-white", "text-black", "hover:bg-primary-100"];
});

const coEditCls = computed(() => {
  return selectedButton.value === "coEdit"
    ? ["text-white", "bg-primary-600"]
    : ["bg-white", "text-black", "hover:bg-primary-100" ];
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

// journey切換
const openedCollapse = ref('journey1'); 

const toggleCollapse = (id) => {
  openedCollapse.value = openedCollapse.value === id ? null : id;
};

// Day Card切換
const currentPage = ref('page1');

const selectedTab = ref('day1');

const switchToPage = (page, tab) => {
  currentPage.value = page;
  selectedTab.value = tab;  // 設置選中的 Tab
};

// 關閉backdrop
const closeModal = () => {
  const dialog = document.getElementById("my_modal");  //id盡量與組件同名稱，避免與其他modal混淆
  dialog?.close();
};

// 卡片數據
const cards = ref([
  { location1: '❶ 饒河觀光夜市', newlocation: '松山文創園區', location2: '❷ 國父紀念館' },
  { location1: '❷ 國父紀念館', newlocation: '松山文創園區', location2: '❸ 中正紀念堂' },
  { location1: '❸ 中正紀念堂', newlocation: '松山文創園區', location2: '❹ 五倍學院' },
  { location1: '❹ 五倍學院', newlocation: '松山文創園區', location2: '❺ 二二八紀念公園' },
  { location1: '❺ 二二八紀念公園', newlocation: '松山文創園區', location2: '❻ 台大醫院' },
]);

// 預設第二張卡片被選中
const selectedCard = ref(1);

// 點擊選擇卡片
const selectCard = (index) => {
  selectedCard.value = index;
};
</script>

<template>
  <!-- <button class="btn border-0 overflow-hidden text-white text-lg bg-secondary-500 rounded-full
  hover:bg-secondary-600" onclick="AddPlace.showModal()">加入行程 <PlusCircleIcon class="size-6"/></button> -->
  <dialog id="AddPlace" class="modal" @click.self="closeModal">
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
        <h2 class="mt-[30px] ml-[10px] text-2xl text-black font-bold ">要加在哪?</h2>
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">
          <XMarkIcon class="text-gray"/>
        </button>
      </form>



    <div
      class="relative w-full mt-[1rem] mx-auto h-[2.5rem] grid grid-cols-2 items-center px-[3px] rounded-lg bg-gray-900/20 overflow-hidden shadow-md shadow-[#eeeeee] transition bg-white"
    >
      <!-- 我的行程 -->
      <button
        @click="selectMyRunDown"
        class="relative block h-10 px-6 tab rounded-lg transition duration-300"
        :class="myRunDownCls"
      >
        <span class="text-base">我的行程</span>
      </button>
    
      <!-- 與我共編 -->
      <button
        @click="selectCoEdit"
        class="relative block h-10 px-6 tab rounded-lg transition duration-300"
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
          <div id="journey1" class="collapse ml-[-0.5rem] mr-[0.5rem] transition-opacity">
              <input 
              type="checkbox"  
              :checked="openedCollapse === 'journey1'"
              @change="toggleCollapse('journey1')" 
              />
              <div class=" collapse-title flex justify-between items-center p-0 pl-[1rem]">
                <div class="hover:bg-primary-100 cursor-pointer group">
                  <h2 class=" group-hover:text-primary-600 text-xl font-bold  text-stone-950">行程一</h2>
                  <p class=" group-hover:text-primary-600 text-sm  text-gray-600 ">2024/11/01</p>
                </div> 
                <ChevronDownIcon v-if="openedCollapse !== 'journey1'"  class="size-3 text-black" />
                <ChevronUpIcon v-else class="size-3 text-black" />
              </div>
              <div class="collapse-content p-0 pl-[1rem]">
                  <div  id="openDay1" @click="switchToPage('DayCard', 'day1')"
                    class="relative  p-2 my-[0.5rem] bg-[#f4f4f4] rounded-xl cursor-pointer hover:bg-primary-100 box-border overflow-hidden"
                    >
                    <label for="" class="absolute top-0 right-0 bg-secondary-500 text-white
                    flex items-center gap-1 p-[0.25rem] rounded-bl-xl text-xs 
                    ">
                      <HandThumbUpIcon class="size-3 ml-[0.25rem]"/>加在這天最順
                    </label>
                    <h3 class="text-black text-semibold">第一天</h3>
                    <!-- 景點數量要跟我的行程連動 -->
                    <p>11/01 週五，4個景點</p>
                  </div>
                  <div id="openDay2" @click="switchToPage('DayCard', 'day2')"
                    class="p-2  my-[0.5rem] bg-[#f4f4f4] rounded-xl cursor-pointer hover:bg-primary-100"
                    >
                    <h3 class="text-black text-semibold">第二天</h3>
                    <p>11/02 週六，0個景點</p>
                  </div>
              </div>
          </div>
          <!-- 行程二 -->
          <div id="journey2" class="collapse ml-[-0.5rem] mr-[0.5rem] transition-opacity pt-1 mt-[0.5rem] border-t-2 border-dashed border-gray rounded-none">
              <input 
              type="checkbox" 
              :checked="openedCollapse === 'journey2'"
              @change="toggleCollapse('journey2')" />
              <div class=" collapse-title flex justify-between items-center p-0 pl-[1rem]">
                <div class="hover:bg-primary-100 cursor-pointer group">
                  <h2 class=" group-hover:text-primary-600 text-xl font-bold  text-stone-950">行程二</h2>
                  <p class=" group-hover:text-primary-600 text-sm  text-gray-600 ">2024/11/01</p>
                </div> 
                <ChevronDownIcon v-if="openedCollapse !== 'journey2'"  class="size-3 text-black" />
                <ChevronUpIcon v-else class="size-3 text-black" />
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
          
        
          <button class="btn p-0 border-white bg-white flex mt-[1rem] shadow-none hover:bg-white hover:border-white  group items-center" onclick="NewSchedule.showModal()">
            <PlusCircleIcon  class="size-5 fill-primary-600 mr-[0.5rem] " />
            <p class= "group-hover:text-primary-500 text-black text-md font-bold">建立新行程</p>
            <NewScheduleModal />
          </button>
        

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
<!-- 第O天卡片 -->
  <div v-if="currentPage === 'DayCard'" id="dayCard"
      class="relative h-[100vh] mt-[-24px] w-full md:max-h-[800px] md:max-w-[1000px] md:mx-auto md:mb-[150px] bg-white md:flex md:rounded-md overflow-hidden"
      >
      <button class="btn btn-sm absolute btn-circle btn-ghost right-[1rem] top-[1rem] z-10" @click="closeModal">
            <XMarkIcon class="text-black"/>
        </button>

        <button @click="switchToPage('page1')" class="absolute left-[1rem] top-[1rem] hover:opacity-40">
        <ChevronLeftIcon class="size-8 text-black bg-white border-2 border-white hover:text-primary-600 hover:bg-primary-100 
        hover:size-9 hover:border-1 hover:border-primary-600 rounded-full p-[0.25rem] pr-[0.5rem]" />
        </button>


      <!-- 左邊 -->
      <div class=" md:w-2/3 bg-gray">
      </div>  
      <!-- 右邊 -->
      <div class=" md:w-1/3 bg-white box-border relative">
        <h2 class="pt-[3.5rem] pb-[1rem] pl-[1rem] text-3xl font-bold text-black ">要加在哪？</h2>
        <div role="tablist" class="tabs tabs-bordered ">

<!--第一天 -->
        <input
            type="radio"
            name="dailySchedule"
            role="tab"
            class="tab rounded-lg hover:bg-primary-800 hover:text-white checked:bg-primary-600 checked:text-white"
            aria-label="第一天"
            :checked="selectedTab === 'day1'"
            @change="selectTab('day1')"
          />
          <div role="tabpanel" class="tab-content">
            <div class="w-full md:h-[580px] md:overflow-y-scroll relative bg-primary-200">
              <!-- 卡片列表 -->
              <div 
                v-for="(card, index) in cards" 
                :key="index" 
                @click="selectCard(index)" 
                :class="[  
                  'p-5 pl-5 mx-[1rem] mt-5 rounded-lg relative transition-colors',
                  selectedCard === index 
                    ? 'bg-white border-primary-300 border-2' 
                    : 'bg-primary-100 border-none hover:bg-primary-50'
                ]"
              >
                <!-- 卡片位置1 -->
                <p 
                  class="text-lg font-medium"
                  :class="selectedCard === index ? 'text-black' : 'text-[#c7c7c7]'"
                >
                  {{ card.location1 }}
                </p>
              
                <!-- 卡片新位置 -->
                <p 
                  class="text-lg flex items-center mt-2"
                  :class="selectedCard === index ? 'text-secondary-500' : 'text-[#c7c7c7]'"
                >
                  <MapPinIcon 
                    :class="[  
                      'size-5 ml-[-0.2rem]',  
                      selectedCard === index ? 'fill-secondary-500' : 'fill-[#c7c7c7]'
                    ]"
                  />
                  {{ card.newlocation }}
                </p>
              
                <!-- 卡片位置2 -->
                <p class="text-lg mt-2" 
                    :class="[  
                    selectedCard === index ? 'text-black' : 'text-[#c7c7c7]'
                    ]">{{ card.location2 }}</p>
              </div>
            </div>
          </div>

<!-- 第二天 -->
      <input
          type="radio"
          name="dailySchedule"
          role="tab"
          class="tab rounded-lg hover:bg-primary-800 hover:text-white checked:bg-primary-600 checked:text-white"
          aria-label="第二天"
          :checked="selectedTab === 'day2'"
          @change="selectTab('day2')"
        />
        <div role="tabpanel" class="tab-content p-0">
          <div class="w-full md:h-[580px] md:overflow-y-scroll bg-primary-200 ">
            <div class="border-2 border-primary-400 bg-white p-6 pl-5 mx-[1rem] mt-5 rounded-lg relative overflow-hidden">
              <label for="" class="absolute top-0 right-0 bg-primary-400 text-white
                flex items-center gap-1 p-[0.25rem] rounded-bl-xl text-xs  border-box
              ">
                <HandThumbUpIcon class="size-3 ml-[0.25rem]"/>加在這裡最順
              </label>
              <p class="text-lg flex items-center text-secondary-500"><MapPinIcon class="size-5 ml-[-0.2rem] fill-secondary-500"/>
                松山文創園區
              </p>
            </div>
          </div>
        </div>

      </div>

<!-- 確認新增並關閉視窗 -->
        <div class="h-[3rem] absolute bottom-[1rem] right-[0.5rem] left-[0.5rem]">
          <div class="btn w-full  rounded-full border-none bg-primary-600 text-white hover:bg-primary-200 hover:text-primary-600" @click="closeModal">
              確認新增
          </div>
        </div>
      </div>

      
  </div>  
  </dialog>
</template>

