import axios from "axios";

const handleError = (error, message = "操作失敗，請稍後再試") => {
  console.error(message, error);
  alert(message);
};

const API_URL = process.env.VITE_HOST_URL

// 新增地點
const addPlace = async (item) => {
  console.log(item)
  try {
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

    // 新增地點
    await axios.post(`${API_URL}/places`, placeData);
  } catch (error) {
    handleError(error, "新增地點失敗");
  }
}

export {addPlace};
