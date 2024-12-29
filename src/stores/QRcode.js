import { defineStore } from "pinia";
import QRCode from "qrcode"

export const useQRCodeStore = defineStore("qrcode", {
  state: () => ({
    qrCodeDataUrl: "", // 存入生成的QRCode的URL
  }),
  actions: {
    async generateQRCode(attractionId) {
      const baseDomain = window.location.origin;
      const url = `${baseDomain}/planner?action=placeInfo&placeId=${attractionId}`;
      console.log("url",url)
      try {
        this.qrCodeDataUrl = await QRCode.toDataURL(url, { width: 200 });
        console.log("生成的 Base64 URL:", this.qrCodeDataUrl);

      } catch (error) {
        console.error("生成 QR Code 時出錯：", error);
      }
    },
  },
});
