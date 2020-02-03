import 'core-js';
import Vue from 'vue';
import vuetify from './plugins/vuetify';
import { AppComponent } from '@/components';
import router from './router';
import firebase from 'firebase/app';
import 'firebase/auth';
import store from './store';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDwYkr_GYSrI3EESWGbjuYlmkP9rxpheVs',
  authDomain: 'delivery-application-9d880.firebaseapp.com',
  databaseURL: 'https://delivery-application-9d880.firebaseio.com',
  projectId: 'delivery-application-9d880',
  storageBucket: 'delivery-application-9d880.appspot.com',
  messagingSenderId: '748172728184',
  appId: '1:748172728184:web:d24d5bb7725aee9d345a8d',
  measurementId: 'G-DQHLN6Y1G8',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

let app: any;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      store,
      render: (h: any) => h(AppComponent),
    }).$mount('#app');
  }
});
