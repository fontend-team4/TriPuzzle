<script setup>
import { PlusCircleIcon  } from "@heroicons/vue/24/solid";
</script>

<template>
  <button class="btn  text-white text-lg bg-secondary-500 rounded-full
  hover:bg-secondary-600" 
  onclick="my_modal.showModal()">加入行程 <PlusCircleIcon class="size-6"/>  </button>

  <dialog id="my_modal" class="modal">
    <div class=
        " h-[100vh] mt-[-24px] w-full lg:max-h-[800px] lg:max-w-[1000px] lg:mx-auto lg:mb-[calc(100vh/8)] bg-white lg:flex md:rounded-md overflow-hidden">
      <div class="hidden lg:block lg:w-2/3 lg:bg-[#F2F4F8]">
          <div class="flex h-full">
            <img src="https://web.chictrip.com.tw/assets/join_placeholder.2950886f.png" class="m-auto">
          </div>
      </div>    
      <div class="w-full h-full px-[15px] py-[8px] sticky top-0 mr-0 lg:w-1/3 flex-wrap" >
        <form method="dialog">
          <h2 class="mt-[30px] ml-[10px] text-2xl lg:text-2xl font-semibold">要加在哪?</h2>
          <button
           class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
           <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
             />
           </svg>
          </button>
        </form>
        <div  class="tabs my-[20px] p-2 justify-around flex">
          <p>未完成</p>
        </div>
      </div>
    </div>
 


      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  
 




</template>