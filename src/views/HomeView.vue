<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Carousel from '@/components/Carousel.vue'
import Features from '@/components/Features.vue'
import Tutorial from '@/components/Tutorial.vue'
import Footer from '@/components/Footer.vue'
//建立新行程
import NewScheduleModal from '@/components/NewScheduleModal.vue';

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
<!-- 建立新行程 -->
  <main>
    <NewScheduleModal/>
  </main>

<!-- 認識旅圖 -->
  <main class="bg-white">
    <Navbar @clickTab="scrollToAnchor" />
    <img src="@/assets/images/banner.webp" ref="top" />
    <div ref="carousel"></div>
    <Carousel />
    <div ref="features" class="h-1"></div>
    <Features />
    <div ref="tutorial" class="h-7"></div>
    <Tutorial />
    <div ref="register"></div>
    <Footer />
  </main>
</template>


