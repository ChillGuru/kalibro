import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import * as VueGoogleMaps from "vue2-google-maps"
import store from './vuex/Store'


Vue.use(VueGoogleMaps, {
  load: {
    libraries: ['places'],
    key: "AIzaSyDg4-3Z2uWqjUydiOsYAOlCjtzOL4LykHo",
    region: 'RU',
    language: 'ru',
  }
});

Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
