import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import axios from "axios";
import Swal from 'sweetalert2'

Vue.config.productionTip = false

require('bootstrap');
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.filter(
  "dateFormat", function (value) {
      if (!value)
          return '';

      return new Date(value).toLocaleString();
  }
);

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


axios.interceptors.response.use(
  (response) => {
      store.commit('loading', false);
      return response;
  },
  error => {
      store.commit('loading', false);
      if (error.response.status === 422) {
          Toast.fire({
              icon:'error',
              title: JSON.stringify(error.response.data.errors)
          });
          store.commit("setErrors", error.response.data.errors);
      } else if (error.response.status === 401) {
          store.commit("auth/setUserData", null);
          localStorage.removeItem("authToken");
          window.location.reload();
      } else if (error.response.status === 404) {
          Toast.fire({
              icon:'error',
              title: JSON.stringify(error.response.data.errors)
          });
          store.commit("setErrors", error.response.data.errors);
      } else {
          return Promise.reject(error);
      }
  }
);

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.interceptors.request.use(function(config) {
  store.commit('loading', true);
  config.headers.common = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
  };
  return config;
}, (error) => {
  store.commit('loading', false);
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
