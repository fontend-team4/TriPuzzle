<!-- 右邊側欄 -->
<script setup>
import {
  ref,
  computed,
  onMounted,
  nextTick,
  watch,
  defineProps,
  onBeforeUnmount,
} from "vue"
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  HandThumbUpIcon,
} from "@heroicons/vue/24/outline"
import { PlusCircleIcon, MapPinIcon } from "@heroicons/vue/24/solid"
import { PlaceModalStore } from "@/stores/PlaceModal"
import { useUserStore } from "@/stores/userStore"
import axios from "axios"
import { MessageModalStore } from '@/stores/MessageModal'

//googlemap
// const props = defineProps({
//   map: {
//     type: String,
//     required: true,
//   },
// })

// const mapInstance = ref(null) // 儲存地圖實例

// const initMap = async () => {
//   console.log(props.map)

//   try {
//     await nextTick()
//     console.log("Initializing map with ID:", props.map)
//     // 確保 modal 完全渲染
//     await new Promise((resolve) => setTimeout(resolve, 200))
//     const mapContainer = document.getElementById(props.map)
//     // console.log('Map container found:', !!mapContainer)
//     console.log(mapContainer)
//     if (!mapContainer) {
//       console.error("Modal map container not found")
//       return
//     }
//     const { Map } = await google.maps.importLibrary("maps")
//     mapInstance.value = new Map(mapContainer, {
//       center: { lat: 25.033964, lng: 121.564468 },
//       zoom: 14,
//     })
//     console.log("Modal map initialized successfully")
//   } catch (error) {
//     console.error("Failed to initialize modal map:", error)
//   }
// }
// onMounted(() => {
//   initMap()
// })
// onBeforeUnmount(() => {
//   if (mapInstance.value) {
//     mapInstance.value = null
//   }
// })
// import { Loader } from "@googlemaps/js-api-loader"
// const loader = new Loader({
//   apiKey: apiKey,
//   version: "weekly",
// })

// loader.load().then(async () => {
//   const { Map } = await google.maps.importLibrary("maps")

//   map = new Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   })
// })
// async function initMap() {
//   const { Map } = await google.maps.importLibrary("maps")
//   const newMap = new Map(document.getElementById("map"), {
//     center: { lat: 25.0341222, lng: 121.5640212 },
//     zoom: 15,
//     maxZoom: 20,
//     minZoom: 3,
//     streetViewControl: false,
//     mapTypeControl: false,
//     mapId: "83af7188f1a0650d",
//   })
//   map.value = newMap
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
    console.error("Error fetching user data:", error)
  }
})

//景點資料
const modalStore = PlaceModalStore()
const place = modalStore.selectedPlace

//訊息彈窗
const messageStore = MessageModalStore()

