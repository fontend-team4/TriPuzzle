import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const URL = import.meta.env.VITE_HOST_URL

const useUserStore = defineStore('user', () => {
  const user = ref('')
  const token = ref('')
  const setUser = (userData) => {
    user.value = userData
  }
  const setToken = (tokenData) => {
    token.value = tokenData
  }
  const getUser = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get(`${URL}/users/profile/0`, {
        headers: { Authorization: token },
      })
      user.value = res.data
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
  return { user, token, setUser, setToken, getUser }
})

export { useUserStore }
