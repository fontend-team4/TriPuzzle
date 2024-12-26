import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCopyWebsiteStore = defineStore('copyWebsite', () => {
  const copySuccess = ref(false);

  const copyToClipboard = async (placeId) => {
    try {
      const baseDomain = window.location.origin; // 當前網域
      const url = `${baseDomain}/planner?action=placeInfo&placeId=${placeId}`; // 組裝 URL
      await navigator.clipboard.writeText(url); // 複製到剪貼簿
      copySuccess.value = true; // 顯示成功訊息
      alert('已複製到剪貼簿：');

      // 成功提示 2 秒後隱藏
      setTimeout(() => {
        copySuccess.value = false;
      }, 2000);
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
