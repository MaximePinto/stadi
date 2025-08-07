import './assets/main.scss'
import './design-system/styles/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/theme'

const app = createApp(App)

// Configuration Pinia avec persistance
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

// Initialisation du thème au démarrage
const themeStore = useThemeStore()
themeStore.initTheme()

app.mount('#app')
