<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Carousel from '@/components/Carousel.vue'
import Features from '@/components/Features.vue'
import Tutorial from '@/components/Tutorial.vue'
import Footer from '@/components/Footer.vue'

const top = ref(null)
const carousel = ref(null)
const features = ref(null)
const tutorial = ref(null)
const register = ref(null)
const scrollToAnchor = (sectionName) => {
  if (sectionName === 'carousel') {
    carousel.value?.scrollIntoView({ behavior: 'smooth' })
  } else if (sectionName === 'features') {
    features.value?.scrollIntoView({ behavior: 'smooth' })
  } else if (sectionName === 'tutorial') {
    tutorial.value?.scrollIntoView({ behavior: 'smooth' })
  } else if (sectionName === 'register') {
    register.value?.scrollIntoView({ behavior: 'smooth' })
  } else if (sectionName === 'top') {
    top.value?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <main class="bg-white">
    <Navbar @clickTab="scrollToAnchor" class="sticky top-0" />
    <img src="@/assets/images/banner.webp" ref="top" />
    <div ref="carousel"><Carousel /></div>
    <div ref="features"><Features /></div>
    <div ref="tutorial"><Tutorial /></div>
    <div ref="register"><Footer /></div>
  </main>
</template>
