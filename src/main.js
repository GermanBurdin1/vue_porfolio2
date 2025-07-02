import "./scss/style.scss"
import {createApp} from "vue"
import { createPinia } from 'pinia'
import router from '/src/router/index.js'
import App from "/src/vue/stack/App.vue"

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount("#app")