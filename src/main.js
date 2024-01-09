import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { getAuth } from "firebase/auth";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { MaskInput } from 'vue-3-mask';
const auth = getAuth();

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);
app.use(router)
app.component('MaskInput', MaskInput);
app.mount('#app')
