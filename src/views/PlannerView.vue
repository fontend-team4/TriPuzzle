<script setup>
import SideBar from '@/components/SideBar.vue'
import MapComponent from '@/components/MapComponent.vue'
import MainComponent from '@/components/MainComponent.vue'
</script>

<template>
  <SideBar />
  <MapComponent />
  <MainComponent class="h-screen overflow-hidden" />
</template>

<!-- <template>
    <div>
      <Main @filters-updated="updateFilters" />
      <Map @map-center-changed="updateMapCenter" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Main from './Main.vue';
  import Map from './Map.vue';
  import axios from 'axios';
  
  const selectedTab = ref('');
  const searchQuery = ref('');
  const mapCenter = ref({ lat: 0, lng: 0 });
  
  // 更新分類與搜尋字串
  const updateFilters = (filters) => {
    selectedTab.value = filters.selectedTab;
    searchQuery.value = filters.searchQuery;
  };
  
  // 更新地圖中心點
  const updateMapCenter = (center) => {
    mapCenter.value = center;
    // 當地圖中心改變時，發送 API 請求
    fetchData();
  };
  
  // 發送 API 請求
  const fetchData = async () => {
    try {
      const response = await axios.post('/api/search', {
        category: selectedTab.value,
        query: searchQuery.value,
        location: mapCenter.value,
      });
      console.log('API 回傳資料:', response.data);
    } catch (error) {
      console.error('API 請求錯誤:', error);
    }
  };
  </script> -->
