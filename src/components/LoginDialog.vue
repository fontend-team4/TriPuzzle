<script setup>
import { ref } from "vue"
import { XMarkIcon } from "@heroicons/vue/24/solid"
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline"
import axios from "axios"
import { useUserStore } from "@/stores/userStore"
import { LoginModalStore } from "@/stores/LoginModal.js"
const LoginStore = LoginModalStore()
const userStore = useUserStore()

const API_URL = process.env.VITE_HOST_URL

const Google_login = `${API_URL}/api/auth/google/callback`
const Line_login = `${API_URL}/api/auth/line/callback`

const showPassword = ref(false)
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

const switchLogRes = ref("login")

//登入註冊資訊
const identifier = ref("")
const loginPassword = ref("")
const name = ref("")
const email = ref("")
const registerPassword = ref("")

//成功、錯誤訊息彈窗
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
    return
  }

  const modalHTML = `
    <dialog id="custom_modal" class="modal">
      <div class="modal-box text-center w-[450px] h-[250px]">
        <h3 id="modal_title" class="text-xl font-bold font-bold mb-4">${title}</h3>
        <p id="modal_message" class="py-4">${message}</p>
        <div class="modal-action justify-center">
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

const loginSubmit = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/users/login`,
      {
        identifier: identifier.value,
        password: loginPassword.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (res.data.status == 200) {
      identifier.value = ""
      loginPassword.value = ""
      userStore.setUser(res.data.user)
      userStore.setToken(res.data.token)
      // 提供 MemberView 讀取用戶資料使用
      localStorage.setItem("userId", res.data.user.id)
      localStorage.setItem("token", res.data.token)
      LoginStore.closeModal()
      showMessage({
        title: "登入成功",
        message: res.data.message,
        status: "success",
      })

      // 加入頁面重整的邏輯
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || "未知錯誤"
    showMessage({
      title: "登入失敗",
      message: errorMessage,
      status: "error",
    })
  }
}

const hasAgreed = ref(false)
const errorMessage = ref("")
// const isSubmitted = ref(false);

