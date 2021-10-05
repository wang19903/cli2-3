<template>
  <div>
    <div class="bgImg2">
      <div class="slogan2"><div>{{ $t('GENERAL.LIST_BANNER_P') }}<span>{{ $t('GENERAL.AD_OPEN_CODE') }}</span>{{ $t('GENERAL.LIST_BANNER_P2') }}</div></div>
    </div>
    <div class="wrapper">
      <div class="search pt-2">
        <div class="my-3 my-lg-0 ListProductsImg">
          <div class="ListProductsInputwrap">
            <div class="d-flex flex-row justify-content-center">
            <input
              type="text"
              v-model="searchText"
              placeholder="想吃什麼?"
              aria-label="Search"
            />
              <button class="btn" type="button" @click="filter()">
                <font-awesome-icon icon="search" size="1x"/>
              </button>
            </div>
          </div>

        </div>
      </div>
      <div class="container">
        <div class="row">
          <div  class="col-3 ListProductsSidebar">
            <div class="list-group sticky-top pt-4">
              <a
                class="list-group-item list-group-item-action
                ListProductsCardBG"
                href="#"
                @click.prevent="searchText = item"
                :class="{ active: item === searchText }"
                v-for="item in categories"
                :key="item"
              >
                <i class="fas fa-fish" aria-hidden="true"/>
                {{ $t(item) }}
              </a>
              <a
                href="#"
                class="list-group-item list-group-item-action ListProductsCardBG"
                @click.prevent="searchText = ''"
                :class="{ active: searchText === '' }"
              >
                {{ $t('GENERAL.VIEWALL') }}
              </a>
            </div>
          </div>
            <div  class="row-cols col-9 container">
              <div class="text-left clickWrap">
                <a @click.prevent="changeType('price')">
                   {{ $t('GENERAL.SORT') }}
                  <div
                  :class="{ 'rotate': isReverse }"
                  v-if="sortType == 'price'"
                  >
                  <i class="fas fa-angle-up"></i>
                  </div>
                </a>
              </div>
              <div class="row no-gutters d-flex flex-wrap mb-4">
                <div
                  class="col-xl-3 col-lg-4 col-md-6 mb-3"
                  v-for="(item, key) in filter"
                  :key="key"
                >
                <div data-aos="fade-up" data-aos-duration="1000" class="d-flex">
                  <div class="pr-4 sizing d-flex">
                    <div class="card mb-1 ListProductsCard">
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
                          class="ListProductsBadge float-right ml-2"
                        >{{ item.category }}
                        </span>
                        <h5 class="card-title text-left">
                          <a @click="$router.push(`/product/${item.id}`)" class="text-dark">{{ $t(item.title) }}</a>
                        </h5>
                        <p class="ListProductsCardText text-left">{{ item.content }}</p>
                        <div
                          class="d-flex justify-content-between align-items-baseline"
                        >
                          <del class="h6">{{ item.origin_price | currency }}</del>
                          <div class="h5">{{ item.price | currency }}</div>
                        </div>
                      </div>
                      <div class="ListProductsCardFooter p-1 ListProductsCardBG">
                        <button
                          type="button"
                          class="btn btn-sm"
                          @click="addTocart(item)"
                        >
                          <i
                            class="fas fa-spinner fa-pulse"
                            v-if="status.loadingItem === item.id"
                          />
                          <i class="fas fa-shopping-cart fa-lg" />
                          <span>{{ $t('GENERAL.ADDTO') }}</span>
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
import { mapGetters, mapActions } from 'vuex'
import GoTop from '@/components/front/GoTop.vue'

export default {
  name: 'ListProducts',
  components: {
    GoTop
  },
  data () {
    return {
      sortType: 'price',
      isReverse: false,
      searchText: '',
      status: {
        loadingItem: ''
      },
      carData: []
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
    changeType (type) {
      var vm = this
      if (vm.sortType === type) {
        vm.isReverse = !vm.isReverse
      }
      vm.sortType = type
    },
    // rotateicon () {
    //   const vm = this
    //   vm.isReverse = !vm.isReverse
    // },
    ...mapActions('productModules', ['getProducts']),
    ...mapActions('cartsModules', ['updatelocalCarData', 'getlocalCarData'])
  },
  computed: {
    filter () {
      const vm = this
      let newData = vm.newData
      let tempData = vm.tempData
      vm.$store.dispatch('updataLoading', true)
      tempData = vm.products.filter(item => {
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
        } else if (vm.searchText === item.title) {
          const titleFullName = item.title
            .toLowerCase()
            .includes(vm.searchText.toLowerCase())
          return titleFullName
        }
      })
      const type = vm.sortType
      let sortdata = vm.sortdata
      sortdata = tempData.sort((a, b) => {
        if (vm.isReverse) return b[type] - a[type]
        else return a[type] - b[type]
      })
      newData = []
      sortdata.forEach(item => {
        newData.push(item)
      })
      vm.$store.dispatch('updataLoading', false)
      return newData
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
