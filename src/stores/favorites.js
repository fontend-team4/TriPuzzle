import { ref } from "vue";
import axios from "axios";
import { LoginModalStore } from '@/stores/LoginModal.js'
import { Phone } from "@iconoir/vue";


const API_URL = process.env.VITE_HOST_URL
const favorites = ref([]); 
const userId = ref(localStorage.getItem("userId"));
const token = localStorage.getItem("token"); 

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;


const handleError = (error, message = "操作失敗，請稍後再試") => {
  console.error(message, error);
};


// 載入收藏列表
const loadFavorites = async () => {
  if (!userId.value || !token) return;

  try {
    const response = await axios.get(`${API_URL}/favorites/${userId.value}`, {
      headers: { Authorization: token },
    });

    // 初始化收藏地點的 isFavorited 屬性
    favorites.value = response.data.map((favorite) => ({
      ...favorite.places,
      isFavorited: true, // 收藏地點默認為已收藏
    }));
    console.log("收藏列表已更新:", favorites.value);
  } catch (error) {
    console.error("無法加載收藏資料:", error);
  }
};


// 切換收藏狀態
const toggleFavorite = async (item) => {
  const LoginStore = LoginModalStore();
  if (!userId.value || !token) {
    LoginStore.openModal();
    return;
  }
  const headers = { Authorization: token };

  try {
    if (!item.isFavorited) {
      await addFavorite(item, headers);
      item.isFavorited = true; // 更新狀態為已收藏
    } else {
      await removeFavorite(item.id, headers);
      item.isFavorited = false; // 更新狀態為未收藏
    }
  } catch (error) {
    handleError(error, "切換收藏狀態失敗");
  }
};

const antitoggleFavorite = async (place) => {
  const headers = { Authorization: token };

  try {
    if (place.isFavorited) {
      // 已收藏，執行移除收藏操作
      await removeFavorite(place.place_id, headers);
      place.isFavorited = false; // 更新狀態為未收藏
    } else {
      // 未收藏，執行新增收藏操作
      await favoriteResponse(
        {
          favorite_user: Number(userId.value),
          favorite_places: place.place_id,
        },
        headers
      );
      place.isFavorited = true; // 更新狀態為已收藏
    }
  } catch (error) {
    handleError(error, "切換收藏狀態失敗");
  }
};


// 新增收藏
const favoriteResponse = async (favoriteData, headers) =>{
  try {
    await axios.post(`${API_URL}/favorites`,favoriteData,{ headers })
      favorites.value.push({
        favorite_places: favoriteData.place_id,
        ...favoriteResponse.data,
      })
      await loadFavorites(); // 重新載入收藏列表
      console.log("新增收藏成功:", favoriteData);
    } catch (error) {
      handleError(error, "新增收藏失敗");
  }
}

// 新增地點與收藏
const addFavorite = async (item, headers) => {
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
    await axios.post(`${API_URL}/places`, placeData, { headers });

    const favoriteData = {
      favorite_user: Number(userId.value),
      favorite_places: placeData.place_id,
    };

    const favoriteResponse = await axios.post(
      `${API_URL}/favorites`,
      favoriteData,
      { headers }
    );

    favorites.value.push({
      favorite_places: placeData.place_id,
      ...favoriteResponse.data,
    });
    await loadFavorites(); // 重新載入收藏列表
  } catch (error) {
    handleError(error, "新增收藏失敗");
  }
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
    await loadFavorites(); // 重新載入收藏列表
    console.log("移除地點成功:", placeId);

    favorites.value = favorites.value.filter(
      (fav) => fav.favorite_places !== placeId
    );
  } catch (error) {
    console.error("無法移除收藏:", error);
    throw error; // 傳遞錯誤以便進一步處理
  }
};


//將image_url格式轉換為URL
const generateImageUrl = (photoReference) => {
  if (!photoReference) return null;
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`;

};


export { favorites, loadFavorites, toggleFavorite, antitoggleFavorite, generateImageUrl };