//將景點資料存入places後端
onMounted(() => {
  axios.post(
    `${URL}/places/`,
    {
      place_id: place.id,
      name: place.name,
      address: place.address,
      rating: place.rating,
      location: place.location,
      city: place.location,
      country: "Taiwan",
      image_url: place.url,
      google_map_url: place.mapUrl,
      summary: place.summary,
      opening_hours: place.opening_hours,
      phone: place.phone,
      photos: place.photos,
      photos_length: place.photos.length,
      geometry: place.geometry,
      website: place.website,
      web_map: place.website,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
})

const URL = import.meta.env.VITE_HOST_URL
const schedules = ref([])

function calculateDateRange(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const dateArray = []
  while (start <= end) {
    dateArray.push(new Date(start))
    start.setDate(start.getDate() + 1)
  }
  return dateArray
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}/${day}`
}
function formatYear(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}/${month}/${day}`
}
// 把行程的每天拆成陣列存在物件裡，再把對應的景點塞進去
function groupPlacesByDate(schedulePlaces, dates) {
  const dateMap = {}
  dates.forEach((date) => {
    const formattedDate = date.toISOString().split("T")[0]
    dateMap[formattedDate] = []
  })
  // 將景點按日期分組
  schedulePlaces.forEach((place) => {
    const date = place.which_date.split("T")[0]
    if (dateMap[date]) {
      dateMap[date].push(place)
    }
  })
  return dateMap
}

// 抓取行程資料，重構schedule中的key，新增dates跟groupedPlaces
onMounted(async () => {
  const token = localStorage.getItem("token")
  try {
    const res = await axios.get(`${URL}/schedules`, {
      headers: { Authorization: token },
    })
    schedules.value = res.data.map((schedule) => ({
      ...schedule,
      dates: calculateDateRange(schedule.start_date, schedule.end_date),
      groupedPlaces: groupPlacesByDate(
        schedule.schedule_places,
        calculateDateRange(schedule.start_date, schedule.end_date)
      ),
    }))
    // console.log(schedules.value)
  } catch (error) {
    console.error("Error fetching schedules:", error)
  }
})

// 獲取特定日期景點的輔助函數
const fetchPlacesForDate = async (date) => {
  const token = localStorage.getItem("token")
  const res = await axios.get(
    `${URL}/schedulePlaces/byDate/${selectedSchedule.value.id}/${date}`,
    {
      headers: { Authorization: token },
    }
  )
  return res.data
}

//加入景點到行程
const selectedSchedule = ref(null)
const selectedDate = ref(null)
const addPlaceToSchedule = async () => {
  if (!selectedCardInfo.value) {
    console.error("未選擇插入位置")
    return
  }
  if (!selectedSchedule.value) {
    console.error("未選擇行程")
    return
  }
  if (!selectedDate.value) {
    console.error("未選擇日期")
    return
  }
  try {
    const token = localStorage.getItem("token")
    // console.log('準備發送數據:', {
    //   order: selectedCardInfo.value.order,
    //   schedule_id: selectedSchedule.value.id,
    //   date: selectedDate.value
    // });
    const res = await axios.post(
      `${URL}/schedulePlaces/`,
      {
        place_id: place.id,
        schedule_id: selectedSchedule.value.id,
        which_date: selectedDate.value,
        transportation_way: selectedSchedule.value.transportation_way,
        order: selectedCardInfo.value.order,
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    )
    // 新增成功後重新獲取該日期的景點列表
    const updatedPlaces = await fetchPlacesForDate(selectedDate.value)
    updateCards(updatedPlaces)
    messageStore.messageModal({
      title: "訊息",
      message: res.data.message,
      status: "success",
    })
  } catch (error) {
    console.error("新增失敗：", error.response?.data || error.message)
    messageStore.messageModal({
      title: "訊息",
      message: error.data.message || "未知錯誤",
      status: "error",
    })
  }
}

const cards = ref([])
const updateCards = (places) => {
  // console.log("調試 places:", places)
  cards.value = []

  if (!places || places.length === 0) {
    // console.log("找不到景點資料")
    cards.value.push({
      // location1: "尚無景點",
      newlocation: place.name,
      // location2: "尚無景點",
      order: 0,
    })
    // 自動選擇第一張卡片
    selectCard(0)
    return
  }

  // 按照order編號排序景點
  const sortedPlaces = Array.from(places).sort(
    (a, b) => parseInt(a.order) - parseInt(b.order)
  )

  for (let i = 0; i <= sortedPlaces.length; i++) {
    const card = {
      location1: i === 0 ? "開始旅圖" : `${i} ${sortedPlaces[i - 1].places.name}`,
      newlocation: place.name,
      location2:
        i === sortedPlaces.length
          ? "沒有其他景點囉"
          : `${i + 1} ${sortedPlaces[i].places.name}`,
      order: i,
    }
    cards.value.push(card)
  }
  // 如果還沒有選中的卡片，預設選擇第一張
  if (selectedCard.value === null) {
    selectCard(0)
  }
  // console.log("生成的卡片:", cards.value)
}

// 預設第二張卡片被選中
const selectedCard = ref(null)
const selectedCardInfo = ref(null)

const selectCard = (index) => {
  selectedCard.value = index
  selectedCardInfo.value = cards.value[index]
  // console.log("選中的卡片信息:", selectedCardInfo.value)
}
// 新增用於管理當前選中天數的狀態
const currentScheduleDays = ref([])
const currentSchedule = ref(null)

// Day Card切換
const currentPage = ref("page1")
const selectedTab = ref("day1")

// 修改 switchToPage 函數
const switchToPage = (page, tab, schedule = null) => {
  currentPage.value = page
  selectedTab.value = tab

  if (schedule) {
    if (!currentSchedule.value) {
      currentSchedule.value = schedule
    } else {
      Object.assign(currentSchedule.value, schedule)
    }
    currentScheduleDays.value = schedule.dates
    // console.log("Current schedule after switch:", currentSchedule.value)
  }
}

// 滾輪移動邏輯，添加 ref 用於獲取容器參數
const tabsContainer = ref(null)

const scrollTabs = (direction) => {
  if (!tabsContainer.value) return

  const scrollAmount = 160 // 一次滾動兩個標籤的寬度
  const currentScroll = tabsContainer.value.scrollLeft

  if (direction === "left") {
    tabsContainer.value.scrollTo({
      left: currentScroll - scrollAmount,
      behavior: "smooth",
    })
  } else {
    tabsContainer.value.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: "smooth",
    })
  }
}

