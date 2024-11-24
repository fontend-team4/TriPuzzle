<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { GlobeAsiaAustraliaIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <header class=" w-80 mx-auto flex flex-col gap-10 mt-10 text-center">
    <nav class=" flex gap-6 underline text-orange-800 font-bold text-xl">
      <RouterLink to="/">HOME</RouterLink>
      <RouterLink to="/planner">PLANNER</RouterLink>
      <RouterLink to="/member">MEMBER</RouterLink>
    </nav>
    <!-- tailwindcss test -->
    <h1 class="text-3xl font-bold underline text-blue-300">
      Tailwindcss test
    </h1>

    <!-- daisyUi test -->
    <!-- Open the modal using ID.showModal() method -->
    <button class="btn" onclick="my_modal_1.showModal()">DaisyUi test Modal</button>
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>

    <!-- heroicon rest -->
    Heroicon test :
    <GlobeAsiaAustraliaIcon class="size-10 text-green-700" />
  </header>
  <RouterView />
</template>


