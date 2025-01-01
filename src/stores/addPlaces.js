import axios from "axios";

const handleError = (error, message = "操作失敗，請稍後再試") => {
  console.error(message, error);
};

const API_URL = process.env.VITE_HOST_URL

const addPlace = async (item) => {
  const placeData = {
    place_id: item.id,
    name: item.name,
    image_url: item.photos[0]?.photo_reference || null,
    location: item.location,
    rating: item.rating,
    phone: item.phone,
    google_map_url: item.mapUrl,
    opening_hours: item.opening_hours,
    summary: item.summary,
    photos: item.photos,
    photos_length: item.photos.length,
    geometry: item.geometry,
    address: item.address,
    website: item.website,
  };

  try {
    // 查找地點是否已存在於資料庫中
    const existingPlaceResponse = await axios.get(`${API_URL}/places/${item.id}`);
    
    if (existingPlaceResponse.data) {
      return; 
    } 
    // 資料庫中沒有該地點
    await axios.post(`${API_URL}/places`, placeData);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // 如果地點不存在於資料庫中，進行新增
      try {
        await axios.post(`${API_URL}/places`, placeData);
        console.log("地點新增成功");
      } catch (addError) {
        handleError(addError, "地點新增失敗");
      }
    } else {
      handleError(error, "分享地點失敗");
    }
  }
};


export {addPlace};
