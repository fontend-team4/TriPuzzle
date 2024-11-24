<script setup>
import Navbar from '@/components/Navbar.vue'
import Carousel from '@/components/Carousel.vue'
import Features from '@/components/Features.vue'
import Tutorial from '@/components/Tutorial.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <main class="bg-white">
    <Navbar />
    <img src="@/assets/banner.webp" alt="" />
    <Carousel />
    <Features />
    <Tutorial />
    <Footer />
  </main>
</template>
