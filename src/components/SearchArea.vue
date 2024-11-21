<script setup>
import { ChevronDownIcon,MagnifyingGlassIcon,MapPinIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="block-area">
    <div class="btn-area bg-primary-600" onclick="SearchArea.showModal()">
        <span class="text-gray">選擇區域</span>
      <!-- <span> {{ selectArea.name }}</span> 預留功能-->
      <ChevronDownIcon class="Icon-SelectArea text-primary-800"/>
    </div>
  </div>
  
  <dialog id="SearchArea" class="modal">
    <div class="modal-box flex-row w-3/4 h-3/4">
      
        <header class="dialog-header flex">
          <div class="search-keyword">
            <div class="block-search-group">
              <div class="block-search focus">
                <MagnifyingGlassIcon class="Icon-MagnifyingGlass icon"/>
                <div class="el-input search-input">
                  <div class="el-input__wrapper">
                    <input class="el-input_inner" type="text" autocomplete="off" tabindex="0" placeholder="輸入國家/城市/地區" id="">
                  </div>
                </div>
                <XCircleIcon class="Icon-clear" />
              </div>
            </div>
          </div>
        </header>

      <div class="dialog-body flex">
        <!--區塊:左側選單 -->
        <nav class="block-category relative top-2 flex">
          <ul class="category-list flex-col">
            <li class="category-item active">推薦</li>
            <li class="category-item">台灣</li>
            <li class="category-item">日本</li>
            <li class="category-item">韓國</li>
          </ul>
        </nav>
        <!--區塊:國家選單 -->
        <div class="block-content block-promo py-3 flex">
          <div class="section">
            <p class="title pb-2">目前位置</p>
            <div class="tag-list">
              <button class="btn btn-sm btn-neutral rounded-3xl">
                <MapPinIcon class="icon"/>
                <span>找附近</span>
              </button>
            </div>
          </div>
          <div class="section mt-3">
            <p class="title py-2">熱門目的地</p>
            <div class="area-list flex">
              <!-- v-for 地區 -->
              <div class="area-item pr-1">
                <img src="https://fakeimg.pl/100x100/100">
              </div>
              <div class="area-item pr-1">
                <img src="https://fakeimg.pl/100x100/100">
              </div>
              <div class="area-item pr-1">
                <img src="https://fakeimg.pl/100x100/100">
              </div>
              <div class="area-item pr-1">
                <img src="https://fakeimg.pl/100x100/100">
              </div>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <button>close</button>
    </form>
  </dialog>
</template>



<style scoped>
  html *{
    box-sizing: border-box;
  }

  .block-area{
    padding-right: 16px;
  }

  .Icon-SelectArea{
    width: 16px;
    height: 16px;
    color: white;
  }

  .block-area .btn-area {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    padding: 4px 8px 4px 12px;
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
    max-width: calc(100% - 16px);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  /* 搜尋欄 */
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
    width: 100%;
    background-color: white;
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
    background: 0 0 white;
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
    padding: 6px 6px;
    cursor: pointer;
    transition: .3s;
    border-bottom: 2px solid transparent;
    white-space: nowrap
}
  /* 顯示頁面 */
  .block-category .category-item.active {
    color: #D23430;
    border-left: 2px solid #D23430;
    pointer-events: none;
  }

  .block-promo {
    display: flex;
    flex-direction: column;
    width: 100%
  }

  .section{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding:0 0 16px 0 ;
    border-bottom: 1px dashed rgba(90, 101, 114, 0.2);
  }


  .block-category{
    padding-bottom: 5px;
  }
  
  .block-promo .tag-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 12px
  }


  .block-promo .tag-item:hover {
      background-color: #ebeef4
  }

  .btn .icon{
    width: 20px;
    height: 20px;
    color: #369ad9;
    fill: currentColor;
  }

  .block-promo .tag-item.active {
      padding: 4px 12px 4px 8px;
      background-color: #369ad91a;
      color: #369ad9
  }

  .block-promo .tag-item.active .icon[data-v-79bcf428] {
    width: 20px;
    height: 20px;
    color: #369ad9
  }

  @media screen and (min-width: 1200px) {
  .block-area .btn-area {
    margin:3px 0;
  }
}
</style>