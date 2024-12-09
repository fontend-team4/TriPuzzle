<script setup>
import SideBar from '@/components/SideBar.vue';
import MapComponent from '@/components/MapComponent.vue';
import MainComponent from '@/components/MainComponent.vue';
</script>

<template>
    <SideBar />
    <MapComponent />
    <MainComponent class="h-screen overflow-hidden" />
</template>