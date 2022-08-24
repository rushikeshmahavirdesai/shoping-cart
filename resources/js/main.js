import {  createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";
import App from './App.vue'
import './index.css'
import HomeComponent from "./components/Home.vue";
import AboutComponent from "./components/About.vue";
import CartComponent from "./components/Cart.vue";
const routes= [
    {path:"/", component:HomeComponent},
    {path:"/about", component:AboutComponent},
    {path : "/cart",component:CartComponent}
];
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
   history: createWebHistory(),
    routes, // short for `routes: routes`
  })
const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')

//createApp(App).mount('#app')
