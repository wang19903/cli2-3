<template>
  <div>
    <div class="wrapper">
      <Navbar />
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
              <button class="btn searchbtn" type="submit" disabled>
                <i class="fa fa-search" aria-hidden="true"></i> 搜尋
              </button>
            </div>
          </div>
          <div class="click box-sizing" @click="changeType('price')">
            價格排序
            <span
              class="icon"
              :class="{ inverse: isReverse }"
              v-if="sortType == 'price'"
            >
              <i class="fas fa-angle-up"></i>
            </span>
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
              <div
                class="col-lg-4 col-md-6 mt-4"
                v-for="(item, key) in filterData[currentPage]"
                :key="key"
              >
                <div data-aos="fade-up" data-aos-duration="1000">
                  <div class="mb-4 pr-4 sizing">
                    <div @click="getProduct(item.id)">
                      <div class="card mb-1">
                        <div
                          style="
                            height: 150px;
                            background-size: cover;
                            background-position: center;
                          "
                          :style="{ backgroundImage: `url(${item.imageUrl})` }"
                        ></div>
                        <div class="card-body">
                          <span
                            class="badge badge-secondary float-right ml-2"
                            >{{ item.category }}</span
                          >
                          <h5 class="card-title text-left">
                            <a href="/" class="text-dark">{{ item.title }}</a>
                          </h5>
                          <p class="card-text text-left">{{ item.content }}</p>
                          <div
                            class="d-flex justify-content-between align-items-baseline"
                          >
                            <del class="h6">{{ item.origin_price }}</del>
                            <div class="h5">{{ item.price }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer p-1">
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm ml-auto"
                        @click="addtoCart(item.id)"
                      >
                        <i
                          class="fas fa-spinner fa-pulse"
                          v-if="status.loadingItem === item.id"
                        ></i>
                        <i class="fas fa-shopping-cart fa-lg" />

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
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 0 }">
              <a
                class="page-link"
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
            <li
              class="page-item"
              :class="{ disabled: currentPage === newData.length - 1 }"
            >
              <a class="page-link" href="#" @click.prevent="next">»</a>
            </li>
          </ul>
        </nav>
      </b-container>
      <GoTop />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/front/Navbar.vue";
import Footer from "@/components/front/Footer.vue";
import pagination from "@/components/Pagination.vue";
import { mapGetters, mapActions } from "vuex";
import GoTop from "@/components/front/GoTop.vue";

export default {
  name: "ListProducts",
  components: {
    Navbar,
    Footer,
    pagination,
    GoTop,
  },
  data() {
    return {
      sortType: "price",
      isReverse: false,
      tempData: [],
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
    getProduct(id) {
      const vm = this;
      vm.$router.push(`/product/${id}`);
    },
    addtoCart(id, qty = 1) {
      this.$store.dispatch("cartsModules/addtoCart", { id, qty });
    },
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
    checkDetail(id) {
      this.$router.push(`/product/${id}`);
    },
    changeType: function (type) {
      var vm = this;
      if (vm.sortType == type) {
        vm.isReverse = !vm.isReverse;
      } else {
        vm.isReverse = false;
      }
      vm.sortType = type;
    },
    ...mapActions("productModules", ["getProducts"]),
  },
  computed: {
    filterData() {
      const vm = this;
      vm.currentPage = 0;
      let sortdata = [];
      vm.$store.dispatch("updataLoading", true);
      vm.tempData = vm.products.filter((item) => {
        if (vm.searchText === "") {
          return vm.products;
        } else if (vm.searchText === item.category) {
          let category_data = item.category
            .toLowerCase()
            .includes(vm.searchText.toLowerCase());
          return category_data;
        } else if (vm.searchText !== item.title) {
          let title_data = item.title
            .toLowerCase()
            .includes(vm.searchText.toLowerCase());
          return title_data;
        }
      });
      let type = vm.sortType;
      sortdata = vm.tempData.sort(function (a, b) {
        if (vm.isReverse) return b[type] - a[type];
        else return a[type] - b[type];
      });
      vm.newData = [];
      sortdata.forEach((item, i) => {
        if (i % 6 == 0) {
          vm.newData.push([]);
        }
        const pagenum = parseInt(i / 6);
        vm.newData[pagenum].push(item);
      });
      vm.$store.dispatch("updataLoading", false);
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