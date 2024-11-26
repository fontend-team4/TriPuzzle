<script setup>
import { ref } from 'vue';
import SideBar from '@/components/SideBar.vue';
import {  HeartIcon,
          PencilIcon,
          Cog8ToothIcon,
          ShareIcon,
          ArrowRightStartOnRectangleIcon,
          EnvelopeIcon,
          ChatBubbleLeftEllipsisIcon,
          ChevronRightIcon,
          XMarkIcon,
} from '@heroicons/vue/24/solid';
import { PencilSquareIcon } from '@heroicons/vue/24/solid';

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <!-- <SideBar /> -->
  <div class="flex flex-col min-h-screen bg-white lg:ml-16 transition-all duration-300 ease-in-out">
    <div class="ml-5 p-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
          alt=""
          class="w-10 h-10 mt-2 ml-2 lg:ml-1 md:ml-8 sm:ml-8">
      </div>
    <div class="flex-1 p-2 ml-10">
      <div class="bg-white p-2 rounded-lg mb-4">
        <div class="inline-block pb-1 mb-4 items-center space-x-4 lg:flex lg:p-0">
          <div class="flex">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
              alt=""
              class="w-32 h-32 rounded-full border ml-2"
            >
            <div>
              <div class="block mt-2 mr-20 pl-4">
                <p class="text-xl font-semibold mt-4">XXX</p>
                <p class="mt-4">0行程 ・ 0旅遊小書</p>
                <div class="flex justify-between items-center mt-4 gap-4">
                  <button 
                    class="px-4 py-1 border rounded-full hover:bg-primary-100 hover:text-primary-800  transition flex items-center"
                    onclick="document.getElementById('Editmodal').showModal()"
                  >
                    <PencilIcon class="w-4 h-4 mr-2" />
                    <span>編輯</span>
                  </button>
                  <div class="relative flex">
                    <button 
                      @click="toggleMenu" 
                      class="w-8 h-8 border hover:text-primary-800 hover:bg-primary-100 rounded-full transition items-center justify-center flex"
                    >
                      <Cog8ToothIcon class="w-4 h-4" />
                    </button>
                      <ul v-if="isOpen" class=" absolute top-full mt-2 bg-white border border-gray shadow-xl rounded-lg w-52">
                        <li class="py-2 px-4 hover:bg-primary-100 hover:text-primary-800 flex items-center">
                          <ShareIcon class="h-4 w-4 mr-2" />
                          分享
                        </li>
                        <li class="py-2 px-4 hover:bg-primary-100 hover:text-primary-800 flex items-center">
                          <EnvelopeIcon class="h-4 w-4 mr-2" />
                          服務條款與隱私聲明
                        </li>
                        <li class="py-2 px-4 hover:bg-primary-100 hover:text-primary-800 flex items-center">
                          <ChatBubbleLeftEllipsisIcon class="h-4 w-4 mr-2" />
                          意見回饋
                        </li>
                        <li class="py-2 px-4 hover:bg-primary-100 hover:text-primary-800 flex items-center">
                          <ArrowRightStartOnRectangleIcon class="h-4 w-4 mr-2" />
                          登出
                        </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex mt-4 pl-10 pb-0 md:pb-0 lg:pb-20 lg:pl-0">
            <div class="flex gap-6 ">
              <div>
                <span class="font-semibold text-3xl">0</span>
                <span>粉絲</span>
              </div>
              <div>
                <span class="font-semibold text-3xl">0</span>
                <span>追蹤中</span>
              </div>
              <div>
                <span class="font-semibold text-3xl">0</span>
                <span>影音</span>
              </div>
            </div>
          </div>
        </div>
        <div class="ml-3 p-1 rounded-xl flex items-center bg-gray justify-between w-auto lg:max-w-80">
          <div class="flex flex-col ml-4">
            <p class="mt-2 font-medium mb-1 text-sm">想要更多專屬功能？</p>
            <p class="mb-2 text-sm">快速登入/註冊去趣會員</p>
          </div>
          <button class="px-6 py-2 mr-4 bg-secondary-500 text-white rounded-full transition">
            立即升級
          </button>
        </div>
        <div class="p-8">
          <h2 class="flex font-semibold text-lg"><HeartIcon class="w-6 h-6"/>收藏</h2>
          <hr>
        </div>

        <div class="text-center p-6 rounded-lg">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
            alt="Empty collection"
            class="w-20 h-20 mx-auto mb-4"
          >
          <p class="mb-4">「收藏」中還沒有景點哦</p>
          <button class="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-800 transition">
            探索景點
          </button>
        </div>
      </div>
    </div>
    <!-- Edit的Modal -->
    <dialog id="Editmodal" class="modal">
      <div class="modal-box">
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
              <img
                id="profileImage"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
                alt=""
                class="w-20 h-20 rounded-full shadow-lg"
              >
                <button
                  class="absolute bottom-0 right-0 bg-black opacity-70 text-white p-1 rounded-full shadow-md"
                  onclick="document.getElementById('imageUpload').click();"
                >
                <PencilSquareIcon class="w-5 h-5" />
              </button>
            </div>
              <input
                type="file"
                id="imageUpload"
                class="hidden"
                accept="image/*"
                onchange="updateProfileImage(event)"
              />
        </div>
        <div class="space-y-1">
          <button 
            class="flex w-full justify-between p-2 bg-gray rounded-xl"
            onclick="document.getElementById('NickNameModal').showModal()"
          >
            <div class="mx-3">
              <span class="text-xs">暱稱</span>
              <p class="font-bold">XXX</p>
            </div>
            <ChevronRightIcon class="w-4 h-4 mt-4"/>
          </button>
          <button class="flex w-full justify-between p-2 bg-gray rounded-xl"
                  onclick="document.getElementById('ProfileModal').showModal()"
          >
          <div class="mx-3 flex flex-col items-start">
              <span class="text-xs">個人簡介</span>
              <p class="font-bold">有趣的介紹可以吸引更多人追蹤喔！</p>
            </div>
            <ChevronRightIcon class="w-4 h-4 mt-3" />
          </button>
          <button class="flex w-full justify-between p-2 bg-gray rounded-xl"
                  onclick="document.getElementById('PersonalInformatioMmodal').showModal()"
          >
            <div class="mx-3">
              <span class="text-xs">打造你的旅行名片</span>
              <p class="font-bold">修改個人資料</p>
            </div>
            <ChevronRightIcon class="w-4 h-4 mt-4" />
          </button>
        </div>
        <div class="mt-3 space-y-1">
          <p>帳號綁定</p>
          <div class="flex justify-between p-2 bg-gray rounded-xl">
            <div class="mx-3">
              <p class="text-sm font-bold">TriPuzzle會員登入/註冊</p>
              <p class="text-xs">成為會員，即享會員專屬功能！</p>
            </div>
            <button class="bg-secondary-500 p-2 rounded-full">
              <p class="text-white text-xs">立即加入</p>
            </button>
          </div>
          <div class="flex justify-between p-2 bg-gray rounded-xl">
            <div>
              <p class="text-sm mx-3 font-bold">其他登入方式</p>
              <div class="flex mx-3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
                  alt=""
                  class="w-4 h-4"
                  >
                <p class="text-xs ml-2">xxx.gmail.com</p>
              </div>
            </div>
          </div>
          <div class="text-center pt-10">
            <button class="text-blue-500 underline">刪除帳號</button>
          </div>
        </div>
      </div>
    </dialog>
    <!-- NickName的Modal -->
    <dialog id="NickNameModal" class="modal">
      <div class="modal-box">
        <div>
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
              <p class="text-sm ">0/50</p>
            </div>
            <div class="relative">
              <input id="nickname" class="w-full text-lg px-4 py-2 pr-10 border rounded-lg" type="text" placeholder="輸入暱稱" />
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
              class="p-1 w-full text-lg bg-gray rounded-full focus:outline-none hover:bg-primary-100 hover:text-primary-800"
              onclick="document.getElementById('NickNameModal').close()"
            >
              取消
            </button>
            <button class="p-1 w-full text-lg bg-gray rounded-full focus:outline-none hover:bg-primary-100 hover:text-primary-800">
              儲存
            </button>
          </div>
        </div>
      </div>
    </dialog>
    <!-- Profile的Modal -->
    <dialog id="ProfileModal" class="modal">
      <div class="modal-box">
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
              <p class="text-sm">0/500</p>
            </div>
              <textarea id="nickname" class="w-full text-lg px-4 py-2 pr-10 border rounded-lg"
                placeholder="有趣的介紹可以吸引更多人追蹤喔！">
              </textarea>
          </div>
          <div class="flex justify-around space-x-4 mt-4 pt-6">
            <button 
              type="button" 
              class="p-1 w-full text-lg bg-gray rounded-full focus:outline-none hover:bg-primary-100 hover:text-primary-800"
              onclick="document.getElementById('ProfileModal').close()"
            >
              取消
            </button>
            <button class="p-1 w-full text-lg bg-gray rounded-full focus:outline-none hover:bg-primary-100 hover:text-primary-800">
              儲存
            </button>
          </div>
        </div>
      </div>
    </dialog>
    <!-- PersonalInformatio的Modal -->
    <dialog id="PersonalInformatioMmodal" class="modal">
      <div class="modal-box">
        <div>
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
                class="w-full text-lg px-4 py-2 pr-10 border rounded-lg"
                type="text" 
                placeholder="輸入Email" 
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
            <div class="flex gap-3 mt-2">
              <button class="p-3 w-full bg-gray text-lg rounded-md focus:ring-1 focus:ring-primary-800 active:bg-primary-100 hover:bg-primary-100 hover:text-primary-800">
                男
              </button>
              <button class="p-3 w-full bg-gray text-lg rounded-md focus:ring-1 focus:ring-primary-800 active:bg-primary-100 hover:bg-primary-100 hover:text-primary-800">
                女
              </button>
              <button class="p-3 w-full bg-gray text-lg rounded-md focus:ring-1 focus:ring-primary-800 active:bg-primary-100 hover:bg-primary-100 hover:text-primary-800">
                秘密
              </button>
            </div>
          </div>
          <div class="space-y-2 mt-5">
            <label class="text-sm">生日</label>
            <input type="date" class="w-full p-3 text-lg border rounded-lg" />
          </div>
          <div class="flex justify-around space-x-4 mt-4 pt-6">
            <button 
              type="button" 
              class="p-1 w-full text-lg bg-gray rounded-full focus:outline-none hover:bg-primary-100 hover:text-primary-800"
              onclick="document.getElementById('PersonalInformatioMmodal').close()"
            >
              取消
            </button>
            <button class="p-1 w-full text-lg bg-gray rounded-full focus:outline-none hover:bg-primary-100 hover:text-primary-800">
              儲存
            </button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>

</style>