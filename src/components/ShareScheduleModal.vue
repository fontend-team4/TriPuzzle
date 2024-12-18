<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { LinkIcon, ShareIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import ScheduleSummaryModal from './ScheduleSummaryModal.vue'
import ExportScheduleModal from './ExportScheduleModal.vue'
import ExitCoEditModal from './ExitCoEditModal.vue'

// const activeTab = ref('share')
const props = defineProps({
  activeTab: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['updateStatus'])
const updateActiveTab = (status) => {
  emit('updateStatus', status)
}
</script>

<template>
  <dialog id="shareSchedule" class="modal">
    <div class="modal-box min-w-full md:min-w-[480px] bg-gray">
      <!-- close button -->
      <form method="dialog">
        <div class="w-full h-10">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
      </form>
      <!-- share & invite toggle -->
      <div class="w-full h-10 flex gap-1 mb-5 p-1 rounded-xl bg-white">
        <input
          id="share"
          type="radio"
          name="tab"
          :checked="activeTab === 'share'"
          @change="updateActiveTab('share')"
          class="hidden"
        />
        <label
          for="share"
          class="share-toggle w-1/2 text-center py-1 px-2 rounded-lg hover:bg-primary-600 hover:text-white hover:cursor-pointer"
          >分享行程</label
        >
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
          class="invite-toggle w-1/2 text-center py-1 px-2 rounded-lg hover:bg-primary-600 hover:text-white hover:cursor-pointer"
          >邀請共編</label
        >
      </div>
      <!-- share detail -->
      <div
        v-if="props.activeTab === 'share'"
        class="share-detail rounded-xl bg-white w-full pt-10 px-5 pb-6"
      >
        <div>
          <img
            class="w-40 h-40 mb-4 mx-auto"
            src="../assets/qrcode.svg"
            alt="schedule share QRcode"
          />
          <p class="mb-8 text-center">手機掃描條碼，即可查看此行程</p>
        </div>
        <div>
          <p
            class="w-[310px] m-auto text-sm text-center mb-8 text-slate-400 relative before:inline-block before:h-[1px] before:w-1/3 before:bg-gray before:absolute before:top-2 before:left-0 after:inline-block after:h-[1px] after:w-1/3 after:bg-gray after:absolute after:top-2 after:right-0"
          >
            其他方式
          </p>
          <ul class="w-[310px] m-auto flex justify-around">
            <li>
              <button class="hover:cursor-pointer">
                <span
                  class="inline-block w-14 h-14 p-3 bg-primary-100 rounded-xl text-primary-600"
                  ><LinkIcon
                /></span>
                <p class="text-sm">複製連結</p>
              </button>
            </li>
            <li>
              <ScheduleSummaryModal />
            </li>
            <li>
              <ExportScheduleModal />
            </li>
          </ul>
        </div>
      </div>
      <!-- invite detail -->
      <div
        v-else
        class="invite-detail rounded-xl bg-white w-full pt-10 px-5 pb-6"
      >
        <div class="text-center">
          <!-- 邀請者視角 -->
          <div class="dropdown">
            <div
              tabindex="0"
              role="button"
              class="mb-4 w-32 min-h-7 flex items-center justify-center rounded-full bg-primary-100 text-primary-600"
            >
              <p class="text-sm font-medium p-1 me-2">僅供檢視</p>
              <span class="inline-block w-4 h-4 p-0.5"
                ><ChevronDownIcon
              /></span>
            </div>
            <ul
              tabindex="0"
              class="dropdown-content menu w-32 bg-base-100 rounded-sm border border-gray z-[1] py-2 px-0"
            >
              <li>
                <a class="rounded-none bg-gray text-primary-600 font-medium"
                  >僅供檢視</a
                >
              </li>
              <li>
                <a
                  class="rounded-none font-medium hover:bg-gray focus:bg-transparent active:bg-white"
                  >可編輯</a
                >
              </li>
            </ul>
          </div>
          <!-- 被邀請者視角 -->
          <!-- <div class="tooltip" data-tip="只有主揪可以設定共編權限哦">
            <div class="mx-auto mb-4 w-32 min-h-7 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
              <p class="text-sm font-medium p-1 me-2">僅供檢視</p>
              <span class="inline-block w-4 h-4"><ExclamationCircleIcon /></span>
            </div>
          </div> -->
          <!-- Qrcode -->
          <img
            class="w-40 h-40 mb-4 mx-auto"
            src="../assets/qrcode.svg"
            alt=""
          />
          <p>手機掃描條碼，即可查看此行程</p>
          <p class="text-sm mb-8 text-gray-400">24 小時內有效</p>
          <button
            class="w-full flex justify-center items-center text-primary-600 border border-primary-600 rounded-full py-2 px-4"
          >
            <span class="inline-block w-6 h-6 me-1"><LinkIcon /></span>
            <p class="text-sm">複製連結</p>
          </button>
        </div>
      </div>
      <!-- 共編成員 -->
      <div class="py-6" v-if="props.activeTab !== 'share'">
        <p class="text-sm mb-4 font-medium">成員(2)</p>
        <ul>
          <li
            class="flex gap-4 pb-3 border-b-2 border-dashed border-slate-300 mb-3"
          >
            <img
              class="w-11 h-11"
              src="https://web.chictrip.com.tw/assets/waterview_default.f746ada9.svg"
              alt=""
            />
            <div>
              <div class="flex items-center mb-2">
                <span
                  class="inline-block px-2 me-1 text-orange-400 bg-orange-200 rounded-md text-[14px]"
                  >主揪</span
                >
                <p>王先生</p>
              </div>
              <p class="text-gray-400">2 行程</p>
            </div>
          </li>
          <li
            class="flex gap-4 pb-3 border-b-2 border-dashed border-slate-300 mb-3 tooltip tooltip-bottom"
            data-tip="2024/11/18 加入行程"
          >
            <img
              class="w-11 h-11"
              src="https://web.chictrip.com.tw/assets/waterview_default.f746ada9.svg"
              alt=""
            />
            <div class="w-full flex justify-between items-center">
              <div>
                <p class="mb-2">林小姐</p>
                <p class="text-gray-400">3 行程</p>
              </div>
              <div class="dropdown dropdown-top dropdown-end">
                <div
                  tabindex="0"
                  role="button"
                  class="hover:cursor-pointer py-2 text-gray-400"
                >
                  可檢視
                  <span class="inline-block w-4 h-4 p-0.5"
                    ><ChevronDownIcon
                  /></span>
                </div>
                <ul
                  tabindex="0"
                  class="dropdown-content menu bg-base-100 rounded-lg z-[1] w-28 px-0 py-2 shadow-lg"
                >
                  <li>
                    <a class="hover:rounded-none hover:bg-gray font-medium py-3"
                      >可檢視</a
                    >
                  </li>
                  <li>
                    <a
                      class="hover:rounded-none hover:bg-gray font-medium py-3"
                      onclick="exitToggle.showModal()"
                      >退出共編
                    </a>
                  </li>
                  <ExitCoEditModal />
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
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