// journey切換
const openedCollapse = ref("journey1")
const toggleCollapse = (id) => {
  openedCollapse.value = openedCollapse.value === id ? null : id
}
// 關掉Modal
const closeAddPlaceModal = () => {
  modalStore.closeModal()
}

// Tab的部分
const selectedButton = ref("myRunDown")

const selectMyRunDown = () => {
  selectedButton.value = "myRunDown"
}

const selectCoEdit = () => {
  selectedButton.value = "coEdit"
}

const myRunDownCls = computed(() => {
  return selectedButton.value === "myRunDown"
    ? ["text-white", "bg-primary-600"]
    : ["bg-white", "text-black", "hover:bg-primary-100"]
})

const coEditCls = computed(() => {
  return selectedButton.value === "coEdit"
    ? ["text-white", "bg-primary-600"]
    : ["bg-white", "text-black", "hover:bg-primary-100"]
})

const tab1Cls = computed(() => {
  return selectedButton.value === "myRunDown"
    ? ["opacity-100", "relative", "z-10"]
    : ["opacity-0", "absolute", "z-0"]
})

const tab2Cls = computed(() => {
  return selectedButton.value === "coEdit"
    ? ["opacity-100", "relative", "z-10"]
    : ["opacity-0", "absolute", "z-0"]
})
</script>

