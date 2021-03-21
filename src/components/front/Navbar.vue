<template>
  <div class="bgImg">
    <div><p class="slogan">鼎中美食 鮮香味美</p></div>
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
                        class="btn btn-outline-dark  btn-sm"
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
                        style="max-width: 30px"
                      />
                      <button
                        class="btn btn-outline-dark  btn-sm"
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
                      {{ localStorageorigin_price | currency }}
                    </td>
                  </tr>
                  <tr v-if="localStoragePrice !== localStorageorigin_price">
                    <td colspan="3" class="text-right text-success">折扣價</td>
                    <td class="text-right text-success">
                      {{ localStoragePrice | currency }}
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
  data() {
    return {
      //  carts: [],

      carData: JSON.parse(localStorage.getItem('carData')) || [],
      localStoragePrice: 0,
      localStorageorigin_price: 0,
    }
  },
  methods: {
  //   getCart () {
  //     const vm = this
  //     vm.carData = JSON.parse(localStorage.getItem('carData')) || []
  // },
    //   //vm.total = 0
    //   //vm.cartLength = 0
    //   // vm.cart.forEach((item) => {
    //   //   vm.total += item.total
    //   //   vm.cartLength += item.qty
    //   // })
    // },
    //
    onPlus(item) {
      const vm = this
      vm.carData.filter(data => {
        if (data.product_id === item.product_id) {
          data.qty = data.qty + 1
        }
        localStorage.setItem('carData', JSON.stringify(vm.carData))
      })
      vm.getLocalStorage()
    },
    onMinus(item) {
      const vm = this
      if (item.qty <= 1) {
        return
      }
      vm.carData.filter(data => {
        if (data.product_id === item.product_id) {
          data.qty = data.qty - 1
        }
        localStorage.setItem('carData', JSON.stringify(vm.carData))
      })
    vm.getLocalStorage()

    },
    removeCart(cart) {
      const vm = this
      vm.carData.filter((item, key) => {
        if (item.product_id === cart.product_id) {
          vm.carData.splice(key, 1)
          localStorage.setItem('carData', JSON.stringify(vm.carData))
        }
      })
    },
    getLocalStorage() {
      const vm = this
      vm.localStoragePrice = 0
      vm.localStorageorigin_price = 0
      const cacheLocalStorage =
        JSON.parse(localStorage.getItem('carData')) || []
      cacheLocalStorage.forEach(item => {
        vm.localStoragePrice += Number(item.price * item.qty)
        vm.localStorageorigin_price += Number(item.origin_price * item.qty)
      })
  
      
    },

    // removeCart(id) {
    //   this.$store.dispatch('cartsModules/removeCart', id)
    // },
    checkout() {

        //this.isLoading = true;
      // 避免重複加入因此要先跑一次清空購物車
      const cacheID = [];
      this.axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`)
        .then((res) => {
          // 取得「當前購物車內」的產品
          const cacheData = res.data.data.carts;
          // 撈出產品 ID 一一加入到暫存的陣列
          cacheData.forEach((item) => {
            cacheID.push(item.id);
          });
        }).then(() => {
          // 清空「當前購物車內」的資料，否則會重複加入
          cacheID.forEach((item) => {
            this.axios.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item}`).then(() => {
              console.log('購物車已經清空');
            });
          });
        }).then(() => {
          // 將當前暫存在 carData 的資料撈出來
          this.carData.forEach((item) => {
            // 取出產品 id 與數量
            const cache = {
              product_id: item.product_id,
              qty: item.qty,
            };
            // 一一加入到購物車內
            this.axios.post(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`, { data: cache })
              .then(() => {
                // 確保送出訂單之後清空購物車內容
                this.carData = [];
                localStorage.removeItem('carData');
                //this.isLoading = false;
                // 重新取得購物車內容
                //this.getCart();
              });
          });
        });
      this.$router.push('/order')
    },
    //...mapActions('cartsModules', ['getCart']),
  },
  computed: {
    //...mapGetters('cartsModules', ['cart']),
    ...mapGetters(['isLoading']),
  },
  created() {
    this.getLocalStorage()

    //this.getCart()
    //this.$bus.$on('cart:get', () => this.getCart())
    // this.$bus.$on('updateCart', () => {})
  },
}
</script>
