<template>
  <dialog id="edit_place" class="modal">
    <div class="modal-box w-screen md:w-[480px]">
      <!-- close button -->
      <form method="dialog">
        <div class="w-full h-10">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </div>
      </form>
      <div class="h-[400px]">
        <h2 class="text-2xl font-medium text-center mb-6">編輯</h2>
        <!-- place title -->
        <div class="px-5 pb-5">
          <input type="text" value="香港杜莎夫人蠟像館" class="text-2xl font-medium">
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <button>close</button>
    </form>
  </dialog>
</template>