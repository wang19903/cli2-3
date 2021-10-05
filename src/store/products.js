import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    categories: []
  },
  actions: {
    getProducts (context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.commit('LOADING', true, { root: true })
      axios.get(url).then(response => {
        context.commit('PRODUCTS', response.data.products)
        context.commit('CATEGORIES', response.data.products)
        context.commit('LOADING', false, { root: true })
      }).catch(err => {
        alert('請重新整理' + err)
      })
    }
  },
  mutations: {
    PRODUCTS (state, payload) {
      state.products = payload.filter(item => item.is_enabled === 1)
    },
    CATEGORIES (state, payload) {
      const categories = new Set()
      payload.forEach(item => {
        categories.add(item.category)
      })
      state.categories = Array.from(categories)
    }
  },
  getters: {
    categories: state => state.categories,
    products: state => state.products
  }
}
