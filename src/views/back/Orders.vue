<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="wrap">
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="80">購買時間</th>
            <th width="150">客戶名稱</th>
            <th>訂單編號</th>
            <th width="70" class="RWDnone">金額</th>
            <th width="70" class="RWDnone">結清</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in sortOrder" :key="key">
            <td>{{ item.create_at | date }}</td>
            <td>{{ item.user.name }}</td>
            <td class="product_id">
              <button type="button"
                class="btn btn-outline-primary"
                @click="openModal(item.id)"
              >
                {{ item.id }}
              </button>
            </td>
            <td class="text-right RWDnone">
              {{ item.total | currency }}
            </td>
            <td class="text-right RWDnone">
              <span v-if="item.is_paid" class="text-success">O</span>
              <span v-else class="text-danger">X</span>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- pagination -->
      <pagination
        v-if="orders.length"
        :pagination="pagination"
        @emitPage="getProducts($event)"
      ></pagination>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              訂單編號: {{ order.id }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table table-striped border">
              <thead>
                <th>品名</th>
                <th>數量</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">
                    {{ item.product.num }} {{ item.product.nuit }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="text-left">
                    Email:{{ order.user.email }} <br />電話:{{ order.user.tel }}
                  </td>
                  <td class="text-right">
                    <div class="RWDdisplay">
                      總金額:
                      {{ order.total | currency }}
                      <div>
                        是否結清:
                        <span v-if="order.is_paid" class="text-success">O</span>
                        <span v-else class="text-danger">X</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="text-left border-top">
            <p class="p-1">備註: {{ order.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import pagination from '@/components/Pagination.vue'

export default {
  name: 'Orders',
  data() {
    return {
      orders: [],
      pagination: {},
      order: {
        products: {},
        user: {
          email: '',
          tel: '',
        },
      },
      isLoading: false,
    }
  },
  components: {
    pagination,
  },
  methods: {
    getProducts(page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.isLoading = true //
      vm.$http.get(api).then(response => {
        vm.isLoading = false //
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
      })
    },
    openModal(id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`
      vm.$http.get(api).then(res => {
        $('#exampleModal').modal('show')
        vm.order = res.data.order
      })
    },
  },
  computed: {
    sortOrder() {
      const vm = this
      let newOrder = []
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0
          const bIsPaid = b.is_paid ? 1 : 0
          return bIsPaid - aIsPaid
        })
      }
      return newOrder
    },
  },
  created() {
    this.getProducts()
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
}
.product_id,
.product_id button {
  width: 235px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.RWDdisplay {
  display: none;
}

@media (max-width: 576px) {
  .product_id,
  .product_id button {
    max-width: 120px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 6px 0px 6px 0px;
  }
  .RWDnone {
    display: none;
  }
  .RWDdisplay {
    display: block;
  }
}
</style>
