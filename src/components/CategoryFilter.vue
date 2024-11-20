<script setup>
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid'
</script>

<template>

  <div class="block-filter">
    <button type="button" class="filter-btn" onclick="CategoryFilter.showModal()">
      <AdjustmentsHorizontalIcon  class="Icon-Filter icon text-black" />
    </button>
  </div>

  <dialog id="CategoryFilter" class="modal">
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

  @media screen and (min-width: 1200px){
    .block-filter{
      padding-left:8px
    }
  }
</style>