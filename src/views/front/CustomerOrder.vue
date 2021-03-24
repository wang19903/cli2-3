<template>
  <div>
    <Alert />
    <div class="wrapper">
      <div class="container front-order-container">
        <div class="row justify-content-md-center">
          <div class="col col-md-8">
            <span class="direct"> 確認產品明細 </span>
            <table class="table table-striped mt-4" v-if="cart.carts.length">
              <thead>
                <th></th>
                <th></th>
                <th>品名</th>
                <th>數量</th>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="align-middle">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="removeCart(item.id)"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="align-middle img">
                    <div
                      style="
                        height: 50px;
                        background-size: cover;
                        background-position: center;
                      "
                      :style="{
                        backgroundImage: `url(${item.product.imageUrl})`,
                      }"
                    ></div>
                  </td>
                  <td class="align-middle">
                    {{ item.product.title }}
                    <!-- <div class="text-success" v-if="item.coupon">
                      已套用優惠券
                    </div> -->
                  </td>
                  <td class="align-middle">
                    {{ item.qty }}{{ item.product.unit }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right">總計</td>
                  <td class="text-right">{{ cart.total | currency }}</td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="3" class="text-right text-success">折扣價</td>
                  <td class="text-right text-success">
                    {{ cart.final_total }}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div
              class="input-group mb-3 input-group-sm"
              v-if="cart.carts.length"
            >
              <input
                type="text"
                class="form-control front-order-input"
                v-model="coupon_code"
                placeholder="請輸入優惠碼"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="addCouponCode"
                >
                  套用優惠碼
                </button>
              </div>
            </div>
            <div
              class="d-flex flex-column align-items-center noItem"
              v-if="cart.carts.length === 0"
            >
              購物車尚未有商品唷!!
            </div>
            <span class="direct"> 填寫表單 </span>
            <ValidationObserver
              v-slot="{ invalid }"
              class="col-md-6"
              v-if="cart.carts.length"
            >
              <form @submit.prevent="createOrder">
                <ValidationProvider
                  rules="required|email"
                  name="email"
                  class="form-group"
                  tag="div"
                  v-slot="{ errors, classes, passed }"
                >
                  <!-- 輸入框 -->
                  <label class="text-left" for="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    v-model="form.user.email"
                    class="form-control front-order-input"
                    :class="classes"
                  />
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                  <span v-if="passed" class="valid-feedback">Email 正確</span>
                </ValidationProvider>

                <ValidationProvider
                  rules="required"
                  name="name"
                  class="form-group"
                  tag="div"
                  v-slot="{ errors, classes, passed }"
                >
                  <!-- 輸入框 -->
                  <label for="name">訂購者名稱</label>
                  <input
                    id="name"
                    type="name"
                    name="name"
                    v-model="form.user.name"
                    class="form-control front-order-input"
                    :class="classes"
                  />
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                  <span v-if="passed" class="valid-feedback"
                    >包裹收件人為 {{ form.user.name }}</span
                  >
                </ValidationProvider>

                <ValidationProvider
                  rules="required|numeric"
                  name="tel"
                  class="form-group"
                  tag="div"
                  v-slot="{ errors, classes, passed }"
                >
                  <!-- 輸入框 -->
                  <label for="tel">電話</label>
                  <input
                    id="tel"
                    type="tel"
                    name="tel"
                    v-model="form.user.tel"
                    class="form-control front-order-input"
                    :class="classes"
                  />
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                  <span v-if="passed" class="valid-feedback"
                    >收件人電話為 {{ form.user.tel }}</span
                  >
                </ValidationProvider>

                <ValidationProvider
                  rules="required"
                  name="address"
                  class="form-group"
                  tag="div"
                  v-slot="{ errors, classes, passed }"
                >
                  <!-- 輸入框 -->
                  <label for="address">地址</label>
                  <input
                    id="address"
                    type="address"
                    name="address"
                    v-model="form.user.address"
                    class="form-control front-order-input"
                    :class="classes"
                  />
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                  <span v-if="passed" class="valid-feedback"
                    >收件人地址為 {{ form.user.address }}</span
                  >
                </ValidationProvider>

                <div class="form-group">
                  <label for="comment">留言</label>
                  <textarea
                    name=""
                    id="comment"
                    placeholder="少辣少醬等等需求註明"
                    class="form-control front-order-input"
                    cols="30"
                    rows="10"
                    v-model="form.message"
                  ></textarea>
                </div>
                <div class="d-flex justify-content-center">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="invalid"
                  >
                    送出表單
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/AlertMessage.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CustomerOrder',
  data() {
    return {
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    }
  },
  components: {
    Alert,
  },
  methods: {
    getCart() {
      const vm = this
      vm.cart = JSON.parse(localStorage.getItem('cart')) || []
      vm.total = 0
      vm.cartLength = 0
      vm.cart.forEach(item => {
        vm.total += item.total
        vm.cartLength += item.qty
      })
    },
    addTocart(product, qty = 1) {
      const vm = this
      let productIndex = -1
      vm.getCart()
      if (vm.cart.length > 0) {
        vm.cart.forEach((item, index) => {
          if (item.id === product.id) {
            productIndex = index
          }
        })
      }
      if (productIndex === -1) {
        const total = parseInt(product.origin_price * qty, 10)
        vm.$set(product, 'qty', qty)
        vm.$set(product, 'total', total)
        vm.cart.push(product)
      } else {
        const tempProduct = { ...vm.cart[productIndex] }
        tempProduct.qty += qty
        const total = parseInt(product.origin_price * tempProduct.qty, 10)
        tempProduct.total = total
        vm.cart.splice(productIndex, 1)
        vm.cart.push(tempProduct)
      }
      localStorage.setItem('cart', JSON.stringify(vm.cart))
      vm.getCart()
    },
    // removeCart (id) {
    //       const vm = this
    //       let removingIndex = -1
    //       if (vm.cart.length > 0) {
    //         vm.cart.forEach((item, index) => {
    //           if (item.id === id) {
    //             removingIndex = index
    //           }
    //         })
    //       }
    //       vm.cart.splice(removingIndex, 1)
    //       localStorage.setItem('cart', JSON.stringify(vm.cart))
    //       vm.getCart()
    //     },

    removeCart(id) {
      this.$store.dispatch('cartsModules/removeCart', id)
    },
    addCouponCode() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      vm.$store.dispatch('updataLoading', true)
      const coupon = {
        code: vm.coupon_code,
      }
      vm.$http.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'success',
          })
          vm.getCart()
        } else {
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger',
          })
        }
        vm.$store.dispatch('updataLoading', false)
      })
    },
    createOrder() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form

      vm.$http.post(api, { data: order }).then(response => {
        vm.$store.dispatch('updataLoading', true)
        if (response.data.success) {
          vm.$router.push(`/customercheck/${response.data.orderId}`)
        }
        vm.$store.dispatch('updataLoading', false)
      })
    },
    ...mapActions('cartsModules', ['getCart']),
  },
  computed: {
    ...mapGetters('cartsModules', ['cart']),
    ...mapGetters(['isLoading']),
  },
  created() {
    this.getCart()
  },
}
</script>

<style lang="scss" scoped>
table {
  background-color: #e7dbc1;
}

.btn {
  cursor: not-allowed;
}

.direct {
  font-size: 2em;
  border-bottom: 3px solid gray;
}

.noItem {
  margin: 10px;
  font-size: 28px;
  color: red;
}

form {
  text-align: left;
  max-width: 95%;

  .form-control {
    min-width: 100%;
    margin: auto;
  }

  input {
    height: 23px;
  }
}

@media (max-width: 486px) {
  .img {
    padding: 0;
    width: 50px;
  }
}
</style>
