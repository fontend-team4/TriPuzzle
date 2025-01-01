import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate" 

 
 


import App from "./App.vue"
import router from "./router"

const app = createApp(App)

//統一處理錯誤
app.config.errorHandler = (err, instance, info) => {
  console.log("捕獲全局錯誤:", err)
  console.log("出錯的元件:", instance)
  console.log("錯誤訊息:", info)
}


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) 

app.use(pinia) 
app.use(router)


app.mount("#app")
