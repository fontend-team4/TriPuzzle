<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import axios from 'axios'
import SideBar from '@/components/SideBar.vue'

import {
  HeartIcon,
  PencilIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronRightIcon,
  XMarkIcon,
  PencilSquareIcon,

} from "@heroicons/vue/24/outline"
import { UserBadgeCheck, WarningTriangle, LogOut } from "@iconoir/vue"
import { LoginModalStore } from "@/stores/LoginModal.js"
import FavoritesList from "@/components/FavoritesList.vue"
import DetailModal from "@/components/DetailModal.vue"
import { usePlacesStore } from "@/stores/fetchPlaces"
import { PlaceModalStore } from "@/stores/PlaceModal"
import Logo from "@/assets/images/cat-2.png"

const LoginStore = LoginModalStore()
const placesStore = usePlacesStore()
const modalStore = PlaceModalStore()


const places = ref([])

const route = useRoute()
const router = useRouter()
const API_URL = process.env.VITE_HOST_URL
const token = localStorage.getItem("token")
const userId = localStorage.getItem("userId")

// GET User Profile
const user = ref("")
const userName = ref("")
const userEmail = ref("")
const userGender = ref("")
const userBirthday = ref("")
const userDescription = ref("")
const userLoginWay = ref("")
const userImg = ref(Logo)

const getUser = async () => {
  try {
    const config = {
      headers: {
        Authorization: token,
      },
    }
    const response = await axios.get(
      `${API_URL}/users/profile/${userId}`,
      config
    )
    user.value = response.data.data
    userName.value = user.value.name
    userEmail.value = user.value.email
    userGender.value = user.value.gender
    userBirthday.value = user.value.birthday // 2000-12-12T00:00:00.000Z
    userDescription.value = user.value.description
    userLoginWay.value = user.value.login_way
    if (user.value.profile_pic_url !== null) {
      userImg.value = user.value.profile_pic_url
      return
    }
  } catch (error) {
    console.error(error.message)
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    router.push("/")
  }
}
// User Logout
const logoutSuccess = ref(null)
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  logoutSuccess.value.showModal()
  setTimeout(() => {
    router.push("/planner")
  }, 1000)
}

// 因應 input:date 的格式做調整
const formattedBirthday = computed(() => {
  const dateString = userBirthday.value
  const date = new Date(dateString)
  const year = date.getFullYear()
  // date.getMonth() 返回的月份是 0 到 11,而不是 1 到 12,所以需要手動加 1
  // .padStart(2, '0') 確保字串有兩個字元，不足要補 0
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
})
const userBirthdayInput = computed({
  get: () => formattedBirthday.value,
  set: (value) => {
    const [year, month, day] = value.split("-")
    userBirthday.value = new Date(
      `${year}-${month}-${day}T00:00:00.000Z`
    ).toISOString()
  },
})

// Update User Profile
const errorMsg = ref("")
const UpdateSuccess = ref(null)
const UpdateFailed = ref(null)
const updateUser = async () => {
  try {
    const config = {
      headers: {
        Authorization: token,
      },
    }
    const updatedUserData = {
      name: userName.value,
      email: userEmail.value,
      profile_pic_url: userImg.value,
      gender: userGender.value,
      birthday: userBirthday.value,
      description: userDescription.value,
    }
    const response = await axios.patch(
      `${API_URL}/users/profile/${userId}`,
      updatedUserData,
      config
    )
    if (response.data.message === "User update successful") {
      UpdateSuccess.value.showModal()
      setTimeout(() => {
        UpdateSuccess.value.close()
      }, 1000)
    } else {
      UpdateFailed.value.showModal()
      setTimeout(() => {
        UpdateFailed.value.close()
      }, 1000)
    }
    user.value = response.data.updatedData // 更新後的資料
    await getUser()
  } catch (error) {
    errorMsg.value = error.message
    UpdateFailed.value.showModal()
  }
}

// DELETE User Profile
const DeleteUser = ref(null)
const deleteComfire = () => {
  DeleteUser.value.showModal()
}
const deletedSuccess = ref(null)
const deleteUser = async () => {
  try {
    const config = {
      headers: {
        Authorization: token,
      },
    }
    const response = await axios.delete(
      `${API_URL}/users/profile/${userId}`,
      config
    )
    if (response.data.message === `成功刪除 ID:${userId} 使用者`) {
      user.value = ""
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      deletedSuccess.value.showModal()
      setTimeout(() => {
        router.push("/planner")
      }, 1000)
    }
  } catch (error) {
    console.error(error.message)
  }
}

