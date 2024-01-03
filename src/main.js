import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { getAuth } from "firebase/auth";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const auth = getAuth();

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);
app.use(router)

app.mount('#app')
