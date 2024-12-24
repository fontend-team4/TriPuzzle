<!-- 右邊側欄 -->
<script setup>
import { ref, computed, onMounted, nextTick,watch } from 'vue'
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  HandThumbUpIcon,
} from '@heroicons/vue/24/outline'
import { PlusCircleIcon, MapPinIcon } from '@heroicons/vue/24/solid'
import { PlaceModalStore } from '@/stores/PlaceModal'
import { useUserStore } from '@/stores/userStore'
//googlemap
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
let map = ref('')
// 初始化地圖
// let map=ref('')
// async function initMap() {
//   try {
//     const { Map } = await google.maps.importLibrary("maps");
//     const mapContainer = document.getElementById("map");
//     if (!mapContainer) {
//       console.error("Map container not found.");
//       return;
//     }
//     map.value = new Map(mapContainer, {
//       center: { lat: 25.033964, lng: 121.564468 }, // 台北 101 中心點
//       zoom: 14,
//     });
//   } catch (error) {
//     console.error("Failed to initialize Google Maps:", error);
//   }
// }
// initMap()
// import { Loader } from "@googlemaps/js-api-loader"
// const loader = new Loader({
//   apiKey: apiKey,
//   version: "weekly",
// });

// loader.load().then(async () => {
//   const { Map } = await google.maps.importLibrary("maps");

//   map = new Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
// });
// async function initMap() {
//   const { Map } = await google.maps.importLibrary('maps');
//   const newMap = new Map(document.getElementById('map'), {
//     center:{ lat: 25.0341222, lng: 121.5640212 },
//     zoom: 15,
//     maxZoom: 20,
//     minZoom: 3,
//     streetViewControl: false,
//     mapTypeControl: false,
//     mapId: "83af7188f1a0650d",
//   });
//   map.value = newMap;

// }
// initMap()

