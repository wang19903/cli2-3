<template>
  <div>
    <div class="wrapper">
      <div class="search pt-2">
        <div class="my-3 my-lg-0 ListProducts-img">
          <div class="ListProducts-inputwrap">
            <input
              type="text"
              v-model="searchText"
              placeholder="想吃什麼?"
              aria-label="Search"
            />
              <button class="btn" type="submit" disabled>
                <i class="fa fa-search" aria-hidden="true"></i> 搜尋
              </button>            
          </div>
          <div class="click box-sizing" @click="changeType('price')">
            價格排序
            <span
              :class="{ inverse: isReverse }"
              v-if="sortType == 'price'"
            >
              <i class="fas fa-angle-up"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div  class="col-3 ListProducts-sidebar">
            <div class="list-group sticky-top pt-4">
              <a
                class="list-group-item list-group-item-action
                ListProducts-cardBG"
                href="#"
                @click.prevent="searchText = item"
                :class="{ active: item === searchText }"
                v-for="item in categories"
                :key="item"
              >
                <i class="fas fa-fish" aria-hidden="true"/>
                {{ item }}
              </a>
              <a
                href="#"
                class="list-group-item list-group-item-action ListProducts-cardBG"
                @click.prevent="searchText = ''"
                :class="{ active: searchText === '' }"
              >
                全部顯示
              </a>
            </div>
          </div>
          <div  class="row-cols col-9 container">
            <div class="row no-gutters d-flex flex-wrap mb-4">
              <div
                class="col-xl-3 col-lg-4 col-md-6 mb-3"
                v-for="(item, key) in filterData"
                :key="key"
              >
                <div data-aos="fade-up" data-aos-duration="1000">
                  <div class="pr-4 sizing">                    
                      <div class="card mb-1 ListProducts-card ListProducts-cardBG">
                        <router-link  :to="`/product/${item.id}`">
                          <div
                          style="
                            height: 150px;
                            background-size: cover;
                            background-position: center;
                          "
                          :style="{ backgroundImage: `url(${item.imageUrl})` }"
                          ></div>
                        </router-link>                       
                        <div class="card-body">
                          <router-link  :to="`/product/${item.id}`">
                          <span
                            class="ListProducts-badge float-right ml-2"
                            >{{ item.category }}</span
                          >
                          <h5 class="card-title text-left">
                            <a href="/" class="text-dark">{{ item.title }}</a>
                          </h5></router-link>
                          <p class="ListProducts-card-text text-left">{{ item.content }}</p>
                          <div
                            class="d-flex justify-content-between align-items-baseline"
                          >
                            <del class="h6">{{ item.origin_price }}</del>
                            <div class="h5">{{ item.price }}</div>
                          </div>
                        </div>
                        <div class="ListProducts-card-footer p-1 ListProducts-cardBG">
                          <button
                          type="button"
                          class="btn btn-sm ml-auto"
                          @click.prevent="addTocart(item)"
                          >
                          <i
                          class="fas fa-spinner fa-pulse"
                          v-if="status.loadingItem === item.id"
                          ></i>
                          <i class="fas fa-shopping-cart fa-lg" />
                          <span>放入購物車</span>
                          </button>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div class="row">
      </div>
      <GoTop />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import GoTop from '@/components/front/GoTop.vue'

export default {
  name: 'ListProducts',
  components: {
    GoTop,
  },
  data() {
    return {
      sortType: 'price',
      isReverse: false,
      tempData: [],
      product: {},
      newData: [],
      searchText: '',
      status: {
        loadingItem: '',
      },
      carData: JSON.parse(localStorage.getItem('carData')) || [], 
      //
      sum:0,
      //
    }
  },
  methods: {
    //
        updateSum(length) {
      this.sum = length;
    },
    //
     addTocart (data) {
      const vm = this     
      const cacheCarID = []; 
      vm.carData.forEach((item) => {
        cacheCarID.push(item.product_id);
      });
      if (cacheCarID.indexOf(data.id) === -1) {
        const cartContent = {
          product_id: data.id, 
          qty: 1, 
          name: data.title, 
          origin_price: data.origin_price, 
          price: data.price, 
        };
        vm.carData.push(cartContent);
        localStorage.setItem('carData', JSON.stringify(vm.carData));
        vm.getCart()
        //vm.$bus.$emit('cart:get')
      } else {
        let cache = {}; 
        vm.carData.forEach((item, keys) => {
          if (item.product_id === data.id) {
            let { qty } = item; 
            cache = {
              product_id: data.id, 
              qty: qty += 1, 
              name: data.title,
              origin_price: data.origin_price, 
              price: data.price, 
            };
            vm.carData.splice(keys, 1);
          }
        });
        vm.carData.push(cache); 
        localStorage.setItem('carData', JSON.stringify(vm.carData));
        vm.getCart()
        //vm.$bus.$emit('cart:get')
      }
      //
      vm.getCart()
      //
    },
    getCart () {
const vm = this
//
vm.sum = vm.cart.length;
//
      vm.carData = JSON.parse(localStorage.getItem('carData')) || []
    },
    // addtoCart(id, qty = 1) {
    //   this.$store.dispatch('cartsModules/addtoCart', { id, qty })
    // },
    checkDetail(id) {
      this.$router.push(`/product/${id}`)
    },
    changeType: function (type) {
      var vm = this
      if (vm.sortType == type) {
        vm.isReverse = !vm.isReverse
      } else {
        vm.isReverse = false
      }
      vm.sortType = type
    },
    ...mapActions('productModules', ['getProducts']),
  },
  computed: {
    filterData() {
      const vm = this
      vm.currentPage = 0
      let sortdata = []
      vm.$store.dispatch('updataLoading', true)
      vm.tempData = vm.products.filter(item => {
        if (vm.searchText === '') {
          return vm.products
        } else if (vm.searchText === item.category) {
          let category_data = item.category
            .toLowerCase()
            .includes(vm.searchText.toLowerCase())
          return category_data
        } else if (vm.searchText !== item.title) {
          let title_data = item.title
            .toLowerCase()
            .includes(vm.searchText.toLowerCase())
          return title_data
        }
      })
      let type = vm.sortType
      sortdata = vm.tempData.sort(function (a, b) {
        if (vm.isReverse) return b[type] - a[type]
        else return a[type] - b[type]
      })
      vm.newData = []
      sortdata.forEach((item, i) => {
        vm.newData.push(item)
      })
      vm.$store.dispatch('updataLoading', false)
      return vm.newData
    },
    ...mapGetters('productModules', ['categories', 'products']),
    ...mapGetters(['isLoading']),

  },
  created() {
    this.getProducts()
    this.getCart()
  },
}
</script>
