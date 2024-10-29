// src/main.js

import "./assets/tailwind.css";
import '@mdi/font/css/materialdesignicons.css';
import 'leaflet/dist/leaflet.css';


import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; // Import the store

const app = createApp(App);

// Use the router and the store
app.use(router);
app.use(store);

app.mount("#app");
