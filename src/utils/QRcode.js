import QRCode from "qrcode"; // spell-checker: disable

/**
 * 生成 QR Code 並返回 Base64 字符串
 * @param {string} attractionId - 景點 ID // spell-checker: disable-line
 * @returns {Promise<string>} - QR Code 的 Base64 字符串
 */
export async function generateQRCode(attractionId) { // spell-checker: disable-line
  const baseDomain = window.location.origin;
  const url = `${baseDomain}/planner?action=placeInfo&placeId=${attractionId}`; // spell-checker: disable-line
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url, { width: 200 });
    return qrCodeDataUrl;
  } catch (error) {
    console.error("生成 QR Code 時出錯：", error);
  }
}
//邀請共同編輯QR Code
export async function generateShareQRCode(shareLink) {
  const url = shareLink;
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url, { width: 200 });
    return qrCodeDataUrl;
  } catch (error) {
    console.error("生成 QR Code 時出錯：", error);
  }
}