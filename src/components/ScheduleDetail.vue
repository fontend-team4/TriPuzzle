<template>
  <div class="min-w-full h-screen flex flex-row-reverse bg-[#EEEEEE] z-10">
    <div class="w-full lg:w-96 h-screen bg-white shadow-xl">
      <!-- header -->
      <div class="bg-[#D23430] z-10 py-4 ps-4 pe-14 relative">
        <div class="flex items-center justify-between gap-0.5">
          <div class="flex items-center hover:cursor-pointer">
            <span class="inline-block w-4 h-4 text-white"><ChevronLeftIcon /></span>
            <h2 class="text-white text-sm">行程列表</h2>
          </div>
          <div class="w-5 h-5 text-white hover:cursor-pointer" onclick="shareScheduleModal.showModal()"><ArrowUpTrayIcon /></div>
          <ShareScheduleModal />
        </div>
        <button class="bg-[#EEEEEE] text-gray-600 w-8 h-8 rounded-full absolute top-2.5 right-4 p-1.5">
          <XMarkIcon />
        </button>
      </div>
      <!-- date tab -->
      <div class="flex border-b ">
        <div class="w-full h-12 flex pt-2 ps-8 pe-3 overflow-x-scroll ">
          <ul class="flex gap-4">
            <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-800 font-medium text-sm border-b-2 border-[#D23430]">總覽頁</a></li>
            <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-[#D23430]">第1天</a></li>
            <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-[#D23430]">第2天</a></li>
            <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-[#D23430]">第3天</a></li>
            <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-[#D23430]">第4天</a></li>
            <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-[#D23430]">第5天</a></li>
            <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-[#D23430]">第6天</a></li>
            <li class="whitespace-nowrap"><a href="" class="pb-2 text-gray-500 font-medium text-sm hover:text-gray-800 hover:border-b-2 hover:border-[#D23430]">第7天</a></li>
          </ul>
        </div>
        <div class="w-12 pt-2 text-[#D23430] hover:cursor-pointer text-center">
          <span class="inline-block w-7 h-7 rounded-full hover:bg-[#EEEEEE]"><PlusCircleIcon /></span>
        </div>
      </div>
      <!-- overview -->
      <!-- schedule title -->
      <!-- <div class="w-full pt-5 px-6 pb-8">
        <div class="flex items-center gap-2">
          <p class="text-xl font-medium mb-2">香港</p>
          <span class="inline-block w-4 h-4 mb-2"><PencilIcon /></span>
        </div>
        <p class="text-sm mb-3">2024/11/15 - 2024/11/29</p>
        <p class="text-sm text-gray-500 border-l border-gray-400 ps-3" onclick="schedul_note.showModal()">還沒有寫筆記哦...
          <span class="text-[#D23430] font-medium">編輯筆記</span>
        </p> -->
        <!-- schedule note -->
        <!-- <dialog id="schedul_note" class="modal">
          <div class="modal-box w-screen md:w-[480px]">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h2 class="text-2xl font-medium text-center pt-6 mb-4">行程筆記</h2>
            <textarea class="w-full h-[500px] textarea textarea-lg focus:border-0 focus:outline-none" placeholder="記下重要的旅行細節吧"></textarea>
            <div class="w-full flex gap-3 h-20 px-6 py-4 bg-white border-t fixed bottom-0 right-0">
              <button class="w-full h-12 px-5 py-3 border border-[#D23430] text-[#D23430] text-center rounded-3xl font-medium hover:bg-[#FDE4E3]">
                取消
              </button>
              <button class="w-full h-12 px-5 py-3 bg-[#D23430] hover:bg-[#B12824] text-white text-center rounded-3xl font-medium">
                儲存
              </button>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <button>close</button>
          </form>
        </dialog> 
      </div> -->
      <!-- my tool -->
      <!-- <div class="p-5">
        <div class="flex items-center gap-1 mb-3">
          <span class="inline-block w-5 h-5"><UsersIcon/></span>
          <p>我的工具</p>
        </div>
        <ul class="flex justify-between">
          <li class="w-[100px] pt-4 px-2.5 pb-2.5 bg-[#EEEEEE] rounded-xl hover:cursor-pointer hover:bg-[#FDE4E3] hover:text-[#D23430]">
            <img src="https://web.chictrip.com.tw/assets/img-myfavorite.42ac10ec.svg" class="mx-auto" alt="">
            <p class="text-center font-medium mt-2">收藏</p>
          </li>
          <li class="w-[100px] pt-4 px-2.5 pb-2.5 bg-[#EEEEEE] rounded-xl hover:cursor-pointer hover:bg-[#FDE4E3] hover:text-[#D23430]">
            <img src="https://web.chictrip.com.tw/assets/img-share.7c89cdf8.svg" class="mx-auto" alt="">
            <p class="text-center font-medium mt-2">共編</p>
          </li>
          <li class="w-[100px] pt-4 px-2.5 pb-2.5 bg-[#EEEEEE] rounded-xl hover:cursor-pointer hover:bg-[#FDE4E3] hover:text-[#D23430]">
            <img src="https://web.chictrip.com.tw/assets/img-exportbook.a62ae1d0.svg" class="mx-auto" alt="">
            <p class="text-center font-medium mt-2">分帳</p>
          </li>
        </ul>
      </div> -->
      <!-- everyday schedule -->
      <!-- date -->
      <div class="pt-5 px-5 mb-3">
        <div class="date w-28 flex gap-1 cursor-pointer">
          <p class="font-medium">11/15 週五</p>
          <div class="dropdown hidden">
            <div class="w-6 h-6" tabindex="0" role="button">
              <EllipsisHorizontalIcon/>
            </div>
            <!-- delete dropdown -->
            <div tabindex="0" class=" dropdown-content flex gap-2 bg-base-100 rounded z-[1] w-32 p-2 shadow hover:bg-[#EEEEEE]" onclick="delete_date.showModal()">
              <span class="w-6 h-6"><TrashIcon /></span>
              <p>刪除這天</p>
              <DeletePerDayModal />
            </div>
          </div>
        </div>
      </div>
      <!-- places -->
      <div class="min-h-[500px] pt-5 px-5 pb-10 overflow-y-scroll overflow-x-hidden bg-white">
        <!-- no places -->
        <!-- <div class="w-full bg-[#EEEEEE] rounded-xl py-10 px-5 mb-5">
          <p class="text-sm text-center">還沒有排這天的行程喲</p>
        </div> -->
        <!-- place & transportation -->
        <div class="place w-full bg-[#EEEEEE] rounded-xl border">
          <div class="flex p-1">
            <img class="w-[108px] h-[108px] rounded-xl object-cover" src="https://lh3.googleusercontent.com/places/ANJU3Ds3MXRcZf77xt6ejMr5CyGxuySKPa3n9yUWJ5EqShizmd3EPHhQNT8_xFYRuOpksBffhO-lOh21FWclCl_ZQv94ZzST19IrWtM=s1600-w480">
            <div class="w-cal flex justify-between">
              <ul class="px-4 flex flex-col gap-0.5 justify-center">
                <li class="text-sm font-medium text-orange-400">08:00</li>
                <li class="font-medium">香港迪士尼樂園</li>
                <li class="text-xs text-gray-400">停留 1 時</li>
              </ul>
              <div class="dropdown p-1">
                <button role="button" class="w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 text-white relative">
                  <EllipsisHorizontalIcon />
                </button>
                <!-- dropdown 控制開關-->
                <ul tabindex="0" class="dropdown-content w-32 bg-white rounded border absolute right-[-12px] top-8 shadow-xl">
                  <li>
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-[#EEEEEE]" href="#">
                      <span class="inline-block w-6 h-6"><CalendarIcon/></span>
                      <p>移到別天</p>
                    </a>  
                  </li>
                  <li>
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-[#EEEEEE]" href="#">
                      <span class="inline-block w-6 h-6"><DocumentDuplicateIcon/></span>
                      <p>複製</p>
                    </a>  
                  </li>
                  <li class="border-t">
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-[#EEEEEE]" href="#">
                      <span class="inline-block w-6 h-6"><TrashIcon/></span>
                      <p>刪除</p>
                    </a>  
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- hover:relative feature -->
          <div class="more lg:hidden">
            <div class="h-10 flex justify-between items-center border-t">
              <ul class="flex gap-4 p-3">
                <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer" onclick="edit_place.showModal()">
                  <span class="w-3 h-3"><PencilIcon/></span>
                  <p class="text-xs">編輯</p>
                </li>
                <EditPlaceModal />
                <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer">
                  <span class="w-3 h-3"><MagnifyingGlassIcon/></span>
                  <p class="text-xs">周邊</p>
                </li>
                <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer" onclick="place_note_1.showModal()">
                  <span class="w-3 h-3"><BookmarkIcon/></span>
                  <p class="text-xs">筆記</p>
                </li>
                <!-- place note -->
                <dialog id="place_note_1" class="modal">
                  <div class="modal-box min-w-full md:min-w-[480px] min-h-screen md:min-h-[90%]">
                    <form method="dialog">
                      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h2 class="text-2xl font-medium text-center pt-6 mb-4">景點筆記</h2>
                    <textarea class="w-full h-[500px] textarea textarea-lg focus:border-0 focus:outline-none" placeholder="還沒有寫筆記哦"></textarea>
                    <div class="w-full flex gap-3 h-20 px-6 py-4 bg-white border-t fixed bottom-0 right-0">
                      <button class="w-full h-12 px-5 py-3 border border-[#D23430] text-[#D23430] text-center rounded-3xl font-medium hover:bg-[#FDE4E3]">
                        取消
                      </button>
                      <button class="w-full h-12 px-5 py-3 bg-[#D23430] hover:bg-[#B12824] text-white text-center rounded-3xl font-medium">
                        儲存
                      </button>
                    </div>
                  </div>
                  <form method="dialog" class="modal-backdrop">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <button>close</button>
                  </form>
                </dialog> 
              </ul>
              <span class="w-10 h-10 text-gray-500 p-3 border-l hover:cursor-pointer"><MapPinIcon/></span>
            </div>
          </div>
        </div>
        <!-- transportation -->
        <div class="w-full ml-3 py-4 ps-3 border-l border-dashed">
          <p>自訂交通 0 分</p>
        </div>
        <!-- place & transportation -->
        <div class="place w-full bg-[#EEEEEE] rounded-xl border">
          <div class="flex p-1">
            <img class="w-[108px] h-[108px] rounded-xl object-cover" src="https://chictirpstorageprod.blob.core.windows.net/poi/8d8b0e7e-b654-4e7f-91b8-096097b84246.jpg">
            <div class="w-cal flex justify-between">
              <ul class="px-4 flex flex-col gap-0.5 justify-center">
                <li class="text-sm font-medium text-orange-400">09:00</li>
                <li class="font-medium">香港杜莎夫人蠟像館</li>
                <li class="text-xs text-gray-400">停留 1 時</li>
              </ul>
              <div class="dropdown p-1">
                <button role="button" class="w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 text-white relative">
                  <EllipsisHorizontalIcon />
                </button>
                <!-- dropdown 控制開關-->
                <ul tabindex="0" class="dropdown-content w-32 bg-white rounded border absolute right-[-12px] top-8 shadow-xl">
                  <li>
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-[#EEEEEE]" href="#">
                      <span class="inline-block w-6 h-6"><CalendarIcon/></span>
                      <p>移到別天</p>
                    </a>  
                  </li>
                  <li>
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-[#EEEEEE]" href="#">
                      <span class="inline-block w-6 h-6"><DocumentDuplicateIcon/></span>
                      <p>複製</p>
                    </a>  
                  </li>
                  <li class="border-t">
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-[#EEEEEE]" href="#">
                      <span class="inline-block w-6 h-6"><TrashIcon/></span>
                      <p>刪除</p>
                    </a>  
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- hover:relative feature -->
          <div class="more lg:hidden">
            <div class="h-10 flex justify-between items-center border-t">
              <ul class="flex gap-4 p-3">
                <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer" onclick="edit_place.showModal()">
                  <span class="w-3 h-3"><PencilIcon/></span>
                  <p class="text-xs">編輯</p>
                </li>
                <!-- <EditPlaceModal /> -->
                <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer">
                  <span class="w-3 h-3"><MagnifyingGlassIcon/></span>
                  <p class="text-xs">周邊</p>
                </li>
                <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer" onclick="place_note_2.showModal()">
                  <span class="w-3 h-3"><BookmarkIcon/></span>
                  <p class="text-xs">筆記</p>
                </li>
                <!-- place note -->
                <dialog id="place_note_2" class="modal">
                  <div class="modal-box min-w-full md:min-w-[480px] min-h-screen md:min-h-[90%]">
                    <form method="dialog">
                      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h2 class="text-2xl font-medium text-center pt-6 mb-4">景點筆記</h2>
                    <textarea class="w-full h-[500px] textarea textarea-lg focus:border-0 focus:outline-none" placeholder="還沒有寫筆記哦"></textarea>
                    <div class="w-full flex gap-3 h-20 px-6 py-4 bg-white border-t fixed bottom-0 right-0">
                      <button class="w-full h-12 px-5 py-3 border border-[#D23430] text-[#D23430] text-center rounded-3xl font-medium hover:bg-[#FDE4E3]">
                        取消
                      </button>
                      <button class="w-full h-12 px-5 py-3 bg-[#D23430] hover:bg-[#B12824] text-white text-center rounded-3xl font-medium">
                        儲存
                      </button>
                    </div>
                  </div>
                  <form method="dialog" class="modal-backdrop">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <button>close</button>
                  </form>
                </dialog> 
              </ul>
              <span class="w-10 h-10 text-gray-500 p-3 border-l hover:cursor-pointer"><MapPinIcon/></span>
            </div>
          </div>
        </div>
        <!-- transportation -->
        <div class="w-full ml-3 py-4 ps-3 border-l border-dashed">
          <p>自訂交通 0 分</p>
        </div>
        <!-- place -->
        <div class="place w-full bg-[#EEEEEE] rounded-xl border">
          <div class="flex p-1">
            <img class="w-[108px] h-[108px] rounded-xl object-cover" src="https://lh3.googleusercontent.com/places/ANJU3DsUY2LM1fuJKUAmH-PF1rJfdcdHY1r2gLmSddnr24aqnSDDkNAG5oMI5BNaQ1xXBbtxiJTyTnixNTKAyl541gqVjZax6o9DbsM=s1600-w480">
            <div class="w-cal flex justify-between">
              <ul class="px-4 flex flex-col gap-0.5 justify-center">
                <li class="text-sm font-medium text-orange-400">10:00</li>
                <li class="font-medium">天際 100</li>
                <li class="text-xs text-gray-400">停留 1 時</li>
              </ul>
              <div class="dropdown p-1">
                <button role="button" class="w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 text-white relative">
                  <EllipsisHorizontalIcon />
                </button>
                <!-- dropdown 控制開關-->
                <ul tabindex="0" class="dropdown-content w-32 bg-white rounded border absolute right-[-12px] top-8 shadow-xl">
                  <li>
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-[#EEEEEE]" href="#">
                      <span class="inline-block w-6 h-6"><CalendarIcon/></span>
                      <p>移到別天</p>
                    </a>  
                  </li>
                  <li>
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-[#EEEEEE]" href="#">
                      <span class="inline-block w-6 h-6"><DocumentDuplicateIcon/></span>
                      <p>複製</p>
                    </a>  
                  </li>
                  <li class="border-t">
                    <a class="flex items-center gap-1 text-sm px-5 py-2 hover:bg-[#EEEEEE]" href="#">
                      <span class="inline-block w-6 h-6"><TrashIcon/></span>
                      <p>刪除</p>
                    </a>  
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- hover:relative feature -->
          <div class="more lg:hidden">
            <div class="h-10 flex justify-between items-center border-t">
              <ul class="flex gap-4 p-3">
                <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer" onclick="edit_place.showModal()">
                  <span class="w-3 h-3"><PencilIcon/></span>
                  <p class="text-xs">編輯</p>
                </li>
                <!-- <EditPlaceModal /> -->
                <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer">
                  <span class="w-3 h-3"><MagnifyingGlassIcon/></span>
                  <p class="text-xs">周邊</p>
                </li>
                <li class="flex items-center text-gray-500 gap-1 hover:cursor-pointer" onclick="place_note_3.showModal()">
                  <span class="w-3 h-3"><BookmarkIcon/></span>
                  <p class="text-xs">筆記</p>
                </li>
                <!-- place note -->
                <dialog id="place_note_3" class="modal">
                  <div class="modal-box min-w-full md:min-w-[480px] min-h-screen md:min-h-[90%]">
                    <form method="dialog">
                      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h2 class="text-2xl font-medium text-center pt-6 mb-4">景點筆記</h2>
                    <textarea class="w-full h-[500px] textarea textarea-lg focus:border-0 focus:outline-none" placeholder="還沒有寫筆記哦"></textarea>
                    <div class="w-full flex gap-3 h-20 px-6 py-4 bg-white border-t fixed bottom-0 right-0">
                      <button class="w-full h-12 px-5 py-3 border border-[#D23430] text-[#D23430] text-center rounded-3xl font-medium hover:bg-[#FDE4E3]">
                        取消
                      </button>
                      <button class="w-full h-12 px-5 py-3 bg-[#D23430] hover:bg-[#B12824] text-white text-center rounded-3xl font-medium">
                        儲存
                      </button>
                    </div>
                  </div>
                  <form method="dialog" class="modal-backdrop">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <button>close</button>
                  </form>
                </dialog> 
              </ul>
              <span class="w-10 h-10 text-gray-500 p-3 border-l hover:cursor-pointer"><MapPinIcon/></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon, ChevronLeftIcon, ArrowUpTrayIcon, UsersIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, BookmarkIcon, CalendarIcon, DocumentDuplicateIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import { EllipsisHorizontalIcon, MapPinIcon } from '@heroicons/vue/24/solid';
import ShareScheduleModal from './ShareScheduleModal.vue'
import EditPlaceModal from './EditPlaceModal.vue'
import DeletePerDayModal from './DeletePerDayModal.vue';
</script>

<style>
.date:hover > .dropdown{
  display: inline;
}
.place:hover > .more{
    display: block;
  }
.w-cal{
  width: calc(100% - 108px);
}
</style>