import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './static/fontawesome-free-6.6.0-web/css/all.min.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
