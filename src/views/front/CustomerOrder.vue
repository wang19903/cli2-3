<template>
  <div>
    <div class="bgImg3">
      <div class="slogan"><span>{{$t('CustomerOrder.Notice')}}</span></div>
    </div>
    <div class="wrapper">
      <div class="container frontOrderContainer">
        <div class="row justify-content-md-center">
          <div class="col col-md-8 container">
            <span class="direct" v-if="cart.carts.length">
              {{ $t('CustomerOrder.CheckCartItem') }}
            </span>
            <table
              class="table table-striped mt-4 frontOrderTable"
              v-if="cart.carts.length"
            >
              <thead>
                <th></th>
                <th></th>
                <th>{{ $t('Cart.ItemName') }}</th>
                <th>{{ $t('Cart.Qty') }}</th>
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
                    {{ $t("Product."+item.product.title) }}
                    <div class="text-success" v-if="item.coupon">
                      {{ $t("CustomerOrder.HaveCouponConfirm")}}
                    </div>
                  </td>
                  <td class="align-middle">
                    {{ item.qty }}{{ $t("Cart."+item.product.unit) }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right">{{ $t('Cart.TotalPrice') }}</td>
                  <td class="text-right">{{ cart.total | currency }}</td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="3" class="text-right text-success">{{ $t('Cart.FinalPrice') }}</td>
                  <td class="text-right text-success">
                    {{ cart.final_total }}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div
              class="d-flex flex-column align-items-center noItem"
              v-if="cart.carts.length === 0"
            >
              {{ $t('CustomerOrder.CartEmpty')}}<br/>
              {{ $t('CustomerOrder.GuildToShop')}}
              <img src="@/assets/img/empty.jpg" alt="空的購物車" class="pt-3 pb-3">
              <div class="linkDiv pb-5" v-if="!cart.carts.length">
                <router-link to="/products"> {{ $t('CustomerOrder.GoShop')}}</router-link>
              </div>
              <p class="h2">{{ $t('CustomerOrder.Promote')}}</p>
              <div v-clipboard:copy="message"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              class="copyDiv mt-3">
              <span>order999</span>
              <p>{{ $t('CustomerOrder.ClickCopy')}}</p>
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
                  {{ $t('CustomerOrder.AddCoupon')}}
                </button>
              </div>
            </div>
            <span class="direct border-bottom border-dark" v-if="cart.carts.length"> {{ $t('CustomerOrder.FillForm')}} </span>
            <ValidationObserver
              v-slot="{ invalid }"
              class="row justify-content-center pt-2 validDiv"
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
                    >{{ $t('Customer.Email')}}</label
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
                  <span v-if="passed" class="valid-feedback">{{ $t('Customer.EmailCorrect')}}</span>
                </ValidationProvider>

                <ValidationProvider
                  rules="required"
                  name="name"
                  class="form-group"
                  tag="div"
                  v-slot="{ errors, classes, passed }"
                >
                  <!-- 輸入框 -->
                  <label for="name">{{ $t('Customer.OrderName')}}</label>
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
                    >{{ $t('Customer.RecipientName')}} {{ form.user.name }}</span
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
                  <label for="tel">{{ $t('Customer.tel')}}</label>
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
                    >{{ $t('Customer.RecipientTel')}} {{ form.user.tel }}</span
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
                  <label for="address">{{ $t('Customer.Address')}}</label>
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
                    >{{ $t('Customer.RecipientAddress')}} {{ form.user.address }}</span
                  >
                </ValidationProvider>

                <div class="form-group">
                  <label for="comment">{{ $t('Customer.Message')}} </label>
                  <textarea
                    name=""
                    id="comment"
                    placeholder="有客製化需求請填寫"
                    class="form-control front-order-input"
                    cols="30"
                    rows="10"
                    v-model="form.message"
                  ></textarea>
                </div>
                <div class="mb-5">
                  <p class="text-left">{{ $t('CustomerOrder.NextStep')}}</p>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="invalid"
                    v-if="cart.carts.length"
                  >
                    {{ $t('CustomerOrder.Summit')}}
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
      vm.$store.dispatch('updataLoading', true)
      vm.$http.post(api, { data: order }).then(response => {
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
  }
}
</script>
