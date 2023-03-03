import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {router} from "./router";
import Element from 'element-plus'
import 'element-plus/dist/index.css'
import {createPinia} from 'pinia'
const app =  createApp(App)

app.use(createPinia()).use(router).use(Element)

app.mount('#app')
