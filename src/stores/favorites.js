import { ref } from "vue";
import axios from "axios";
import { LoginModalStore } from '@/stores/LoginModal.js'
import { Phone } from "@iconoir/vue";
import { useRouter } from "vue-router";
import { head, set } from "lodash";


const API_URL = process.env.VITE_HOST_URL
const favorites = ref([]); 
const setFavorites = ref([]);
const userId = ref(localStorage.getItem("userId"));
const token = localStorage.getItem("token"); 

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
let updateQueue = []; // 批量更新操作隊列
let isProcessing = false;

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

    // 將收藏資料存入 localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  } catch (error) {
    console.error("無法加載收藏資料:", error);
  }
};

// 將收藏操作加入批量更新隊列
const addToQueue = (place, action) => {
  updateQueue.push({ place_id: place.place_id || place.id, action, place });
};

// 批量發送更新請求
const processBatchUpdates = async () => {
  if (isProcessing || updateQueue.length === 0) return;
  isProcessing = true;

  const batchUpdates = [...updateQueue];
  updateQueue = []; // 清空隊列

  try {
    await axios.post(`${API_URL}/favorites/batchUpdate`, {
      updates: batchUpdates,
    }, {
      headers: { Authorization: token },
    });

    // 更新 favorites 列表
    batchUpdates.forEach((update) => {
      if (update.action === "add") {
        favorites.value.push(update.place);
      } else if (update.action === "remove") {
        favorites.value = favorites.value.filter((fav) => fav.place_id !== update.place_id);
      }
    });

    updateLocalStorage();
  } catch (error) {
    console.error("批量更新失敗:", error);
    updateQueue = [...batchUpdates, ...updateQueue]; // 失敗時將操作重新加入隊列
  } finally {
    isProcessing = false;
  }
};

// 收藏按鈕切換
const toggleFavoriteStatus = (place) => {
  const wasFavorited = place.isFavorited;
  place.isFavorited = !wasFavorited;

  addToQueue(place, wasFavorited ? "remove" : "add");
  updateLocalStorage(); // 更新 localStorage，但請求等路徑變更時再發送
};

// 路徑變更時發送批量請求
const setupRouteWatcher = () => {
  const router = useRouter();

  router.afterEach(() => {
    if (updateQueue.length > 0) {
      processBatchUpdates();
    }
  });
};

const updateLocalStorage = () => {
  localStorage.setItem("setFavorites", JSON.stringify(favorites.value));
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
      image_url: item.photos || null,
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

    await axios.delete(`${API_URL}/favorites`, {
      data: {
        favorite_user: Number(userId.value),
        favorite_places: placeId,
      },
      headers,
    });
    await loadFavorites(); // 重新載入收藏列表

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


export { loadFavorites, toggleFavoriteStatus, setupRouteWatcher, favorites,generateImageUrl,addToQueue,processBatchUpdates  };


