<script setup>
import { ref, inject, onMounted, computed } from 'vue'
import axios from 'axios'
import {
  ChevronDownIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/vue/16/solid'
import {
  XMarkIcon,
  UserPlusIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  BriefcaseIcon,
  GlobeAsiaAustraliaIcon,
} from '@heroicons/vue/24/outline'
import ShareScheduleModal from './ShareScheduleModal.vue'
import NewScheduleModal from '@/components/NewScheduleModal.vue'
import DeleteScheduleModal from './DeleteScheduleModal.vue'
const listToggle = inject('listToggle')
const detailToggle = inject('detailToggle')
const API_URL = 'http://localhost:3000'
// 抓取 user login token
const isLogin = ref(false)
const token = ref(null)
const getUserToken = async () => {
  try {
    const config = {
      email: 'user@gmail.com',
      password: '12345678',
    }
    const response = await axios.post(`${API_URL}/users/login`, config)
    token.value = response.data.token
    localStorage.setItem('token', token.value)
    if (token.value) {
      isLogin.value = true
    }
  } catch (error) {
    console.error(error.message)
  }
}
// 讀取行程資料
const hasSchedules = ref(false)
const checkedSchedule = ref('mine')
const schedules = ref([])
const createdAt = ref('')
const deletedId = ref(null)
const getSchedules = async () => {
  const config = {
    headers: {
      Authorization: token.value,
    },
  }
  try {
    const response = await axios.get(`${API_URL}/schedules`, config)
    if (response.data) {
      hasSchedules.value = true
    }
    schedules.value = response.data
    schedules.value.forEach((item) => {
      item.start_date = item.start_date.split('T')[0]
      item.end_date = item.end_date.split('T')[0]
    })
  } catch (error) {
    console.error(error.message)
    hasSchedules.value = false
  }
}
// 刪除彈窗
const openDeleteModal = (id) => {
  deletedId.value = id
}
// 行程分享、共編彈窗
const activeStatus = ref(null)
const openShareModal = () => {
  activeStatus.value = 'share'
}
const openInviteModal = () => {
  activeStatus.value = 'invite'
}
// 行程列表篩選
const listsort = ref('newest')
const sortedSchedules = computed(() => {
  return schedules.value.sort((a, b) => {
    if (listsort.value === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    } else {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    }
  })
})
onMounted(async () => {
  await getUserToken()
  await getSchedules()
})
</script>

<template>
  <div class="overflow-x-hidden">
    <div
      class="schedule-list w-full lg:w-96 h-screen bg-white shadow-xl transition-all relative"
    >
      <!-- schedule list -->
      <div class="w-screen lg:w-full p-5 bg-white">
        <!-- header -->
        <div class="pb-3 relative bg-white">
          <div
            class="bg-gray-200 w-8 h-8 rounded-full absolute top-0 right-0 p-1.5 hover:cursor-pointer"
            @click="listToggle"
          >
            <XMarkIcon />
          </div>
          <h2 class="text-2xl font-medium pt-10 pb-2.5">行程</h2>
          <div class="w-full h-10 flex gap-1 mb-5 p-1 rounded-xl bg-gray">
            <input
              id="mine"
              type="radio"
              name="toggle"
              v-model="checkedSchedule"
              value="mine"
              class="hidden"
              checked
            />
            <label
              for="mine"
              class="mine-toggle w-1/2 text-center py-1 px-2 rounded-lg hover:bg-white hover:cursor-pointer"
              >我的行程</label
            >
            <input
              id="coedit"
              type="radio"
              name="toggle"
              v-model="checkedSchedule"
              value="coedit"
              class="hidden"
            />
            <label
              for="coedit"
              class="coedit-toggle w-1/2 text-center py-1 px-2 rounded-lg hover:bg-white hover:cursor-pointer"
              >與我共編</label
            >
          </div>
          <select
            class="select select-ghost max-w-xs focus:border-0 focus:outline-none"
            v-model="listsort"
          >
            <option selected value="newest">建立時間（從近到遠）</option>
            <option value="oldest">建立時間（從遠到近）</option>
          </select>

          <!-- <details class="dropdown">
            <summary
              tabindex="0"
              role="button"
              class="flex items-center relative"
            >
              <p class="text-sm font-medium">建立時間（從近到遠）</p>
              <p class="w-4 h-4"><ChevronDownIcon /></p>
            </summary>
            <ul
              tabindex="0"
              class="dropdown-content menu bg-white rounded-sm z-[1] w-44 p-0 border border-gray absolute top-8 left-0"
            >
              <li>
                <a
                  class="rounded-none"
                  href=""
                  @click.prevent="schedules = schedules.slice().reverse()"
                >
                  建立時間（從近到遠）</a
                >
              </li>
              <li>
                <a
                  class="rounded-none"
                  href=""
                  @click.prevent="schedules = schedules.slice().reverse()"
                >
                  建立時間（從遠到近）</a
                >
              </li>
            </ul>
          </details> -->
        </div>
        <!-- schedules list 行程列表 -->
        <div class="h-[70vh] overflow-y-scroll pb-12">
          <!-- 我的行程 -->
          <div v-if="checkedSchedule === 'mine'">
            <!-- v-if 有行程  -->
            <div
              v-if="hasSchedules"
              class="flex flex-wrap gap-4 justify-center"
            >
              <div
                v-for="item in sortedSchedules"
                :key="item.id"
                class="card card-compact bg-base-100 sm:w-full md:w-[30%] lg:w-full h-[176px] lg:h-auto border-gray border mb-4 relative hover:cursor-pointer"
              >
                <figure @click="detailToggle">
                  <img :src="item.image_url" alt="scheduleCoverImage" />
                </figure>
                <!-- 行程右上設定 icon -->
                <div class="flex gap-2 absolute top-3 right-3">
                  <span
                    class="w-6 h-6 rounded-full bg-gray-transparent text-white p-1 hover:cursor-pointer"
                    onclick="shareSchedule.showModal()"
                    @click="openShareModal"
                  >
                    <ShareIcon />
                  </span>
                  <div class="dropdown">
                    <button
                      role="button"
                      class="w-6 h-6 rounded-full bg-gray-transparent text-white p-1 relative"
                    >
                      <EllipsisHorizontalIcon />
                    </button>
                    <!-- dropdown-content 控制開關-->
                    <ul
                      tabindex="0"
                      class="dropdown-content w-32 bg-white rounded border border-gray absolute right-0 top-10"
                    >
                      <li>
                        <a
                          class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray"
                          href="#"
                        >
                          <span class="inline-block w-6 h-6"
                            ><DocumentDuplicateIcon
                          /></span>
                          <p>複製行程</p>
                        </a>
                      </li>
                      <li
                        onclick="shareSchedule.showModal()"
                        @click="openInviteModal"
                      >
                        <a
                          class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray"
                          href="#"
                        >
                          <span class="inline-block w-6 h-6"
                            ><UserPlusIcon
                          /></span>
                          <p>邀請共編</p>
                        </a>
                      </li>
                      <li
                        class="border-t border-gray"
                        @click="openDeleteModal(item.id)"
                        onclick="deleteSchedule.showModal()"
                      >
                        <a
                          class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-gray"
                          href="#"
                        >
                          <span class="inline-block w-6 h-6"
                            ><TrashIcon
                          /></span>
                          <p>刪除行程</p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- 行程資訊 -->
                <div
                  class="flex flex-row justify-between items-center px-0 py-3"
                >
                  <div class="w-4/5 px-5 border-dotted border-r-2 border-gray">
                    <h2 class="text-lg truncate">{{ item.title }}</h2>
                    <p class="text-xs text-slate-500">
                      {{ item.start_date }} ~ {{ item.end_date }}
                    </p>
                  </div>
                  <div
                    class="w-16 text-center hover:cursor-pointer"
                    onclick="shareSchedule.showModal()"
                    @click="openInviteModal"
                  >
                    <p class="w-6 h-6 mx-auto"><UserPlusIcon /></p>
                    <p class="text-xs">2人</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- v-else 尚無行程  -->
            <div v-else class="w-full h-52 text-center mt-7">
              <img
                class="w-[180px] h-[90] mx-auto"
                src="https://web.chictrip.com.tw/assets/monster_empty.3a44f172.png"
                alt=""
              />
              <p class="mb-6">還沒有安排新行程哦</p>
              <button
                class="font-medium text-white bg-primary-600 hover:bg-primary-700 w-44 rounded-3xl px-5 py-3"
                onclick="NewSchedule.showModal()"
              >
                建立新行程
              </button>
            </div>
          </div>
          <!-- 與我共編 -->
          <div v-else>
            <!--已登入  -->
            <div class="h-52 text-center mt-7">
              <img
                class="w-[180px] h-[103px] mx-auto"
                src="https://web.chictrip.com.tw/assets/master-unlock.990b2501.png"
                alt=""
              />
              <p class="mb-6">
                還沒有 <span class="text-primary-600">與我共編</span> 的行程哦
              </p>
              <!-- 未登入  -->
              <div
                v-if="!isLogin"
                class="w-full lg:w-96 h-38 px-2.5 py-5 bg-white border-t border-gray fixed bottom-0 right-0"
              >
                <p class="mb-3 text-center font-medium">
                  嗨，新朋友！
                  <br />
                  登入就能查看共編行程囉
                </p>
                <button
                  class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl"
                >
                  登入 / 註冊
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- add schedule btn 建立新行程按鈕 -->
        <!-- 已登入 -->
        <div
          class="w-full lg:w-96 h-20 px-2.5 py-5 bg-white border-gray border-t absolute bottom-0 left-0"
          v-if="isLogin === true"
        >
          <button
            class="w-full h-12 px-5 py-3 bg-primary-600 text-white text-center text-base rounded-3xl hover:bg-primary-700"
            onclick="NewSchedule.showModal()"
          >
            建立新行程
          </button>
        </div>
        <!-- 未登入 -->
        <div
          class="w-full lg:w-96 h-38 px-2.5 py-5 bg-white border-t border-gray fixed bottom-0 right-0"
          v-else
        >
          <p class="mb-3 text-center font-medium">
            嗨，新朋友！
            <br />
            登入就能開始規劃你的專屬行程囉
          </p>
          <button
            class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl"
          >
            登入 / 註冊，建立新行程
          </button>
        </div>
      </div>
    </div>
    <ShareScheduleModal :activeTab="activeStatus" />
    <DeleteScheduleModal :toBeDeleteId="deletedId" :updateList="getSchedules" />
    <NewScheduleModal :savetoSchedules="getSchedules" />
  </div>
</template>

<style>
.bg-gray-transparent {
  background-color: #2d4057cc;
}
.schedule:hover > p {
  display: block;
}
#schedule-list-toggle:checked ~ .schedule-list {
  transform: translateX(0);
  /* 關閉按鈕做好之後就可以打開 */
  /* .schedule{
    display: none;
  } */
}
.card > figure > img {
  transform: scale(1);
  transition: all 1s;
}
.card:hover > figure > img {
  transform: scale(1.25);
  transition: all 1s;
}
#mine:checked ~ .mine-toggle {
  background-color: #fff;
}
#coedit:checked ~ .coedit-toggle {
  background-color: #fff;
}
</style>