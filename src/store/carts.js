import axios from 'axios';

export default{
  namespaced: true,
  state: {
    cart: {
      carts: [],
    },
  },
  actions: {
    getCart(context) {
      context.commit('LOADING', true, { root: true });
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(url).then((response) => {
        if (response.data.data.carts) {
          context.commit('CART', response.data.data);
        }
        context.commit('LOADING', false, { root: true });
        console.log('取得購物車', response.data.data);
      });
    },
    removeCart(context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.delete(url).then((response) => {
        context.commit('LOADING', false, { root: true });
        context.dispatch('getCart');
        console.log('刪除購物車項目', response);
      });
    },
    addtoCart(context, { id, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true, { root: true });
      const item = {
        product_id: id,
        qty,
      };
      axios.post(url, { data: item }).then((response) => {
        context.commit('LOADING', false, { root: true });
        context.dispatch('getCart');
        console.log('加入購物車:', response);
      });
    },
  },
  mutations: {
    CART(state, payload) {
      state.cart = payload;
    },
  },
  getters: {
    cart: state => state.cart,
  },
};
