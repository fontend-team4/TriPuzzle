<script setup>
import { ref, inject, onMounted, computed } from "vue"
import axios from "axios"
import { EllipsisHorizontalIcon } from "@heroicons/vue/16/solid"
import {
  XMarkIcon,
  UserPlusIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import ShareScheduleModal from "./ShareScheduleModal.vue";
import NewScheduleModal from "@/components/NewScheduleModal.vue";
import DeleteScheduleModal from "./DeleteScheduleModal.vue";
import LeaveScheduleModal from "./LeaveScheduleModal.vue";
import { LoginModalStore } from "@/stores/LoginModal.js";

const LoginStore = LoginModalStore();
const loadingForMineList = ref(false)
const loadingForShareList = ref(false)
const loadingForCopy = ref(false)
const listToggle = inject("listToggle");
const detailToggle = inject("detailToggle");
const API_URL = process.env.VITE_HOST_URL;
const isLogin = ref(false);
const token = localStorage.getItem("token");

const hasSchedules = ref(false);
const hasShareSchedules = ref(false);
const checkedSchedule = ref("mine");
const schedules = ref([]);
const shareSchedules = ref([]);
const deletedId = ref(null);
const leavedId = ref(null);
const shareLink = ref("");
const sharePeople = ref({});

const getSchedules = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  loadingForMineList.value = true
  try {
    const response = await axios.get(`${API_URL}/schedules`, config);
    if (response.data) {
      hasSchedules.value = true;
    }
    schedules.value = response.data;
    loadingForMineList.value = false
    schedules.value.forEach((item) => {
      item.start_date = item.start_date.split("T")[0];
      item.end_date = item.end_date.split("T")[0];
    });
  } catch (error) {
    loadingForMineList.value = false
    console.error(error.message);
    hasSchedules.value = false;
  }
};

const getShareSchedules = async () => {  
  const config = {
    headers: {
      Authorization: token,
    },
  };
  loadingForShareList.value = true
  try {
    const response = await axios.get(`${API_URL}/usersSchedules`, config);
    if (response.data.length > 0) {
      hasShareSchedules.value = true;
    }
    shareSchedules.value = response.data;
    loadingForShareList.value = false
    shareSchedules.value.forEach((item) => {
      item.start_date = item.start_date.split("T")[0];
      item.end_date = item.end_date.split("T")[0];
    });
  } catch (error) {
    loadingForShareList.value = false
    console.error(error.message);
    hasShareSchedules.value = false;
  }
};

const getShareSchedules = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  try {
    const response = await axios.get(`${API_URL}/usersSchedules`, config)
    if (response.data.length > 0) {
      hasShareSchedules.value = true
      console.log("共編", response.data)
    }
    shareSchedules.value = response.data
    shareSchedules.value.forEach((item) => {
      item.start_date = item.start_date.split("T")[0]
      item.end_date = item.end_date.split("T")[0]
      console.log(shareSchedules.value)
    })
  } catch (error) {
    console.error(error.message)
    hasShareSchedules.value = false
  }
}

// 搜尋該行程的所有使用者

const openDeleteModal = (id) => {
  deletedId.value = id;
};

const openLeaveModal = (id) => {
  leavedId.value = id;
};

// 行程分享、共編彈窗
const activeStatus = ref(null);
const openShareModal = () => {
  activeStatus.value = "share";
};

const shareLinkHandler = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.post(
      `${API_URL}/usersSchedules/share/${id}`,
      {},
      config
    );
    shareLink.value = response.data.shareUrl;
  } catch (err) {
    console.error(err.message);
  }

  try {
    const response = await axios.get(
      `${API_URL}/usersSchedules/${id}/users`,
      config
    );
    sharePeople.value = response.data;
  } catch (err) {
    console.error(err.message);
  }
};

const openInviteModal = () => {
  activeStatus.value = "invite";
};
const updateStatus = (status) => {
  activeStatus.value = status;
};

const login = () => {
  LoginStore.openModal();
  listToggle();
};

const listsort = ref("newest");
const sortedSchedules = computed(() => {
  return schedules.value.sort((a, b) => {
    if (listsort.value === "newest") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }
  });
});

const sortedShareSchedules = computed(() => {
  return shareSchedules.value.sort((a, b) => {
    if (listsort.value === "newest") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }
  });
});

const sortedShareSchedules = computed(() => {
  return shareSchedules.value.sort((a, b) => {
    if (listsort.value === "newest") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    } else {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    }
  })
})

