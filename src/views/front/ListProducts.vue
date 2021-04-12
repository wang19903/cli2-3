<template>
  <div>
    <Alert />
    <loading :active.sync="isLoading"></loading>
    <div class="bgImg2">
      <p class="slogan">
        鼎中美食 鮮香味美
      </p>
    </div>
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
              <button class="btn" type="submit" @click="filter()">
                <i class="fa fa-search" aria-hidden="true"></i> 搜尋
              </button>
          </div>
          <div class="click box-sizing" @click="changeType('price')">
            價格排序
            <span
              :class="{ 'rotate': isReverse }"
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
                        <div @click="$router.push(`/product/${item.id}`)">
                          <div
                          style="
                            height: 150px;
                            background-size: cover;
                            background-position: center;
                          "
                          :style="{ backgroundImage: `url(${item.imageUrl})` }"
                          ></div>
                        </div>
                        <div class="card-body">
                          <span
                            class="ListProducts-badge float-right ml-2"
                          >{{ item.category }}
                          </span>
                          <h5 class="card-title text-left">
                            <div @click="$router.push(`/product/${item.id}`)" class="text-dark">{{ item.title }}</div>
                          </h5>
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
                          />
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
        </div>
      </div>
      <GoTop />
    </div>
  </div>
</template>

<script>
import Alert from '@/components/AlertMessage.vue'
import { mapGetters, mapActions } from 'vuex'
import GoTop from '@/components/front/GoTop.vue'

export default {
  name: 'ListProducts',
  components: {
    GoTop,
    Alert
  },
  data () {
    return {
      sortType: 'price',
      isReverse: false,
      tempData: [],
      newData: [],
      searchText: '',
      status: {
        loadingItem: ''
      },
      carData: [],
      sortdata: []
    }
  },
  methods: {
    addTocart (data) {
      const vm = this
      vm.checkdata()
      let cacheCarID = []
      vm.localCarData.forEach(item => {
        cacheCarID.push(item.productId)
      })
      if (cacheCarID.indexOf(data.id) === -1) { // 上面推進來後的id，找不到自己裡面有一樣的data.id就建立新資料
        let cartContent = {
          productId: data.id,
          qty: 1,
          name: data.title,
          originPrice: data.origin_price,
          price: data.price
        }
        vm.carData.push(cartContent)
        // vm.$store.dispatch('cartsModules/updatelocalCarData', cartContent)
        localStorage.setItem('carData', JSON.stringify(vm.carData))
        cartContent = {}
      } else {
        let cache = {}
        vm.localCarData.forEach((item, keys) => {
          if (item.productId === data.id) {
            let { qty } = item
            cache = {
              productId: data.id,
              qty: (qty += 1),
              name: data.title,
              originPrice: data.origin_price,
              price: data.price
            }
            vm.carData.splice(keys, 1)
            console.log('old')
            vm.carData.push(cache)
            cache = {}
          }
          // vm.$store.dispatch('cartsModules/updatelocalCarData', cache)
          localStorage.setItem('carData', JSON.stringify(vm.carData))
        })
      }
      cacheCarID = []
      vm.checkdata()
      vm.$store.dispatch('updateMessage', {
        message: '已加入購物車',
        status: 'success'
      })
    },
    checkdata () {
      const vm = this
      vm.$store.dispatch('cartsModules/getlocalCarData')
      vm.carData = []
      vm.localCarData.forEach(item => {
        vm.carData.push(item)
      })
    },
    checkDetail (id) {
      this.$router.push(`/product/${id}`)
    },
    changeType: function (type) {
      var vm = this
      if (vm.sortType === type) {
        vm.isReverse = !vm.isReverse
      } else {
        vm.isReverse = false
      }
      vm.sortType = type
    },
    filter () {
      const vm = this
      vm.$store.dispatch('updataLoading', true)
      vm.tempData = vm.products.filter(item => {
        if (vm.searchText === '') {
          return vm.products
        } else if (vm.searchText === item.category) {
          const categoryData = item.category
            .toLowerCase()
            .includes(vm.searchText.toLowerCase())
          return categoryData
        } else if (vm.searchText !== item.title) {
          const titleData = item.title
            .toLowerCase()
            .includes(vm.searchText.toLowerCase())
          return titleData
        }
      })
      const type = vm.sortType
      vm.sortdata = vm.tempData.sort(function (a, b) {
        if (vm.isReverse) return b[type] - a[type]
        else return a[type] - b[type]
      })
      vm.newData = []
      vm.sortdata.forEach(item => {
        vm.newData.push(item)
      })
      vm.$store.dispatch('updataLoading', false)
      return vm.newData
    },
    rotateicon () {
      const vm = this
      vm.isReverse = !vm.isReverse
    },
    ...mapActions('productModules', ['getProducts']),
    ...mapActions('cartsModules', ['updatelocalCarData', 'getlocalCarData'])
  },
  computed: {
    filterData () {
      const vm = this
      vm.filter()
      return vm.newData
    },
    ...mapGetters('productModules', ['categories', 'products']),
    ...mapGetters(['isLoading']),
    ...mapGetters('cartsModules', ['localCarData'])
  },
  created () {
    this.getProducts()
    this.getlocalCarData()
    this.checkdata()
  }
}
</script>

<style lang="scss" scoped>
.rotate{
  transform: rotate( 180deg);
}
</style>
