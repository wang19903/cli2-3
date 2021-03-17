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
            注意事項:<br/>
            每日採購新鮮食材並且不使用食品添加物、防腐劑等，所以除醬料品外，一律冷凍或冷藏宅配至府上。<br/>
            醬料類以及滷汁請勿把表面油層倒掉，並且擦乾器具後使用除當日食用部分外<br/>
            請勿放置在潮濕、高溫處，避免食物變成變質<br/>

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
              @click="addtoCart(product.id, product.num)"
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Product',
  data() {
    return {
      product: {},
      productitem: {},
      status: {
        loadingItem: '',
      },
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
    addtoCart(id, qty = 1) {
      this.$store.dispatch('cartsModules/addtoCart', { id, qty })
    },
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
  created() {
    this.productId = this.$route.params.productId
    this.getProduct()
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

p{
  font-size: 15px;
}

.form-control {
  width: 50%;
}

@media(max-width: 550px){
  .modal-footer{
    display: flex;
    justify-content: center;
    flex-direction: column;

    select{
      width: 70%;
    }
  }
}
</style>
