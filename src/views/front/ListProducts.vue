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
        <b-col cols="3">
          <div class="list-group sticky-top pt-4">
            <a
              class="list-group-item list-group-item-action"
              href="#"
              @click.prevent="searchText = item"
              :class="{ active: item === searchText }"
              v-for="item in categories"
              :key="item"
            >
              <i class="fas fa-fish" aria-hidden="true"></i>
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

        <b-col cols="9" class="bv-example-row-flex-cols container a">
          <div class="row no-gutters d-flex flex-wrap b">
            <!-- <loading :active.sync="isLoading"></loading> -->
            <div
              class="col-lg-4 col-md-4 mt-4"
              v-for="(item, key) in filterData[currentPage]"
              :key="key"
            >
              <!--  filterData[currentPage]  -->
              <div class="mb-4 pr-4 sizing">
                <div class="card mb-1">
                  <div
                    style="
                      height: 150px;
                      background-size: cover;
                      background-position: center;
                    "
                    class="asd"
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
                  <div class="card-footer p-1">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm ml-auto"
                      @click="addtoCart(item.id)"
                    >
                      <i class="fas fa-shopping-cart fa-lg" />
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.loadingItem === item.id"
                      ></i>
                      <span class="">放入購物車</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>

      <nav aria-label="..." class="d-flex justify-content-center mt-2">
        <ul class="pagination ">
          <li class="page-item ">
            <a
              class="page-link "
              href="#"
              tabindex="-1"
              aria-disabled="true"
              @click.prevent="prev"
              >«</a
            >
          </li>
          <li
            class="page-item"
            :class="{ active: currentPage === page - 1 }"
            v-for="page in filterData.length"
            :key="page"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="currentPage = page - 1"
              >{{ page }}</a
            >
          </li>
          <li class="page-item">
            <a class="page-link" href="#" @click.prevent="next">»</a>
          </li>
        </ul>
      </nav>
    </b-container>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "@/components/front/Navbar.vue";
import Footer from "../../components/front/Footer";
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
      currentPage: 0,
      newData: [],
      searchText: "",
      status: {
        loadingItem: "",
      },
    };
  },
  methods: {
    addtoCart(id, qty = 1) {
      this.$store.dispatch("cartsModules/addtoCart", { id, qty });
    },
    ...mapActions("productModules", ["getProducts"]),

    prev() {
      const vm = this;
      if (vm.currentPage === 0) {
        vm.currentPage = 0;
      } else {
        vm.currentPage--;
      }
    },
    next() {
      const vm = this;
      if (vm.currentPage === vm.newData.length - 1) {
        vm.currentPage = vm.newData.length - 1;
      } else {
        vm.currentPage++;
      }
    },
  },
  computed: {
    categoryData() {
      const vm = this;
      let category = "";
      return vm.products.reduce((prev, curr) => {
        if (curr.category !== category) {
          prev.push(curr.category);
        }
        category = curr.category;
        return prev;
      }, []);
    },
    filterData() {
      const vm = this;
      vm.currentPage = 0;
      let tempData = [];
      vm.newData = [];
      vm.$store.dispatch("updataLoading",true)
      tempData = vm.products.filter((item) => {
        if (vm.searchText === '') {
          return vm.products;
        } else {
         
          const data = item.title
            .toLowerCase()
            .includes(vm.searchText.toLowerCase());
          return data;
        }
      });
      tempData.forEach((item, i) => {
        if (i % 6 == 0) {
          vm.newData.push([]);
        }
        const pagenum = parseInt(i / 6);
        vm.newData[pagenum].push(item);
      });
      vm.$store.dispatch("updataLoading",false)
      return vm.newData;
    },

    ...mapGetters("productModules", ["categories", "products"]),
    ...mapGetters(["isLoading"]),
  },

  created() {
    this.getProducts();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/listProducts.scss";
</style>