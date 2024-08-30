import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './static/fontawesome-free-6.6.0-web/css/all.min.css'
import VueSmoothScroll from 'vue3-smooth-scroll'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSmoothScroll)

app.mount('#app')

window.addEventListener('scroll', function () {
  document.documentElement.classList.add('scroll-active')
  clearTimeout(window.scrollTimeout)
  window.scrollTimeout = setTimeout(function () {
    document.documentElement.classList.remove('scroll-active')
  }, 1000)
})