// 複製行程
const scheduleName = ref("");
const scheduleNote = ref("");
const coverImage = ref("");
const startDate = ref("");
const endDate = ref("");
const transportationWay = ref("");
const scheduleDuplicate = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  loadingForCopy.value = true
  try {
    const response = await axios.get(`${API_URL}/schedules/${id}`, config);
    scheduleName.value = response.data.title;
    scheduleNote.value = response.data.schedule_note;
    coverImage.value = response.data.image_url;
    startDate.value = response.data.start_date.split("T")[0];
    endDate.value = response.data.end_date.split("T")[0];
    transportationWay.value = response.data.transportation_way;
    await copySchedule();
    loadingForCopy.value = false
  } catch (error) {
    console.error(error.message);
  }
};
const copySchedule = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const ScheduleData = {
    title: `${scheduleName.value} - 複製`,
    image_url: coverImage.value,
    schedule_note: scheduleNote.value,
    start_date: startDate.value,
    end_date: endDate.value,
    transportation_way: transportationWay.value,
  };
  try {
    await axios.post(`${API_URL}/schedules`, ScheduleData, config);
    await getSchedules();
  } catch (err) {
    console.error(err.message);
  }
};


onMounted(async () => {
  if (token) {
    isLogin.value = true;
    await getSchedules();
    await getShareSchedules();
  }
});
</script>

