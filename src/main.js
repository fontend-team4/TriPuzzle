import "./assets/main.css"
import { createApp } from "vue"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate" 
import App from "./App.vue"
import router from "./router"
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'


const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) 

app.use(pinia) 
app.use(router)
app.component('LoadingOverlay', Loading)

//統一處理錯誤
app.config.errorHandler = (err, instance, info) => {
  console.log("捕獲全局錯誤:", err)
  console.log("出錯的元件:", instance)
  console.log("錯誤訊息:", info)
}

app.mount("#app")
