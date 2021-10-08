<template>
  <div class="CheckWrap">
    <div class="container-fluid">
      <form class="col-md-6">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">
                {{ $t('Product.' + item.product.title) }}
              </td>
              <td class="align-middle">
                {{ item.qty }}/{{ ('Cart.' + item.product.unit) }}
              </td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ order.total }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success mb-2">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="order.is_paid"
          class="guild pt-5 mb-5"
          :class="{ none: !order.is_paid }"
        >
          <p class="text-left">
            {{ order.user.name }} <span>先生/女士</span><br />
            結帳流程完成了，非常感謝您購買我們店鋪的產品，如果有任何問題，歡迎您致電給我們。<br />
            <span>電話:+886-2929-15311</span><br />
            <span>信箱:thisaddress@isfake.com.tw</span><br />
            期待您的再次光臨!<br />
            <br />
            <br />
            提醒您!<br />
            <br />
            本公司不會主動打電話給您要求操作ATM，如有問題請撥打165查詢<br />
            因衛生關係，除食品本身問題外，恕難退貨退款，還請多多見諒。
          </p>
          <div class="sign">
            <img src="@/assets/img/logo.jpg" alt="logo" />
            <div class="mt-5">
              <div @click="$router.push(`/`)"
                to="/"
                class="text-light border border-info bg-info rounded"
              >
                返回首頁
              </div>
            </div>
          </div>
        </div>
        <div class="text-right mb-5" v-if="order.is_paid === false">
          <button
            class="btn btn-danger"
            type="submit"
            @click.prevent="payOrder"
          >
            確認付款去
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CustomerCheck',
  data () {
    return {
      order: {
        user: {}
      },
      orderId: ''
    }
  },
  methods: {
    getOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.$store.dispatch('updataLoading', true)
      vm.$http.get(api).then(response => {
        vm.order = response.data.order
        vm.$store.dispatch('updataLoading', false)
      })
    },

    payOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.$store.dispatch('updataLoading', true)
      vm.$http.post(api).then(response => {
        vm.$store.dispatch('updataLoading', false)
        if (response.data.success) {
          vm.getOrder()
        }
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  },
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>
