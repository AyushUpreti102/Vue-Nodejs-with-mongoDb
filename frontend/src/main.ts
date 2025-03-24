import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from './api'
import VueAxios from 'vue-axios'
import './assets/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)

app.use(router)

app.mount('#app')
