<template>
  <div class="wrap wrapper">
    <div
      tabindex="-1"
      role="dialog"
      aria-labelledby="detailModalLabel"
      aria-hidden="true"
      class="container"
    >
      <div class="modal-header">
        <h5 class="modal-title" id="detailModalLabel">
          <span>{{ product.title }}</span>
        </h5>
      </div>
      <div class="row" role="document">
        <div class="col-md-6 border-0">
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="產品圖片" />
          </div>
        </div>
        <div class="col-md-6 pt-5">
          <blockquote class="blockquote mt-3">
            <footer class="blockquote-footer text-left text-body">
              {{ product.description }}
            </footer>
          </blockquote>
          <div class="d-flex justify-content-between align-items-baseline">
            <div class="h5" v-if="!product.price">
              {{ product.originPrice }} 元
            </div>
            <del class="h6" v-if="product.price"
              >原價 {{ product.origin_price }} 元</del
            >
            <div class="h5" v-if="product.price">
              現在只要 {{ product.price }} 元
            </div>
          </div>
          <p class="text-left pt-2 text-muted">
            注意事項:<br />
            每日採購新鮮食材並且不使用食品添加物、防腐劑等。<br />
            除醬料品外，只使用冷凍配送，如需一般配送請提供取件資訊或親自提領。<br />
            除醬料品外，其他產品保存期較短，不適用七天鑑賞期。<br />
            醬料類以及滷汁請勿把表面油層倒掉，並且擦乾器具後使用。<br />
            請勿放置在潮濕、高溫處，避免食物變成變質<br />
             Window height: {{ windowWidth }} <br/>
          </p>
        </div>
      </div>
      <div class="modal-footer mt-5 d-flex justify-content-center">
        <select class="form-control mt-5" v-model="product.num">
          <option value="0" disabled selected>--請選擇--</option>
          <option :value="num" v-for="num in 10" :key="num">
            選購{{ num }} {{ product.unit }}
          </option>
        </select>
        <span class="text-muted text-nowrap mr-3 mt-5">
          小計
          <strong v-if="product.num * product.price >= 0">
            {{ product.num * product.price }}
          </strong>
        </span>
          <button
            type="button"
            class="btn btn-secondary mt-5"
            @click="addTocart(product, product.num)"
          >
            <i
              class="fas fa-spinner fa-pulse"
              v-if="product.id === status.loadingItem"
            ></i>
              加到購物車
          </button>
      </div>
      <div class="text-left pl-2 mt-5 mb-5"><span class="h3">你可能有興趣...</span></div>
      <swiper
        class="swiper mb-3 mt-3"
        :options="swiperOption"
        v-if="windowWidth >= 415"
      >
        <swiper-slide v-for="item in lightbox"
        :key="item.id">
          <div class="card h-100 mt-3">
            <div
              class="lightbox-img">
              <div @click.prevent="toProduct(item.id)"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
              ></div>
            </div>
            <div class="card-body">
              <h5 class="card-title text-center">
                {{ item.title }}
              </h5>
              <div class="text-truncate pb-2">
                {{ item.description }}
              </div>
              <div class="d-flex justify-content-end">
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
      <div v-if="windowWidth <= 414" class="mt-3 mb-5">
        <div class="container d-flex" v-for="item in lightbox"
        :key="item.id">
          <div class="card h-100 mt-3">
            <div
              class="lightbox-img">
              <div @click.prevent="toProduct(item.id)"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
              ></div>
            </div>
            <div class="card-body">
              <h5 class="card-title text-center">
                {{ item.title }}
              </h5>
              <div class="text-truncate pb-2">
                {{ item.description }}
              </div>
              <div class="d-flex justify-content-end">
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
        </div>
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
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  mounted () {
    this.$nextTick(() => { // 等其他資料處理完畢後才輪到這裡
      window.addEventListener('resize', this.onResize)
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
          name: data.title,
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
              name: data.title,
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
      const Temp = []
      vm.newarray = []
      vm.products.filter(item => {
        if (data !== item.id) {
          Temp.push(item)
        } else {
          Temp.push(item)
        }
      })

      for (let i = 0; i < 7; i++) {
        const n = Math.floor(Math.random() * Temp.length)
        vm.newarray.push(Temp[n])
        Temp.splice(n, 1)
      }
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

<style lang="scss" scoped>
.wrap {
  background-color: rgba(255, 248, 221, 0.171);
}

img {
  width: 70%;
}

p {
  font-size: 15px;
}

select {
  width: 50%;
}

.lightbox-img{
  overflow: hidden;
  div{
  height: 150px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: .4s;
    &:hover{
    transform: scale(1.05);
  }
  }
}

@media (max-width: 550px) {
  .modal-footer {
    display: flex;
    justify-content: center;
    flex-direction: column;

    select {
      width: 100%;
    }
  }
}
</style>
