<script setup>
import { ref, inject, onMounted } from "vue"
import axios from "axios"
import ScheduleCoverImgModal from "./ScheduleCoverImgModal.vue"
import ScheduleSummaryModal from "./ScheduleSummaryModal.vue"
import defaultCoverImage from "../assets/images/coverimage-1.jpg"
import { CalendarCheck, EditPencil } from "@iconoir/vue"
import {
  XMarkIcon,
  ArrowLongRightIcon,
  UsersIcon,
  ArrowUpTrayIcon,
} from "@heroicons/vue/24/outline"
import router from "@/router"

const transprotations = ref([
  {
    id: 1,
    item: "汽車",
    value: "CAR",
  },
  {
    id: 2,
    item: "機車",
    value: "MOTORBIKE",
  },
  {
    id: 3,
    item: "大眾運輸",
    value: "PUBLIC_TRANSPORT",
  },
  {
    id: 4,
    item: "走路",
    value: "WALK",
  },
])

const API_URL = import.meta.env.VITE_HOST_URL
const token = localStorage.getItem("token")
const scheduleId = inject("scheduleId")

const coverImage = ref(null)
const noteDialog = ref(null)
const scheduleNote = ref(null)
const scheduleName = ref("")
const startDate = ref("")
const endDate = ref("")
const transportationWay = ref("CUSTOM")

const replaceImgLabelClick = () => {
  // 點擊收回下拉式選單(再點擊一次)
  document.getElementById("changeImg-toggle").click()
}

const getCoverImg = (img) => {
  coverImage.value = img
}

const imgFile = ref(null)
const selectedImg = ref(null)
const handleImgUpload = async (event) => {
  document.getElementById("changeImg-toggle").click()
  imgFile.value = event.target.files[0]
  selectedImg.value = URL.createObjectURL(imgFile.value)
  coverImage.value = selectedImg.value
  await uploadImg()
}

const uploadImg = async () => {
  const formData = new FormData()
  formData.append("image", imgFile.value)
  try {
    const response = await axios.post(
      `${API_URL}/api/upload/coverImg`,
      formData
    )
    coverImage.value = response.data.url
  } catch (error) {
    console.error(error.message)
  }
}

const editSchedule = ref(null)
const openEditSchedule = () => {
  editSchedule.value.showModal()
}

const getSchedule = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  try {
    const response = await axios.get(`${API_URL}/schedules/${id}`, config)
    scheduleName.value = response.data.title
    scheduleNote.value = response.data.schedule_note
    coverImage.value = response.data.image_url
    startDate.value = response.data.start_date.split("T")[0]
    endDate.value = response.data.end_date.split("T")[0]
    transportationWay.value = response.data.transportation_way
  } catch (error) {
    console.error(error.message)
  }
}

const saveSuccessMsg = ref("")
const saveSuccess = ref(null)
const upateSchedule = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const data = {
    title: scheduleName.value,
    schedule_note: scheduleNote.value,
    image_url: coverImage.value,
    start_date: startDate.value,
    end_date: endDate.value,
    transportation_way: transportationWay.value,
  }
  try {
    const response = await axios.patch(
      `${API_URL}/schedules/${id}`,
      data,
      config
    )
    scheduleNote.value = await response.data.updatedSchedule.schedule_note
    scheduleName.value = await response.data.updatedSchedule.title
    coverImage.value = await response.data.updatedSchedule.image_url
    startDate.value = await response.data.updatedSchedule.start_date.split(
      "T"
    )[0]
    endDate.value = await response.data.updatedSchedule.end_date.split("T")[0]
    transportationWay.value = await response.data.updatedSchedule
      .transportation_way
    noteDialog.value.close()
    saveSuccessMsg.value = "行程已更新"
    saveSuccess.value.showModal()
    setTimeout(() => {
      saveSuccess.value.close()
    }, 1000)
  } catch (error) {
    console.error(error.message)
  }
}

const goToMemberView = () => {
  router.push("/member")
}

onMounted(() => {
  coverImage.value = defaultCoverImage
  getSchedule(scheduleId.value)
})
</script>

