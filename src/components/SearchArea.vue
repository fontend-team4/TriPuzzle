<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
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
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">Hello!</h3>
      <p class="py-4">Press ESC key or click outside to close</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <button>close</button>
    </form>
  </dialog>
</template>



<style scoped>
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

  @media screen and (min-width: 1200px) {
  .block-area .btn-area {
    margin:3px 0;
  }
}
</style>