<script setup>
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
import CategoryFilter from './CategoryFilter.vue';
import SearchArea from './SearchArea.vue';
</script>

<template>
  <!-- 區塊-搜尋列 -->
  <div class="row-search">
    <div class="container-search noscroll searchbar">
      <!-- 搜尋列-分類模式 -->
      <div class="search-category">
        <!-- 選單-選擇區域 -->
        <div class="block-area">
          <div data-v-2e6cdc7b class="btn-area">
            <span data-v-2e6cdc7b>選擇區域</span>
            <!-- <span> {{ selectArea.name }}</span> 預留功能-->
            <ChevronDownIcon class="IconSelectArea"/>
          </div>
        </div>
        <!-- 搜尋列 -->
        <div class="block-search-mask hidden-md-and-down">
          <MagnifyingGlassIcon class="IconMagnifyingGlass" />
          <span>搜尋...</span>
        </div>
        <!-- 分類選單 -->
        <div class="block-category">
          <ul class="category-list">
            <li class="category-item active">景點</li>
            <li class="category-item">美食</li>
            <li class="category-item">購物</li>
            <li class="category-item">住宿</li>
            <li class="category-item">租車站</li>
            <li class="category-item">交通站</li>
            <li class="category-item">充電樁</li>
            <li class="category-item">我的最愛</li>
          </ul>
        </div>
        <!-- 篩選 -->
        <div class="block-filter">
          <button data-v-filter type="button" class="filter-btn">
            <AdjustmentsHorizontalIcon data-v-filter class="IconFilter icon" />
          </button>
        </div>
      </div>
    </div>   
  </div>
  
</template>

<style scoped>
  html * {
    box-sizing: border-box;
  }

  div{
    display: block;
  }

  .row-search[data-v-243d8871] {
    display: inline-flex;
    padding-top: 16px
}

  .container-search{
    width: 100%;
    background-color: #fff;
    border:1px solid rgba(45,64,87,.1);
    box-shadow: 0 4px 16px #00000014;
    border-radius: 100px;
  }

  .search-category{
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 40px;
    width: 100%;
    padding:0 16px 0 0;
  }


  .block-area{
    padding-right: 16px;
  }

  .IconSelectArea{
    width: 16px;
    height: 16px;
    color: white;
  }

  .block-area .btn-area[data-v-2e6cdc7b] {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    padding: 4px 8px 4px 12px;
    background: #369ad9;
    border-radius: 24px;
    cursor: pointer;
    transition: .3s;
    margin: 2px 0 4px;
    width: 104px
  }

  .block-area .btn-area span{
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
    max-width: calc(100% - 16px);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .block-search-mask{
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 0 0 16px;
    min-width: 120px;
    height: 100%;
    cursor: text;
  }

  .block-search-mask span {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #2d405766;
    cursor:text;
}

  .IconMagnifyingGlass{
    width: 24px;
    height: 24px;
    color:#2d405766;
  }


  .block-category{
    position: relative;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none
  }

  /* 預設為無 */
  .block-category::-webkit-scrollbar {
    display: none
}

  .block-category .category-list{
    display: inline-flex;
    gap: 16px;
    padding: 0 12px 0 0
  }

  .block-category .category-item{
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #2d405799;
    padding: 6px 0;
    cursor: pointer;
    transition: .3s;
    border-bottom: 2px solid transparent;
    white-space: nowrap
}
  /* 顯示頁面 */
  .block-category .category-item.active {
    color: #2d4057;
    border-bottom: 2px solid #369ad9;
    pointer-events: none
  }

  .block-filter {
    margin-left: auto;
    padding-top: 3px;
  }

  .btn[data-v-filter]{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #fff3;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    box-sizing: border-box;
    border: none;
    cursor: pointer;
    transition: .3s;
    padding: 0
  }

  .IconFilter{
    width: 1em;
    height: 1em;
    color: black;
    fill: currentColor;
  }

  @media screen and (min-width: 1200px) {
  .row-search[data-v-243d8871] {
      align-items:center;
      padding-top: 0;
      justify-content: center;
      width: calc(100% - 124px)
  }

  .container-search[data-v-2e6cdc7b] {
      border:1px solid rgba(45,64,87,.1);
      box-shadow: 0 4px 16px #00000014;
      border-radius: 100px;
      overflow: hidden
  }

  .search-category[data-v-2e6cdc7b] {
      padding:0 16px 0 4px;
      animation: fade-in-up .4s
  }

  .block-area {
      padding-right:0
  }

  .block-area .btn-area[data-v-2e6cdc7b] {
      margin:3px 0
  }
  
  .block-category {
      border-left:1px solid rgba(45,64,87,.1);
      width: 100%
  }
  .block-category .category-list {
      padding:0 0 0 16px
  }

  /*顯示滾動條  */
  .block-category .category-list.block-category::-webkit-scrollbar {
      padding:0 70px 0 16px
  }

  .block-category .category-item:hover:not(.active) {
        color:#2d4057cc;
        border-bottom: 2px solid rgba(54,154,217,.2)
    }

  .block-filter{
      padding-left:8px
  }
}
</style>