<template>
  <div class="fixed top-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-25"
    @click="closeAddPlaceModal" @click.stop>
    <div
      class="pb-10 w-full md:pb-0 h-full md:h-[calc(100vh-160px)] lg:w-[1032px] mx-0 md:mx-auto bg-white md:flex md:rounded-md md:overflow-hidden overflow-auto relative"
      @click.stop>
      <div v-if="currentPage === 'page1'" id="page1"
        class="relative h-[calc(100vh - 160px)] w-full md:max-h-[800px] md:max-w-[1032px] md:mx-0 bg-white md:flex md:rounded-md overflow-hidden">
        <div class="hidden md:block md:w-2/3 md:bg-[#f4f4f4]">
          <div class="flex h-full">
            <img src="https://web.chictrip.com.tw/assets/join_placeholder.2950886f.png" class="m-auto" />
          </div>
        </div>
        <div class="w-full h-full px-[15px] py-[8px] top-0 mr-0 md:w-1/3 flex-wrap relative">
          <form method="dialog " class="flex items-end justify-between">
            <h2 class="mt-[30px] mx-[10px] text-2xl text-black font-bold">
              要加在哪?
            </h2>
            <!-- <button class=" btn btn-sm btn-circle btn-ghost right-2 top-10">
          <XMarkIcon class="text-black"/>
        </button> -->
          </form>

          <div
            class="relative w-full mt-[1rem] mx-auto h-[2.5rem] grid grid-cols-2 items-center px-[3px] rounded-lg bg-gray-900/20 overflow-hidden shadow-md shadow-[#eeeeee] transition bg-white">
            <!-- 我的行程 -->
            <button @click="selectMyRunDown" class="relative block h-10 px-6 transition duration-300 rounded-lg tab"
              :class="myRunDownCls">
              <span class="text-base">我的行程</span>
            </button>

            <!-- 與我共編 -->
            <button @click="selectCoEdit" class="relative block h-10 px-6 transition duration-300 rounded-lg tab"
              :class="coEditCls">
              <span class="text-base">與我共編</span>
            </button>
          </div>

          <!-- Tab One -->
          <div class="relative h-full mt-8 flex flex-col">
            <div role="tabpanel" id="panel-1" class="transition duration-300 tab-panel flex-1 overflow-y-auto"
              :class="tab1Cls">
              <!-- 行程一 -->
              <!-- 行程一二只能擇一打開 -->
              <!--打開的時候會變成 <ChevronUpIcon class="size-3" /> -->
              <div class="h-[calc(100vh-350px)] overflow-y-auto pr-2">
                <div v-for="(schedule, index) in schedules" :key="schedule.id"
                  class="collapse ml-[-0.5rem] mr-[0.5rem] transition-opacity">
                  <input type="checkbox" :checked="openedCollapse === `journey${schedule.id}`"
                    @change="toggleCollapse(`journey${schedule.id}`)" />
                  <div class="collapse-title flex justify-between items-center p-0 pl-[1rem]">
                    <div class="cursor-pointer hover:bg-primary-100 group">
                      <h2 class="text-xl font-bold group-hover:text-primary-600 text-stone-950">
                        {{ schedule.title }}
                      </h2>
                      <p class="text-sm text-gray-600 group-hover:text-primary-600">
                        {{ formatYear(schedule.start_date) }}
                      </p>
                    </div>
                    <ChevronDownIcon v-if="openedCollapse !== `journey${schedule.id}`" class="text-black size-3" />
                    <ChevronUpIcon v-else class="text-black size-3" />
                  </div>
                  <div class="collapse-content p-0 pl-[1rem]">
                    <div v-for="(date, index) in schedule.dates" :key="index" @click="() => {
                        selectedSchedule = schedule
                        selectedDate = date.toISOString().split('T')[0]
                        currentSchedule = schedule
                        switchToPage('DayCard', `day${index + 1}`, schedule)
                        updateCards(
                          schedule.groupedPlaces[
                          date.toISOString().split('T')[0]
                          ]
                        )
                      }
                      "
                      class="relative p-2 my-[0.5rem] bg-[#f4f4f4] rounded-xl cursor-pointer hover:bg-primary-100 box-border overflow-hidden">
                      <label for=""
                        class="absolute top-0 right-0 bg-secondary-500 text-white flex items-center gap-1 p-[0.25rem] rounded-bl-xl text-xs">
                        <HandThumbUpIcon class="size-3 ml-[0.25rem]" />加在這天最順
                      </label>
                      <h3 class="text-black text-semibold">
                        第{{ index + 1 }}天
                      </h3>
                      <!-- 景點數量要跟我的行程連動 -->
                      <p>
                        {{ formatDate(date) }}　{{
                          schedule.groupedPlaces[
                            date.toISOString().split("T")[0]
                          ]?.length || 0
                        }}
                        個景點
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  class="btn p-0 border-white bg-white flex mt-[1rem] shadow-none hover:bg-white hover:border-white group items-center"
                  onclick="NewSchedule.showModal()">
                  <PlusCircleIcon class="size-5 fill-primary-600 mr-[0.5rem]" />
                  <p class="font-bold text-black group-hover:text-primary-500 text-md">
                    建立新行程
                  </p>
                </button>
              </div>
            </div>
            <!-- Tab Two -->
            <div role="tabpanel" id="panel-2"
              class="absolute top-0 flex justify-center p-6 transition duration-300 opacity-0 tab-panel"
              :class="tab2Cls">
              <img src="https://web.chictrip.com.tw/assets/join_placeholder.2950886f.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-sm absolute btn-circle btn-ghost right-[1rem] top-[1rem] z-10" @click="closeAddPlaceModal">
        <XMarkIcon class="text-black" />
      </button>

      <!-- 第O天卡片 -->
      <div v-if="currentPage === 'DayCard'" id="dayCard"
        class="relative h-[100vh] w-full md:max-h-[calc(100vh-160px)] md:max-w-[1032px] md:mx-auto bg-white md:flex md:rounded-md overflow-hidden">
        <button @click="switchToPage('page1')" class="absolute left-[1rem] top-[1rem] hover:opacity-40">
          <ChevronLeftIcon
            class="size-8 text-black bg-white border-2 border-white hover:text-primary-600 hover:bg-primary-100 hover:size-9 hover:border-1 hover:border-primary-600 rounded-full p-[0.25rem] pr-[0.5rem]" />
        </button>

        <!-- 左邊 -->
        <div class="md:w-2/3 bg-gray h-screen google-map min-w-screen" id="map"></div>
        <!-- 右邊 -->
        <div class="box-border relative overflow-hidden bg-white md:w-1/3">
          <h2 class="pt-[3.5rem] pb-[1rem] pl-[1rem] text-3xl font-bold text-black">
            要加在哪？
          </h2>

          <!-- 新的標籤列 -->
          <div class="flex border-lg">
            <template v-if="currentSchedule && currentSchedule.dates">
              <div class="relative flex items-center w-full border-slate-300 border-b-[1px]">
                <!-- 左箭頭 -->
                <button @click="scrollTabs('left')"
                  class="absolute left-0 z-10 flex items-center justify-center w-8 h-8 group">
                  <div
                    class="p-1 transition-all duration-200 hover:border-[1px] hover:border-primary-600 hover:rounded-full group-hover:text-primary-600">
                    <ChevronLeftIcon class="w-4 h-4 text-gray-600 group-hover:text-primary-600" />
                  </div>
                </button>

                <!-- 標籤容器 -->
                <div ref="tabsContainer" class="flex overflow-x-auto scrollbar-hide mx-10">
                  <div v-for="(date, index) in currentSchedule.dates" :key="index" @click="() => {
                      selectedTab = `day${index + 1}`
                      if (date) {
                        selectedDate = date.toISOString().split('T')[0]
                        updateCards(
                          currentSchedule.groupedPlaces[selectedDate]
                        )
                      }
                    }
                    "
                    class="flex-shrink-0 pb-[4px] px-[16px] text-base cursor-pointer rounded-t-lg transition-colors duration-200 ease-in-out text-center"
                    :class="[
                      selectedTab === `day${index + 1}`
                        ? 'bg-primary-600 text-white'
                        : 'text-black hover:bg-primary-200 hover:text-primary-600',
                    ]" role="tab">
                    第{{ index + 1 }}天
                  </div>
                </div>

                <!-- 右箭頭 -->
                <button @click="scrollTabs('right')"
                  class="absolute right-0 z-10 flex items-center justify-center w-8 h-8 group">
                  <div
                    class="p-1 transition-all duration-200 hover:border-[1px] hover:border-primary-600 hover:rounded-full group-hover:text-primary-600">
                    <ChevronLeftIcon class="w-4 h-4 text-gray-600 group-hover:text-primary-600 rotate-180" />
                  </div>
                </button>
              </div>
            </template>
          </div>

          <!-- 卡片內容區域 -->
          <div class="p-4 bg-primary-200 h-[calc(100vh-400px)] overflow-auto flex flex-col">
            <div v-for="(card, index) in cards" :key="index" @click="selectCard(index)" :class="[
              'p-5 pl-5 mx-[1rem] mt-5 rounded-lg relative transition-colors cursor-pointer',
              selectedCard === index
                ? 'bg-white border-primary-300 border-2'
                : 'bg-primary-100 border-none hover:bg-primary-50',
            ]">
              <p class="text-lg font-medium" :class="selectedCard === index ? 'text-black' : 'text-[#c7c7c7]'
                ">
                {{ card.location1 }}
              </p>

              <p class="flex items-center mt-2 text-lg" :class="selectedCard === index
                  ? 'text-secondary-500'
                  : 'text-[#c7c7c7]'
                ">
                <MapPinIcon :class="[
                  'size-5 ml-[-0.2rem]',
                  selectedCard === index
                    ? 'fill-secondary-500'
                    : 'fill-[#c7c7c7]',
                ]" />
                {{ card.newlocation }}
              </p>

              <p class="mt-2 text-lg" :class="[
                selectedCard === index ? 'text-black' : 'text-[#c7c7c7]',
              ]">
                {{ card.location2 }}
              </p>
            </div>
          </div>

          <!-- 確認新增並關閉視窗 -->
          <div class="h-[4rem] absolute bottom-0 right-0 left-0 bg-white px-4 pt-2">
            <div
              class="w-full text-white border-none rounded-full btn bg-primary-600 hover:bg-primary-200 hover:text-primary-600"
              @click="closeAddPlaceModal(), addPlaceToSchedule()">
              確認新增
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
