import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
  const user = ref('')
  const token = ref('')
  const setUser = (userData) => {
    user.value = userData
  }
  const setToken = (tokenData) => {
    token.value = tokenData
  }
  return { user, token, setUser, setToken }
})

export { useUserStore }
