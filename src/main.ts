// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
import './assets/style.css'
import '@/services/AxiosInterceptorSetup'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserPlus,faSignInAlt,faSignOutAlt,faUser } from '@fortawesome/free-solid-svg-icons'
library.add(faUserPlus,faSignInAlt,faSignOutAlt,faUser)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
