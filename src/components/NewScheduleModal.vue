<script setup>
import axios from 'axios'
import ScheduleCoverImgModal from './ScheduleCoverImgModal.vue'
import defaultCoverImage from '../assets/images/coverimage-1.jpg'
import { ref, onMounted, defineProps } from 'vue'
import {
  XMarkIcon,
  ArrowLongRightIcon,
  PencilIcon,
  ArrowUpTrayIcon,
} from '@heroicons/vue/24/solid'
import { CalendarCheck } from '@iconoir/vue'

const transprotations = ref([
  {
    id: 1,
    item: '汽車',
    value: 'CAR',
  },
  {
    id: 2,
    item: '機車',
    value: 'MOTORBIKE',
  },
  {
    id: 3,
    item: '大眾運輸',
    value: 'PUBLIC_TRANSPORT',
  },
  {
    id: 4,
    item: '走路',
    value: 'WALK',
  },
])

const replaceImgLabelClick = () => {
  // 點擊收回下拉式選單(再點擊一次)
  document.getElementById('dropdown-toggle').click()
}

//點選選擇交通方式紅框
const isChecked = ref(false)
const transportationLabelClick = () => {
  const checkbox = document.getElementById('toggle-transportation')
  if (checkbox) {
    checkbox.checked = !checkbox.checked // 切換 checked 狀態
    isChecked.value = checkbox.checked // 更新 Vue 狀態
  }
}

const closeDropdown = () => {
  isChecked.value = false // 收起選單
}

const API_URL = import.meta.env.VITE_HOST_URL
const coverImage = ref(null)
const ScheduleName = ref('')
const startDate = ref('')
const endDate = ref('')
const transportationWay = ref('CUSTOM')

const props = defineProps({
  savetoSchedules: {
    type: Function,
    required: true,
  },
})

// 封面照片
const getCoverImg = (img) => {
  coverImage.value = img
}

const uploadedImg = ref(null)
const uploadImg = (event) => {
  document.getElementById('dropdown-toggle').click()

  const file = event.target.files[0]
  uploadedImg.value = URL.createObjectURL(file)
  coverImage.value = uploadedImg.value
}

const addSuccess = ref(null)
// 建立行程
const token = localStorage.getItem('token')
const addSchedule = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const ScheduleData = {
    title: ScheduleName.value,
    create_by: null,
    co_edit_url: null,
    co_edit_qrcode: null,
    schedule_note: null,
    image_url: coverImage.value,
    start_date: startDate.value,
    end_date: endDate.value,
    transportation_way: transportationWay.value,
  }
  try {
    const response = await axios.post(
      `${API_URL}/schedules`,
      ScheduleData,
      config
    )
    console.log(response.data)
    addSuccess.value.showModal()
    setTimeout(() => {
      addSuccess.value.close()
    }, 1000)
    props.savetoSchedules()
  } catch (err) {
    console.error(err.message)
    alert('行程建立失敗')
  }
  // 清空欄位資料
  coverImage.value = defaultCoverImage
  ScheduleName.value = ''
  startDate.value = ''
  endDate.value = ''
  transportationWay.value = 'CUSTOM'
}

onMounted(() => {
  coverImage.value = defaultCoverImage
})
</script>

<template>
  <dialog id="NewSchedule" class="modal">
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
            >行程設定</span
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
          <input type="checkbox" id="dropdown-toggle" class="hidden peer" />

          <!-- 使用 Label 包裹按鈕 -->
          <label
            for="dropdown-toggle"
            class="w-[82px] h-[32px] absolute right-[20px] bottom-[16px] z-10 flex items-center justify-center gap-2 border-[1px] border-white rounded-3xl py-[4px] px-[12px] cursor-pointer"
          >
            <PencilIcon class="size-5 font-bold text-white" />
            <p class="font-bold text-sm text-white">更換</p>
          </label>

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
              @change="uploadImg"
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

          <div class="relative w-full h-auto rounded-xl overflow-hidden">
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
            v-model="ScheduleName"
            class="border-solid border border-[#EEEEEE] rounded-lg w-[100%] h-[40px] py-2 px-5"
          />
        </div>

        <!-- 行程日期 -->
        <div class="w-[100%]">
          <div>
            <p class="mb-2 font-bold">行程日期</p>
          </div>
          <div class="flex flex-erap gap-[20px] justify-between items-center">
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
            @click="addSchedule"
          >
            完成
          </button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <!-- add schedule success 的 Modal -->
  <dialog ref="addSuccess" class="modal w-[384px] mx-auto">
    <div class="modal-box">
      <form method="dialog"></form>
      <CalendarCheck class="mx-auto w-14 h-14 text-primary-600 mb-3" />
      <h3 class="text-xl font-bold text-center">行程建立成功！</h3>
    </div>
  </dialog>
</template>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* 圖標旋轉 */
#toggle-transportation:checked + label svg {
  transform: rotate(180deg);
}

.transportation-area li:hover,
.replace-img-btn li:hover {
  background-color: #eeeeee;
}
input {
  border: 2px solid transparent;
  border-radius: 4px;
  outline: none;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

input:focus {
  border-color: #d23430;
  box-shadow: 0 0 4px rgba(210, 52, 48, 0.5),
    /* 內層的陰影 */ 0 0 8px rgba(210, 52, 48, 0.3),
    /* 中間的陰影 */ 0 0 16px rgba(210, 52, 48, 0.1); /* 外層的陰影 */
}

.red-frame {
  border-color: #d23430;
  box-shadow: 0 0 4px rgba(210, 52, 48, 0.5),
    /* 內層的陰影 */ 0 0 8px rgba(210, 52, 48, 0.3),
    /* 中間的陰影 */ 0 0 16px rgba(210, 52, 48, 0.1); /* 外層的陰影 */
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}
</style>
