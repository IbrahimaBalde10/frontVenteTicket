/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import store from "./store/store.js"; // Vuex store
// import { createPinia } from 'pinia'
import { createApp } from 'vue'
// import 'chartkick/chart.js';
import Chartkick from 'vue-chartkick';

// import Chartkick from 'vue-chartkick/vue3';
import 'chartkick/chart.js';
loadFonts()


// Create vue app
const app = createApp(App)

// Registering Vuex store and Vue Router with the application
// app.use(Chartkick);
app.use(Chartkick.use(Chartkick));
app.use(store);
app.use(router);

// Use plugins
app.use(vuetify)
// app.use(createPinia())
app.use(router)

// Mount vue app
app.mount('#app')
