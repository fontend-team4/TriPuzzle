<script setup>
import { EnvelopeIcon } from '@heroicons/vue/20/solid';
import { PuzzlePieceIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <nav
    class="sticky top-0 z-10 bg-white border-b-2 border-neutral-200 md:block"
  >
    <div class="flex items-center justify-between w-screen py-4 mx-auto">
      <router-link to="/">
        <img
          src="@/assets/svg/Logo.svg"
          class="flex-none ml-8 cursor-pointer"
          @click="clickTab('top')"
        />
      </router-link>
      <router-link to="/planner">
        <button
          class="flex items-center gap-1 px-5 py-2 ml-4 mr-8 text-base rounded-full bg-primary-800 text-neutral-50 hover:bg-primary-600"
        >
          <PuzzlePieceIcon class="w-5 h-5 text-neutral-50" />
          拼湊旅圖
        </button>
      </router-link>
    </div>
  </nav>

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
      <div class="self-center col-span-3 col-start-3">
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
    <div class="p-10 md:hidden lg:hidden bg-primary-900">
      <div class="z-40 pt-2 pl-2 pr-2">
        <h2 class="text-xl font-bold text-secondary-500">為什麼會有旅圖？</h2>
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

    <div class="h-[5vh] bg-primary-200 w-screen md:h-[5vh] lg:h-[15vh]"></div>
    <h2
      class="lg:hidden text-primary-700 text-4xl font-bold h-[12vh] flex items-center justify-center pt-6 w-screen"
    >
      團隊成員
    </h2>
    <div class="flex w-screen">
      <section class="grid grid-cols-12 py-10 mx-auto place-content-around">
        <div
          class="flex flex-col items-center col-span-12 col-start-1 gap-8 px-20 py-8 mx-4 mb-6 bg-primary-100 md:col-start-1 md:col-span-6 lg:col-start-1 lg:col-span-4"
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
            <p>Distance Matrix API 計算最短路徑邏輯判斷</p>
            <p>Direction API 繪製行程路線</p>
          </span>
          <div class="flex">
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
          class="items-center justify-center hidden col-span-8 col-start-5 place-content-around lg:flex"
        >
          <h2 class="text-6xl font-bold text-primary-700">團隊成員</h2>
        </div>
        <div
          class="flex flex-col items-center col-span-12 col-start-1 gap-8 px-20 py-8 mx-4 mb-6 bg-primary-100 md:col-start-7 md:col-span-6 lg:col-start-1 lg:col-span-4"
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
            <img
              src="@/assets/images/github.png"
              class="w-[28px] group-hover:hidden"
            />
            <img
              src="@/assets/images/github_grey.png"
              class="w-[28px] hidden group-hover:block"
            />
            <a
              href="mailto:huiwenhuang1998@gmail.com"
              class="text-zinc-800 hover:text-zinc-500"
            >
              <EnvelopeIcon class="size-6" />
            </a>
          </div>
        </div>
        <div
          class="flex flex-col items-center col-span-12 col-start-1 gap-8 px-20 py-8 mx-4 mb-6 bg-primary-100 md:col-start-1 md:col-span-6 lg:col-start-5 lg:col-span-4"
        >
          <img
            src="@/assets/images/member3.jpg"
            class="rounded-full w-[160px]"
          />
          <h3 class="text-2xl text-zinc-800">張綺恩</h3>
          <span class="flex flex-col items-center text-zinc-500">
            <p>地圖、瀑布流同步渲染</p>
            <p>共同編輯功能</p>
            <p>Google Maps Marker設置</p>
            <p>景點詳細資料渲染</p>
            <p>建立總行程後端API</p>
          </span>
          <div class="flex">
            <img
              src="@/assets/images/github.png"
              class="w-[28px] group-hover:hidden"
            />
            <img
              src="@/assets/images/github_grey.png"
              class="w-[28px] hidden group-hover:block"
            />
            <a
              href="mailto:lemonmaggiex@gmail.com"
              class="text-zinc-800 hover:text-zinc-500"
            >
              <EnvelopeIcon class="size-6" />
            </a>
          </div>
        </div>
        <div
          class="flex flex-col items-center col-span-12 col-start-1 gap-8 px-20 py-8 mx-4 mb-6 bg-primary-100 md:col-start-7 md:col-span-6 lg:col-start-9 lg:col-span-4"
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
            <img
              src="@/assets/images/github.png"
              class="w-[28px] group-hover:hidden"
            />
            <img
              src="@/assets/images/github_grey.png"
              class="w-[28px] hidden group-hover:block"
            />
            <a
              href="mailto:timothy9am@gmail.com"
              class="text-zinc-800 hover:text-zinc-500"
            >
              <EnvelopeIcon class="size-6" />
            </a>
          </div>
        </div>
        <div
          class="flex flex-col items-center col-span-12 col-start-1 gap-8 px-20 py-8 mx-4 mb-6 bg-primary-100 md:col-start-1 md:col-span-6 lg:col-start-1 lg:col-span-4"
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
          class="flex flex-col items-center col-span-12 col-start-1 gap-8 px-20 py-8 mx-4 mb-6 bg-primary-100 md:col-start-7 md:col-span-6 lg:col-start-5 lg:col-span-4"
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
          class="flex flex-col items-center col-span-12 col-start-1 gap-8 px-20 py-8 mx-4 mb-6 bg-primary-100 md:col-start-7 md:col-span-6 lg:col-start-9 lg:col-span-4"
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
    <div
      class="h-[5vh] md:block lg:block bg-primary-200 w-screen md:h-[5vh] lg:h-[15vh]"
    ></div>
    <footer class="pt-5 bg-gradient-to-t from-primary-50 md:pt-10">
      <div class="relative w-full px-4 mx-auto md:w-9/12 md:max-w-7xl md:px-0">
        <div class="flex items-center justify-center gap-3 mb-5 md:flex-col">
          <h1
            class="text-lg font-bold text-center text-neutral-800 sm:text-xl md:text-3xl md:mb-10"
          >
            <span class="text-primary-800">旅圖</span>
            ，旅程從這裡開始
            <br />
            讓我們一起拼湊出你的旅途
          </h1>
        </div>
        <div class="py-4 border-t-2 border-neutral-200 md:py-7">
          <p
            class="text-primary-800 text-[9px] text-center font-bold md:text-sm"
          >
            ©2024 旅圖 TriPuzzle, all rights reserved. Powered by NO.4
            Corporation.
          </p>
        </div>
        <img
          src="@/assets/svg/FooterIllustration1.svg"
          class="scale-75 absolute top-32 -left-[150px] hidden lg:block xl:scale-100 xl:top-[100px] xl:-left-32"
        />
        <img
          src="@/assets/svg/FooterIllustration2.svg"
          class="scale-75 absolute top-14 -right-[150px] hidden lg:block xl:scale-100 xl:top-5 xl:-right-[120px]"
        />
      </div>
    </footer>
  </div>
</template>
