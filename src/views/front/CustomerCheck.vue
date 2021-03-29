<template>
  <div>
    <div class="container-fluid my-5 row justify-content-center">
      <form class="col-md-6" @click.prevent="payOrder">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">
                {{ item.qty }}/{{ item.product.unit }}
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
                <div v-else>
                  <div class="text-success mb-2">付款完成</div>
                  <router-link
                    to="/"
                    class="text-light border border-danger bg-danger rounded"
                  >
                    返回首頁
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger" type="button">確認付款去</button>
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
        console.log(response.data)
        vm.$store.dispatch('updataLoading', false)
        if (response.data.success) {
          console.log(response.data)
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

<style lang="scss" scoped>
ul {
  margin-top: 0px;
}
</style>
