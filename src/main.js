/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// 테이블 템플릿 Antd import
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'


const app = createApp(App)

// Ant 사용
app.use(Antd)

registerPlugins(app)

app.mount('#app')
