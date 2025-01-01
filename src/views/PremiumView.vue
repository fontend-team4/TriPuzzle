<script setup>
import { ref, computed } from "vue";
import { PuzzlePieceIcon, CheckIcon } from "@heroicons/vue/20/solid";
import router from "@/router";

const isCardFocused = ref(false);

const handleCardFocus = (status) => {
  isCardFocused.value = status;
};

const btnActivate = computed(() =>
  isCardFocused.value ? ["cursor-pointer, bg-secondary-500"] : ["cursor-not-allowed, bg-primary-300"]
)

const goBackPlanner = ()=>{
  router.push('/planner')
}
</script>

<template>
  <div
    class="relative flex flex-col items-center justify-center h-auto md:h-screen bg-primary-800 focus-container"
  >
  <button href="" @click="goBackPlanner">
    <img src="../assets/svg/logo-light.svg" alt="" class="absolute w-[70px] top-8 md:left-8 -translate-x-1/2 md:translate-x-0" >
  </button>  
    <h1 class="px-4 md:pr-0 text-[32px] text-white hidden md:block mt-8">升級白金會員，享有完整功能！</h1>
    <h1 class="px-4 md:pl-0 text-[32px] text-white  md:hidden mt-32">升級白金會員，</h1>
    <h1 class="px-4 md:pl-0 text-[32px] text-white  md:hidden">享有完整功能！</h1>

    <p class="mt-3 text-white">讓旅圖幫助你成為旅遊達人！</p>
    <div class="flex flex-col w-full gap-8 px-4 my-8 mb-10 md:px-20 md:flex-row">
      <div
        class="card md:w-1/3 w-full bg-white md:h-[500px] h-auto rounded-xl flex flex-col items-center md:py-12 py-4 pb-0 relative hover:border-4 hover:border-slate-300 box-border"
        tabindex="0"
        @focus="handleCardFocus(true)"
        @blur="handleCardFocus(false)"
      >
        <h2 class="mb-6 text-3xl font-bold">小拼圖</h2>
        <div class="flex gap-3">
          <PuzzlePieceIcon class="text-slate-500 size-12" />
          <PuzzlePieceIcon class="text-slate-500 size-12" />
          <PuzzlePieceIcon class="text-slate-200 size-12" />
          <PuzzlePieceIcon class="text-slate-200 size-12" />
          <PuzzlePieceIcon class="text-slate-200 size-12" />
        </div>
        <div class="flex pt-5">
          <CheckIcon class="mr-3 text-lg text-green-400 size-6" /><span class="text-lg">可創建三個行程</span>
        </div>
        <div class="flex pt-5">
          <CheckIcon class="mr-3 text-lg text-green-400 size-6" /><span class="text-lg">可加入三個共編行程</span>
        </div>
        <div class="flex pt-5">
          <CheckIcon class="mr-3 text-lg text-green-400 size-6" /><span class="text-lg">自訂頭像與封面</span>
        </div>
        <p class="z-50 my-5 text-4xl font-extrabold md:absolute text-slate-400 bottom-6">Free!</p>
        <img src="../assets/images/cat-7.png" alt="" class="absolute bottom-0 md:w-[200px] left-0 w-[150px]">
      </div>
      <div
        class="card md:w-1/3 w-full bg-white h-[500px] rounded-xl flex flex-col items-center py-12 relative hover:border-4 hover:border-slate-300 box-border"
        tabindex="0"
        @focus="handleCardFocus(true)"
        @blur="handleCardFocus(false)"
      >
        <h2 class="mb-6 text-3xl font-bold">大拼圖</h2>
        <div class="flex gap-3">
          <PuzzlePieceIcon class="text-primary-500 size-12" />
          <PuzzlePieceIcon class="text-primary-500 size-12" />
          <PuzzlePieceIcon class="text-primary-500 size-12" />
          <PuzzlePieceIcon class="text-primary-200 size-12" />
          <PuzzlePieceIcon class="text-primary-200 size-12" />
        </div>
        <div class="flex pt-5">
          <CheckIcon class="mr-3 text-lg text-green-400 size-6" /><span class="text-lg">可創建十個行程</span>
        </div>
        <div class="flex pt-5">
          <CheckIcon class="mr-3 text-lg text-green-400 size-6" /><span class="text-lg">可加入十個共編行程</span>
        </div>
        <div class="flex pt-5">
          <CheckIcon class="mr-3 text-lg text-green-400 size-6" /><span class="text-lg">自訂頭像與封面</span>
        </div>
        <div class="flex pt-5">
          <CheckIcon class="mr-3 text-lg text-green-400 size-6" /><span class="text-lg">全站無廣告</span>
        </div>
        <p class="absolute z-50 my-5 text-4xl font-extrabold text-primary-400 bottom-6">NT$ 60 / <span class="text-2xl">Month</span></p>
        <img src="../assets/images/cat-6.png" alt="" class="absolute -bottom-5 md:w-[175px] w-[150px] -left-8">
      </div>
      <div
        class="card md:w-1/3 w-full bg-white h-[500px] rounded-xl flex flex-col items-center py-12 relative hover:border-4 hover:border-slate-300 box-border"
        tabindex="0"
        @focus="handleCardFocus(true)"
        @blur="handleCardFocus(false)"
      >
        <h2 class="mb-6 text-3xl font-bold">VIP拼圖達人</h2>
        <div class="flex gap-3">
          <PuzzlePieceIcon class="text-secondary-500 size-12" />
          <PuzzlePieceIcon class="text-secondary-500 size-12" />
          <PuzzlePieceIcon class="text-secondary-500 size-12" />
          <PuzzlePieceIcon class="text-secondary-500 size-12" />
          <PuzzlePieceIcon class="text-secondary-500 size-12" />
        </div>
        <div class="flex pt-5">
          <CheckIcon class="mr-3 text-lg text-green-400 size-6" /><span class="text-lg">無行程創建限制</span>
        </div>
        <div class="flex pt-5">
          <CheckIcon class="mr-3 text-lg text-green-400 size-6" /><span class="text-lg">無行程共編限制</span>
        </div>
        <div class="flex pt-5">
          <CheckIcon class="mr-3 text-lg text-green-400 size-6" /><span class="text-lg">VIP頭像</span>
        </div>
        <div class="flex pt-5">
          <CheckIcon class="mr-3 text-lg text-green-400 size-6" /><span class="text-lg">全站無廣告</span>
        </div>
        <div class="flex pt-5">
          <CheckIcon class="mr-3 text-lg text-green-400 size-6" /><span class="text-lg">解鎖隱藏封面</span>
        </div>
        <p class="absolute my-5 text-4xl font-extrabold text-secondary-400 bottom-6">NT$ 500 / <span class="text-2xl">Year</span></p>
        <img src="../assets/images/cat-8.png" alt="" class="absolute -top-20 w-[175px] right-0">
      </div>
    </div>
    <button
      class="px-8 py-3 mb-8 text-3xl text-white transition-colors duration-300 rounded-full"
      onclick="my_modal_2.showModal()"
      :class="btnActivate"

    >
      馬上升級！
    </button>
    <dialog id="my_modal_2" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold">選擇您的付款方式</h3>
        <div class="py-4">
          <div>
          <input type="radio" id="linepay" name="payment" value="linepay" />
          <label for="linepay" class="pl-3" >Line Pay</label>
        </div>
        <div>
          <input type="radio" id="creditCard" name="payment" value="creditCard"  />
          <label for="creditCard" class="pl-3">信用卡</label>
        </div>
        <button class="mt-3 btn">下一步</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<style scoped>
.card:focus {
  border: 4px solid #f4a300;
}
</style>
