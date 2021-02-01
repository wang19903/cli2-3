<template>
  <div class="wrap">
    <Navbar></Navbar>
    <div class="search d-flex justify-content-center pt-2">
      <form class="form-inline my-3 my-lg-0 img">
        <div class="input-group">
          <input
            class="form-control"
            type="text"
            v-model="searchText"
            placeholder="想吃什麼?"
            aria-label="Search"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-danger" type="submit" disabled>
              <i class="fa fa-search" aria-hidden="true"></i> 搜尋
            </button>
          </div>
        </div>
      </form>
    </div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="3" md="">
          <div class="list-group sticky-top pt-4">
            <a
              class="list-group-item list-group-item-action"
              href="#"
              @click.prevent="searchText = item"
              :class="{ active: item === searchText }"
              v-for="item in categories"
              :key="item"
            >
              <i class="fa fa-street-view" aria-hidden="true"></i>
              {{ item }}
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action"
              @click.prevent="searchText = ''"
              :class="{ active: searchText === '' }"
            >
              全部顯示
            </a>
          </div>
        </b-col>

        <b-col cols="9" class="bv-example-row-flex-cols container">
          <div class="row no-gutters d-flex flex-wrap">
            <loading :active.sync="isLoading"></loading>
            <div
              class="col-lg-4 mt-4"
              v-for="item in filterData"
              :key="item.id"
            >
              <div class="mb-4 pr-4">
                <div class="card shadow-sm">
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
                    <h5 class="card-title text-left">
                      <a href="/" class="text-dark">{{ item.title }}</a>
                    </h5>
                    <p class="card-text text-left">{{ item.content }}</p>
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
                      <i class="fas fa-heart"></i>
                      <i class="far fa-heart"></i>
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
                      <i class="fas fa-shopping-cart cartIcon"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>

      <pagination
        class="fixed-bottom"
        :paginationService="pagination"
        v-on:pageService="pagin"
      ></pagination>
    </b-container>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "@/components/front/Navbar.vue";
import Footer from "../../components/front/Footer";
import $ from "jquery";
import pagination from "@/components/Pagination";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ListProducts",
  components: {
    Navbar,
    Footer,
    pagination,
  },
  data() {
    return {
      product: {},

      filterArray: [],
      pagination: {},

      searchText: "",
      status: {
        loadingItem: "",
      },
    };
  },
  methods: {
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
      this.$store.dispatch("cartsModules/addtoCart", { id, qty });
    },
    ...mapActions("productModules", ["getProducts"]),

    pagin(currentPage = 1) {
      vm.$store.dispatch("updateLoading", true);
      const objectProducts = vm.filterArray;
      vm.cacheProducts = [];
      for (const item in objectProducts) {
        vm.cacheProducts.push(objectProducts[item]);
      }
      vm.pagination.totalResult = vm.cacheProducts.length;
      vm.pagination.per_page = 10;

      vm.pagination.pageTotal = Math.ceil(
        vm.pagination.totalResult / vm.pagination.per_page
      );

      vm.pagination.currentPage = currentPage;

      if (vm.pagination.currentPage > vm.pagination.pageTotal) {
        vm.pagination.currentPage = vm.pagination.pageTotal;
      }

      const minPage =
        vm.pagination.currentPage * vm.pagination.per_page -
        vm.pagination.per_page +
        1;
      const maxPage = vm.pagination.currentPage * vm.pagination.per_page;

      vm.filterArray = [];

      vm.cacheProducts.forEach((item, index) => {
        const num = index + 1;
        if (num >= minPage && num <= maxPage) {
          vm.products.push(item);
        }
      });

      vm.$store.dispatch("updateLoading", false);
    },
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter((item) => {
          const data = item.title
            .toLowerCase()
            .includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      vm.filterArray = vm.products;
      return this.filterArray;
    },
    ...mapGetters("productModules", ["categories", "products"]),
  },

  created() {
    this.getProducts();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/listProducts.scss";
</style>