<script setup>
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
          PencilSquareIcon,
} from '@heroicons/vue/24/solid';
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white lg:ml-16 transition-all duration-300 ease-in-out">
    <div class="ml-5 px-2">
        <img
          src="https://web.chictrip.com.tw/assets/logo_horizontal.aa2cb44e.svg"
          alt=""
          class="w-24 mt-1 ml-8 lg:ml-1 md:ml-8 sm:ml-8">
      </div>
    <div class="flex-1 p-2 sm:ml-1 md:ml-1 lg:ml-10">
      <div class="bg-white p-2 rounded-lg mb-4">
        <div class="inline-block pb-1 mb-4 items-center space-x-4 lg:flex lg:p-0">
          <div class="flex">
            <img
              src="https://web.chictrip.com.tw/assets/waterview_default.f746ada9.svg"
              alt=""
              class="w-32 h-32 rounded-full ml-2"
            >
            <div>
              <div class="block mt-2 mr-20 pl-4">
                <p class="text-xl font-semibold mt-4">XXX</p>
                <p class="mt-4">0行程 ・ 0旅遊小書</p>
                <div class="flex justify-between items-center mt-4 gap-4">
                  <button
                    class="px-4 py-2 border rounded-full hover:bg-primary-100 hover:text-primary-800  transition flex items-center"
                    onclick="document.getElementById('Editmodal').showModal()"
                  >
                    <PencilIcon class="w-4 h-4 mr-2" />
                    <span class="w-10">編輯</span>
                  </button>
                  <div class="dropdown">
                    <div tabindex="0" class="p-3 rounded-full border hover:bg-primary-100 hover:text-primary-800">
                      <Cog8ToothIcon class="w-4 h-4" />
                    </div>
                    <ul tabindex="0" class="dropdown-content bg-base-100 rounded-lg w-52 shadow">
                      <button class="w-52">
                        <li class="flex flex-row py-2 px-4 hover:bg-primary-100 hover:text-primary-800 rounded-t-lg items-center">
                          <ShareIcon class="h-4 w-4 mr-2" />
                          分享
                        </li>
                      </button>
                      <button class="w-52">
                        <li class="flex flex-row py-2 px-4 hover:bg-primary-100 hover:text-primary-800 items-center">
                          <EnvelopeIcon class="h-4 w-4 mr-2" />
                          服務條款與隱私聲明
                        </li>
                      </button>
                      <button class="w-52">
                          <li class="flex flex-row py-2 px-4 hover:bg-primary-100 hover:text-primary-800 items-center">
                            <ChatBubbleLeftEllipsisIcon class="h-4 w-4 mr-2" />
                            意見回饋
                          </li>
                      </button>
                        <button class="w-52">
                          <li class="flex flex-row py-2 px-4 hover:bg-primary-100 hover:text-primary-800 rounded-b-lg items-center">
                            <ArrowRightStartOnRectangleIcon class="h-4 w-4 mr-2" />
                            登出
                          </li>
                        </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex mt-4 pl-10 pb-0 md:pb-0 lg:pb-20 lg:pl-0">
            <div class="flex gap-6">
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
        <div class="ml-3 p-2 mb-4 rounded-xl flex items-center bg-gray justify-between w-auto lg:max-w-80">
          <div class="flex flex-col ml-2">
            <p class="mt-2 font-medium mb-1 text-sm">想要更多專屬功能？</p>
            <p class="mb-2 text-sm">快速登入/註冊旅圖會員</p>
          </div>
          <button class="px-6 py-2 mr-1 bg-secondary-500 text-white rounded-full transition">
            立即升級
          </button>
        </div>
        <div class="py-6">
          <h2 class="flex font-semibold text-lg">
            <HeartIcon class="w-6 h-6"/>收藏
          </h2>
          <hr>
        </div>

        <div class="text-center p-6 rounded-lg">
          <img
            src="https://web.chictrip.com.tw/assets/img-empty.65a29235.png"
            alt="Empty collection"
            class=" w-64 mx-auto mb-4"
          >
          <p class="mb-8">「收藏」中還沒有景點哦</p>
          <RouterLink
            to="/planner"
            class="px-16 p-4 bg-primary-600 text-white text-sm rounded-full hover:bg-primary-800 transition">
              探索景點
          </RouterLink>
        </div>
      </div>
    </div>
    <!-- Edit的Modal -->
    <dialog id="Editmodal" class="modal">
      <div class="modal-box w-full max-h-none max-w-none md:w-96 h-auto sm:w-screen max-md:h-screen max-md:w-screen max-md:p-4 max-md:rounded-none">
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
              src="https://web.chictrip.com.tw/assets/waterview_default.f746ada9.svg"
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
        <div class="bg-gray rounded-2xl">
          <button
            class="flex w-full justify-between p-2"
            onclick="document.getElementById('NickNameModal').showModal()"
          >
            <div class="p-2 flex flex-col items-start">
              <span class="text-xs">暱稱</span>
              <p class="font-bold">XXX</p>
            </div>
            <ChevronRightIcon class="w-4 h-4 mt-5"/>
          </button>
          <hr class=" w-11/12 mx-auto">
          <button class="flex w-full justify-between p-2"
                  onclick="document.getElementById('ProfileModal').showModal()"
          >
          <div class="p-2 flex flex-col items-start">
              <span class="text-xs">個人簡介</span>
              <p class="font-bold">有趣的介紹可以吸引更多人追蹤喔！</p>
            </div>
            <ChevronRightIcon class="w-4 h-4 mt-5" />
          </button>
          <hr class=" w-11/12 mx-auto">
          <button class="flex w-full justify-between p-2"
                  onclick="document.getElementById('PersonalInformatioMmodal').showModal()"
          >
            <div class=" p-2 flex flex-col items-start">
              <span class="text-xs">打造你的旅行名片</span>
              <p class="font-bold">修改個人資料</p>
            </div>
            <ChevronRightIcon class="w-4 h-4 mt-5" />
          </button>
        </div>
        <div class="mt-3">
          <p>帳號綁定</p>
          <div class="flex justify-between p-4 bg-gray rounded-xl">
            <div>
              <p class="text-sm font-bold">旅圖會員登入/註冊</p>
              <p class="text-xs">成為會員，即享會員專屬功能！</p>
            </div>
            <button class="bg-secondary-500 p-2 rounded-full">
              <p class="text-white text-xs">立即加入</p>
            </button>
          </div>
          <div class="flex mt-1 justify-between p-4 bg-gray rounded-xl">
            <div>
              <p class="text-sm font-bold">其他登入方式</p>
              <div class="flex">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC8fFURU-S1FRIkYCVhF6LbBB0BQUbGd6bQ&s"
                  alt=""
                  class="w-4 h-4"
                  >
                <p class="text-xs ml-2">xxx.gmail.com</p>
              </div>
            </div>
          </div>
            <div class="text-center py-5 mt-1">
              <button class="text-blue-500 underline">刪除帳號</button>
            </div>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <button>close</button>
        </form>
      </dialog>
    <!-- NickName的Modal -->
    <dialog id="NickNameModal" class="modal">
        <div class="modal-box w-full max-h-none max-w-none md:w-96 max-md:h-screen max-md:w-screen p-4 max-md:rounded-none">
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
              <input id="nickname" class="w-full px-4 py-2 pr-10 border rounded-lg" type="text" placeholder="輸入暱稱" />
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
            <button class="p-3 w-full text-white bg-primary-600 hover:bg-primary-800 rounded-full">
              儲存
            </button>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <button>close</button>
        </form>
      </dialog>
    <!-- Profile的Modal -->
    <dialog id="ProfileModal" class="modal">
        <div class="modal-box w-full max-h-none max-w-none md:w-96 max-md:h-screen max-md:w-screen p-4 max-md:rounded-none">
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
                <textarea id="nickname" class="w-full px-4 py-2 pr-10 border rounded-lg"
                  placeholder="有趣的介紹可以吸引更多人追蹤喔！">
                </textarea>
            </div>
            <div class="flex justify-around space-x-4 mt-4 pt-6">
              <button
                type="button"
                class="p-3 w-full rounded-full  text-primary-600 ring-1 ring-primary-600 hover:bg-primary-100"
                onclick="document.getElementById('ProfileModal').close()"
              >
                取消
              </button>
              <button class="p-3 w-full rounded-full  text-white bg-primary-600 hover:bg-primary-800">
                儲存
              </button>
            </div>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <button>close</button>
        </form>
      </dialog>
    <!-- PersonalInformatio的Modal -->
    <dialog id="PersonalInformatioMmodal" class="modal">
        <div class="modal-box w-full max-h-none max-w-none md:w-96 max-md:h-screen max-md:w-screen p-4 max-md:rounded-none">
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
              <button class="p-3 w-full bg-gray rounded-md focus:ring-1 focus:bg-primary-100 focus:text-primary-600 focus:ring-primary-600 hover:bg-primary-100 hover:text-primary-800">
                男
              </button>
              <button class="p-3 w-full bg-gray rounded-md focus:ring-1 focus:bg-primary-100 focus:text-primary-600 focus:ring-primary-600 hover:bg-primary-100 hover:text-primary-800">
                女
              </button>
              <button class="p-3 w-full bg-gray rounded-md focus:ring-1 focus:bg-primary-100 focus:text-primary-600 focus:ring-primary-600 hover:bg-primary-100 hover:text-primary-800">
                秘密
              </button>
            </div>
          </div>
          <div class="space-y-2 mt-5">
            <label class="text-sm">生日</label>
            <input type="date" class="w-full p-2 border rounded-lg" />
          </div>
          <div class="flex justify-around space-x-4 mt-4 pt-6">
            <button
              type="button"
              class="p-3 w-full rounded-full  text-primary-600 ring-1 ring-primary-600 hover:bg-primary-100"
              onclick="document.getElementById('PersonalInformatioMmodal').close()"
            >
              取消
            </button>
            <button class="p-3 w-full rounded-full  text-white bg-primary-600 hover:bg-primary-800">
              儲存
            </button>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <button>close</button>
        </form>
      </dialog>
  </div>
</template>

<style scoped>

</style>