import { defineStore } from 'pinia';
import { ref } from 'vue';
import { MessageModalStore } from './MessageModal'

export const useCopyWebsiteStore = defineStore('copyWebsite', () => {
  const messageStore = MessageModalStore()

  const copyToClipboard = async (placeId) => {
    try {
      const baseDomain = window.location.origin;
      const url = `${baseDomain}/planner?action=placeInfo&placeId=${placeId}`; 
      await navigator.clipboard.writeText(url);
      messageStore.messageModal({
        message: '已複製到剪貼簿',
        status: "success",
      })
      
    } catch (error) {
      messageStore.messageModal({
        message: '複製網址失敗，請稍後再試',
        status: "error",
      })
    }
  };

  return {
    copyToClipboard,
  };
});