onMounted(async () => {
  await getUser()
})

// Upload Profile Image
const imgFile = ref(null)
const selectedImg = ref(null)

const handleImgUpload = (event) => {
  imgFile.value = event.target.files[0]
  selectedImg.value = URL.createObjectURL(imgFile.value)
  userImg.value = selectedImg.value
  uploadImg()
}

const uploadImg = async () => {
  const formData = new FormData()
  formData.append("image", imgFile.value)

  try {
    const response = await axios.post(
      `${API_URL}/api/upload/profileImg`,
      formData
    )
    userImg.value = response.data.url
    updateUser()
  } catch (error) {
    console.error(error.message)
  }
}

const closeEditmodal = () => {
  const dialog = document.getElementById("Editmodal")
  dialog?.close()
}
const closeNickNameModal = () => {
  const dialog = document.getElementById("NickNameModal")
  dialog?.close()
}
const closeProfileModal = () => {
  const dialog = document.getElementById("ProfileModal")
  dialog?.close()
}
const closePersonalInformatioMmodal = () => {
  const dialog = document.getElementById("PersonalInformatioMmodal")
  dialog?.close()
}

const isModalOpen = computed(() => route.query.action === 'placeInfo')
const currentPlaceId = computed(() => route.query.placeId)
const handleOpenDetailModal = (detailId) => {
  if (!detailId) {
    console.error('Invalid detailId passed:', detailId)
    return
  }
  console.log('detailId:', detailId)
  
  router.push({
    path: '/member',
    query: { action: 'placeInfo', placeId: detailId },
  })
}


const currentPlace = computed(() => {
  if (!currentPlaceId.value || !places.value.length) return null // 確保資料存在
  return places.value.find((places) => places.place_id === currentPlaceId.value) 
})

const closeDetailModal = () => {
  router.push({ path: '/member' })
}
onMounted(async () => {
  try {
    await placesStore.fetchDefaultPlaces() // 抓取資料
      console.log('places:', places.value);
  } catch (error) {
    console.error('Failed to fetch places:', error)
    places.value = [] // 防止錯誤導致的 undefined
  }
})


</script>

