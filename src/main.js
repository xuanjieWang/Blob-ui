import './assets/css/main.scss'
import { createApp } from 'vue'
import store from './stores/index'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// import plugins from './plugins/index' // plugins

// 引入Tailwindcss
import 'tailwindcss/components.css'
import 'tailwindcss/utilities.css'
import './assets/css/tailwind.css'

// 全局组件
import TextButton from '../src/components/TextButton/index.vue'

const app = createApp(App)

app.component('TextButton', TextButton)

app.use(router)
app.use(Antd)
app.use(store)
// app.use(plugins)

app.mount('#app')
