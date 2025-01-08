<script setup>
import Footer from '@/components/Footer.vue';
import { EnvelopeIcon } from '@heroicons/vue/20/solid';
import { GlobeAltIcon } from '@heroicons/vue/24/outline';
</script>

<template>
  <router-link to="/">
    <nav class="hidden md:block lg:block z-10 fixed top-4 left-6 group">
      <img
        src="../assets/svg/logo-dark.svg"
        class="opacity-50 group-hover:hidden w-12"
      />
      <img
        src="../assets/svg/logo-light.svg"
        class="w-12 hidden group-hover:block"
      />
    </nav>
    <nav class="md:hidden lg:hidden z-10 fixed top-4 right-6 group">
      <img
        src="../assets/svg/logo-dark.svg"
        class="opacity-50 group-hover:hidden w-7"
      />
      <img
        src="../assets/svg/logo-light.svg"
        class="hidden group-hover:block w-7"
      />
    </nav>
  </router-link>
  <div class="bg-primary-200">
    <img src="@/assets/images/aboutus_WB.png" class="hidden lg:block" />
    <img
      src="@/assets/images/aboutus_TB.png"
      class="hidden md:block lg:hidden"
    />
    <img
      src="@/assets/images/aboutus_MB.png"
      class="block md:hidden lg:hidden max-w"
    />

    <div
      class="hidden md:grid lg:grid grid-cols-12 place-content-around bg-primary-900 h-[600px]"
    >
      <div class="col-start-3 col-span-3 self-center">
        <h2 class="text-secondary-500 font-bold text-xl mb-[10%]">
          為什麼會有旅圖？
        </h2>
        <p class="text-white h-[80%] py-2 min-w-44">
          我們是來自商研院前端應用開發工程師實戰養成班的團隊，成員來自不同背景，共同擁有旅遊熱情。
          <br />
          <br />
          「TriPuzzle
          旅圖」是我們在為期四個月、510小時的課程中，從無到有、運用所學技術開發的。
          <br />
          <br />
          每位成員發揮專長，攜手克服挑戰，將對旅行的熱愛與創意融入專案，並在過程中提升技術、學會協作，造就旅圖的誕生。
        </p>
      </div>
      <img
        src="@/assets/images/cat.png"
        class="w-full lg:col-start-8 md:col-start-8 lg:col-span-3 md:col-span-4 mt-8 self-center lg:max-w-[432px]"
      />
    </div>
    <div class="md:hidden lg:hidden bg-primary-900 p-10">
      <div class="z-40 pr-2 pl-2 pt-2">
        <h2 class="text-secondary-500 font-bold text-xl">為什麼會有旅圖？</h2>
        <p class="text-white h-[80%] py-2 min-w-44">
          我們是來自商研院前端應用開發工程師實戰養成班的團隊，成員來自不同背景，共同擁有旅遊熱情。
          <br />
          <br />
          「TriPuzzle
          旅圖」是我們在為期四個月、510小時的課程中，從無到有、運用所學技術開發的。
          <br />
          <br />
          每位成員發揮專長，攜手克服挑戰，將對旅行的熱愛與創意融入專案，並在過程中提升技術、學會協作，造就旅圖的誕生。
        </p>
      </div>
      <img
        src="@/assets/images/cat_mb.png"
        class="max-w-[200px] mr-[15px] ml-auto mb-[15px]"
      />
    </div>

    <div
      class="hidden md:block lg:block bg-primary-200 w-screen md:h-[5vh] lg:h-[15vh]"
    ></div>
    <h2
      class="lg:hidden text-primary-700 text-4xl font-bold h-[12vh] flex items-center justify-center pt-6 w-screen"
    >
      團隊成員
    </h2>
    <div class="w-screen flex">
      <section class="grid grid-cols-12 mx-auto place-content-around py-10">
        <div
          class="mx-4 mb-6 bg-primary-100 flex flex-col col-start-1 col-span-12 md:col-start-1 md:col-span-6 lg:col-start-1 lg:col-span-4 items-center py-8 px-20 gap-8"
        >
          <img
            src="@/assets/images/member1.jpg"
            class="rounded-full w-[160px]"
          />
          <h3 class="text-2xl text-zinc-800">楊子翬</h3>
          <span class="flex flex-col items-center text-zinc-500">
            <p>前後端登入註冊功能與串接</p>
            <p>JWT 認證、後端部署</p>
            <p>前端加入景點至行程功能</p>
          </span>
          <div class="flex">
            <a
              href="mailto:a1295649555@gmail.com"
              class="text-zinc-800 hover:text-zinc-500"
            >
              <GlobeAltIcon class="size-6" />
            </a>
            <a href="https://github.com/jack8512" class="group">
              <img
                src="@/assets/images/github.png"
                class="w-[28px] group-hover:hidden"
              />
              <img
                src="@/assets/images/github_grey.png"
                class="w-[28px] hidden group-hover:block"
              />
            </a>
            <a
              href="mailto:a1295649555@gmail.com"
              class="text-zinc-800 hover:text-zinc-500"
            >
              <EnvelopeIcon class="size-6" />
            </a>
          </div>
        </div>
        <div
          class="hidden col-span-8 col-start-5 place-content-around lg:flex items-center justify-center"
        >
          <h2 class="text-primary-700 text-6xl font-bold">團隊成員</h2>
        </div>
        <div
          class="mx-4 mb-6 bg-primary-100 flex flex-col col-start-1 col-span-12 md:col-start-7 md:col-span-6 lg:col-start-1 lg:col-span-4 items-center py-8 px-20 gap-8"
        >
          <img
            src="@/assets/images/member2.jpg"
            class="rounded-full w-[160px]"
          />
          <h3 class="text-2xl text-zinc-800">黃慧汶</h3>
          <span class="flex flex-col items-center text-zinc-500">
            <p>AWS 圖片上傳</p>
            <p>LinePay 串接</p>
            <p>會員 & 行程前後端API串接</p>
            <p>專案 & 後端資料庫規劃管理</p>
          </span>
          <div class="flex">
            <a href="" class="text-zinc-800 hover:text-zinc-500">
              <GlobeAltIcon class="size-6" />
            </a>
            <a href="https://github.com/Huiwen-Huang" class="group">
              <img
                src="@/assets/images/github.png"
                class="w-[28px] group-hover:hidden"
              />
              <img
                src="@/assets/images/github_grey.png"
                class="w-[28px] hidden group-hover:block"
              />
            </a>
            <a
              href="mailto:huiwenhuang1998@gmail.com"
              class="text-zinc-800 hover:text-zinc-500"
            >
              <EnvelopeIcon class="size-6" />
            </a>
          </div>
        </div>
        <div
          class="mx-4 mb-6 bg-primary-100 flex flex-col col-start-1 col-span-12 md:col-start-1 md:col-span-6 lg:col-start-5 lg:col-span-4 items-center py-8 px-20 gap-8"
        >
          <img
            src="@/assets/images/member3.jpg"
            class="rounded-full w-[160px]"
          />
          <h3 class="text-2xl text-zinc-800">張綺恩</h3>
          <span class="flex flex-col items-center text-zinc-500">
            <p>Google Map 、瀑布流渲染</p>
            <p>共同編輯功能</p>
            <p>景點詳細資料渲染</p>
          </span>
          <div class="flex">
            <a href="" class="text-zinc-800 hover:text-zinc-500">
              <GlobeAltIcon class="size-6" />
            </a>
            <a href="https://github.com/kmexin" class="group">
              <img
                src="@/assets/images/github.png"
                class="w-[28px] group-hover:hidden"
              />
              <img
                src="@/assets/images/github_grey.png"
                class="w-[28px] hidden group-hover:block"
              />
            </a>
            <a
              href="mailto:lemonmaggiex@gmail.com"
              class="text-zinc-800 hover:text-zinc-500"
            >
              <EnvelopeIcon class="size-6" />
            </a>
          </div>
        </div>
        <div
          class="mx-4 mb-6 bg-primary-100 flex flex-col col-start-1 col-span-12 md:col-start-7 md:col-span-6 lg:col-start-9 lg:col-span-4 items-center py-8 px-20 gap-8"
        >
          <img
            src="@/assets/images/member4.jpg"
            class="rounded-full w-[160px]"
          />
          <h3 class="text-2xl text-zinc-800">陳旻賢</h3>
          <span class="flex flex-col items-center text-zinc-500">
            <p>Google Maps API 串接</p>
            <p>建立後端 API</p>
            <p>首頁製作</p>
          </span>
          <div class="flex">
            <a href="" class="text-zinc-800 hover:text-zinc-500">
              <GlobeAltIcon class="size-6" />
            </a>
            <a href="https://github.com/Timothy9am" class="group">
              <img
                src="@/assets/images/github.png"
                class="w-[28px] group-hover:hidden"
              />
              <img
                src="@/assets/images/github_grey.png"
                class="w-[28px] hidden group-hover:block"
              />
            </a>
            <a
              href="mailto:timothy9am@gmail.com"
              class="text-zinc-800 hover:text-zinc-500"
            >
              <EnvelopeIcon class="size-6" />
            </a>
          </div>
        </div>
        <div
          class="mx-4 mb-6 bg-primary-100 flex flex-col col-start-1 col-span-12 md:col-start-1 md:col-span-6 lg:col-start-1 lg:col-span-4 items-center py-8 px-20 gap-8"
        >
          <img
            src="@/assets/images/member5.jpg"
            class="rounded-full w-[160px]"
          />
          <h3 class="text-2xl text-zinc-800">宋柏叡</h3>
          <span class="flex flex-col items-center text-zinc-500">
            <p>Line、Google 第三方登入</p>
            <p>前端定位功能</p>
            <p>新增單一行程功能</p>
          </span>
          <div class="flex">
            <a href="" class="text-zinc-800 hover:text-zinc-500">
              <GlobeAltIcon class="size-6" />
            </a>
            <a href="https://github.com/bo-ruei" class="group">
              <img
                src="@/assets/images/github.png"
                class="w-[28px] group-hover:hidden"
              />
              <img
                src="@/assets/images/github_grey.png"
                class="w-[28px] hidden group-hover:block"
              />
            </a>
            <a
              href="mailto:aaronaaron12123@gmail.com"
              class="text-zinc-800 hover:text-zinc-500"
            >
              <EnvelopeIcon class="size-6" />
            </a>
          </div>
        </div>
        <div
          class="mx-4 mb-6 bg-primary-100 flex flex-col col-start-1 col-span-12 md:col-start-7 md:col-span-6 lg:col-start-5 lg:col-span-4 items-center py-8 px-20 gap-8"
        >
          <img
            src="@/assets/images/member6.jpg"
            class="rounded-full w-[160px]"
          />
          <h3 class="text-2xl text-zinc-800">張銘原</h3>
          <span class="flex flex-col items-center text-zinc-500">
            <p>分類搜尋功能</p>
            <p>景點收藏 & 分享 QRcode 功能</p>
            <p>分帳攤銷功能</p>
          </span>
          <div class="flex">
            <a href="" class="text-zinc-800 hover:text-zinc-500">
              <GlobeAltIcon class="size-6" />
            </a>
            <a href="https://github.com/rodchang12" class="group">
              <img
                src="@/assets/images/github.png"
                class="w-[28px] group-hover:hidden"
              />
              <img
                src="@/assets/images/github_grey.png"
                class="w-[28px] hidden group-hover:block"
              />
            </a>
            <a
              href="mailto:rodchang1212@gmail.com"
              class="text-zinc-800 hover:text-zinc-500"
            >
              <EnvelopeIcon class="size-6" />
            </a>
          </div>
        </div>
        <div
          class="mx-4 mb-6 bg-primary-100 flex flex-col col-start-1 col-span-12 md:col-start-7 md:col-span-6 lg:col-start-9 lg:col-span-4 items-center py-8 px-20 gap-8"
        >
          <img
            src="@/assets/images/member7.jpg"
            class="rounded-full w-[160px]"
          />
          <h3 class="text-2xl text-zinc-800">李亭潔</h3>
          <span class="flex flex-col items-center text-zinc-500">
            <p>加入行程、關於頁面切版</p>
            <p>後端收藏景點及刪除收藏</p>
            <p>簡報、圖示製作與報告</p>
          </span>
          <div class="flex">
            <a href="" class="text-zinc-800 hover:text-zinc-500">
              <GlobeAltIcon class="size-6" />
            </a>
            <a href="https://github.com/LindseyL222" class="group">
              <img
                src="@/assets/images/github.png"
                class="w-[28px] group-hover:hidden"
              />
              <img
                src="@/assets/images/github_grey.png"
                class="w-[28px] hidden group-hover:block"
              />
            </a>
            <a
              href="mailto:lindsey222lee@gmail.com"
              class="text-zinc-800 hover:text-zinc-500"
            >
              <EnvelopeIcon class="size-6" />
            </a>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>
