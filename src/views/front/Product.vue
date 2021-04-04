<template>
  <div class="wrap wrapper">
    <Alert />
    <div
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="container" role="document">
        <div class="row-col border-0">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ product.title }}</span>
            </h5>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="產品圖片" />
          </div>
        </div>
        <div class="row-col pr-5 pl-5">
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
              >原價 {{ product.originPrice }} 元</del
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
          </p>

          <div class="modal-footer">
            <select class="form-control mt-3" v-model="product.num">
              <option value="0" disabled selected>--請選擇--</option>
              <option :value="num" v-for="num in 10" :key="num">
                選購{{ num }} {{ product.unit }}
              </option>
            </select>
            <span class="text-muted text-nowrap mr-3">
              小計<strong v-if="product.num * product.price >= 0">
                {{ product.num * product.price }}
              </strong>
            </span>
            <button
              type="button"
              class="btn btn-secondary"
              @click.prevent="addTocart(product, product.num)"
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
      <div class="text-left pl-2"><span class="h3">你可能有興趣...</span></div>
      <swiper
        class="swiper mb-3 mt-3"
        :options="swiperOption"
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
    </div>
  </div>
</template>

<script>
import Alert from '@/components/AlertMessage.vue'
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
      newarray: [],
      pageId: '',
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
    SwiperSlide,
    Alert
  },
  methods: {
    getProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('updataLoading', true)
        vm.product = response.data.product
        vm.product.num = 1
        vm.pageId = vm.product.id
        vm.lightBoxData(vm.product.id)
        vm.$store.dispatch('updataLoading', false)
      })
    },
    addTocart (data, num) {
      const vm = this
      vm.getCart()
      const cacheCarID = []
      vm.carData.forEach(item => {
        cacheCarID.push(item.productId)
      })
      if (cacheCarID.indexOf(data.id) === -1) {
        const cartContent = {
          productId: data.id,
          qty: num,
          name: data.title,
          originPrice: data.originPrice,
          price: data.price
        }
        vm.carData.push(cartContent)
        localStorage.setItem('carData', JSON.stringify(vm.carData))
        vm.getCart()
        vm.$bus.$emit('getCart')
        vm.$store.dispatch('updateMessage', {
          message: '已加入購物車',
          status: 'success'
        })
      } else {
        let cache = {}
        vm.carData.forEach((item, keys) => {
          if (item.productId === data.id) {
            const { qty } = item
            cache = {
              productId: data.id,
              qty: qty + num,
              name: data.title,
              originPrice: data.originPrice,
              price: data.price
            }
            vm.carData.splice(keys, 1)
          }
        })
        vm.carData.push(cache)
        localStorage.setItem('carData', JSON.stringify(vm.carData))
        vm.getCart()
        vm.$bus.$emit('getCart')
        vm.$store.dispatch('updateMessage', {
          message: '已加入購物車',
          status: 'success'
        })
      }
    },
    getCart () {
      this.carData = JSON.parse(localStorage.getItem('carData')) || []
    },
    lightBoxData (data) {
      const vm = this
      const Temp = []
      vm.newarray = []
      console.log(data)
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
      this.$router.push(`/product/${id}`)
      window.location.reload()
    },
    ...mapActions('productModules', ['getProducts'])
  },
  computed: {
    lightbox () {
      const vm = this
      return vm.newarray
    },
    ...mapGetters('productModules', ['products']),
    ...mapGetters(['isLoading'])
  },
  created () {
    const vm = this
    vm.productId = vm.$route.params.productId
    vm.getProduct()
    vm.getProducts()
    vm.getCart()
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
