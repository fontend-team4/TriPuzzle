<script setup>
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, ChevronDownIcon,XCircleIcon } from '@heroicons/vue/24/solid'
import CategoryFilter from './CategoryFilter.vue';
import SearchArea from './SearchArea.vue';
</script>

<template>
  <!-- 區塊-搜尋列 -->
  <div class="row-search">
    <div class="container-search searchbar">
      <!-- 搜尋列-分類模式 -->
      <div class="search-category">
        <!-- 選單-選擇區域 -->
        <SearchArea />
        <!-- 搜尋列 -->
        <div class="block-search-mask">
          <MagnifyingGlassIcon class="Icon-MagnifyingGlass" />
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
          <button type="button" class="filter-btn">
            <AdjustmentsHorizontalIcon  class="Icon-Filter icon text-black" />
          </button>
        </div>
      </div>
      <!-- 搜尋列- 關鍵字模式 -->
      <!-- v-if -->
      <div class="search-keyword">
        <div class="block-search-group">
          <div class="block-search focus">
            <MagnifyingGlassIcon class="Icon-MagnifyingGlass icon"/>
            <div class="el-input search-input">
              <div class="el-input__wrapper">
                <input class="el-input_inner" type="text" autocomplete="off" tabindex="0" placeholder="輸入關鍵字" id="">
              </div>
            </div>
            <XCircleIcon class="Icon-clear" />
          </div>
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

  .row-search{
    display: inline-flex;
    padding-top: 16px;
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

  .search-keyword {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 40px;
    width: 100%;
    animation: fade-in .6s
}

  .search-keyword .block-search-group {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 40px;
    width: 100%;
    /* padding: 4px 0 4px 4px;
    border: 1px solid rgba(45,64,87,.1); */
    border-radius: 100px
  }


  .block-search{
    position: relative;
    display: flex;
    align-items: center;
  }

  .block-search.focus{
    width: 100%;
  }

  .block-search .icon{
    position: absolute;
    top: 7px;
    left: 5px;
    width: 18px;
    height: 18px;
    color: #2d405766;
    fill:currentColor;
  }

  .block-search .search-input {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #2d4057
  }

  .block-search .search-input .el-input__wrapper {
    position: relative;
    box-shadow: none;
    padding: 8px 28px;
    background: transparent;
    width: 100%;
  }

  .el-input{
    height: 32px;
    position: relative;
    display: inline-flex;
    vertical-align: middle;
  }

  .el-input__wrapper{
    display: inline-flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    border-radius: 4px, 4px;
  }

  .el-input_inner{
    height: 22px;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #2d4057;
    width: 100%;
    flex-grow: 1;
    padding: 0;
    outline: 0;
    border: none;
    background: 0 0;
    box-sizing: border-box;
  }

  .Icon-clear{
    width: 1em;
    min-height: 1em;
    position: absolute;
    top: 7px;
    right: 8px;
    color: #959ca4;
    cursor: pointer;
    
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
    cursor:text;
}

  .Icon-MagnifyingGlass{
    width: 24px;
    height: 24px;
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
    padding: 6px 0;
    cursor: pointer;
    transition: .3s;
    border-bottom: 2px solid transparent;
    white-space: nowrap
}
  /* 顯示頁面 */
  .block-category .category-item.active {
    color: #D23430;
    border-bottom: 2px solid #D23430;
    pointer-events: none;
  }

  .block-filter {
    margin-left: auto;
    padding-top: 3px;
  }

  .filter-btn{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    box-sizing: border-box;
    border: none;
    cursor: pointer;
    transition: .3s;
    padding: 0
  }

  .Icon-Filter{
    width: 1em;
    height: 1em;
    fill: currentColor;
  }

@media screen and (min-width: 1200px) {
  .row-search {
    align-items:center;
    padding-top: 0;
    justify-content: center;
    width: calc(100% - 124px)
  }

  .container-search {
    border:1px solid rgba(45,64,87,.1);
    box-shadow: 0 4px 16px #00000014;
    border-radius: 100px;
    overflow: hidden;
  }

  .search-category {
    padding:0 16px 0 4px;
    animation: fade-in-up .4s
  }

  .search-keyword {
    padding:0 4px;
    animation: fade-in-down .4s;
  }

  .search-keyword .block-search-group {
    padding:0;
    border: none;
  }

  .Icon-clear {
    right: 16px;
  }

  .block-area {
    padding-right:0;
  }


  
  .block-category {
    border-left:1px solid rgba(45,64,87,.1);
    width: 100%;
  }
  .block-category .category-list {
    padding:0 0 0 16px;
  }

  /*顯示滾動條  */
  .block-category .category-list.block-category::-webkit-scrollbar {
    padding:0 70px 0 16px
  }

  .category-item:hover:not(.active) {
    color: gray;
    border-bottom: 2px solid #D23430
  }

  .block-filter{
    padding-left:8px
  }
}
</style>