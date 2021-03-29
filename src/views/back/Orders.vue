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
              <button
                type="button"
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
        @emitPage="getOrder($event)"
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
          <div class="modal-header d-flex">
            <h5 class="modal-title mr-auto" id="exampleModalLabel">
              訂單編號: {{ order.id }}
            </h5>
            <button type="button" class="btn btn-primary" @click="Edit(order)">
              編輯
            </button>
            <button
              type="button"
              class="close ml-0 p-2"
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

    <div
      class="modal fade"
      id="EditModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="EditModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="EditModalLabel">
              <span>修改訂單</span>
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
            <div class="row">
              <div class="col-sm">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="name">客戶名稱</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      v-model="tempData.user.name"
                      placeholder="請輸入名稱"
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <label for="tel">電話</label>
                    <input
                      type="number"
                      class="form-control"
                      id="tel"
                      v-model="tempData.user.tel"
                      placeholder="請輸入電話"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="email">信箱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    v-model="tempData.user.email"
                    placeholder="請輸入信箱"
                  />
                </div>

                <div class="form-group">
                  <label for="address">地址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    v-model="tempData.user.address"
                    placeholder="請輸入地址"
                  />
                </div>

                <hr />
                <div class="form-group">
                  <label for="message">內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="message"
                    v-model="tempData.message"
                    placeholder="請輸入內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempData.is_paid"
                      :value="tempData.is_paid"
                      v-on:input="tempData.is_paid = $event.target.value"
                      id="is_paid"
                    />
                    <label class="form-check-label" for="is_paid">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="EditConfirm">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import pagination from '@/components/Pagination.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Orders',
  data () {
    return {
      orders: [],
      tempData: {
        products: {},
        user: {
          address: '',
          email: '',
          name: '',
          tel: ''
        }
      },
      pagination: {},
      order: {
        products: {},
        user: {
          email: '',
          tel: ''
        }
      },
      newOrder: []
    }
  },
  components: {
    pagination
  },
  methods: {
    getOrder (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.$store.dispatch('updataLoading', true)
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('updataLoading', false)
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
      })
    },
    openModal (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`
      vm.$store.dispatch('updataLoading', true)
      vm.$http.get(api).then(res => {
        vm.$store.dispatch('updataLoading', false)
        $('#exampleModal').modal('show')
        vm.order = res.data.order
      })
    },
    Edit (order) {
      this.tempData = Object.assign({}, order)
      $('#EditModal').modal('show')
    },
    EditConfirm () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempData.id}`
      vm.$http.put(api, { data: vm.tempData }).then(response => {
        vm.$store.dispatch('updataLoading', true)
        if (response.data.success) {
          $('#EditModal').modal('hide')
          vm.getOrder()
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'success'
          })
        } else {
          $('#EditModal').modal('hide')
          vm.getOrder()
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger'
          })
        }
        vm.$store.dispatch('updataLoading', false)
      })
    },
    sort () {
      const vm = this
      if (vm.orders.length) {
        vm.newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0
          const bIsPaid = b.is_paid ? 1 : 0
          return bIsPaid - aIsPaid
        })
      }
      return vm.newOrder
    }
  },
  computed: {
    sortOrder () {
      const vm = this
      vm.sort()
      return vm.newOrder
    },
    ...mapGetters(['isLoading'])
  },
  created () {
    this.getOrder()
  }
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

.modal-content {
  text-align: left;
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
