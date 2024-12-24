import { ref } from "vue";
import axios from "axios";
import { LoginModalStore } from '@/stores/LoginModal.js'

const LoginStore = LoginModalStore()
const API_URL = "http://localhost:3000";
const favorites = ref([]); 
const userId = ref(localStorage.getItem("userId"));
const token = localStorage.getItem("token"); 

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
    console.error("操作失敗:", error);
    alert("操作失敗，請稍後再試");
  }
};

// 新增收藏
const addFavorite = async (item, headers) => {
  const placeData = {
    place_id: item.id,
    name: item.name,
    image_url: item.url,
    address: item.location,
    rating: item.rating,
    google_map_url: item.mapUrl,
  };

  console.log('placeData', placeData)

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
  await axios.delete(`${API_URL}/favorites`, {
    data: {
      favorite_user: Number(userId.value),
      favorite_places: placeId,
    },
    headers,
  });

  console.log('移除地點', placeId)
  favorites.value = favorites.value.filter(
    (fav) => fav.favorite_places !== placeId
  );
};



export { favorites, isFavorited, loadFavorites, toggleFavorite };
