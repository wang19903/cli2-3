<template>
  <div class="wrap">
    <Navbar></Navbar>
    <div class="search d-flex justify-content-center p-2">
      <form class="form-inline my-3 my-lg-0">
        <div class="input-group">
          <input
            class="form-control"
            type="text"
            placeholder="想吃什麼?"
            aria-label="Search"
            v-model="filterText"           
          />
          <div class="input-group-append">
            <button class="btn btn-outline-danger" type="submit" disabled>
              <i class="fa fa-search" aria-hidden="true"></i> Search
            </button>
          </div>
        </div>
      </form>
    </div>
    <b-container class="bv-example-row ">
      <b-row>
        <b-col cols="3" md="">
          <ul>
            <li><a href="" @click.prevent="category  = '全部'">全部</a></li>
            <li><a href="" @click.prevent="category  = '牛肉'">牛肉</a></li>
            <li><a href="" @click.prevent="category  = '豬肉'">豬肉</a></li>
            <li><a href="" @click.prevent="category  = '小菜'">小菜</a></li>
            <li><a href="" @click.prevent="category  = '外賣'">外賣</a></li>
          </ul>
        </b-col>

        <b-col cols="9" class="bv-example-row-flex-cols container ">
          <div class="row no-gutters d-flex  flex-wrap ">
            <loading :active.sync="isLoading"></loading>
            <div class="col-lg-4 mt-4" v-for="item in filterData" :key="item.id">
              <div class=" mb-4 pr-4">
                <div class="card  shadow-sm">
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
                      <a href="/" class="text-dark">{{ item.title }}</a>
                    </h5>
                    <p class="card-text">{{ item.content }}</p>
                    <div
                      class="d-flex justify-content-between align-items-baseline"
                    >
                      <!-- <div class="h5">2,800 元</div> -->
                      <del class="h6">{{ item.origin_price }}</del>
                      <div class="h5">{{ item.price }}</div>
                    </div>
                  </div>
                  <div class="card-footer d-flex">
                    <button
                      type="button"
                      class="btn btn-outline-secondary btn-sm"
                    >
                      <i class="fas fa-heart fa-2x"></i>
                      <i class="far fa-heart fa-2x"></i>                      
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
                      <i class="fas fa-shopping-cart fa-2x cartIcon"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "@/components/front/Navbar.vue";
import Footer from "../../components/front/Footer";
import Product from "../../components/front/Product";
import $ from "jquery";

export default {
  name: "ListProducts",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      products: [],
      product: {},
      cart: {},
      filterText: "",
      filterArray: [],
      
      status: {
        loadingItem: "",
      },
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        $("#productModal").modal("show");
        vm.status.loadingItem = "";
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
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
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.isLoading = false;
      });
    },
  },
 

computed:{
 filterData() {
let vm= this;
vm.filterArray = vm.products;
if(vm.filterText == ""){ 
  return vm.filterArray;
}else{
return vm.filterArray = vm.products.filter((item) =>{
  return item.title.match(vm.filterText);
  
})
}
  },
    created() {
      this.getProducts();      
      this.getCart();
    },
}
};
</script>

<style scoped lang="scss">
@import "@/assets/listProducts.scss";
</style>