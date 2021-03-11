import axios from 'axios'

export default {
  strict: true,
  namespaced: true,
  state: {
    cart: {
      carts: [],
    },
    cartLoading: {
      addCartLoading: '',
    },
    messages: [],
  },
  actions: {
    getCart(context) {
      context.commit('LOADING', true, { root: true })
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(url).then(response => {
        if (response.data.data.carts) {
          context.commit('CART', response.data.data)
        }
        context.commit('LOADING', false, { root: true })
      })
    },
    removeCart(context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING', true, { root: true })

      axios.delete(url).then(() => {
        context.dispatch('getCart')
        context.commit('LOADING', false, { root: true })
        context.dispatch('updateMessage', {
          message: '商品刪除成功',
          status: 'danger',
        })
      })
    },
    addtoCart(context, { id, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true, { root: true })
      context.commit('CARTLOADING', id)
      const item = {
        product_id: id,
        qty,
      }
      axios.post(url, { data: item }).then(() => {
        context.dispatch('getCart')
        context.commit('LOADING', false, { root: true })
        context.commit('CARTLOADING', '')
        context.dispatch('updateMessage', {
          message: '購物車新增成功',
          status: 'success',
        })
      })
    },
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000)
      context.commit('MESSAGES', { message, status, timestamp })
      context.dispatch('removeMessageWithTiming', timestamp)
    },
    removeMessageWithTiming(context, timestamp) {
      setTimeout(() => {
        context.commit('REMOVEMESSAGEWITHTIMING', timestamp)
      }, 5000)
    },
    removeMessage(context, num) {
      context.commit('REMOVEMESSAGE', num)
    },
  },
  mutations: {
    CART(state, payload) {
      state.cart = payload
    },
    CARTLOADING(state, payload) {
      state.cartLoading.addCartLoading = payload
    },
    MESSAGES(state, { message, status, timestamp }) {
      state.messages.push({
        message,
        status,
        timestamp,
      })
    },
    REMOVEMESSAGEWITHTIMING(state, timestamp) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(i, 1)
        }
      })
    },
    REMOVEMESSAGE(state, num) {
      state.messages.splice(num, 1)
    },
  },
  getters: {
    cart: state => state.cart,
  },
}