<template>
  <!-- schedule title -->
  <div class="w-full pt-5 px-6 pb-8">
    <div class="flex items-center gap-1">
      <p class="text-2xl font-medium mb-2">{{ scheduleName }}</p>
      <span @click="editSchedule.showModal()">
        <EditPencil class="inline-block w-5 h-5 mb-2 hover:cursor-pointer" />
      </span>
    </div>
    <p class="text-sm mb-3 text-slate-500">{{ startDate }} - {{ endDate }}</p>
    <span
      v-if="!scheduleNote"
      class="text-sm text-slate-400 border-l border-slate-400 ps-3"
    >
      還沒有寫筆記哦...
    </span>
    <span v-else class="text-sm text-slate-400 border-l border-slate-400 ps-3">
      旅行細節都在這！
    </span>
    <span
      class="text-sm text-primary-600 font-medium hover:cursor-pointer"
      @click="noteDialog.showModal()"
      >編輯筆記</span
    >
    <!-- schedule note -->
    <dialog ref="noteDialog" class="modal">
      <div class="modal-box w-screen md:w-[480px]">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h2 class="text-2xl font-medium text-center pt-6 mb-4">行程筆記</h2>
        <textarea
          class="w-full h-[500px] textarea textarea-lg focus:border-0 focus:outline-none"
          placeholder="記下重要的旅行細節吧"
          v-model="scheduleNote"
        ></textarea>
        <div
          class="w-full flex gap-3 h-20 px-6 py-4 bg-white border-t border-gray fixed bottom-0 right-0"
        >
          <button
            class="w-full h-12 px-5 py-3 border border-primary-600 text-primary-600 text-center rounded-3xl font-medium hover:bg-primary-100"
            @click="noteDialog.close()"
          >
            取消
          </button>
          <button
            class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl font-medium"
            @click="upateSchedule(scheduleId)"
          >
            儲存
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <button>close</button>
      </form>
    </dialog>
  </div>
  <!-- my tool -->
  <div class="p-5">
    <div class="flex items-center gap-1 mb-3">
      <span class="inline-block w-5 h-5"><UsersIcon /></span>
      <p>我的工具</p>
    </div>
    <ul class="flex justify-between">
      <li
        class="w-[100px] pt-4 px-2.5 pb-2.5 bg-gray rounded-xl hover:cursor-pointer hover:bg-primary-100 hover:text-primary-600"
        @click="goToMemberView"
      >
        <img
          src="https://web.chictrip.com.tw/assets/img-myfavorite.42ac10ec.svg"
          class="mx-auto"
          alt=""
        />
        <p class="text-center font-medium mt-2">收藏</p>
      </li>
      <li
        class="w-[100px] pt-4 px-2.5 pb-2.5 bg-gray rounded-xl hover:cursor-pointer hover:bg-primary-100 hover:text-primary-600"
        onclick="scheduleSummaryModal.showModal()"
      >
        <img
          src="https://web.chictrip.com.tw/assets/img-share.7c89cdf8.svg"
          class="mx-auto"
          alt=""
        />
        <p class="text-center font-medium mt-2">摘要</p>
      </li>
      <ScheduleSummaryModal />
      <li
        class="w-[100px] pt-4 px-2.5 pb-2.5 bg-gray rounded-xl hover:cursor-pointer hover:bg-primary-100 hover:text-primary-600"
      >
        <img
          src="https://web.chictrip.com.tw/assets/img-exportbook.a62ae1d0.svg"
          class="mx-auto"
          alt=""
        />
        <p class="text-center font-medium mt-2">分帳</p>
      </li>
    </ul>
  </div>
  <!-- schedule note save success Modal -->
  <dialog ref="saveSuccess" class="modal w-[384px] mx-auto">
    <div class="modal-box">
      <form method="dialog"></form>
      <CalendarCheck class="mx-auto w-14 h-14 text-primary-600 mb-3" />
      <h3 class="text-xl font-bold text-center">{{ saveSuccessMsg }}</h3>
    </div>
  </dialog>
  <!-- edit schedule Modal -->
  <dialog ref="editSchedule" class="modal">
    <div
      class="modal-box p-0 w-full md:max-w-[480px] sm:max-w-[100%] sm:max-h-[100%] max-md:rounded-none"
    >
      <div
        class="max-w-[480px] md:max-w-[480px] sm:max-w-[100%] h-[60px] px-[15px] py-[8px] sticky top-0 bg-white"
      >
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </form>
      </div>

      <div>
        <header>
          <span class="text-2xl font-bold flex items-center justify-center"
            >編輯行程</span
          >
        </header>
      </div>

      <!-- 主內容區塊 -->
      <div
        class="pt-0 px-[20px] pb-[50px] max-w-[480px] md:max-w-[480px] sm:max-w-[100%] md:max-h-[552.75px] sm:max-h-[100%] flex flex-col gap-[20px] relative"
      >
        <!-- 封面照片 -->
        <div class="relative">
          <p class="font-bold mb-[5px]">封面照片</p>
          <!-- 隱藏的 Checkbox -->
          <input type="checkbox" id="changeImg-toggle" class="hidden peer" />

          <!-- 使用 Label 包裹按鈕 -->
          <!-- <label
            for="changeImg-toggle"
            class="w-[85px] h-[32px] absolute right-[20px] bottom-[16px] z-10 flex items-center justify-center gap-2 border-[1px] border-white rounded-3xl py-[4px] px-[12px] cursor-pointer"
          >
            <PencilIcon class="size-5 font-bold text-white" />
            <p class="font-bold text-sm text-white">更換</p>
          </label> -->

          <!-- 下拉選單(插入更換圖片modal) -->
          <ul
            class="font-bold replace-img-btn absolute right-0 top-full mt-2 w-[153px] h-[80px] bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out max-h-0 overflow-hidden opacity-0 peer-checked:max-h-[150px] peer-checked:opacity-100 z-10"
            @click="replaceImgLabelClick"
          >
            <li
              class="h-[50%] px-[20px] py-[8px] hover:bg-gray-100 cursor-pointer flex items-center"
            >
              <ScheduleCoverImgModal @selectedImg="getCoverImg" />
            </li>

            <label
              for="file-upload"
              class="cursor-pointer w-full"
              @change="handleImgUpload"
            >
              <li
                class="h-[50%] px-[20px] py-[8px] hover:bg-gray-100 cursor-pointer flex items-center border-t-[1px] border-slate-200"
              >
                <ArrowUpTrayIcon class="w-[24px] h-[24px]" />
                <span class="pl-[5px] text-[14px]">上傳照片</span>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  class="hidden"
                />
              </li>
            </label>
          </ul>

          <div class="relative w-full h-[220px] rounded-xl overflow-hidden">
            <img
              :src="coverImage"
              alt="封面照片"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
            ></div>
          </div>
        </div>
        <!-- 行程名稱 -->
        <div>
          <p class="mb-2 font-bold">行程名稱</p>
          <input
            type="text"
            placeholder="幫行程取個名字吧"
            v-model="scheduleName"
            class="border-solid border border-[#EEEEEE] rounded-lg w-[100%] h-[40px] py-2 px-5"
          />
        </div>

        <!-- 行程日期 -->
        <div class="w-[100%]">
          <div>
            <p class="mb-2 font-bold">行程日期</p>
          </div>
          <div class="flex flex-erap gap-3 justify-between items-center">
            <input
              type="date"
              placeholder="出發日"
              v-model="startDate"
              class="border-solid border border-[#EEEEEE] rounded-lg w-[calc(50%-20px)] h-[40px] py-2 px-5"
            />
            <span>
              <ArrowLongRightIcon class="size-5 text-stone-400" />
            </span>
            <input
              type="date"
              placeholder="結束日"
              v-model="endDate"
              class="border-solid border border-[#EEEEEE] rounded-lg w-[calc(50%-20px)] h-[40px] py-2 px-5"
            />
          </div>
        </div>

        <!-- 主要交通方式 -->
        <div>
          <p class="mb-2 font-bold">主要交通方式</p>
          <select
            class="select select-bordered w-full"
            v-model="transportationWay"
          >
            <option selected value="CUSTOM">自訂</option>
            <option
              v-for="way in transprotations"
              :key="way.id"
              :value="way.value"
            >
              {{ way.item }}
            </option>
          </select>
        </div>
      </div>

      <!-- footer -->
      <div
        class="w-[100%] h-[80px] bottom-0 sticky border-t-[1px] border-slate-200 py-[16px] px-[24px] z-20"
      >
        <form method="dialog" class="flex gap-[12px]">
          <button
            class="w-[50%] h-[48px] border-[1px] border-primary-600 rounded-3xl text-primary-600 font-bold text-sm justify-center items-center px-[12px] py-[8px] hover:bg-primary-100"
          >
            取消
          </button>
          <button
            class="w-[50%] h-[48px] bg-primary-600 rounded-3xl text-white font-bold text-sm justify-center items-center px-[12px] py-[8px] hover:bg-primary-700"
            @click="upateSchedule(scheduleId)"
          >
            更新
          </button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
