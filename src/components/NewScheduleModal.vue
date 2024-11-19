<script setup>
import ScheduleCoverImgModal from './ScheduleCoverImgModal.vue';
</script>


<template>
  <button class="btn" onclick="my_modal_2.showModal()">建立行程</button>
<dialog id="my_modal_2" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 class="text-lg font-bold">Hello!</h3>
    <p class="py-4">Press ESC key or click outside to close</p>
    <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    <button>close</button>
  </form>
</dialog>
  <div>
    <header></header>
  
  </div>
</template>