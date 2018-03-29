import Vue from 'vue';
import App from './App.vue';
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import Routes from "./routes";
import * as firebase from 'firebase';

// Initialize Firebase
let config = {
  apiKey: "AIzaSyBmrTjBdJ44Sm7wiWYIhkarjT6XJMDkq_o",
  authDomain: "catsolution-24930.firebaseapp.com",
  databaseURL: "https://catsolution-24930.firebaseio.com",
  projectId: "catsolution-24930",
  storageBucket: "catsolution-24930.appspot.com",
  messagingSenderId: "898800102662"
};

Vue.prototype.$firebase = firebase.initializeApp(config);
Vue.prototype.$firebase_basic = firebase;

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
});
