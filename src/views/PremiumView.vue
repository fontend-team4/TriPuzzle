<script setup>
import '@/assets/loading.css'
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { PuzzlePieceIcon, CheckIcon } from "@heroicons/vue/20/solid";
import { useRouter } from "vue-router";
import { useLoadingStore } from "@/stores/loading"

const loadingStore = useLoadingStore()
const router = useRouter()

const isCard1Focused = ref(false);
const isCard2Focused = ref(false);


const handleCard1Focus = (status) => {
  isCard1Focused.value = status;
};

const handleCard2Focus = (status) => {
  isCard2Focused.value = status;
};

const btn1Activate = computed(() =>
  isCard1Focused.value ? ["cursor-pointer, bg-secondary-500"] : ["cursor-not-allowed, bg-primary-300"]
)
const btn2Activate = computed(() =>
  isCard2Focused.value ? ["cursor-pointer, bg-secondary-500"] : ["cursor-not-allowed, bg-primary-300"]
)

const goBackMember = ()=>{
  router.push('/member')
}

const API_URL = process.env.VITE_HOST_URL;
const userId = localStorage.getItem("userId");
const goCheckout = async (product, amount) => {
  try {
    const productData = {
      userId: userId,
      amount: amount,
      currency: 'TWD',
      packages: [
        {
          id: product,
          amount: amount,
          products: [
            {
              name: product,
              quantity: 1,
              price: amount
            }
          ]
        }
      ]
    }
    const response = await axios.post(`${API_URL}/api/payment`, productData);
    console.log(response.data);
    
    window.location.href = response.data.redirectUrl
  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(() => {
  loadingStore.showLoading();
  setTimeout(() => {
    loadingStore.hideLoading();
  }, 1000);
});
</script>

<template>
  <LoadingOverlay :active="loadingStore.isLoading">
    <div class="loadingio-spinner-ellipsis-nq4q5u6dq7r"><div class="ldio-x2uulkbinbj">
    <div></div><div></div><div></div><div></div><div></div>
    </div></div>
  </LoadingOverlay>
  <div
    class="relative flex flex-col items-center justify-center h-auto md:h-screen bg-primary-800 focus-container"
  >
  <button href="" @click="goBackMember">
    <img src="../assets/svg/logo-light.svg" alt="" class="absolute w-[70px] top-8 md:left-8 -translate-x-1/2 md:translate-x-0" >
  </button>  
    <h1 class="px-4 md:pr-0 text-[32px] text-white hidden md:block mt-8">升級白金會員，享有完整功能！</h1>
    <h1 class="px-4 md:pl-0 text-[32px] text-white  md:hidden mt-32">升級白金會員，
      <br>
      享有完整功能！
    </h1>
    <p class="mt-3 text-white">讓旅圖幫助你成為旅遊達人！</p>
    <div class="flex flex-col w-full gap-8 px-4 my-8 mb-10 md:px-20 md:flex-row">
      <div
        class="card md:w-1/3 w-full bg-white md:h-[550px] h-auto rounded-xl flex flex-col items-center md:py-12 py-4 pb-0 relative hover:border-8 hover:border-slate-300 box-border"
        tabindex="0"
        @focus="handleCardFocus(true)"
        @blur="handleCardFocus(false)"
      >
        <h2 class="mb-6 text-3xl font-bold">小拼圖</h2>
        <div class="flex gap-3 px-8">
          <PuzzlePieceIcon class="text-slate-500 size-12 md:size-10" />
          <PuzzlePieceIcon class="text-slate-500 size-12 md:size-10" />
          <PuzzlePieceIcon class="text-slate-200 size-12 md:size-10" />
          <PuzzlePieceIcon class="text-slate-200 size-12 md:size-10" />
          <PuzzlePieceIcon class="text-slate-200 size-12 md:size-10" />
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
        <p class="z-50 my-5 text-4xl font-extrabold md:absolute text-slate-400 bottom-6 md:bottom-20">Free!</p>
        <img src="../assets/images/cat_opacity_7.png" alt="" class="absolute bottom-0 w-28 md:w-40 -left-4 md:-left-10">
      </div>
      <div
        class="card md:w-1/3 w-full bg-white h-[530px] md:h-[550px] rounded-xl flex flex-col items-center py-12 relative hover:border-8 hover:border-slate-300 box-border"
        tabindex="0"
        @focus="handleCard1Focus(true)"
        @blur="handleCard1Focus(false)"
      >
        <h2 class="mb-6 text-3xl font-bold">大拼圖</h2>
        <div class="flex gap-3 px-8">
          <PuzzlePieceIcon class="text-primary-500 size-12 md:size-10" />
          <PuzzlePieceIcon class="text-primary-500 size-12 md:size-10" />
          <PuzzlePieceIcon class="text-primary-500 size-12 md:size-10" />
          <PuzzlePieceIcon class="text-primary-200 size-12 md:size-10" />
          <PuzzlePieceIcon class="text-primary-200 size-12 md:size-10" />
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
        <p class="z-50 mt-10 md:mt-16 mb-3 text-4xl font-extrabold text-primary-400">NT$ 60 / <span class="text-2xl">Year</span></p>
        <img src="../assets/images/cat_opacity_6.png" alt="" class="absolute bottom-28 md:bottom-36 w-28 md:w-40 -left-2 md:-left-14">
        <button
          class="px-6 py-2 my-4 text-xl text-white transition-colors duration-300 rounded-full"
          :class="btn1Activate"
          @click="goCheckout('大拼圖', 60)"
        >
          馬上升級！
        </button>
      </div>
      <div
        class="card md:w-1/3 w-full bg-white h-[580px] md:h-[550px] rounded-xl flex flex-col items-center py-12 relative hover:border-8 hover:border-slate-300 box-border"
        tabindex="0"
        @focus="handleCard2Focus(true)"
        @blur="handleCard2Focus(false)"
      >
        <h2 class="mb-6 text-3xl font-bold">VIP拼圖達人</h2>
        <div class="flex gap-3 px-8">
          <PuzzlePieceIcon class="text-secondary-500 size-12 md:size-10" />
          <PuzzlePieceIcon class="text-secondary-500 size-12 md:size-10" />
          <PuzzlePieceIcon class="text-secondary-500 size-12 md:size-10" />
          <PuzzlePieceIcon class="text-secondary-500 size-12 md:size-10" />
          <PuzzlePieceIcon class="text-secondary-500 size-12 md:size-10" />
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
        <p class="mt-10 md:mt-5 mb-3 md:mb-2 text-4xl font-extrabold text-secondary-400">NT$ 100 / <span class="text-2xl">Year</span></p>
        <img src="../assets/images/cat_opacity_8.png" alt="" class="absolute -top-14 md:-top-20 w-28 md:w-40 -right-2 md:-right-14">
        <button
          class="px-6 py-2 my-4 text-xl text-white transition-colors duration-300 rounded-full"
          :class="btn2Activate"
          @click="goCheckout('VIP拼圖達人', 100)"
        >
          馬上升級！
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card:focus {
  border: 8px solid #f4a300;
}
</style>
