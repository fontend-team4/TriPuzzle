import { defineStore } from "pinia"
import { ref } from "vue"

export const LoginModalStore = defineStore("LoginDialog", () => {
  const isOpen = ref(false)
  const onLoginSuccess = ref(null) // 定義登入成功的回調函數

  const openModal = () => {
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
  }

  const toggleModal = () => {
    isOpen.value = !isOpen.value
  }

  // 處理登入成功
  const loginSuccess = (newToken, newUserId) => {
    if (onLoginSuccess.value) {
      onLoginSuccess.value(newToken, newUserId) // 執行回調
    }
    closeModal() // 登入成功後關閉模態框
  }

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    onLoginSuccess,
    loginSuccess,
  }
})
