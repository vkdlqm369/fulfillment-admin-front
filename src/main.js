import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { registerPlugins } from '@/plugins'
import eventBus from './eventBus'; // 이벤트 버스 임포트

const app = createApp(App)

registerPlugins(app)
app.use(router)
app.use(vuetify)

// 전역 프로퍼티로 이벤트 버스 추가
app.config.globalProperties.$eventBus = eventBus;

app.mount('#app')
