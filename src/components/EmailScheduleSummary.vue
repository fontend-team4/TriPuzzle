<script setup>
import { ref, defineProps } from "vue"
import emailjs from "@emailjs/browser"
import { SendMail, MailOut, MailOpen } from "@iconoir/vue"
import { MessageModalStore } from '@/stores/MessageModal'

const messageStore = MessageModalStore()
const loadingForBtn = ref(false)

const props = defineProps({
  scheduleSummaryText: {
    type: Array,
    required: true,
  },
})

const EmailScheduleSummary = ref(null)
const closeModal = () => {
  EmailScheduleSummary.value.close()
}

const { VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID } = process.env
const email = ref("")

const sendEmail = () => {
  const templateParams = {
    scheduleSummary: props.scheduleSummaryText.join("\n"),
    email: email.value,
  }
  loadingForBtn.value = true
  emailjs.send(VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, templateParams, VITE_EMAILJS_PUBLIC_KEY)
  .then(
    (response) => {
      loadingForBtn.value = false
      closeModal()
      messageStore.messageModal({
        message: "信件寄送成功",
        status: "success",
      })
    },
    (error) => {
      loadingForBtn.value = false
      closeModal()
      messageStore.messageModal({
        message: "尚未輸入收件人信箱",
        status: "error",
      })
    }
  )
  email.value = ""
}
</script>

<template>
  <button
    class="w-full h-12 px-5 py-3 border border-primary-600 text-primary-600 hover:bg-primary-100 text-center rounded-3xl font-medium"
    @click="EmailScheduleSummary.showModal()"
  >
    <SendMail class="w-7 h-7 inline-block pe-2" />
    <span>寄送 Email</span>
  </button>
  <dialog ref="EmailScheduleSummary" class="modal">
    <div class="modal-box w-screen md:w-[480px] relative">
      <form method="dialog">
        <div class="w-full h-10">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
        <div class="pb-20">
          <div class="pt-4">
            <h3 class="text-2xl font-medium text-center mb-4">寄送 Email</h3>
            <input
              type="text"
              placeholder="輸入要寄送的 Email"
              class="input input-bordered w-full px-6 focus:outline-primary-600"
              v-model="email"
            />
          </div>
          <div
            class="w-full flex gap-3 h-20 px-6 py-4 bg-white border-t border-gray absolute bottom-0 right-0"
          >
            <button
              class="w-full h-12 px-5 py-3 border border-primary-600 text-primary-600 text-center rounded-3xl font-medium hover:bg-primary-100"
              @click="closeModal"
            >
              取消
            </button>
            <button
              v-if="!loadingForBtn"
              class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl font-medium"
              @click="sendEmail"
            >
              寄送
            </button>
            <button
              v-else
              class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl font-medium"
            >
              <span class="loading loading-dots loading-md"></span>
            </button>
          </div>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
      <button>close</button>
    </form>
  </dialog>
</template>
