// main.js or main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'; // Import Vuetify styles
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons

const vuetify = createVuetify({
  components,
  directives,
  // You can add global configurations here, e.g., themes, icons
});

const pinia = createPinia()


const app = createApp(App);
app.use(pinia)
app.use(vuetify); // Use Vuetify in your Vue app
app.mount('#app');