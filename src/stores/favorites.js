// stores/favorite.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: []
  }),
  actions: {
    // 新增收藏
    async addFavorite(placeId) {
      try {
        const response = await axios.post('/api/favorites', { placeId })
        this.favorites.push(response.data)
        return response.data
      } catch (error) {
        console.error('收藏失敗', error)
        throw error
      }
    },

    // 取得收藏列表
    async fetchFavorites() {
      try {
        const response = await axios.get('/api/favorites')
        this.favorites = response.data
        return this.favorites
      } catch (error) {
        console.error('取得收藏列表失敗', error)
        throw error
      }
    },

    // 移除收藏
    async removeFavorite(placeId) {
      try {
        await axios.delete(`/api/favorites/${placeId}`)
        this.favorites = this.favorites.filter(f => f.placeId !== placeId)
      } catch (error) {
        console.error('取消收藏失敗', error)
        throw error
      }
    }
  }
})


