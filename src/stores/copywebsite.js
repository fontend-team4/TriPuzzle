import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCopyWebsiteStore = defineStore('copyWebsite', () => {
  const copySuccess = ref(false);

  const copyToClipboard = async (placeId) => {
    try {
      const baseDomain = window.location.origin;
      const url = `${baseDomain}/planner?action=placeInfo&placeId=${placeId}`; 
      await navigator.clipboard.writeText(url);
      copySuccess.value = true; 
      alert('已複製到剪貼簿：');

      // 1秒後隱藏提示
      setTimeout(() => {
        copySuccess.value = false;
      }, 1000);
    } catch (error) {
      console.error('複製網址失敗：', error);
      alert('複製網址失敗，請稍後再試');
    }
  };

  return {
    copySuccess,
    copyToClipboard,
  };
});
