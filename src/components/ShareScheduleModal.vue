<script setup>
import { defineProps, defineEmits, ref, watch, computed, onMounted } from 'vue'
import { LinkIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import ExitCoEditModal from './ExitCoEditModal.vue'
import axios from 'axios'
import '@/assets/loading.css'
import { useLoadingStore } from "@/stores/loading"
import { generateShareQRCode } from "@/utils/QRcode"

const loadingStore = useLoadingStore()
const API_URL = process.env.VITE_HOST_URL
const defaultProfilePicUrl = '/images/cat-2.png';
const shareSchedules = ref([]);
const hasShareSchedules = ref(false);
const token = localStorage.getItem("token");
const leavedId = ref(null);
const leavedUserId = ref(null)
const total_users = ref(1)
const shareMembers = ref([])
const creator = ref({
id: 3,
name: "PuzzleCat",
email: "PuzzleCat@gmail.com",
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
    document.querySelector("#modal_title").textContent = title 
    document.querySelector("#modal_message").textContent = message 
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
  emit("updateStatus", status)
}

const isCreator =  computed(()=>{
  return creator.value.id == localStorage.getItem("userId")
})

watch(props, ({ sharePeople }) => {
  loadingStore.showLoading()
  const { sharedUsers = [], schedule_id = 0, creator: newCreator = {}, totalUsers } = sharePeople || {};
  shareMembers.value = sharedUsers;
  leavedId.value = schedule_id;
  total_users.value = totalUsers;
  creator.value = {
    id: newCreator.id || creator.value.id,
    name: newCreator.name || creator.value.name,
    email: newCreator.email || creator.value.email,
    profile_pic_url: newCreator.profile_pic_url || defaultProfilePicUrl,
  };
  setTimeout(() => {
    loadingStore.hideLoading()
  }, 5000);
})

const qrcodeCanvas = ref(null); //綁定canvas
const qrCodeDataUrl = ref(""); //生成的 QR Code Base64 URL

// 生成並渲染 QR Code
const generateAndRenderQRCode = async (link) => {
  if (!link) {
    console.warn("無法生成 QR Code：分享連結為空");
    return;
  }

  try {
    const dataUrl = await generateShareQRCode(link);
    qrCodeDataUrl.value = dataUrl; 
    renderQRCodeOnCanvas(dataUrl);
  } catch (error) {
    console.error("生成 QR Code 出錯：", error);
  }
};

// 渲染 QR Code 到 Canvas
const renderQRCodeOnCanvas = (dataUrl) => {
  const canvas = qrcodeCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  image.src = dataUrl;
};

// 將 Base64 Data URL 轉換為 Blob
const dataURLToBlob = (dataURL) => 
  new Blob([Uint8Array.from(atob(dataURL.split(",")[1]), (c) => c.charCodeAt(0))], {
    type: dataURL.match(/:(.*?);/)[1],
  });


// 下載 QR Code 圖片
const downloadQRCode = () => {
  if (!qrCodeDataUrl.value) {
    alert("QR Code 尚未生成！");
    return;
  }
  const blob = dataURLToBlob(qrCodeDataUrl.value);
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = `一起參與【${creator.value.name}】的行程吧!_QRCode.png`; // 文件名稱
  link.click(); 
  URL.revokeObjectURL(blobUrl);L
};

// 監聽 shareLink 的變化
watch(() => props.shareLink, (newLink) => {
  generateAndRenderQRCode(newLink); // 當 shareLink 改變時自動生成 QR Code
}, { immediate: true });
</script>

<template>
  <LoadingOverlay :active="loadingStore.isLoading">
    <div class="loadingio-spinner-ellipsis-nq4q5u6dq7r"><div class="ldio-x2uulkbinbj">
    <div></div><div></div><div></div><div></div><div></div>
    </div></div>
  </LoadingOverlay>
  <dialog id="shareSchedule" class="modal">
    <div class="modal-box min-w-full md:min-w-[480px] bg-gray relative">
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
          class="w-full px-2 py-1 text-center text-white rounded-lg invite-toggle bg-primary-600"
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
        class="w-full px-5 pt-3 pb-6 bg-white invite-detail rounded-xl"
      >

        <div class="text-center">
          <!-- 邀請者視角 -->
          <div class="dropdown">

          </div>
          <!-- Qrcode -->
          <div class="flex flex-col items-center w-full bg-white rounded-xl">
            <canvas ref="qrcodeCanvas" class="block w-48 h-48"></canvas>
            <p class="mb-8 text-gray-400">手機掃描條碼，即可查看此行程</p>
          </div>
          <div class="flex flex-col w-full gap-3 md:flex-row">
            <button
              class="inline-flex justify-center w-full px-4 py-[11px] transition-all border rounded-full text-primary-600 border-primary-600 hover:bg-primary-100"
              @click="downloadQRCode"
            >
              <ArrowDownTrayIcon class="mr-1 size-6" />
              <span>下載 QR Code </span>
            </button>
            <button @click="copyShareLink"
            class="inline-flex justify-center w-full px-4 py-[11px] text-white border rounded-full bg-primary-600 border-primary-600 hover:bg-primary-700"
          >
            <span class="inline-block w-6 h-6 me-1"><LinkIcon /></span>
            <p class="text-sm">複製連結</p>
          </button>
          </div>
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
            class="flex gap-4 pb-3 mb-3 border-b-2 border-dashed border-slate-300"
            v-for="member in shareMembers" v-if="shareMembers != []"
          >
            <img
              class="w-12 rounded-full h-11"
              :src="member.profile_pic_url||`src/assets/images/cat-2.png`"
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
</style>
