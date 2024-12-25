import { ref } from "vue";
import axios from "axios";
import { LoginModalStore } from '@/stores/LoginModal.js'
import { Phone } from "@iconoir/vue";


const LoginStore = LoginModalStore()
const API_URL = "http://localhost:3000";
const favorites = ref([]); 
const userId = ref(localStorage.getItem("userId"));
const token = localStorage.getItem("token"); 

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// 檢查是否已收藏
const isFavorited = (placeId) => {
  return favorites.value.some((fav) => fav.favorite_places === placeId);
};

// 載入收藏列表
const loadFavorites = async () => {
  if (!userId.value || !token) return;

  try {
    const response = await axios.get(`${API_URL}/favorites/${userId.value}`, {
      headers: { Authorization: token },
    });
    favorites.value = response.data; // 更新收藏列表
  } catch (error) {
    console.error("無法加載收藏資料:", error);
  }
};

// 切換收藏狀態
const toggleFavorite = async (item) => {
  if (!userId.value || !token) {
    LoginStore.openModal();
    return;
  }

  const headers = { Authorization: token }; 

  try {
    if (!isFavorited(item.id)) {
      await addFavorite(item, headers);
    } else {
      await removeFavorite(item.id, headers);
    }
  } catch (error) {
    alert("操作失敗，請稍後再試");
  }
};

// 新增收藏
const addFavorite = async (item, headers) => {
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
  await axios.post(`${API_URL}/places`, placeData, { headers });

  const favoriteData = {
    favorite_user: Number(userId.value),
    favorite_places: placeData.place_id,
  };

  const favoriteResponse = 
    await axios.post(`${API_URL}/favorites`,favoriteData,{ headers });

  favorites.value.push({
    favorite_places: placeData.place_id,
    ...favoriteResponse.data,
  });
};

const removeFavorite = async (placeId, headers) => {
  try {
    console.log("嘗試移除收藏:", {
      favorite_user: Number(userId.value),
      favorite_places: placeId,
    });
    console.log("使用的 headers:", headers);

    await axios.delete(`${API_URL}/favorites`, {
      data: {
        favorite_user: Number(userId.value),
        favorite_places: placeId,
      },
      headers,
    });

    console.log("移除地點成功:", placeId);

    favorites.value = favorites.value.filter(
      (fav) => fav.favorite_places !== placeId
    );
  } catch (error) {
    console.error("無法移除收藏:", error);
    throw error; // 傳遞錯誤以便進一步處理
  }
};

const removeFavoriteDirectly = async (place) => {
  if (!userId.value || !token) {
    LoginStore.openModal();
    return;
  }

  try {
    console.log("嘗試直接移除收藏:", place);
    await removeFavorite(place.place_id, { Authorization: token });
  } catch (error) {
    console.error("無法移除收藏:", error);
    alert("移除收藏失敗，請稍後再試");
  }
};

//將image_url格式轉換為URL
const generateImageUrl = (photoReference) => {
  if (!photoReference) return null;
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`;
};


export { favorites, isFavorited, loadFavorites, toggleFavorite, removeFavoriteDirectly,generateImageUrl };



