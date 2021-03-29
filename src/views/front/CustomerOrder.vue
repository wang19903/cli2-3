<template>
  <div>
    <div class="bgImg3">
      <p class="slogan">跟隨步驟完成訂單</p>
    </div>
    <Alert />
    <div class="wrapper">
      <div class="container front-order-container">
        <div class="row justify-content-md-center">
          <div class="col col-md-8 container">
            <span class="direct" v-if="cart.carts.length">
              請確認產品明細
            </span>
            <table
              class="table table-striped mt-4 front-order-table"
              v-if="cart.carts.length"
            >
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
              class="d-flex flex-column align-items-center no-Item"
              v-if="cart.carts.length === 0"
            >
              購物車尚未有商品唷!!<br/>
              點擊賣場去看看吧
              <img src="@/assets/img/empty.jpg" alt="空的購物車" class="pt-3 pb-3">
              <div class="linkDiv pb-5" v-if="!cart.carts.length">
                <router-link to="/products">前往賣場</router-link>
              </div>
              <p class="h2">輸入優惠碼可享九折優惠喔</p>
              <div v-clipboard:copy="message"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              class="copyDiv mt-3">
              <span>order999</span>
              <p>點擊此處即可複製</p>
              </div>
            </div>
            <div class="input-group mb-3 input-group-sm d-flex justify-content-md-center" v-if="cart.carts.length !== 0">
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
            <span class="direct" v-if="cart.carts.length"> 請填完表單 </span>
            <ValidationObserver
              v-slot="{ invalid }"
              class="row justify-content-md-center pt-2 validDiv"
              v-if="cart.carts.length !== 0"
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
                  <label class="text-left" for="email"
                    >Email(必填)</label
                  >
                  <input
                    id="email"
                    type="email"
                    name="email"
                    v-model="form.user.email"
                    size="10"
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
                  <label for="name">訂購者名稱(必填)</label>
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
                  <label for="tel">電話(必填)</label>
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
                  <label for="address">地址(必填)</label>
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
                    placeholder="有客製化需求請填寫，非必填"
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
                    v-if="cart.carts.length"
                  >
                    送出訂單
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
  data () {
    return {
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      message: 'order999',
      on: ''
    }
  },
  components: {
    Alert
  },
  methods: {
    getCart () {
      const vm = this
      vm.cart = JSON.parse(localStorage.getItem('cart')) || []
      vm.total = 0
      vm.cartLength = 0
      vm.cart.forEach(item => {
        vm.total += item.total
        vm.cartLength += item.qty
      })
    },

    addTocart (product, qty = 1) {
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

    removeCart (id) {
      this.$store.dispatch('cartsModules/removeCart', id)
    },

    addCouponCode () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      vm.$store.dispatch('updataLoading', true)
      const coupon = {
        code: vm.coupon_code
      }
      vm.$http.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'success'
          })
          vm.getCart()
        } else {
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger'
          })
        }
        vm.$store.dispatch('updataLoading', false)
      })
    },

    createOrder () {
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

    onCopy () {
      const vm = this
      vm.on = 1
      vm.alert()
    },

    onError () {
      const vm = this
      vm.on = 0
      vm.alert()
    },

    alert () {
      const vm = this
      if (vm.on === 1) {
        vm.$store.dispatch('updateMessage', {
          message: '複製成功',
          status: 'success'
        })
      } else {
        vm.$store.dispatch('updateMessage', {
          message: '複製失敗',
          status: 'success'
        })
      }
    },
    ...mapActions('cartsModules', ['getCart'])
  },
  computed: {
    ...mapGetters('cartsModules', ['cart']),
    ...mapGetters(['isLoading'])
  },
  created () {
    const vm = this
    vm.getCart()
    // vm.$bus.$on('checkout', () => {
    //   vm.getCart()
    // })
  }
}
</script>
