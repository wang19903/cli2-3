import axios from 'axios'

export default {
  strict: true,
  namespaced: true,
  state: {
    cart: {
      carts: []
    },
    cartLoading: {
      addCartLoading: ''
    },
    localCarData: []
    // LocalCarData: JSON.parse(localStorage.getItem('carData')) || []
  },
  actions: {
    getCart (context) {
      context.commit('LOADING', true, { root: true })
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(url).then(response => {
        if (response.data.data.carts) {
          context.commit('CART', response.data.data)
        }
        context.commit('LOADING', false, { root: true })
      })
    },
    removeCart (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('LOADING', true, { root: true })

      axios.delete(url).then(() => {
        context.dispatch('getCart')
        context.commit('LOADING', false, { root: true })
        context.dispatch('updateMessage', {
          message: '商品刪除成功',
          status: 'danger'
        })
      })
    },
    addtoCart (context, { id, qty }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true, { root: true })
      context.commit('CARTLOADING', id)
      const item = {
        product_id: id,
        qty
      }
      axios.post(url, { data: item }).then(() => {
        context.dispatch('getCart')
        context.commit('LOADING', false, { root: true })
        context.commit('CARTLOADING', '')
        context.dispatch('updateMessage', {
          message: '購物車新增成功',
          status: 'success'
        })
      })
    },
    updatelocalCarData (context, data = []) {
      console.log(data, '外面資料')
      context.commit('UPDATELOCALCARDATA', data)
      // context.commit('UPDATELOCALCARDATA', JSON.parse(localStorage.getItem('carData')) || [])
    },
    getlocalCarData (context, data) {
      data = JSON.parse(localStorage.getItem('carData')) || []
      console.log(data, 'localStorage資料')
      context.commit('GETLOCALCARDATA', data)
    }
  },
  mutations: {
    CART (state, payload) {
      state.cart = payload
    },
    CARTLOADING (state, payload) {
      state.cartLoading.addCartLoading = payload
    },
    UPDATELOCALCARDATA (state, payload) {
      state.localCarData.push(payload)
      console.log(payload, 'data更新state')
    },
    GETLOCALCARDATA (state, payload) {
      state.localCarData = payload
      console.log('localCarData狀態', state.localCarData, '收到的資料', payload, '讀取state')
    }
  },
  getters: {
    cart: state => state.cart,
    localCarData: state => state.localCarData
  }
}
