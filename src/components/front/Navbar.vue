<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light border-bottom border-dark">
      <router-link class="navbarBrand p-0" to="/">
        <img
          src="@/assets/img/logo.png"
          style="height: 45px"
          alt="鼎鮮飯麵LOGO"
          class="navImg"
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
          <li class="nav-item">
            <router-link
              to="/products"
              class="bg-logo nav-link text-dark firstBtn"
              title="全部產品"
            >
              <font-awesome-icon
                icon="concierge-bell"
                size="lg"
                class="fas"
              /><span>{{ $t('GENERAL.NAV_OPTIONS[0]') }}</span>
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
                    v-if="localCarData.length > 0"
                    class="badge badge-light"
                  >
                    {{ localCarData.length }}
                  </div></i
                ><span>{{ $t('GENERAL.NAV_OPTIONS[1]') }}</span>
              </div>
            </a>

            <div class="dropdown-menu cart-menu" aria-labelledby="navbarDropdown">
              <table class="table nav-table" v-if="localCarData.length">
                <thead>
                  <th></th>
                  <th>{{ $t('GENERAL.CART_ITEM') }}</th>
                  <th class="text-center pr-5">{{ $t('GENERAL.CART_QTY') }}</th>
                  <th class="text-right">{{ $t('GENERAL.CART_PRICE') }}</th>
                </thead>
                <tbody>
                  <tr v-for="item in localCarData" :key="item.id">
                    <td class="align-middle">
                      <button
                        type="button"
                        class="btn btn-outline-dark btn-sm nav-btn"
                        @click="removeCart(item.productId)"
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
                        @click="onMinus(item)"
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
                        @click="onPlus(item)"
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
                    <td colspan="3" class="text-right">{{ $t('GENERAL.TOTAL') }}</td>
                    <td class="text-right text-black-50">
                      {{ getOriginPrice | currency }}
                    </td>
                  </tr>
                  <tr v-if="getPrice !== getOriginPrice">
                    <td colspan="3" class="text-right text-success">{{ $t('GENERAL.NOW_PRICE') }}</td>
                    <td class="text-right text-success">
                      {{ getPrice | currency }}
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div
                class="d-flex flex-column align-items-center"
                v-if="localCarData.length === 0"
              >
                {{ $t('GENERAL.CART_EMPTY') }}
                <router-link
                  to="/products"
                  class="border border-dark rounded mt-3 p-2 text-dark font-weight-bold"
                  title="商場引導"
                  >{{ $t('GENERAL.GOSHOP') }}</router-link
                >
              </div>
              <button
                type="button"
                class="btn btn-block mt-3 nav-btn btn-dark"
                @click="checkout"
                v-if="localCarData.length"
              >
                {{ $t('GENERAL.CHECK') }}
              </button>
            </div>
          </li>

          <li class="nav-item">
            <router-link
              to="/login"
              class="bg-logo nav-link text-dark thirdBtn"
              title="後台管理"
            >
              <font-awesome-icon icon="user" size="lg" class="fas" /><span>{{
                $t('GENERAL.NAV_OPTIONS[2]')
              }}</span>
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              >{{ $t('GENERAL.LANG') }}</a
            >
            <div class="dropdown-menu lang-wrap p-0 m-auto">
              <a class="dropdown-item p-1" href="#" data-lang="tw" @click="setLang"
                >中文</a
              >
              <a class="dropdown-item " href="#" data-lang="en" @click="setLang"
                >en</a
              >
            </div>
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
    setActiveLanguage (lang) {
      localStorage.setItem('language', lang)
    },
    setLang (evt) {
      const lang = evt.target.dataset.lang
      this.setActiveLanguage(lang)
      return history.go(0)
    },
    onPlus (item) {
      const vm = this
      vm.checkdata()
      if (item.qty === 10) {
        return
      }
      vm.carData.filter(data => {
        if (data.productId === item.productId) {
          data.qty = data.qty + 1
        }
        localStorage.setItem('carData', JSON.stringify(vm.carData))
      })
      vm.checkdata()
    },
    onMinus (item) {
      const vm = this
      vm.checkdata()
      if (item.qty <= 1) {
        return
      }
      vm.carData.filter(data => {
        if (data.productId === item.productId) {
          data.qty = data.qty - 1
        }
        localStorage.setItem('carData', JSON.stringify(vm.carData))
      })
      vm.checkdata()
    },
    removeCart (data) {
      const vm = this
      vm.checkdata()
      vm.carData.filter((item, key) => {
        if (item.productId === data) {
          vm.carData.splice(key, 1)
          localStorage.setItem('carData', JSON.stringify(vm.carData))
        }
        vm.checkdata()
      })
    },
    checkdata () {
      const vm = this
      vm.$store.dispatch('cartsModules/getlocalCarData')
      vm.carData = []
      vm.localCarData.forEach(item => {
        vm.carData.push(item)
      })
    },
    checkout () {
      const cacheID = []
      this.$store.dispatch('cartsModules/getlocalCarData')
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
        .then(res => {
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
        .then(res => {
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
              .then(res => {
                console.log(res)
                this.carData = []
                localStorage.removeItem('carData')
                this.checkdata()
                localStorage.setItem('carData', JSON.stringify(this.carData))
                this.$router.push('/order')
              })
          })
        })
      this.$store.dispatch('updataLoading', false)
    },
    ...mapActions('cartsModules', ['updatelocalCarData', 'getlocalCarData'])
  },
  computed: {
    getPrice () {
      if (this.localCarData.length === 0) {
        return 0
      }
      if (this.localCarData.length > 1) {
        let cachePrice = 0
        this.localCarData.forEach(item => {
          cachePrice += Number(item.price * item.qty)
        })
        return cachePrice
      }
      return this.localCarData[0].price * this.localCarData[0].qty
    },
    getOriginPrice () {
      if (this.localCarData.length === 0) {
        return 0
      }
      if (this.localCarData.length > 1) {
        let cacheOriginPrice = 0
        this.localCarData.forEach(item => {
          cacheOriginPrice += Number(item.originPrice * item.qty)
        })
        return cacheOriginPrice
      }
      return this.localCarData[0].originPrice * this.localCarData[0].qty
    },
    ...mapGetters(['isLoading']),
    ...mapGetters('cartsModules', ['localCarData'])
  },
  created () {
    this.getlocalCarData()
    this.checkdata()
  }
}
</script>
