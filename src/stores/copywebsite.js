import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCopyWebsiteStore = defineStore('copyWebsite', () => {
  const copySuccess = ref(false);

  const copyToClipboard = async () => {
    try {
      const currentUrl = window.location.href; // 獲取當前網址
      await navigator.clipboard.writeText(currentUrl); // 複製到剪貼簿
      copySuccess.value = true; // 顯示成功訊息
      alert('網址已複製到剪貼簿');
      // 隱藏成功訊息
      setTimeout(() => {
        copySuccess.value = false;
      }, 2000);
    } catch (error) {
      console.error('複製網址失敗：', error);
    }
  };

  return {
    copySuccess,
    copyToClipboard,
  };
});
