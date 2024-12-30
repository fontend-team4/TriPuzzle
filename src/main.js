import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate" // 引入插件

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

//統一處理錯誤
app.config.errorHandler = (err, instance, info) => {
  console.log("捕獲全局錯誤:", err)
  console.log("出錯的元件:", instance)
  console.log("錯誤訊息:", info)
}

// 創建 Pinia 實例並使用插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // 使用 persistedstate 插件

app.use(pinia) // 使用 Pinia
app.use(router)

app.mount("#app")
