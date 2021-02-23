<template>
  <div class="wrap wrapper">
    <Navbar />
    <div
      class="container"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="row" role="document">
        <div class="col-6 border-0">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ product.title }}</span>
            </h5>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="" />
          </div>
        </div>
        <div class="col-6">
        <blockquote class="blockquote mt-3">
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
        <div>
          注意事項:絕對不含防腐劑，所以無論您是現場購買或宅配冷藏到貨， 我們建議您當天沒食用完，請放入冰箱冷藏冷凍。
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
              class="fas fa-spinner fa-pulse"
              v-if="product.id === status.loadingItem"
            ></i>
            加到購物車
          </button>
        </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/front/Navbar";
import Footer from "@/components/front/Footer";
import { mapGetters } from "vuex";

export default {
  name: "Product",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      product: {},
      productitem: {},
      status: {
        loadingItem: "",
      },
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`;
      this.$http.get(api).then((response) => {
        vm.$store.dispatch("updataLoading", true);
        vm.product = response.data.product;
        vm.$store.dispatch("updataLoading", false);
      });
    },
    addtoCart(id, qty = 1) {
      this.$store.dispatch("cartsModules/addtoCart", { id, qty });
    },
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getProduct();
  },
};
</script>

<style lang="scss">
@import "@/assets/front_product.scss";
</style>