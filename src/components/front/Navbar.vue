<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav class="navbar navbar-expand-md navbar-light border-bottom border-dark">
      <router-link class="navbar-brand p-0" to="/">
        <img
          src="@/assets/img/logo.png"
          style="height: 45px"
          alt="鼎鮮飯麵LOGO"
          class="nav-img"
        />
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link
              to="/products"
              class="bg-logo nav-link text-dark firstBtn"
              title="全部產品"
            >
              <font-awesome-icon
                icon="concierge-bell"
                size="lg"
                class="fas"
              /><span>全部產品</span>
            </router-link>
          </li>

          <li class="nav-item dropdown">
            <a
              title="購物車"
              class="bg-logo secondBtn cartRwdicon nav-link dropdown-toggle text-dark"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              data-flip="false"
            >
              <div class="spanCenter">
                <i class="fas fa-shopping-cart fa-lg" />
                <i class="cartIcon"
                  ><div
                    variant=""
                    v-if="carData.length > 0"
                    class="badge badge-light"
                  >
                    {{ carData.length }}
                  </div></i
                ><span class="">購物車</span>
              </div>
            </a>

            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <table class="table nav-table" v-if="carData.length">
                <thead>
                  <th></th>
                  <th>品名</th>
                  <th class="text-center pr-5">數量</th>
                  <th class="text-right">單價</th>
                </thead>
                <tbody>
                  <tr v-for="item in carData" :key="item.id">
                    <td class="align-middle">
                      <button
                        type="button"
                        class="btn btn-outline-dark btn-sm nav-btn"
                        @click.prevent="removeCart(item)"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                    <td class="align-middle" style="max-width: 120px">
                      {{ item.name }}
                    </td>
                    <td class="align-middle">
                      <button
                        class="btn btn-outline-dark btn-sm"
                        @click.prevent="onMinus(item)"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        :value="item.qty"
                        min="1"
                        max="10"
                        disabled
                        class="in"
                        style="max-width: 40px"
                      />
                      <button
                        class="btn btn-outline-dark btn-sm"
                        @click.prevent="onPlus(item)"
                      >
                        +
                      </button>
                    </td>
                    <td class="align-middle text-right">
                      {{ item.price | currency }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right text-black-50">
                      {{ getOrigin_Price | currency }}
                    </td>
                  </tr>
                  <tr v-if="getPrice !== getOrigin_Price">
                    <td colspan="3" class="text-right text-success">折扣價</td>
                    <td class="text-right text-success">
                      {{ getPrice | currency }}
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div
                class="d-flex flex-column align-items-center"
                v-if="carData.length === 0"
              >
                購物車尚未有商品唷!!
              </div>
              <button
                type="button"
                class="btn btn-block mt-3 nav-btn btn-outline-dark"
                @click.prevent="checkout"
                v-if="carData.length"
              >
                前往結帳
              </button>
            </div>
          </li>

          <li class="nav-item active">
            <router-link
              to="/login"
              class="bg-logo nav-link text-dark thirdBtn"
              title="後台管理"
            >
              <font-awesome-icon icon="user" size="lg" class="fas" /><span
                >後台管理</span
              >
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      carData: []
    }
  },
  methods: {
    // getCart () {
    //   const vm = this
    //   vm.carData = JSON.parse(localStorage.getItem('carData')) || []
    // },
    onPlus (item) {
      const vm = this
      vm.$store.dispatch('cartsModules/getlocalCarData')// vm.getCart()
      vm.carData = vm.localCarData
      if (item.qty === 10) {
        return
      }
      vm.carData.filter(data => {
        if (data.product_id === item.product_id) {
          data.qty = data.qty + 1
        }
        // vm.$store.dispatch('cartsModules/updatelocalCarData', vm.carData)
        localStorage.setItem('carData', JSON.stringify(vm.carData))
      // vm.$store.dispatch('cartsModules/getlocalCarData', vm.carData)// vm.getCart()
      })
    },
    onMinus (item) {
      const vm = this
      vm.$store.dispatch('cartsModules/getlocalCarData')// vm.getCart()
      // vm.carData = vm.localCarData
      if (item.qty <= 1) {
        return
      }
      vm.carData.filter(data => {
        if (data.product_id === item.product_id) {
          data.qty = data.qty - 1
        }
        // vm.$store.dispatch('cartsModules/updatelocalCarData', vm.carData)
        localStorage.setItem('carData', JSON.stringify(vm.carData))
        // vm.$store.dispatch('cartsModules/getlocalCarData', vm.carData)// vm.getCart()
      })
    },
    removeCart (cart) {
      const vm = this
      vm.$store.dispatch('cartsModules/getlocalCarData')// vm.getCart()
      vm.carData = vm.localCarData
      vm.carData.filter((item, key) => {
        if (item.product_id === cart.product_id) {
          vm.carData.splice(key, 1)
          localStorage.setItem('carData', JSON.stringify(vm.carData))
          // vm.getCart()
          // vm.$store.dispatch('cartsModules/updatelocalCarData', vm.carData)
          // localStorage.setItem('carData', JSON.stringify(vm.carData))
          // vm.$store.dispatch('cartsModules/getlocalCarData', vm.carData)// vm.getCart()
        }
      })
    },
    checkout () {
      const cacheID = []
      this.$store.dispatch('cartsModules/getlocalCarData')// vm.getCart()
      this.carData = this.localCarData
      this.$store.dispatch('updataLoading', true)
      this.axios
        .get(
          `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        )
        .then(res => {
          console.log(res)
          const cacheData = res.data.data.carts
          cacheData.forEach(item => {
            cacheID.push(item.id)
          })
        })
        .then((res) => {
          console.log(res)
          cacheID.forEach(item => {
            this.axios
              .delete(
                `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item}`
              )
              .then(() => {
                console.log('購物車已經清空')
              })
          })
        })
        .then((res) => {
          console.log(res)
          this.carData.forEach(item => {
            const cache = {
              product_id: item.productId,
              qty: item.qty
            }
            this.axios
              .post(
                `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`,
                { data: cache }
              )
              .then((res) => {
                console.log(res)
                this.carData = []
                localStorage.removeItem('carData')
                this.$store.dispatch('cartsModules/updatelocalCarData', this.carData)
                localStorage.setItem('carData', JSON.stringify(this.carData))
                // this.$store.dispatch('cartsModules/getlocalCarData', this.carData)// vm.getCart()
                // this.getCart()
                this.$router.push('/order')
              })
          })
        })
      this.$store.dispatch('updataLoading', false)
    },
    render () {
      const vm = this
      console.log('run!!')
      vm.carData = vm.localCarData
      return vm.carData
    },
    ...mapActions('cartsModules', ['updatelocalCarData', 'getlocalCarData'])
  },
  computed: {
    getPrice () {
      if (this.carData.length === 0) {
        return 0
      }
      if (this.carData.length > 1) {
        let cachePrice = 0
        this.carData.forEach(item => {
          cachePrice += Number(item.price * item.qty)
        })
        return cachePrice
      }
      return this.carData[0].price * this.carData[0].qty
    },

    getOrigin_Price () {
      if (this.carData.length === 0) {
        return 0
      }
      if (this.carData.length > 1) {
        let cacheOriginPrice = 0
        this.carData.forEach(item => {
          cacheOriginPrice += Number(item.origin_price * item.qty)
        })
        return cacheOriginPrice
      }
      return this.carData[0].origin_price * this.carData[0].qty
    },
    ...mapGetters(['isLoading']),
    ...mapGetters('cartsModules', ['localCarData'])
  },
  created () {
    this.getlocalCarData()
    this.render()
  // this.$bus.$on('getCart', () => this.getCart())
  }
}
</script>
