<template>
  <div class="Productwrap m-auto">
    <div class="container-fluid wrap">
      <div
        tabindex="-1"
        role="dialog"
        aria-labelledby="detailModalLabel"
        aria-hidden="true"
        class=""
      >
        <div class="modal-header">
          <h5 class="modal-title" id="detailModalLabel">
            <span>{{ $t('Product.' + product.title) }}</span>
          </h5>
        </div>
        <div class="row" role="document">
          <div class="col-md-7 border-0">
            <div class="modal-body">
              <img :src="product.imageUrl" class="img-fluid" alt="產品圖片" />
            </div>
          </div>
          <div class="col-md-5 pt-5">
            <blockquote class="blockquote mt-3">
              <footer class="blockquote-footer text-left text-body">
                {{ $t('Product.' + product.description) }}
              </footer>
            </blockquote>
            <p class="text-left pt-2 text-muted">
              {{ $t('ProductVue.Notice') }}<br />
              {{ $t('ProductVue.P1') }}<br />
              {{ $t('ProductVue.P2') }}<br />
              {{ $t('ProductVue.P3') }}<br />
              {{ $t('ProductVue.P4') }}<br />
              {{ $t('ProductVue.P5') }}<br />
              <!-- Window Width: {{ windowWidth }} <br /> 測試用-->
            </p>
            <p class="h6 text-right">
              {{ $t('ProductVue.OriginPrice') }}
              <del v-if="product.price">{{ product.origin_price }}</del>
            </p>
            <p class="h5 text-right font-weight-bold" v-if="product.price">
              {{ $t('ProductVue.Price') }} {{ product.price }}
            </p>
          </div>
        </div>
        <div class="modal-footer mt-5 d-flex justify-content-end">
          <div class="d-flex justify-content-start mt-5">
            <select class="form-control w-100" v-model="product.num">
              <option value="0" disabled selected>
                {{ $t('ProductVue.Selet') }}
              </option>
              <option :value="num" v-for="num in 10" :key="num">
                {{ $t('ProductVue.Choose') }}{{ num }}
                {{ $t('Cart.' + product.unit) }}
              </option>
            </select>
            <span class="text-muted text-nowrap p-2">
              {{ $t('ProductVue.Total') }}
              <strong v-if="product.num * product.price >= 0">
                {{ product.num * product.price }}
              </strong>
            </span>
          </div>
          <button
            type="button"
            class="btn btn-secondary mt-5"
            @click="addTocart(product, product.num)"
          >
            <i
              class="fas fa-spinner fa-pulse"
              v-if="product.id === status.loadingItem"
            ></i>
            {{ $t('ProductVue.AddToCart') }}
          </button>
        </div>
        <div class="text-left pl-2 mt-5 mb-5">
          <span class="h3">{{ $t('ProductVue.Recommend') }}</span>
        </div>
        <!-- 燈箱-->
        <span v-if="swiperHeight < 50">
          {{swiperHeight}} 看到這段文字，表示後端資料處理中
       <!--測試，後端lag就跳出-->
        </span>
        <swiper
          class="swiper mb-3 mt-3"
          :options="swiperOption"
          ref="checkHeight"
          :breakpoints="swiperOption.breakpoints"
        >
          <swiper-slide
            v-for="item in lightbox"
            :key="item.id"
            :class="{ widthResize: windowWidth < 700 }"
          >
            <div class="card h-100 mt-3">
              <div class="lightbox-img">
                <div
                  @click.prevent="toProduct(item.id)"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div>
              </div>
              <div class="card-body text-left d-flex flex-column p-0">
                <h5 class="card-title">
                  {{ $t('Product.' + item.title) }}
                </h5>
                <div class="text-truncate pb-2">
                  {{ $t('Product.' + item.description) }}
                </div>
                <div class="d-flex mt-auto w-100">
                  <div v-if="!item.price">
                    NT {{ item.originPrice | currency }}
                  </div>
                  <del class="text-muted mr-auto" v-if="item.price"
                    >NT {{ item.origin_price | currency }}</del
                  >
                  <div class="text-danger" v-if="item.price">
                    NT {{ item.price | currency }}
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Product',
  data () {
    return {
      product: {},
      status: {
        loadingItem: ''
      },
      cart: [],
      carData: [],
      newarray: [],
      windowWidth: window.innerWidth,
      swiperHeight: 0,
      swiperOption: {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1050: {
            slidesPerView: 4,
            spaceBetween: 30
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          475: {
            slidesPerView: 2,
            spaceBetween: 30
          }
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  mounted () {
    this.$nextTick(() => {
      // 等其他資料處理完畢後才輪到這裡
      window.addEventListener('resize', this.onResize)
      this.swiperHeight = this.$refs.checkHeight.clientHeight
    })
  },
  methods: {
    getProduct (productId) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${productId}`
      vm.$store.dispatch('updataLoading', true)
      vm.$http.get(api).then(response => {
        vm.product = response.data.product
        vm.product.num = 1
        vm.lightBoxData(vm.product.id)
        vm.$store.dispatch('updataLoading', false)
      })
    },
    addTocart (data, num) {
      const vm = this
      const cacheCarID = []
      vm.localCarData.forEach(item => {
        cacheCarID.push(item.productId)
      })
      if (cacheCarID.indexOf(data.id) === -1) {
        const cartContent = {
          productId: data.id,
          qty: num,
          Title: data.title,
          originPrice: data.origin_price,
          price: data.price
        }
        vm.carData.push(cartContent)
        vm.$store.dispatch('cartsModules/updatelocalCarData', cartContent)
        localStorage.setItem('carData', JSON.stringify(vm.carData))
      } else {
        let cache = {}
        vm.localCarData.forEach((item, keys) => {
          if (item.productId === data.id) {
            const { qty } = item
            cache = {
              productId: data.id,
              qty: qty + num,
              Title: data.title,
              originPrice: data.origin_price,
              price: data.price
            }
            vm.carData.splice(keys, 1)
          }
        })
        vm.carData.push(cache)
        vm.$store.dispatch('cartsModules/updatelocalCarData', cache)
        localStorage.setItem('carData', JSON.stringify(vm.carData))
      }
      vm.$store.dispatch('updateMessage', {
        message: '已加入購物車',
        status: 'success'
      })
    },
    lightBoxData (data) {
      const vm = this
      vm.newarray = []
      vm.products.filter(item => {
        if (data !== item.id) {
          vm.newarray.push(item)
        }
      })
    },
    toProduct (id) {
      const vm = this
      vm.$store.dispatch('updataLoading', true)
      vm.$router.push(`/product/${id}`)
      this.getProduct(id)
      vm.$route.params.productId = id
      vm.$store.dispatch('updataLoading', false)
    },
    onResize () {
      this.windowWidth = window.innerWidth
    },
    ...mapActions('productModules', ['getProducts']),
    ...mapActions('cartsModules', ['updatelocalCarData', 'getlocalCarData'])
  },
  computed: {
    lightbox () {
      const vm = this
      return vm.newarray
    },
    ...mapGetters('productModules', ['products']),
    ...mapGetters(['isLoading']),
    ...mapGetters('cartsModules', ['localCarData'])
  },
  created () {
    const vm = this
    vm.getProduct(vm.$route.params.productId)
    vm.getProducts()
    vm.getlocalCarData()
  }
}
</script>
