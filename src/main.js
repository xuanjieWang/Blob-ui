import './assets/css/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
const app = createApp(App)

import 'ant-design-vue/dist/reset.css'

// 引入Tailwindcss
import 'tailwindcss/components.css'
import 'tailwindcss/utilities.css'
import './assets/css/tailwind.css'

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
