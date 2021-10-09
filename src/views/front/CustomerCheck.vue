<template>
  <div class="CheckWrap">
    <div class="container-fluid">
      <form class="col-md-6">
        <table class="table">
          <thead>
            <th>{{ $t('Cart.ItemName') }}</th>
            <th>{{ $t('Cart.Qty') }}</th>
            <th>{{ $t('Cart.SinglePrice') }}</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">
                {{ $t('Product.' + item.product.title) }}
              </td>
              <td class="align-middle">
                {{ item.qty }}{{ $t('Cart.' + item.product.unit) }}
              </td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">{{ $t('Cart.TotalPrice') }}</td>
              <td class="text-right">{{ order.total }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">{{ $t('Customer.Email')}}</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>{{ $t('Customer.OrderName')}}</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>{{ $t('Customer.RecipientTel')}}</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>{{ $t('Customer.RecipientAddress')}}</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>{{ $t('CustomerCheck.PayStatus')}}</th>
              <td>
                <span v-if="!order.is_paid">{{ $t('CustomerCheck.Notpaid')}}</span>
                <span v-else class="text-success mb-2">{{ $t('CustomerCheck.paid')}}</span>
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
            {{ order.user.name }} <span>{{ $t('CustomerCheck.sir')}}</span><br />
            {{ $t('CustomerCheck.FinishText')}}<br />
            <span>{{ $t('CustomerCheck.ShopTel')}}:+886-2929-15311</span><br />
            <span>{{ $t('CustomerCheck.ShopEmail')}}:thisaddress@isfake.com.tw</span><br />
            {{ $t('CustomerCheck.LookingforWard')}}<br />
            <br />
            <br />
            {{ $t('CustomerCheck.Notice')}}<br />
            <br />
            {{ $t('CustomerCheck.NoticeContent')}}<br />
            {{ $t('CustomerCheck.CantReturn')}}
          </p>
          <div class="sign">
            <img src="@/assets/img/logo.jpg" alt="logo" />
            <div class="mt-5">
              <div
                @click="$router.push(`/`)"
                to="/"
                class="text-light border border-info bg-info rounded"
              >
                {{ $t('CustomerCheck.ToHomepage')}}
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
            {{ $t('CustomerCheck.ToPay')}}
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