<template>
  <SideBar />
  <div
    class="flex flex-col min-h-screen bg-white lg:ml-16 transition-all duration-300 ease-in-out text-[#2d4057]"
  >
    <div class="ml-5 p-2">
      <img
        src="../assets/svg/Logo.svg"
        alt=""
        class="w-24 mt-1 ml-8 lg:ml-1 md:ml-8 sm:ml-8"
      />
    </div>
    <div class="flex-1 p-2 sm:ml-1 md:ml-1 lg:ml-10">
      <div class="bg-white p-2 rounded-lg mb-4">
        <div
          class="inline-block pb-1 mb-4 items-center space-x-4 lg:flex lg:p-0"
        >
          <div class="flex">
            <img
              :src="userImg"
              alt=""
              class="w-32 h-32 rounded-full ml-2 object-cover"
            />
            <div class="sm:mr-0">
              <div class="block mt-2 md:mr-20 pl-4 sm:mr-0">
                <p class="text-xl font-semibold mt-4">{{ userName }}</p>
                <p class="mt-2">{{ userEmail }}</p>
                <div class="flex items-center mt-4 gap-3">
                  <button
                    class="px-3 py-1 border border-slate-400 rounded-full hover:bg-primary-100 hover:text-primary-800 transition flex items-center"
                    onclick="Editmodal.showModal()"
                  >
                    <PencilIcon class="w-4 h-4 mr-1" />
                    <span class="w-10">編輯</span>
                  </button>
                  <button
                    class="px-3 py-1 border border-slate-400 rounded-full hover:bg-primary-100 hover:text-primary-800 transition flex items-center"
                    @click="logout"
                  >
                    <ArrowRightStartOnRectangleIcon class="h-4 w-4 mr-1" />
                    <span class="w-10">登出</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="ml-3 p-1 rounded-xl flex items-center bg-gray justify-between w-auto lg:max-w-80"
        >
          <div class="flex flex-col ml-4">
            <p class="mt-2 font-medium mb-1 text-sm">想要更多專屬功能？</p>
            <p class="mb-2 text-sm">快速登入 / 註冊旅圖會員</p>
          </div>
          <button
            class="px-6 py-2 mr-4 bg-secondary-500 text-white rounded-full transition"
          >
            立即升級
          </button>
        </div>
        <div class="p-8">
          <h2 class="flex font-semibold text-lg">
            <HeartIcon class="w-6 h-6 me-1" />收藏
          </h2>
          <hr class="border-slate-300" />
        </div>
        <FavoritesList
          @open-detail-modal="handleOpenDetailModal"
        />
        <DetailModal
          class="fixed top-0 left-0 z-40 flex-auto"
          v-if="isModalOpen"
          :place="currentPlace"
          @close="closeDetailModal"
        />    
      </div>
    </div>
    <dialog id="Editmodal" class="modal" @click.self="closeEditmodal">
      <div
        class="bg-white rounded-none p-6 w-full h-full md:w-96 md:h-max md:rounded-2xl md:mb-20"
      >
        <div class="flex justify-end">
          <form method="dialog">
            <button>
              <XMarkIcon class="w-5 h-5" />
            </button>
          </form>
        </div>
        <div class="flex flex-col items-center text-center space-y-4 mb-5">
          <h3 class="text-xl font-bold">個人資料</h3>
          <div class="relative">
            <label for="imageUpload" class="cursor-pointer">
              <img
                id="profileImage"
                :src="userImg"
                alt="profileImage"
                class="w-20 h-20 rounded-full shadow-lg object-cover"
              />
              <button
                class="absolute bottom-0 right-0 bg-black opacity-70 text-white p-1 rounded-full shadow-md"
                onclick="document.getElementById('imageUpload').click();"
              >
                <PencilSquareIcon class="w-5 h-5" />
              </button>
            </label>
          </div>
          <input
            type="file"
            id="imageUpload"
            class="hidden"
            accept="image/*"
            @change="handleImgUpload"
          />
        </div>
        <div class="bg-gray rounded-2xl">
          <button
            class="flex w-full justify-between p-2"
            onclick="document.getElementById('NickNameModal').showModal()"
          >
            <div class="p-2 flex flex-col items-start">
              <span class="text-xs text-slate-400">暱稱</span>
              <p class="font-bold">{{ userName }}</p>
            </div>
            <ChevronRightIcon class="w-4 h-4 mt-5" />
          </button>
          <hr class="w-11/12 mx-auto border-slate-300" />
          <button
            class="flex w-full justify-between p-2"
            onclick="document.getElementById('ProfileModal').showModal()"
          >
            <div class="p-2 flex flex-col items-start">
              <span class="text-xs text-slate-400">個人簡介</span>
              <p class="font-bold">有趣的介紹可以吸引更多人追蹤喔！</p>
            </div>
            <ChevronRightIcon class="w-4 h-4 mt-5" />
          </button>
          <hr class="w-11/12 mx-auto border-slate-300" />
          <button
            class="flex w-full justify-between p-2"
            onclick="document.getElementById('PersonalInformatioMmodal').showModal()"
          >
            <div class="p-2 flex flex-col items-start">
              <span class="text-xs text-slate-400">打造你的旅行名片</span>
              <p class="font-bold">修改個人資料</p>
            </div>
            <ChevronRightIcon class="w-4 h-4 mt-5" />
          </button>
        </div>
        <div class="mt-4">
          <p class="mb-2">帳號綁定</p>
          <div class="flex justify-between p-4 bg-gray rounded-xl">
            <div>
              <p class="text-sm font-bold">旅圖會員登入 / 註冊</p>
              <p class="text-xs">升級會員，即享會員專屬功能！</p>
            </div>
            <button
              class="bg-secondary-500 py-2 px-4 rounded-full"
              @click="LoginStore.openModal"
            >
              <p class="text-white text-xs">立即升級</p>
            </button>
          </div>
          <div class="flex mt-1 justify-between p-4 bg-gray rounded-xl">
            <div>
              <p class="text-sm font-bold">其他登入方式</p>
              <div class="flex items-center text-slate-400">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
                  alt=""
                  class="w-4 h-4"
                />
                <p class="ml-2">{{ userLoginWay }}</p>
              </div>
            </div>
          </div>
          <div class="text-center py-5 mt-1">
            <button
              class="text-[#369ad9] underline text-sm"
              @click.prevent="deleteComfire"
            >
              刪除帳號
            </button>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop hidden md:block">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <button>close</button>
      </form>
    </dialog>
    <dialog id="NickNameModal" class="modal" @click.self="closeNickNameModal">
      <div
        class="bg-white rounded-none p-6 w-full h-full md:w-96 md:h-max md:rounded-2xl md:mb-40"
      >
        <div class="flex justify-end">
          <form method="dialog">
            <button>
              <XMarkIcon class="w-5 h-5" />
            </button>
          </form>
        </div>
        <div class="text-center mb-10">
          <p class="text-2xl font-bold">修改暱稱</p>
        </div>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium">暱稱(必填)</p>
            <p class="text-sm">{{ userName?.length }}/50</p>
          </div>
          <div class="relative">
            <input
              id="nickname"
              class="w-full px-4 py-2 pr-10 border rounded-lg"
              type="text"
              placeholder="輸入暱稱"
              v-model="userName"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
              onclick="document.getElementById('nickname').value=''"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
        <div class="flex justify-around space-x-4 mt-4 pt-6">
          <button
            type="button"
            class="p-3 w-full rounded-full text-primary-600 ring-1 ring-primary-600 hover:bg-primary-100"
            onclick="document.getElementById('NickNameModal').close()"
          >
            取消
          </button>
          <button
            class="p-3 w-full text-white bg-primary-600 hover:bg-primary-800 rounded-full"
            @click="updateUser"
            onclick="document.getElementById('NickNameModal').close()"
          >
            儲存
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop hidden md:block">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <button>close</button>
      </form>
    </dialog>
    <dialog id="ProfileModal" class="modal" @click.self="closeProfileModal">
      <div
        class="bg-white rounded-none p-6 w-full h-full md:w-96 md:h-max md:rounded-2xl md:mb-40"
      >
        <div class="flex justify-end">
          <form method="dialog">
            <button>
              <XMarkIcon class="w-5 h-5" />
            </button>
          </form>
        </div>
        <div>
          <div class="text-center mb-10">
            <p class="text-2xl font-bold">修改個人簡介</p>
          </div>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium">個人簡介</p>
              <p class="text-sm">{{ userDescription?.length }}/500</p>
            </div>
            <textarea
              id="nickname"
              class="w-full px-4 py-2 pr-10 rounded-lg focus:outline-primary-600"
              placeholder="有趣的介紹可以吸引更多人追蹤喔！"
              v-model="userDescription"
            >
            </textarea>
          </div>
          <div class="flex justify-around space-x-4 mt-4 pt-6">
            <button
              type="button"
              class="p-3 w-full rounded-full text-primary-600 ring-1 ring-primary-600 hover:bg-primary-100"
              onclick="document.getElementById('ProfileModal').close()"
            >
              取消
            </button>
            <button
              class="p-3 w-full rounded-full text-white bg-primary-600 hover:bg-primary-800"
              @click="updateUser"
              onclick="document.getElementById('ProfileModal').close()"
            >
              儲存
            </button>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop hidden md:block">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <button>close</button>
      </form>
    </dialog>
    <dialog
      id="PersonalInformatioMmodal"
      class="modal"
      @click.self="closePersonalInformatioMmodal"
    >
      <div
        class="bg-white rounded-none p-6 w-full h-full md:w-96 md:h-max md:rounded-2xl md:mb-40"
      >
        <div class="flex justify-end">
          <form method="dialog">
            <button>
              <XMarkIcon class="w-5 h-5" />
            </button>
          </form>
        </div>
        <div class="text-center mb-10">
          <p class="text-2xl font-bold">修改個人資料</p>
        </div>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium">聯繫Email</p>
          </div>
          <div class="relative">
            <input
              id="PersonalInformatio"
              class="w-full px-4 p-2 pr-10 border rounded-lg"
              type="text"
              placeholder="輸入Email"
              v-model="userEmail"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
              onclick="document.getElementById('PersonalInformatio').value=''"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
        <div class="mt-5">
          <p>性別</p>
          <div class="flex gap-2 mt-2 mx-1">
            <input
              type="radio"
              name="gender"
              v-model="userGender"
              value="Male"
              id="male-radio"
              class="hidden"
            />
            <label
              class="p-3 w-full bg-gray rounded-md hover:bg-primary-100 hover:text-primary-800 cursor-pointer male-label text-center"
              for="male-radio"
            >
              <span class="block">男</span>
            </label>
            <input
              type="radio"
              name="gender"
              v-model="userGender"
              value="Female"
              id="female-radio"
              class="hidden"
            />
            <label
              class="p-3 w-full bg-gray rounded-md hover:bg-primary-100 hover:text-primary-800 cursor-pointer female-label text-center"
              for="female-radio"
            >
              <span class="block">女</span>
            </label>
            <input
              type="radio"
              name="gender"
              v-model="userGender"
              value="Other"
              id="other-radio"
              class="hidden"
            />
            <label
              class="p-3 w-full bg-gray rounded-md hover:bg-primary-100 hover:text-primary-800 cursor-pointer other-label text-center"
              for="other-radio"
            >
              <span class="block">秘密</span>
            </label>
          </div>
        </div>
        <div class="space-y-2 mt-5">
          <label class="text-sm">生日</label>
          <input
            type="date"
            class="w-full p-2 border rounded-lg"
            v-model="userBirthdayInput"
          />
        </div>
        <div class="flex justify-around space-x-4 mt-4 pt-6">
          <button
            type="button"
            class="p-3 w-full rounded-full text-primary-600 ring-1 ring-primary-600 hover:bg-primary-100"
            onclick="document.getElementById('PersonalInformatioMmodal').close()"
          >
            取消
          </button>
          <button
            class="p-3 w-full rounded-full text-white bg-primary-600 hover:bg-primary-800"
            @click="updateUser"
            onclick="document.getElementById('PersonalInformatioMmodal').close()"
          >
            儲存
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop hidden md:block">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <button>close</button>
      </form>
    </dialog>
    <!-- update success 的 Modal -->
    <dialog ref="UpdateSuccess" class="modal w-[384px] mx-auto">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <UserBadgeCheck class="mx-auto w-14 h-14 text-primary-600 mb-3" />
        <h3 class="text-xl font-bold text-center">用戶資料修改成功！</h3>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <button>close</button>
      </form>
    </dialog>
    <!-- update failed 的 Modal -->
    <dialog ref="UpdateFailed" class="modal w-[384px] mx-auto">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <WarningTriangle class="mx-auto w-14 h-14 text-primary-600 mb-3" />
        <h3 class="text-xl font-bold text-center">用戶資料修改失敗！</h3>
        <p class="py-4 text-center">{{ errorMsg }}</p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <button>close</button>
      </form>
    </dialog>
    <!-- delete user 的 Modal -->
    <dialog ref="DeleteUser" class="modal">
      <div class="modal-box w-[384px] p-0">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <div class="py-6 px-5 object-cover">
          <img
            class="w-48 h-48 mx-auto"
            src="../assets/images/cat-4.png"
            alt=""
          />
        </div>
        <div class="text-center">
          <p class="text-lg font-medium">確定要刪除您的旅圖帳戶嗎？</p>
          <p class="text-sm text-slate-400 pt-1">
            請注意！刪除後所有行程將一去不復返！
          </p>
        </div>
        <div class="w-full flex gap-3 px-5 py-6">
          <button
            class="w-full h-12 px-5 py-3 border border-primary-600 text-primary-600 hover:bg-primary-100 text-center rounded-3xl font-medium"
          >
            取消
          </button>
          <button
            class="w-full h-12 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-center rounded-3xl font-medium"
            @click="deleteUser"
          >
            刪除
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
    <!-- deleted success 的 Modal -->
    <dialog ref="deletedSuccess" class="modal w-[384px] mx-auto">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <UserBadgeCheck class="mx-auto w-14 h-14 text-primary-600 mb-3" />
        <h3 class="text-xl font-bold text-center">用戶刪除成功！</h3>
      </div>
    </dialog>
    <!-- logout success 的 Modal -->
    <dialog ref="logoutSuccess" class="modal w-[384px] mx-auto">
      <div class="modal-box">
        <form method="dialog"></form>
        <LogOut class="mx-auto w-14 h-14 text-primary-600 mb-3" />
        <h3 class="text-xl font-bold text-center">登出成功！</h3>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
#male-radio:checked ~ .male-label {
  background-color: rgb(253 228 227 / var(--tw-bg-opacity, 1));
  color: rgb(152 38 35 / var(--tw-text-opacity, 1));
}
#female-radio:checked ~ .female-label {
  background-color: rgb(253 228 227 / var(--tw-bg-opacity, 1));
  color: rgb(152 38 35 / var(--tw-text-opacity, 1));
}
#other-radio:checked ~ .other-label {
  background-color: rgb(253 228 227 / var(--tw-bg-opacity, 1));
  color: rgb(152 38 35 / var(--tw-text-opacity, 1));
}
</style>
