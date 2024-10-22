import './assets/css/main.scss'
import { createApp } from 'vue'
import store from './stores/index'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { createI18n } from 'vue-i18n'
// import plugins from './plugins/index' // plugins

// 引入Tailwindcss
import 'tailwindcss/components.css'
import 'tailwindcss/utilities.css'
import './assets/css/tailwind.css'

// 全局组件
import TextButton from '../src/components/TextButton/index.vue'
import MarkdownRenderer from './components/MarkdownRenderer/index.vue'

// 导入语言文件
import en from './assets/i18n/en.json'
import cn from './assets/i18n/cn.json'

// 创建 i18n 实例
const i18n = createI18n({
  locale: 'en', // 设置默认语言
  messages: {
    en,
    cn
  }
})

const app = createApp(App)

app.component('TextButton', TextButton)
app.component('MarkdownRenderer', MarkdownRenderer)

app.use(router)
app.use(Antd)
app.use(store)
// app.use(plugins)
// 使用 i18n 插件
app.use(i18n)

app.mount('#app')
