<template>
  <div class="wrap">11
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
  </div>
</template>

<script>
import Navbar from "@/components/front/Navbar";
import Footer from "@/components/front/Footer";
import $ from "jquery";


export default {
  name: "Product",
  components: {
    Navbar,
    Footer,
  },
data() {
 return {
     product: {},
     status: {
        loadingItem: "",
      },
 }
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
    
 },
  created() {
 
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