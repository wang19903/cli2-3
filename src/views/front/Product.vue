<template>
  <div class="wrap wrapper">
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
              {{ product.origin_price }} 元
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
        <span class="h3">同類別產品</span>
      </div>
      <div
        class="row-cols container otherwrap d-flex flex-md-row flex-wrap"
      >
        <div
          class="col-md-6 col-lg-4 col-sm-12"
          v-for="(item, key) in filterSameData"
          :key="key"
        >
          <div data-aos="fade-up" data-aos-duration="1000" class="d-flex justify-content-center">
            <div class="sizing ">
              <div class="card mb-1 ListProducts-card ListProducts-cardBG">
                <router-link :to="`/product/${item.id}`">
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
                  <router-link :to="`/product/${item.id}`">
                    <span class="ListProducts-badge float-right ml-2">{{
                      item.category
                    }}</span>
                    <h5 class="card-title text-left">
                      <a href="/" class="text-dark">{{ item.title }}</a>
                    </h5></router-link
                  >
                  <p class="ListProducts-card-text text-left">
                    {{ item.content }}
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-baseline"
                  >
                    <del class="h6">{{ item.origin_price }}</del>
                    <div class="h5">{{ item.price }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="item in filterSameData" :key="item.id">
        <div class="card product__card h-100 mt-3">
                <div class="card__img">
                  <img :src="item.imageUrl" class="card-img-top detail__img" alt="產品">
                </div>
                <div class="card-body">
                  <h5 class="card-title text-center detail__text">{{ item.title }}</h5>
                  <div class="text-truncate pb-2">
                    {{ item.description }}
                  </div>
                  <div class="d-flex justify-content-end detail__price">
                    <div  v-if="!item.price">NT {{ item.origin_price | currency }}</div>
                    <del class="text-muted mr-3" v-if="item.price">NT {{ item.origin_price | currency }}</del>
                    <div class="text-danger" v-if="item.price">NT {{ item.price | currency }}</div>
                  </div>
                </div>
              </div>

        </swiper-slide>
        
      <div class="swiper-pagination" slot="pagination"></div>
      </swiper> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Product',
  data() {
    return {
      product: {},
      status: {
        loadingItem: '',
      },
      cart: [],
      newarray: [],
      temp: [],
    }
  },

  methods: {
    getProduct() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('updataLoading', true)
        vm.product = response.data.product
        vm.product.num = 1
        vm.$store.dispatch('updataLoading', false)
      })
    },
    // addtoCart(id, qty = 1) {
    //   this.$store.dispatch('cartsModules/addtoCart', { id, qty })
    // },
    addTocart(data, num) {
      this.getCart()
      const cacheCarID = []
      this.carData.forEach(item => {
        cacheCarID.push(item.product_id)
      })
      if (cacheCarID.indexOf(data.id) === -1) {
        const cartContent = {
          product_id: data.id,
          qty: num,
          name: data.title,
          origin_price: data.origin_price,
          price: data.price,
        }
        this.carData.push(cartContent)
        localStorage.setItem('carData', JSON.stringify(this.carData))
        this.getCart()
        this.$bus.$emit('getCart')
      } else {
        let cache = {}
        this.carData.forEach((item, keys) => {
          if (item.product_id === data.id) {
            let { qty } = item
            cache = {
              product_id: data.id,
              qty: qty + num,
              name: data.title,
              origin_price: data.origin_price,
              price: data.price,
            }
            this.carData.splice(keys, 1)
          }
        })
        this.carData.push(cache)
        localStorage.setItem('carData', JSON.stringify(this.carData))
        this.getCart()
        this.$bus.$emit('getCart')
      }
    },
    getCart() {
      this.carData = JSON.parse(localStorage.getItem('carData')) || []
    },
    toProduct() {
      this.$router.push(`/product/${id}`)
    },
    ...mapActions('productModules', ['getProducts']),
  },
  computed: {
    filterSameData() {
      const vm = this
      return vm.products.filter(
        item =>
          item.id !== vm.productId && item.category === vm.product.category
      )

      // const vm = this
      // let temp = []
      // let newarray = []
      // vm.products.filter(item => {
      //   if (vm.product.id !== item.id) {
      //     vm.temp.push(item)
      //   }
      // })

      // for (let i = 0; i < 3; i++) {
      //   let n = Math.floor(Math.random() * temp.length)
      //   newarray.push(temp[n])
      //   temp.splice(n, 1)
      // }
      // return temp
      // return newarray
    },
    ...mapGetters('productModules', ['products']),
    ...mapGetters(['isLoading']),
  },
  created() {
    this.productId = this.$route.params.productId
    this.getProduct()
    this.getProducts()
    this.getCart()
  },
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

.otherwrap {
  padding-right: 10px;
}

.otherdiv {
  padding: 0px;
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
