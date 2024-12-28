<script setup>
import { defineProps, defineEmits, ref, watch, computed } from 'vue'
import { LinkIcon } from '@heroicons/vue/24/outline'
import ScheduleSummaryModal from './ScheduleSummaryModal.vue'
import ExportScheduleModal from './ExportScheduleModal.vue'
import ExitCoEditModal from './ExitCoEditModal.vue'
import axios from 'axios'

const API_URL = process.env.VITE_HOST_URL
const defaultProfilePicUrl = "https://web.chictrip.com.tw/assets/waterview_default.f746ada9.svg";
const shareSchedules = ref([]);
const hasShareSchedules = ref(false);
const token = localStorage.getItem("token");
const leavedId = ref(null);
const leavedUserId = ref(null)
const total_users = ref(1)
const shareMembers = ref([])
const creator = ref({
id: 3,
name: "aaa",
email: "aaa@aaa.com",
profile_pic_url: defaultProfilePicUrl
})
const props = defineProps({
  activeTab: {
    type: String,
    required: true,
  },
  shareLink: {
    type: String,
    required: false, 
  },
  sharePeople: {
    type: Object,
    required: false, 
  }
})
const emit = defineEmits(['updateStatus'])

function showMessage({ title = "訊息", message, status }) {
  const typeClasses = {
    success: "bg-green-500 hover:bg-green-700",
    error: "bg-primary-600 hover:bg-primary-700",
  }
  const buttonClass = typeClasses[status]
  if (document.querySelector("#custom_modal")) {
    document.querySelector("#modal_title").textContent = title // 更新標題
    document.querySelector("#modal_message").textContent = message // 更新訊息
    document
      .querySelector("#modal_button")
      .classList.remove(
        "bg-green-500",
        "hover:bg-green-700",
        "bg-primary-600",
        "hover:bg-primary-700"
      )
    document
      .querySelector("#modal_button")
      .classList.add(...buttonClass.split(" ")) // 更新class
    document.querySelector("#custom_modal").showModal() // 顯示 Modal
    setTimeout(() => document.querySelector("#custom_modal").showModal() , 1000)
    return
  }

  const modalHTML = `
    <dialog id="custom_modal" class="modal">
      <div class="modal-box text-center w-[450px] h-[250px]">
        <h3 id="modal_title" class="mb-4 text-xl font-bold">${title}</h3>
        <p id="modal_message" class="py-4">${message}</p>
        <div class="justify-center modal-action">
          <button id="modal_button" class="btn ${buttonClass} w-[80%] text-white py-3 rounded-full font-medium  mt-4" onclick="document.querySelector('#custom_modal').close()">確定</button>
        </div>
      </div>
    </dialog>
  `
  // 動態插入 Modal 到 body
  document.body.insertAdjacentHTML("beforeend", modalHTML)

  // 顯示 Modal
  document.querySelector("#custom_modal").showModal()
}


const scheduleUpdate = async()=>{
  emit('scheduleUpdate');
  const config = {
    headers: {
      Authorization: token,
    },
  };

  // 更新shareMembers
  try {
    const response = await axios.get(
      `${API_URL}/usersSchedules/${leavedId.value}/users`,
      config
    );
    shareMembers.value = response.data.sharedUsers;
  } catch (err) {
    console.error(err.message);
  }
}

const getShareSchedules = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios.get(`${API_URL}/usersSchedules`, config);
    if (response.data.length > 0) {
      hasShareSchedules.value = true;
    }
    shareSchedules.value = response.data;
    shareSchedules.value.forEach((item) => {
      item.start_date = item.start_date.split("T")[0];
      item.end_date = item.end_date.split("T")[0];
    });
  } catch (error) {
    console.error(error.message);
    hasShareSchedules.value = false;
  }
};


const openExitModal = (scheduleId, userId) => {
  leavedUserId.value = userId; 
};

const copyShareLink = async () => {
  try {
    if (!props.shareLink) {
      console.log('複製失敗');
      return;
    }
    await navigator.clipboard.writeText(props.shareLink);
    showMessage({
        title: "提示",
        message: "複製成功",
        status: "success",
      });
      
  } catch (err) {
    console.error('複製失敗', err);
  }
};




const updateActiveTab = (status) => {
  emit('updateStatus', status)
}


const isCreator =  computed(()=>{
  return creator.value.id == localStorage.getItem("userId")
})

