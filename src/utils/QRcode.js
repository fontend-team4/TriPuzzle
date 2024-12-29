import QRCode from "qrcode";

/**
 * 生成 QR Code 並返回 Base64 字符串
 * @param {string} attractionId - 景點 ID
 * @returns {Promise<string>} - QR Code 的 Base64 字符串
 */
export async function generateQRCode(attractionId) {
  const baseDomain = window.location.origin;
  const url = `${baseDomain}/planner?action=placeInfo&placeId=${attractionId}`;
  console.log("生成的 URL:", url);

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url, { width: 200 });
    console.log("生成的 QR Code Base64 URL:", qrCodeDataUrl);
    return qrCodeDataUrl;
  } catch (error) {
    console.error("生成 QR Code 時出錯：", error);
    throw error;
  }
}
