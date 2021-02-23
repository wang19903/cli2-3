import axios from 'axios';
import { VBModalPlugin } from 'bootstrap-vue';

export default {
  namespaced: true,
  state: {
    products: [],
    categories: [],
  },
  actions: {
    getProducts(context) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      context.commit('LOADING', true, { root: true });
      axios.get(url).then((response) => {
        const temp = response.data.products;
        vm.products = temp.filter((item) =>{
          return item.is_enabled === 1
        })
        context.commit('PRODUCTS', response.data.products);
        context.commit('CATEGORIES', response.data.products);
      //  console.log('取得產品列表:', response);
        context.commit('LOADING', false, { root: true });
      });
    },
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    CATEGORIES(state, payload) {
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },
  },
  getters: {
    categories: state => state.categories,
    products: state => state.products,
  },
};
