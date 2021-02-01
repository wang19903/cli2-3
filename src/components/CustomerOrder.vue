<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4" v-for="item in products" :key="item.id">
      <div class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm">
          <div
            style="
              height: 150px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
              item.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6">{{ item.origin_price }}</del>
              <div class="h5">{{ item.price }}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ product.title }}</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="" />

            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h5" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購{{ num }} {{ product.unit }}
              </option>
            </select>

            <div class="modal-footer">
              <div class="text-muted text-nowrap mr-3">
                小計<strong> {{ product.num * product.price }} </strong>
              </div>
              <button
                type="button"
                class="btn btn-primary"
                @click="addtoCart(product.id, product.num)"
              >
                <i
                  class="fas fa-spinner fa-spin"
                  v-if="product.id === status.loadingItem"
                ></i>
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <table class="table mt-4">
      <thead>
        <th></th>
        <th>品名</th>
        <th>數量</th>
        <th class="text-right">單價</th>
      </thead>
      <tbody>
        <tr v-for="item in cart.carts" :key="item.id">
          <td class="align-middle">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="deleteCart(item.id)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td class="align-middle">
            {{ item.product.title }}
            <!-- <div class="text-success" v-if="item.coupon">
          已套用優惠券
        </div> -->
          </td>
          <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
          <td class="align-middle text-right">{{ item.final_total }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ cart.total }}</td>
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
    <!--form-->
    <div class="my-5 row justify-content-center">
      <!--<form class="col-md-6" @submit.prevent="createOrder" >

     <div class="form-group">
      <label for="useremail">Email</label>
      <input type="email" class="form-control" name="email" id="useremail"
      v-validate="'required|email'" :class="{'is-invalid':errors.has('email')}"
        v-model="form.user.email" placeholder="請輸入 Email" >
      <span class="text-danger" v-if="errors.has('email')">
        {{ errors.first('email') }}
      </span>
    </div> -->

      <ValidationObserver v-slot="{ invalid }" class="col-md-6">
        <form @submit.prevent="createOrder" >
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

          <button type="submit" class="btn btn-primary" :disabled="invalid">
            送出表單
          </button>
        </form>
      </ValidationObserver>

      <!--
       <div class="form-group">
      <label for="useremail">Email</label>
      <input type="email" class="form-control" name="email" id="useremail"
      v-validate="'required|email'" :class="{'is-invalid':errors.has('email')}"
        v-model="form.user.email" placeholder="請輸入 Email" >
      <span class="text-danger" v-if="errors.has('email')">
        {{ errors.first('email') }}
      </span>
    </div>
      
      
      
       <div class="form-group">
      <label for="username">收件人姓名</label>
      <input type="text" class="form-control" name="name" id="username"
      :class="{'is-invalid':errors.has('name')}"
        v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
      <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
    </div>
  
    <div class="form-group">
      <label for="usertel">收件人電話</label>
      <input type="tel" class="form-control" id="usertel" v-model="form.user.tel"
      :class="{'is-invalid':errors.has('tel')}"
      v-validate="'required'" name="tel" placeholder="請輸入電話">
      <span class="text-danger" v-if="errors.has('tel')">請輸入電話</span>
    </div>
  
    <div class="form-group">
      <label for="useraddress">收件人地址</label>
      <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
       :class="{'is-invalid':errors.has('address')}"
       v-validate="'required'" placeholder="請輸入地址">
      <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
    </div>
  
    <div class="form-group">
      <label for="comment">留言</label>
      <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
    </div>
    <div class="text-right">
      <button class="btn btn-danger">送出訂單</button>
    </div> 
  </form>-->
    </div>
    <!--/form-->
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      products: [],
      product: {},
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
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      vm.$store.dispatch('isLoading', true);
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.$store.dispatch('isLoading', false);
      });
    },
    getProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        $("#productModal").modal("show");
        vm.status.loadingItem = "";
      });
    },
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
      vm.$store.dispatch('isLoading', true);
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        console.log(response);
        vm.$store.dispatch('isLoading', false);
      });
    },
    deleteCart(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.$store.dispatch('isLoading', true);
      this.$http.delete(api).then((response) => {
        vm.getCart();
        vm.$store.dispatch('isLoading', false);
      });
    },
    addCouponCode() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.$store.dispatch('isLoading', true);
      this.$http.post(api, { data: coupon }).then((response) => {
        vm.getCart();
        vm.$store.dispatch('isLoading', false);
      });
    },
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      //vm.$store.dispatch('isLoading', true);
      //this.$validator.validate().then((valid) => {
       // if (valid) {
          this.$http.post(api, { data: order }).then((response) => {
            console.log("okok", response);
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
            //vm.getCart();
            vm.$store.dispatch('isLoading', false);
          });
        //} else {
        //  console.log("nonono");
       // }
      //});
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>