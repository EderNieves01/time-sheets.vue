import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { getAuth } from "firebase/auth";

const app = createApp(App)
const auth = getAuth();

app.use(router)

app.mount('#app')