watch(props, ({ sharePeople }) => {
  const { sharedUsers = [], schedule_id = 0, creator: newCreator = {}, totalUsers } = sharePeople || {};
  shareMembers.value = sharedUsers;
  leavedId.value = schedule_id;
  total_users.value = totalUsers;

 
  creator.value = {
    ...creator.value,
    ...newCreator     
  };
});




</script>

<template>
  <dialog id="shareSchedule" class="modal">
    <div class="modal-box min-w-full md:min-w-[480px] bg-gray">
      <form method="dialog">
        <div class="w-full h-10">
          <button
            class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
          >
            ✕
          </button>
        </div>
      </form>
      <!--invite toggle -->
      <div class="flex w-full h-10 gap-1 p-1 mb-5 bg-white rounded-xl">
        <input
          id="invite"
          type="radio"
          name="tab"
          :checked="activeTab === 'invite'"
          @change="updateActiveTab('invite')"
          class="hidden"
        />
        <label
          for="invite"
          class="w-full px-2 py-1 text-center rounded-lg invite-toggle hover:bg-primary-600 hover:text-white hover:cursor-pointer"
          >邀請共編</label
        >
      </div>
      <!-- share detail -->
      <div
        v-if="props.activeTab === 'share'"
        class="w-full px-5 pt-10 pb-6 bg-white share-detail rounded-xl"
      >
        <div>
        </div>
      </div>
      <!-- invite detail -->
      <div
        v-else
        class="w-full px-5 pt-10 pb-6 bg-white invite-detail rounded-xl"
      >
        <div class="text-center">
          <!-- 邀請者視角 -->
          <div class="dropdown">

          </div>
          <!-- Qrcode -->
          <img
            class="w-40 h-40 mx-auto mb-4"
            src="../assets/qrcode.svg"
            alt=""
          />
          <p class="mb-8 text-gray-400">手機掃描條碼，即可查看此行程</p>
          <button @click="copyShareLink"
            class="flex items-center justify-center w-full px-4 py-2 border rounded-full text-primary-600 border-primary-600" 
          >
            <span class="inline-block w-6 h-6 me-1"><LinkIcon /></span>
            <p class="text-sm">複製連結</p>
          </button>
        </div>
      </div>
      <!-- 共編成員 -->
      <div class="py-6" v-if="props.activeTab !== 'share'">
        <p class="mb-4 text-sm font-medium">成員({{ total_users }})</p>
        <ul>
          <li
            class="flex gap-4 pb-3 mb-3 border-b-2 border-dashed border-slate-300"
          >
            <div class="overflow-hidden rounded-full w-11 h-11">
              <img
                class="w-11 h-11"
                :src="creator.profile_pic_url"
                alt=""
              />
            </div>
            <div>
              <div class="flex items-center mb-2">
                <span
                  class="inline-block px-2 me-1 text-orange-400 bg-orange-200 rounded-md text-[14px]"
                  >主揪</span
                >
                
                <p>{{ creator.name }}</p>
              </div>
              <p class="text-gray-400">{{ creator.email }}</p>
            </div>
          </li>
          <li
            class="flex gap-4 pb-3 mb-3 border-b-2 border-dashed border-slate-300 tooltip tooltip-bottom"
            data-tip="2024/11/18 加入行程" v-for="member in shareMembers" v-if="shareMembers != []"
          >
            <img
              class="rounded-full w-11 h-11"
              :src="member.profile_pic_url||'https://web.chictrip.com.tw/assets/waterview_default.f746ada9.svg'"
              alt=""
            />
            <div class="flex items-center justify-between w-full">
              <div class="flex flex-col items-start">
                <p class="mb-2">{{ member.name }}</p>
                <p class="text-gray-400">{{ member.email }}</p>
              </div>
              <div class="dropdown dropdown-top dropdown-end">
                <button v-if="isCreator"
                  tabindex="0"
                  role="button"
                  class="py-2 text-slate-400 hover:cursor-pointer" onclick="exitToggle.showModal()" @click="openExitModal(leavedId, member.id)" 
                >
                  退出共編
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <ExitCoEditModal
  :toBeLeavedId="leavedId"
  :toBeLeavedUserId="leavedUserId"
  :updateList="getShareSchedules"
  @scheduleUpdate="scheduleUpdate"
/>
    <form method="dialog" class="modal-backdrop">
      <button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
        ✕
      </button>
      <button>close</button>
    </form>
  </dialog>
</template>

<style scoped>
.tooltip:before {
  font-size: 12px;
}
#share:checked ~ .share-toggle {
  background-color: #d23430;
  color: #fff;
}
#invite:checked ~ .invite-toggle {
  background-color: #d23430;
  color: #fff;
}
</style>
