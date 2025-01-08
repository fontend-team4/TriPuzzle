# TriPuzzle 旅圖  
**TriPuzzle 旅圖** 是一個讓家人朋友能夠輕鬆協作、共同打造個人化旅遊的旅遊規劃平台，致力於讓每次的旅行都能充滿共享的樂趣，讓每個瞬間都值得被珍藏！

> 現在就點擊進入 **[TriPuzzle 旅圖](https://tripuzzle-production.up.railway.app/)** 開啟你的旅途！

在首頁我們詳細說明了 **TriPuzzle** 提供您哪些服務
![image](https://tripuzzle-s3.s3.ap-southeast-2.amazonaws.com/coverImages/banner.png)
![image](https://tripuzzle-s3.s3.ap-southeast-2.amazonaws.com/coverImages/home.png)

進到規劃頁面，我們可以透過「動態瀑布流」查看景點
![image](https://tripuzzle-s3.s3.ap-southeast-2.amazonaws.com/coverImages/planner.png)
也可以透過「地圖」查看地標，找到喜歡的景點隨時加入收藏！
![image](https://tripuzzle-s3.s3.ap-southeast-2.amazonaws.com/coverImages/map.png)
（網站景點用圖皆來自 Google Map API，僅供練習專案使用）

## 歡迎來到 TripPuzzle！以下是您使用 TripPuzzle 的重要資訊和步驟指南。

**開始規劃**

1. 註冊 / 登入 ：第三方 or Email 註冊
2. 透過搜尋欄、或是直接在 Google Map 搜尋特定範圍來查看景點資訊
3. 立即規劃：
* 建立行程
* 加入景點
* 安排景點時間
* 選擇共同編輯行程夥伴（ 掃描 QR code or 複製連結邀請 ）
* 收藏喜愛景點

## Git Clone

```sh
git clone https://github.com/fontend-team4/TriPuzzle.git
```

> 此專案為前端專案，後端專案網址 [TriPuzzle_Backend](https://github.com/fontend-team4/TriPuzzle_Backend)

## Project Setup

```sh
npm install
npm run dev
```

## 環境變數可參考 `.env.sample` 檔案
```
VITE_GOOGLE_API_KEY = Google Maps API 金鑰
VITE_HOST_URL= 後端網域
VITE_EMAILJS_PUBLIC_KEY= EMAILJS 相關設定
VITE_EMAILJS_SERVICE_ID= EMAILJS 相關設定
VITE_EMAILJS_TEMPLATE_ID= EMAILJS 相關設定
```

## 網站技術與工具
* 專案規劃
  * Figma
  * GitHub
  * Notion
  * Miro
  * Excalidraw

* 前端開發
  * Vue.js
  * Vite
  * Pinia
  * Tailwind CSS
  * daisyUI

* 後端開發
  * Node.js
  * Express
  * MySQL
  * Prisma
  * AWS S3

* 金流工具
  * LinePay

* 網站部署
  * Railway

## 團隊成員
**宋柏叡**
* Line、Google 第三方登入串接
* 前端地圖定位功能
* 後端「加入景點至行程」API 開發

https://gitHub.com/bo-ruei

**楊子翬**
* 前後端「登入註冊」API 開發與串接
* JWT認證、Railway 後端部署 
* 前端「加入景點至行程」功能串接

https://github.com/jack8512


**張綺恩**
* Google Map、瀑布流景點渲染
* 前後端「行程共同編輯」API 開發與串接 
* 前端「景點詳細資料」渲染

https://gitHub.com/kmexin

**陳旻賢**
* 首頁製作
* Google Map API 串接 
* 前後端「景點搜尋」API 開發與串接

https://gitHub.com/Timothy9am

**黃慧汶**
* AWS S3 後端圖片上傳、Railway 前端部署
* 會員、行程前後端 API 開發與串接 
* 專案、後端資料庫規劃管理

https://gitHub.com/Huiwen-Huang

**張銘原**
* 拖曳物件、分類搜尋功能
* 前後端「景點收藏」API 開發與串接
* 分享景點 QRcode 功能

https://gitHub.com/rodchang12

**李亭潔**
* 加入行程切版
* 後端「收藏及刪除景點」API 開發
* 簡報製作與報告

https://gitHub.com/LindseyL222