const registerSubmit = async () => {
  // isSubmitted.value=true
  if (!hasAgreed.value) {
    errorMessage.value = "請閱讀並勾選使用條款"
    return
  }
  errorMessage.value = ""
  try {
    const res = await axios.post(
      `${API_URL}/users/register`,
      {
        name: name.value,
        email: email.value,
        password: registerPassword.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (res.data.status == 201) {
      name.value = ""
      email.value = ""
      registerPassword.value = ""
      switchLogRes.value = "login"
      showMessage({
        title: "註冊成功",
        message: res.data.message,
        status: "success",
      })
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || "未知錯誤"
    showMessage({
      title: "註冊失敗",
      message: errorMessage,
      status: "error",
    })
  }
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto"
  >
    <div
      class="bg-white pb-6 w-full h-full md:w-96 md:h-max md:rounded-2xl md:mb-20"
    >
      <div class="relative">
        <button @click="$emit('close')" class="absolute right-2 top-2">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <div
        class="flex justify-center items-center mt-8 sm:mt-8 md:mt-8 overflow-auto"
      >
        <div class="text-center">
          <div class="mb-4">
            <img
              src="../assets/svg/logo-dark.svg"
              alt="Logo"
              class="w-16 mx-auto"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center">
        <div class="text-center w-full" v-if="switchLogRes === 'login'">
          <h2 class="text-xl font-bold">會員登入</h2>
          <div class="flex justify-center">
            <p class="text-sm pt-2 pb-[20px]">
              還不是會員?
              <input
                type="radio"
                id="register"
                value="register"
                class="hidden"
                v-model="switchLogRes"
              />
              <label
                for="register"
                class="cursor-pointer text-blue-500 underline underline-offset-1 decoration-blue-500 text-sm"
                >快速註冊</label
              >
            </p>
          </div>
          <div>
            <label for="identifier"></label>
            <input
              type="text"
              placeholder="請輸入使用者暱稱/信箱/手機號碼"
              id="identifier"
              class="w-[80%] h-[48px] py-[12px] pr-[20px] pl-[16px] border-solid border border-[#EEEEEE] rounded-lg mt-1 mb-1 text-sm"
              v-model="identifier"
              v-on:keyup.enter="loginSubmit"
            />
          </div>
          <div class="relative">
            <label for="loginPassword"> </label>
            <input
              :type="!showPassword ? 'password' : 'text'"
              placeholder="請輸入密碼"
              id="loginPassword"
              class="w-[80%] h-[48px] py-[12px] pr-[20px] pl-[16px] border-solid border border-[#EEEEEE] rounded-lg mt-1 mb-1 text-sm"
              v-model="loginPassword"
              autocomplete="new-password"
              v-on:keyup.enter="loginSubmit"
            />
            <button
              class="absolute top-1/2 right-[50px] transform -translate-y-1/2 text-gray-400"
              @click="togglePasswordVisibility"
            >
              <EyeIcon v-if="showPassword" class="w-5 h-5" />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>
          <button
            @click="loginSubmit"
            class="w-[80%] bg-primary-600 text-white py-3 rounded-full font-medium hover:bg-primary-700 mt-10"
          >
            會員登入
          </button>
        </div>
      </div>

      <div class="flex justify-center items-center">
        <div class="text-center w-full" v-if="switchLogRes === 'register'">
          <h2 class="text-xl font-bold">會員註冊</h2>
          <div>
            <p class="text-sm pt-2 pb-[20px]">
              已經註冊完成?
              <input
                type="radio"
                id="login"
                value="login"
                class="hidden"
                v-model="switchLogRes"
              />
              <label
                for="login"
                class="cursor-pointer text-blue-500 underline underline-offset-1 decoration-blue-500 text-sm"
                >快速登入</label
              >
            </p>
          </div>

          <div class="relative">
            <label for="name"></label>
            <input
              type="text"
              placeholder="請輸入使用者暱稱"
              id="name"
              class="w-[80%] h-[48px] py-[12px] pr-[20px] pl-[16px] border-solid border border-[#EEEEEE] rounded-lg mt-1 mb-1 text-sm"
              v-model="name"
              v-on:keyup.enter="registerSubmit"
            />
          </div>
          <!-- <p class=" text-red-500 text-sm font-light" v-show="isSubmitted&&name==''">
            帳號不可為空
          </p>         -->

          <div>
            <label for="email"></label>
            <input
              type="text"
              placeholder="請輸入信箱"
              id="email"
              class="w-[80%] h-[48px] py-[12px] pr-[20px] pl-[16px] border-solid border border-[#EEEEEE] rounded-lg mt-1 mb-1 text-sm"
              v-model="email"
              v-on:keyup.enter="registerSubmit"
            />
          </div>
          <!-- <p class=" text-red-500 text-sm font-light" v-show="isSubmitted&&email==''">
            信箱不可為空
          </p> -->

          <div class="relative">
            <label for="registerPassword"> </label>
            <input
              :type="!showPassword ? 'password' : 'text'"
              placeholder="請輸入密碼"
              id="registerPassword"
              class="w-[80%] h-[48px] py-[12px] pr-[20px] pl-[16px] border-solid border border-[#EEEEEE] rounded-lg mt-1 mb-1 text-sm"
              v-model="registerPassword"
              autocomplete="new-password"
              v-on:keyup.enter="registerSubmit"
            />
            <button
              class="absolute top-1/2 right-[50px] transform -translate-y-1/2 text-gray-400"
              @click="togglePasswordVisibility"
            >
              <EyeIcon v-if="showPassword" class="w-5 h-5" />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>
          <!-- <p class="text-red-500 text-sm font-light" v-show="isSubmitted&&registerPassword==''">
            密碼不可為空
          </p> -->

          <div class="flex items-center justify-center mt-10">
            <input
              type="checkbox"
              id="agreement"
              class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
              v-model="hasAgreed"
            />
            <label for="agreement" class="ml-2 text-sm">
              我已閱讀並同意
              <a href="#" class="text-blue-500 underline">旅圖會員服務條款</a>
            </label>
          </div>
          <p class="text-red-500 text-sm font-light" v-if="errorMessage">
            {{ errorMessage }}
          </p>

          <button
            @click="registerSubmit"
            class="w-[80%] bg-primary-600 text-white py-3 rounded-full font-medium hover:bg-primary-700 mt-4"
          >
            會員註冊
          </button>
        </div>
      </div>

      <div class="flex justify-center items-center gap-6 mt-5">
        <a
          :href="Google_login"
          class="h-8 w-8 rounded-full shadow flex justify-center items-center cursor-pointer"
        >
          <img
            src="https://t4.ftcdn.net/jpg/03/91/79/25/360_F_391792593_BYfEk8FhvfNvXC5ERCw166qRFb8mYWya.jpg"
            alt="Google"
            class="h-6 w-6"
          />
        </a>
        <a
          :href="Line_login"
          class="h-8 w-8 rounded-full shadow flex justify-center items-center"
        >
          <img
            src="https://e7.pngegg.com/pngimages/630/685/png-clipart-line-computer-icons-social-media-line-flat-text-rectangle-thumbnail.png"
            alt="LINE"
            class="h-6 w-6"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
