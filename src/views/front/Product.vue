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
              @click.prevent="addTocart(product,product.num )"
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
     // productitem: {},
      status: {
        loadingItem: '',
      },
      cart: [],
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
addTocart (product, qty = 1) {
     const cacheCarID = []; // 暫存 ID 放置處
      // 一開始先將 carData 中的 ID 全部撈出來
      this.carData.forEach((item) => {
        cacheCarID.push(item.product_id);
      });
      // 接下來使用 indexOf 尋找傳進來的參數 ID 是否有在該陣列中
      // 若不存在則會回傳 -1 並加入到陣列儲存在 localStorage
      // 若存在則會回傳 0 並改走 else
      if (cacheCarID.indexOf(data.id) === -1) {
        const cartContent = {
          product_id: data.id, // 產品 ID
          qty: 1, // 產品數量，預設一筆
          name: data.title, // 產品標題
          origin_price: data.origin_price, // 產品原始金額
          price: data.price, // 產品銷售金額
        };
        // 將數量推回陣列中
        this.carData.push(cartContent);
        // 重新寫入 localStorage
        localStorage.setItem('carData', JSON.stringify(this.carData));
      } else {
        let cache = {}; // 產品暫存處
        this.carData.forEach((item, keys) => {
          // 只找相同的產品內容
          if (item.product_id === data.id) {
            let { qty } = item; // 取出已存在 localStorage 購物車的資料並加數量增加
            cache = {
              product_id: data.id, // 產品 ID
              qty: qty += vm.product.num, // 產品當前數量，針對數量增加數量
              name: data.title, // 產品標題
              origin_price: data.origin_price, // 產品原始金額
              price: data.price, // 產品銷售金額
            };
            // 移除現有 localStorage 購物車的資料，否則 localStorage 會重複加入
            this.carData.splice(keys, 1);
          }
        });
        // 將數量已經增加的資料推回陣列中
        this.carData.push(cache); // 不建議放在 forEach 內，否則迴圈會重複執行導致變成加二
        // 重新寫入 localStorage
        localStorage.setItem('carData', JSON.stringify(this.carData));
      }
    },
    getCart () {
      this.cart = JSON.parse(localStorage.getItem('cart')) || []
    },
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
  created() {
    this.productId = this.$route.params.productId
    this.getProduct()
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
