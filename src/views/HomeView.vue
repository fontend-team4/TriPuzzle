<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Carousel from '@/components/Carousel.vue'
import Features from '@/components/Features.vue'
import Tutorial from '@/components/Tutorial.vue'
import Footer from '@/components/Footer.vue'

const carousel = ref(null)
const features = ref(null)
const tutorial = ref(null)
const register = ref(null)
const handleScroll = (sectionName) => {
  if (sectionName === 'carousel') {
    carousel.value?.scrollIntoView({ behavior: 'smooth' })
  } else if (sectionName === 'features') {
    features.value?.scrollIntoView({ behavior: 'smooth' })
  } else if (sectionName === 'tutorial') {
    tutorial.value?.scrollIntoView({ behavior: 'smooth' })
  } else if (sectionName === 'register') {
    register.value?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <main class="bg-white">
    <Navbar @scrollTo="handleScroll" />
    <img src="@/assets/SVG/banner.webp" />
    <Carousel ref="carousel" />
    <Features ref="features" />
    <Tutorial ref="tutorial" />
    <Footer ref="register" />
  </main>
</template>