//抓user資料
const userStore = useUserStore()
const userData = ref(null)
onMounted(async () => {
  try {
    const res = await userStore.getUser()
    userData.value = res
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
})

//行程資料
const modalStore = PlaceModalStore()
const place = modalStore.selectedPlace

const URL = import.meta.env.VITE_HOST_URL
const schedules = ref([])

watch(
  () => userData.value,
  async (newUserData) => {
    if (newUserData && newUserData.id) {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${URL}/schedules`,{
        headers: { Authorization: token },
      })
        schedules.value = res.data
        console.log(schedules.value );
        console.log(token);
        
        
      } catch (err) {
        console.log(err)
      }
    }
  }
)


// Tab的部分
const selectedButton = ref('myRunDown')

const selectMyRunDown = () => {
  selectedButton.value = 'myRunDown'
}

const selectCoEdit = () => {
  selectedButton.value = 'coEdit'
}

const myRunDownCls = computed(() => {
  return selectedButton.value === 'myRunDown'
    ? ['text-white', 'bg-primary-600']
    : ['bg-white', 'text-black', 'hover:bg-primary-100']
})

const coEditCls = computed(() => {
  return selectedButton.value === 'coEdit'
    ? ['text-white', 'bg-primary-600']
    : ['bg-white', 'text-black', 'hover:bg-primary-100']
})

const tab1Cls = computed(() => {
  return selectedButton.value === 'myRunDown'
    ? ['opacity-100', 'relative', 'z-10']
    : ['opacity-0', 'absolute', 'z-0']
})

const tab2Cls = computed(() => {
  return selectedButton.value === 'coEdit'
    ? ['opacity-100', 'relative', 'z-10']
    : ['opacity-0', 'absolute', 'z-0']
})

// journey切換
const openedCollapse = ref('journey1')

const toggleCollapse = (id) => {
  openedCollapse.value = openedCollapse.value === id ? null : id
}

// Day Card切換
const currentPage = ref('page1')
const selectedTab = ref('day1')

const switchToPage = (page, tab) => {
  currentPage.value = page
  selectedTab.value = tab // 設置選中的 Tab
}

// 關掉Modal
const closeAddPlaceModal = () => {
  modalStore.closeModal()
}

// 卡片數據
const cards = ref([
  {
    location1: '❶ 饒河觀光夜市',
    newlocation: '松山文創園區',
    location2: '❷ 國父紀念館',
  },
  {
    location1: '❷ 國父紀念館',
    newlocation: '松山文創園區',
    location2: '❸ 中正紀念堂',
  },
  {
    location1: '❸ 中正紀念堂',
    newlocation: '松山文創園區',
    location2: '❹ 五倍學院',
  },
  {
    location1: '❹ 五倍學院',
    newlocation: '松山文創園區',
    location2: '❺ 二二八紀念公園',
  },
  {
    location1: '❺ 二二八紀念公園',
    newlocation: '松山文創園區',
    location2: '❻ 台大醫院',
  },
])

// 預設第二張卡片被選中
const selectedCard = ref(1)

// 點擊選擇卡片
const selectCard = (index) => {
  selectedCard.value = index
}
</script>

<template>
  <div
    class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-25"
    @click="closeAddPlaceModal"
    @click.stop
  >
    <div
      class="pb-10 w-full md:pb-0 h-full md:h-[calc(100vh-160px)] lg:w-[1032px] mx-0 md:mx-auto bg-white md:flex md:rounded-md md:overflow-hidden overflow-auto relative"
      @click.stop
    >
      <div
        v-if="currentPage === 'page1'"
        id="page1"
        class="relative h-[calc(100vh - 160px)] w-full md:max-h-[800px] md:max-w-[1032px] md:mx-0 bg-white md:flex md:rounded-md overflow-hidden"
      >
        <div class="hidden md:block md:w-2/3 md:bg-[#f4f4f4]">
          <div class="flex h-full">
            <img
              src="https://web.chictrip.com.tw/assets/join_placeholder.2950886f.png"
              class="m-auto"
            />
          </div>
        </div>
        <div
          class="w-full h-full px-[15px] py-[8px] top-0 mr-0 md:w-1/3 flex-wrap relative"
        >
          <form method="dialog " class="flex items-end justify-between">
            <h2 class="mt-[30px] mx-[10px] text-2xl text-black font-bold">
              要加在哪?
            </h2>
            <!-- <button class=" btn btn-sm btn-circle btn-ghost right-2 top-10">
          <XMarkIcon class="text-black"/>
        </button> -->
          </form>

          <div
            class="relative w-full mt-[1rem] mx-auto h-[2.5rem] grid grid-cols-2 items-center px-[3px] rounded-lg bg-gray-900/20 overflow-hidden shadow-md shadow-[#eeeeee] transition bg-white"
          >
            <!-- 我的行程 -->
            <button
              @click="selectMyRunDown"
              class="relative block h-10 px-6 transition duration-300 rounded-lg tab"
              :class="myRunDownCls"
            >
              <span class="text-base">我的行程</span>
            </button>

            <!-- 與我共編 -->
            <button
              @click="selectCoEdit"
              class="relative block h-10 px-6 transition duration-300 rounded-lg tab"
              :class="coEditCls"
            >
              <span class="text-base">與我共編</span>
            </button>
          </div>

          <!-- Tab One -->
          <div class="relative h-full mt-8">
            <div
              role="tabpanel"
              id="panel-1"
              class="transition duration-300 tab-panel"
              :class="tab1Cls"
            >
              <!-- 行程一 -->
              <!-- 行程一二只能擇一打開 -->
              <!--打開的時候會變成 <ChevronUpIcon class="size-3" /> -->
              <div
                id="journey1"
                class="collapse ml-[-0.5rem] mr-[0.5rem] transition-opacity"
              >
                <input
                  type="checkbox"
                  :checked="openedCollapse === 'journey1'"
                  @change="toggleCollapse('journey1')"
                />
                <div
                  class="collapse-title flex justify-between items-center p-0 pl-[1rem]"
                >
                  <div class="cursor-pointer hover:bg-primary-100 group">
                    <h2
                      class="text-xl font-bold group-hover:text-primary-600 text-stone-950"
                    >
                      行程一
                    </h2>
                    <p
                      class="text-sm text-gray-600 group-hover:text-primary-600"
                    >
                      2024/11/01
                    </p>
                  </div>
                  <ChevronDownIcon
                    v-if="openedCollapse !== 'journey1'"
                    class="text-black size-3"
                  />
                  <ChevronUpIcon v-else class="text-black size-3" />
                </div>
                <div class="collapse-content p-0 pl-[1rem]">
                  <div
                    id="openDay1"
                    @click="switchToPage('DayCard', 'day1')"
                    class="relative p-2 my-[0.5rem] bg-[#f4f4f4] rounded-xl cursor-pointer hover:bg-primary-100 box-border overflow-hidden"
                  >
                    <label
                      for=""
                      class="absolute top-0 right-0 bg-secondary-500 text-white flex items-center gap-1 p-[0.25rem] rounded-bl-xl text-xs"
                    >
                      <HandThumbUpIcon
                        class="size-3 ml-[0.25rem]"
                      />加在這天最順
                    </label>
                    <h3 class="text-black text-semibold">第一天</h3>
                    <!-- 景點數量要跟我的行程連動 -->
                    <p>11/01 週五，4個景點</p>
                  </div>
                  <div
                    id="openDay2"
                    @click="switchToPage('DayCard', 'day2')"
                    class="p-2 my-[0.5rem] bg-[#f4f4f4] rounded-xl cursor-pointer hover:bg-primary-100"
                  >
                    <h3 class="text-black text-semibold">第二天</h3>
                    <p>11/02 週六，0個景點</p>
                  </div>
                </div>
              </div>
              <!-- 行程二 -->
              <div
                id="journey2"
                class="collapse ml-[-0.5rem] mr-[0.5rem] transition-opacity pt-1 mt-[0.5rem] border-t-2 border-dashed border-gray rounded-none"
              >
                <input
                  type="checkbox"
                  :checked="openedCollapse === 'journey2'"
                  @change="toggleCollapse('journey2')"
                />
                <div
                  class="collapse-title flex justify-between items-center p-0 pl-[1rem]"
                >
                  <div class="cursor-pointer hover:bg-primary-100 group">
                    <h2
                      class="text-xl font-bold group-hover:text-primary-600 text-stone-950"
                    >
                      行程二
                    </h2>
                    <p
                      class="text-sm text-gray-600 group-hover:text-primary-600"
                    >
                      2024/11/01
                    </p>
                  </div>
                  <ChevronDownIcon
                    v-if="openedCollapse !== 'journey2'"
                    class="text-black size-3"
                  />
                  <ChevronUpIcon v-else class="text-black size-3" />
                </div>
                <div class="collapse-content p-0 pl-[1rem]">
                  <div
                    class="p-2 my-[0.5rem] bg-[#f4f4f4] rounded-xl cursor-pointer hover:bg-primary-100"
                  >
                    <h3 class="text-black text-semibold">第一天</h3>
                    <!-- 景點數量要跟我的行程連動 -->
                    <p>11/30 週六，0個景點</p>
                  </div>
                  <div
                    class="p-2 my-[0.5rem] bg-[#f4f4f4] rounded-xl cursor-pointer hover:bg-primary-100"
                  >
                    <h3 class="text-black text-semibold">第二天</h3>
                    <p>12/01 週日，0個景點</p>
                  </div>
                </div>
              </div>

              <!-- 這裡的NewSchedule不必是動態的 -->
              <button
                class="btn p-0 border-white bg-white flex mt-[1rem] shadow-none hover:bg-white hover:border-white group items-center"
                onclick="NewSchedule.showModal()"
              >
                <PlusCircleIcon class="size-5 fill-primary-600 mr-[0.5rem]" />
                <p
                  class="font-bold text-black group-hover:text-primary-500 text-md"
                >
                  建立新行程
                </p>
                <!-- <NewScheduleModal /> -->
              </button>
            </div>
            <!-- Tab Two -->
            <div
              role="tabpanel"
              id="panel-2"
              class="absolute top-0 flex justify-center p-6 transition duration-300 opacity-0 tab-panel"
              :class="tab2Cls"
            >
              <img
                src="https://web.chictrip.com.tw/assets/join_placeholder.2950886f.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <button
        class="btn btn-sm absolute btn-circle btn-ghost right-[1rem] top-[1rem] z-10"
        @click="closeAddPlaceModal"
      >
        <XMarkIcon class="text-black" />
      </button>
      <!-- <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form> -->
      <!-- 第O天卡片 -->
      <div
        v-if="currentPage === 'DayCard'"
        id="dayCard"
        class="relative h-[100vh] w-full md:max-h-[calc(100vh-160px)] md:max-w-[1032px] md:mx-auto bg-white md:flex md:rounded-md overflow-hidden"
      >
        <!-- <button class="btn btn-sm absolute btn-circle btn-ghost right-[1rem] top-[1rem] z-10" @click="closeModal">
            <XMarkIcon class="text-black"/>
        </button> -->

        <button
          @click="switchToPage('page1')"
          class="absolute left-[1rem] top-[1rem] hover:opacity-40"
        >
          <ChevronLeftIcon
            class="size-8 text-black bg-white border-2 border-white hover:text-primary-600 hover:bg-primary-100 hover:size-9 hover:border-1 hover:border-primary-600 rounded-full p-[0.25rem] pr-[0.5rem]"
          />
        </button>

        <!-- 左邊 -->
        <div
          class="md:w-2/3 bg-gray h-screen google-map min-w-screen"
          id="map"
        ></div>
        <!-- 右邊 -->
        <div class="box-border relative overflow-hidden bg-white md:w-1/3">
          <h2
            class="pt-[3.5rem] pb-[1rem] pl-[1rem] text-3xl font-bold text-black"
          >
            要加在哪？
          </h2>
          <div role="tablist" class="tabs tabs-bordered">
            <!--第一天 -->
            <input
              type="radio"
              name="dailySchedule"
              role="tab"
              class="rounded-lg tab hover:bg-primary-800 hover:text-white checked:bg-primary-600 checked:text-white"
              aria-label="第一天"
              :checked="selectedTab === 'day1'"
              @change="selectTab('day1')"
            />
            <div role="tabpanel" class="tab-content">
              <div
                class="w-full md:h-[580px] md:overflow-auto relative bg-primary-200"
              >
                <!-- 卡片列表 -->
                <div
                  v-for="(card, index) in cards"
                  :key="index"
                  @click="selectCard(index)"
                  :class="[
                    'p-5 pl-5 mx-[1rem] mt-5 rounded-lg relative transition-colors',
                    selectedCard === index
                      ? 'bg-white border-primary-300 border-2'
                      : 'bg-primary-100 border-none hover:bg-primary-50',
                  ]"
                >
                  <!-- 卡片位置1 -->
                  <p
                    class="text-lg font-medium"
                    :class="
                      selectedCard === index ? 'text-black' : 'text-[#c7c7c7]'
                    "
                  >
                    {{ card.location1 }}
                  </p>

                  <!-- 卡片新位置 -->
                  <p
                    class="flex items-center mt-2 text-lg"
                    :class="
                      selectedCard === index
                        ? 'text-secondary-500'
                        : 'text-[#c7c7c7]'
                    "
                  >
                    <MapPinIcon
                      :class="[
                        'size-5 ml-[-0.2rem]',
                        selectedCard === index
                          ? 'fill-secondary-500'
                          : 'fill-[#c7c7c7]',
                      ]"
                    />
                    {{ card.newlocation }}
                  </p>

                  <!-- 卡片位置2 -->
                  <p
                    class="mt-2 text-lg"
                    :class="[
                      selectedCard === index ? 'text-black' : 'text-[#c7c7c7]',
                    ]"
                  >
                    {{ card.location2 }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 第二天 -->
            <input
              type="radio"
              name="dailySchedule"
              role="tab"
              class="rounded-lg tab hover:bg-primary-800 hover:text-white checked:bg-primary-600 checked:text-white"
              aria-label="第二天"
              :checked="selectedTab === 'day2'"
              @change="selectTab('day2')"
            />
            <div role="tabpanel" class="p-0 tab-content">
              <div
                class="w-full md:h-[580px] md:overflow-y-scroll bg-primary-200"
              >
                <div
                  class="border-2 border-primary-400 bg-white p-6 pl-5 mx-[1rem] mt-5 rounded-lg relative overflow-hidden"
                >
                  <label
                    for=""
                    class="absolute top-0 right-0 bg-primary-400 text-white flex items-center gap-1 p-[0.25rem] rounded-bl-xl text-xs border-box"
                  >
                    <HandThumbUpIcon class="size-3 ml-[0.25rem]" />加在這裡最順
                  </label>
                  <p class="flex items-center text-lg text-secondary-500">
                    <MapPinIcon
                      class="size-5 ml-[-0.2rem] fill-secondary-500"
                    />
                    松山文創園區
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- 確認新增並關閉視窗 -->
          <div
            class="h-[3rem] absolute bottom-4 right-0 left-0 bg-white px-4 pt-2"
          >
            <div
              class="w-full text-white border-none rounded-full btn bg-primary-600 hover:bg-primary-200 hover:text-primary-600"
              @click="closeModal"
            >
              確認新增
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
