import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
// import './bus'
import VueClipboard from 'vue-clipboard2'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import App from './App.vue'
import i18n from './common/plugins/vue-i18n'
import router from './router'
import store from './store'
import currencyFilter from './filters/currency'
import dateFilter from './filters/date'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import {
  faConciergeBell,
  faShoppingCart,
  faUser,
  faPhone,
  faMapMarkerAlt,
  faTrashAlt,
  faBoxOpen,
  faTicketAlt,
  faSearch,
  faAngleUp,
  faFish,
  faHeart,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
import { faListAlt } from '@fortawesome/free-regular-svg-icons'
import {
  faFacebookSquare,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
  faConciergeBell,
  faShoppingCart,
  faUser,
  faPhone,
  faMapMarkerAlt,
  faTrashAlt,
  faListAlt,
  faBoxOpen,
  faTicketAlt,
  faAngleUp,
  faSearch,
  faFish,
  faHeart,
  faSpinner,
  faFacebookSquare,
  faInstagram
)

AOS.init()
axios.defaults.withCredentials = true
dom.watch()

Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('Loading', Loading)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueClipboard)
Vue.use(VueAwesomeSwiper)
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

localize('zh_TW', TW)
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(response => {
      console.log(response.data)
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
