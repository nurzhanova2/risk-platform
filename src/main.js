import Vue from 'vue';
import App from './App.vue';
import store from './store'; 
import router from './router'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap'; // Импорт Bootstrap JS
import 'bootstrap/dist/js/bootstrap.min.js';


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faPaperPlane);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  store, 
  router, 
  render: (h) => h(App),
}).$mount('#app');
