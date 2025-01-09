<script setup>
import SideBar from '@/components/SideBar.vue';
import MapComponent from '@/components/MapComponent.vue';
import MainComponent from '@/components/MainComponent.vue';
import { onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useLoadingStore } from "@/stores/loading"

const loadingStore = useLoadingStore()
const route = useRoute();
const router = useRouter();


const getGoogleToken = () => {
  const token = route.query.token;
  const userId = route.query.userId;
  if (token) {
    localStorage.setItem('token', `Bearer ${token}`);
    localStorage.setItem('userId', userId);
    window.location.href = '/planner';
    return
  }
};

const getLineToken = () => {
  const token = route.query.token;
  const userId = route.query.userId;
  if (token) {
    localStorage.setItem('token', `Bearer ${token}`);
    localStorage.setItem('userId', userId);
    window.location.href = '/planner';
    return
  }
};

onMounted(() => {
  loadingStore.showLoading();
  getGoogleToken();
  getLineToken();
  loadingStore.hideLoading();
});
</script>

<template>
  <LoadingOverlay :active="loadingStore.isLoading">
    <div class="loadingio-spinner-ellipsis-nq4q5u6dq7r"><div class="ldio-x2uulkbinbj">
    <div></div><div></div><div></div><div></div><div></div>
    </div></div>
  </LoadingOverlay>
  <div class="relative h-screen">
    <SideBar />
    <MapComponent map="map"/>
    <MainComponent class="h-screen overflow-hidden" />
    <!-- 渲染子路由內容 -->
    <router-view />
  </div>
</template>
