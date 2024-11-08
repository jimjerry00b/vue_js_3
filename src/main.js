import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import MyComponent from './components/MyComponent.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; 

const app = createApp(App)

app.use(createPinia())
app.use(router)


app.config.globalProperties.$api_base_url = 'http://localhost:8000/api/';
app.config.globalProperties.$token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

app.mount('#app')
app.component('MyComponent', MyComponent);
