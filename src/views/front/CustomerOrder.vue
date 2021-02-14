<template>
  <div class="wrap">
    <Navbar />
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col col-md-8">
          <table class="table mt-4">
            <thead>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th></th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="deleteCart(item.id)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
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
                <td class="text-right text-success">{{ cart.final_total }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input
              type="text"
              class="form-control"
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
          <ValidationObserver v-slot="{ invalid }" class="col-md-6">
            <form @submit.prevent="createOrder">
              <ValidationProvider
                rules="required|email"
                name="email"
                class="form-group"
                tag="div"
                v-slot="{ errors, classes, passed }"
              >
                <!-- 輸入框 -->
                <label for="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  v-model="form.user.email"
                  class="form-control"
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
                  class="form-control"
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
                  class="form-control"
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
                  class="form-control"
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
                  class="form-control"
                  cols="30"
                  rows="10"
                  v-model="form.message"
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary" :disabled="invalid" >
                送出表單
              </button>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/front/Navbar";
import Footer from "@/components/front/Footer";

export default {
  name: "CustomerOrder",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      cart: {},
      status: {
        loadingItem: "",
      },
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    addtoCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      vm.status.loadingItem = id;
      this.$http.post(api, { data: cart }).then((response) => {
        vm.status.loadingItem = "";
        vm.getCart();
        $("#productModal").modal("hide");
      });
    },
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      //   vm.$store.dispatch("isLoading", true);
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        console.log(response);
        // vm.$store.dispatch("isLoading", false);
      });
    },
    deleteCart(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      //   vm.$store.dispatch("isLoading", true);
      this.$http.delete(api).then((response) => {
        vm.getCart();
        // vm.$store.dispatch("isLoading", false);
      });
    },
    addCouponCode() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      //   vm.$store.dispatch("isLoading", true);
      this.$http.post(api, { data: coupon }).then((response) => {
        vm.getCart();
        // vm.$store.dispatch("isLoading", false);
      });
    },
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;

      this.$http.post(api, { data: order }).then((response) => {
        console.log("okok", response);
        if (response.data.success) {
          vm.$router.push(`/customercheck/${response.data.orderId}`);
        }

        // vm.$store.dispatch("isLoading", false);
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  max-width: 1024px;
  margin: auto;
  background-color: rgba(255, 247, 214, 0.336);
}
</style>