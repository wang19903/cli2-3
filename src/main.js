import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import App from './App.vue'
import router from './router'
import './bus';
import currencyFilter from './filters/currency';

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);
AOS.init();

Vue.config.productionTip = false
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('Loading', Loading);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios);
Vue.filter('currency', currencyFilter);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

axios.defaults.withCredentials = true;

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        })
      }
    });
  } else {
    next();
  }
})  