<template>
  <div class="overflow-x-hidden">
    <div
      class="relative w-full h-screen transition-all bg-white shadow-xl schedule-list lg:w-96"
    >
      <!-- schedule list -->
      <div class="w-screen p-5 bg-white lg:w-full">
        <!-- header -->
        <div class="relative pb-3 bg-white">
          <div
            class="bg-gray-200 w-8 h-8 rounded-full absolute top-0 right-0 p-1.5 hover:cursor-pointer"
            @click="listToggle"
          >
            <XMarkIcon />
          </div>
          <h2 class="text-2xl font-medium pt-10 pb-2.5">行程</h2>
          <div class="flex w-full h-10 gap-1 p-1 mb-5 rounded-xl bg-gray">
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
              class="w-1/2 px-2 py-1 text-center rounded-lg mine-toggle hover:bg-white hover:cursor-pointer"
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
              class="w-1/2 px-2 py-1 text-center rounded-lg coedit-toggle hover:bg-white hover:cursor-pointer"
              >與我共編</label
            >
          </div>
          <select
            class="max-w-xs select select-ghost focus:border-0 focus:outline-none"
            v-model="listsort"
            v-if="isLogin && hasSchedules"
          >
            <option selected value="newest">建立時間（從近到遠）</option>
            <option value="oldest">建立時間（從遠到近）</option>
          </select>
        </div>
        <!-- schedules list 行程列表 -->
        <div class="h-[70vh] overflow-y-scroll pb-12">
          <!-- 已登入 -->
          <div v-if="isLogin">
            <!-- 我的 -->
            <div v-if="checkedSchedule === 'mine'">
              <!-- 載入中 -->
              <div v-if="loadingForMineList" class="w-full text-center h-52 mt-7">
                <img
                  class="w-[180px] mx-auto"
                  src="../assets/images/cat-7.png"
                  alt=""
                />
                <div class="flex justify-center mb-6">
                  <p class="mr-2">行程載入中
                  </p>
                  <span class="loading loading-dots loading-md"></span>
                </div>
              </div>
              <!-- 有行程 -->
              <div
                v-else-if="!loadingForMineList && hasSchedules"
                class="flex flex-wrap justify-center gap-4"
              >
                <!-- 行程卡片 -->
                <div
                  v-for="item in sortedSchedules"
                  :key="item.id"
                  class="card card-compact bg-base-100 sm:w-full md:w-[30%] lg:w-full h-[176px] lg:h-auto border-gray border mb-4 relative hover:cursor-pointer"
                >
                  <figure
                    @click="detailToggle(item.id),newClickHandler(item.id)"
                    class="w-full h-[150px] overflow-hidden"
                  >
                    <img
                      :src="item.image_url"
                      alt="scheduleCoverImage"
                      class="object-cover"
                    />
                  </figure>
                  <!-- 行程右上設定 icon -->
                  <div class="absolute flex gap-2 top-3 right-3">
                    <div class="dropdown">
                      <button
                        role="button"
                        class="relative w-6 h-6 p-1 text-white rounded-full bg-gray-transparent"
                      >
                        <EllipsisHorizontalIcon />
                      </button>
                      <!-- dropdown-content 控制開關-->
                      <ul
                        tabindex="0"
                        class="absolute right-0 w-32 bg-white border rounded dropdown-content border-gray top-10"
                      >
                        <li v-if="!loadingForCopy"
                        @click="scheduleDuplicate(item.id)">
                          <a
                            class="flex items-center gap-1 px-5 py-2 text-sm hover:bg-gray"
                            href="#"
                          >
                            <span class="inline-block w-6 h-6"
                              ><DocumentDuplicateIcon
                            /></span>
                            <p>複製行程</p>
                          </a>
                        </li>
                        <li v-else>
                          <a
                            class="flex items-center gap-1 px-5 py-2 text-sm hover:bg-gray"
                            href="#"
                          >
                            <span class="inline-block w-6 h-6 mr-5"
                              ><DocumentDuplicateIcon
                            /></span>
                            <span class="loading loading-dots loading-md"></span>
                          </a>
                        </li>
                        <li
                          onclick="shareSchedule.showModal()"
                          @click="
                            openInviteModal();
                            shareLinkHandler(item.id);
                          "
                        >

                          <a
                            class="flex items-center gap-1 px-5 py-2 text-sm hover:bg-gray"
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
                            class="flex items-center gap-1 px-5 py-2 text-sm hover:bg-gray"
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
                    class="flex flex-row items-center justify-between px-0 py-3"
                  >
                    <div
                      class="w-4/5 px-5 border-r-2 border-dotted border-gray"
                    >
                      <h2 class="text-lg truncate">{{ item.title }}</h2>
                      <p class="text-xs text-slate-500">
                        {{ item.start_date }} ~ {{ item.end_date }}
                      </p>
                    </div>
                    <button
                      class="w-16 text-center hover:cursor-pointer"
                      onclick="shareSchedule.showModal()"
                      @click="
                        openInviteModal();
                        shareLinkHandler(item.id);
                      "
                    >
                      <p class="w-6 h-6 mx-auto"><UserPlusIcon /></p>
                      <p class="text-xs">{{ item.total_users }}人</p>
                    </button>
                  </div>
                </div>
              </div>
              <!-- 無行程 -->
              <div v-else class="w-full text-center h-52 mt-7">
                <img
                  class="w-[180px] mx-auto mb-2 p-2"
                  src="../assets/images/cat-6.png"
                  alt=""
                />
                <p class="mb-6">還沒有安排新行程哦</p>
              </div>
            </div>
            <!-- 共編 -->
            <div v-else>
              <!-- 載入中 -->
              <div v-if="loadingForShareList" class="w-full text-center h-52 mt-7">
                <img
                  class="w-[180px] mx-auto"
                  src="../assets/images/cat-7.png"
                  alt=""
                />
                <div class="flex justify-center mb-6">
                  <p class="mr-2">行程載入中
                  </p>
                  <span class="loading loading-dots loading-md"></span>
                </div>
              </div>
              <!-- 有行程 -->
              <div
                v-else-if="!loadingForShareList && hasShareSchedules"
                class="flex flex-wrap justify-center gap-4"
              >
                <!-- 行程卡片 -->
                <div
                  v-for="item in sortedShareSchedules"
                  :key="item.id"
                  class="card card-compact bg-base-100 sm:w-full md:w-[30%] lg:w-full h-[176px] lg:h-auto border-gray border mb-4 relative hover:cursor-pointer"
                >
                  <figure
                    @click="detailToggle(item.id)"
                    class="w-full h-[150px] overflow-hidden"
                  >
                    <img
                      :src="item.image_url"
                      alt="scheduleCoverImage"
                      class="object-cover"
                    />
                  </figure>
                  <!-- 行程右上設定 icon -->
                  <div class="absolute flex gap-2 top-3 right-3">
                    <div class="dropdown">
                      <button
                        role="button"
                        class="relative w-6 h-6 p-1 text-white rounded-full bg-gray-transparent"
                      >
                        <EllipsisHorizontalIcon />
                      </button>
                      <!-- dropdown-content 控制開關-->
                      <ul
                        tabindex="0"
                        class="absolute right-0 w-32 bg-white border rounded dropdown-content border-gray top-10"
                      >
                        <li
                          class="border-t border-gray"
                          @click="openLeaveModal(item.id)"
                          onclick="leaveSchedule.showModal()"
                        >
                          <a
                            class="flex items-center gap-1 px-5 py-2 text-sm hover:bg-gray"
                            href="#"
                          >
                            <span class="inline-block w-6 h-6"
                              ><TrashIcon
                            /></span>
                            <p>退出共編</p>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- 行程資訊 -->
                  <div
                    class="flex flex-row items-center justify-between px-0 py-3"
                  >
                    <div
                      class="w-4/5 px-5 border-r-2 border-dotted border-gray"
                    >
                      <h2 class="text-lg truncate">{{ item.title }}</h2>
                      <p class="text-xs text-slate-500">
                        {{ item.start_date }} ~ {{ item.end_date }}
                      </p>
                    </div>
                    <button
                      class="w-16 text-center hover:cursor-pointer"
                      onclick="shareSchedule.showModal()"
                      @click="
                        openInviteModal();
                        shareLinkHandler(item.id);
                      "
                    >
                      <p class="w-6 h-6 mx-auto"><UserPlusIcon /></p>
                      <p class="text-xs">{{ item.total_users }}人</p>
                    </button>
                  </div>
                </div>
              </div>
              <!-- 無行程 -->
              <div v-else class="w-full text-center h-52 mt-7">
                <img
                  class="w-[200px] mx-auto"
                  src="../assets/images/cat-3.png"
                  alt=""
                />
                <p class="mb-6">
                  還沒有 <span class="text-primary-600">與我共編</span> 的行程哦
                </p>
              </div>
            </div>
          </div>
          <!-- 未登入 -->
          <div v-else>
            <!-- 我的 -->
            <div
              v-if="checkedSchedule === 'mine'"
              class="w-full text-center h-52 mt-7"
            >
              <img
                class="w-[180px] h-[90] mx-auto"
                src="../assets/images/cat-8.png"
                alt=""
              />
              <p class="mb-6">
                嗨，新朋友！
                <br />
                登入就能開始規劃你的專屬行程囉
              </p>
            </div>
            <!-- 共編 -->
            <div v-else class="w-full text-center h-52 mt-7">
              <img
                class="w-[180px] h-[90] mx-auto"
                src="../assets/images/cat-8.png"
                alt=""
              />
              <p class="mb-6">
                嗨，新朋友！
                <br />
                登入就能查看共編行程囉
              </p>
            </div>
          </div>
        </div>
        <!-- add schedule btn 建立新行程按鈕 -->
        <!-- 已登入 -->
        <div v-if="isLogin">
          <div
            v-show="checkedSchedule === 'mine'"
            class="w-full lg:w-96 h-20 px-2.5 py-5 bg-white border-gray border-t absolute bottom-0 left-0"
          >
            <button
              class="w-full h-12 px-5 py-3 text-base text-center text-white bg-primary-600 rounded-3xl hover:bg-primary-700"
              onclick="newSchedule.showModal()"
            >
              建立新行程
            </button>
          </div>
        </div>
        <!-- 未登入 -->
        <div v-else>
          <div
            v-if="checkedSchedule === 'mine'"
            class="w-full lg:w-96 h-38 px-2.5 py-5 bg-white border-t border-gray fixed bottom-0 right-0"
          >
            <button
              class="w-full h-12 px-5 py-3 text-center text-white bg-primary-600 hover:bg-primary-700 rounded-3xl"
              @click="login"
            >
              登入 / 註冊，建立新行程
            </button>
          </div>
          <div
            v-else
            class="w-full lg:w-96 h-38 px-2.5 py-5 bg-white border-t border-gray fixed bottom-0 right-0"
          >
            <button
              class="w-full h-12 px-5 py-3 text-center text-white bg-primary-600 hover:bg-primary-700 rounded-3xl"
              @click="login"
            >
              登入 / 註冊
            </button>
          </div>
        </div>
      </div>
    </div>


    <ShareScheduleModal
      :activeTab="activeStatus"
      :shareLink="shareLink"
      :sharePeople="sharePeople"
      @updateStatus="updateStatus"
      @scheduleUpdate="getSchedules"
    />

    <DeleteScheduleModal :toBeDeleteId="deletedId" :updateList="getSchedules" />
    <LeaveScheduleModal :toBeLeavedId="leavedId" :updateList="getShareSchedules" />
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
