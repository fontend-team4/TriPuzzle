<script setup>
import SideBar from "@/components/SideBar.vue"
import MapComponent from "@/components/MapComponent.vue"
import MainComponent from "@/components/MainComponent.vue"
import { onMounted } from "vue"
import { useRoute } from "vue-router"
const route = useRoute()

const getGoogleToken = () => {
  const token = route.query.token
  const userId = route.query.userId
  if (token) {
    localStorage.setItem("token", `Bearer ${token}`)
    localStorage.setItem("userId", userId)
  }
}

const getLineToken = () => {
  const token = route.query.token
  const userId = route.query.userId
  if (token) {
    localStorage.setItem("token", `Bearer ${token}`)
    localStorage.setItem("userId", userId)
  }
}

onMounted(() => {
  getGoogleToken()
  getLineToken()
})
</script>

<template>
  <SideBar />
  <MapComponent />
  <MainComponent class="h-screen overflow-hidden" />
</template>
