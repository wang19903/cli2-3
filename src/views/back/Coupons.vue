<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="wrap m-0">
      <div class="text-right mt-4">
        <button type="button" class="btn btn-primary" @click="openModal(true)">
          新增優惠券
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th>活動名稱</th>
            <th width="80">折扣碼</th>
            <th width="80">到期日</th>
            <th width="70">折扣(%)</th>
            <th width="70" class="RWDnone">啟用</th>
            <th width="70" class="RWDnone">編輯</th>
            <th width="70" class="RWDnone">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td>
              <div class="RWDnone">
                {{ item.title }}
              </div>
              <button
                type="button"
                class="RWDon btn btn-outline-primary btn-sm"
                @click="openModal(false, item)"
              >
                {{ item.title }}
              </button>
            </td>
            <td>{{ item.code }}</td>
            <td>{{ new Date(item.due_date).toLocaleDateString() }}</td>
            <td>{{ item.percent }}%</td>
            <td class="text-center RWDnone">
              <span v-if="item.is_enabled" class="text-success">O</span>
              <span v-else>X</span>
            </td>
            <td class="RWDnone">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal(false, item)"
              >
                編輯
              </button>
            </td>
            <td class="RWDnone">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDeleteModal(item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- pagination -->
      <pagination
        v-if="coupons.length"
        :pagination="pagination"
        @emitPage="getCoupons($event)"
      ></pagination>
      <!-- Modal -->
    </div>
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
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
                <div class="form-group">
                  <label for="title">活動名稱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempCoupon.title"
                    placeholder="請輸入活動名稱"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="code">折扣碼</label>
                    <input
                      type="text"
                      class="form-control"
                      id="code"
                      v-model="tempCoupon.code"
                      placeholder="請輸入折扣碼"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="due_date ">到期日</label>
                    <input
                      type="date"
                      class="form-control"
                      id="due_date"
                      v-model="tempCoupon.due_date"
                      placeholder="請輸入到期日"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md">
                    <label for="percent">折扣百分比</label>
                    <input
                      type="number"
                      class="form-control"
                      id="percent"
                      v-model="tempCoupon.percent"
                      placeholder="請輸入折扣百分比"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">活動描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempCoupon.description"
                    placeholder="請輸入活動描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">活動內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempCoupon.content"
                    placeholder="請輸入活動說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="1"
                      id="is_enabled"
                    />
                    <label class="form-check-label text-left" for="is_enabled">
                      是否啟用 </label
                    ><span class="text-right">
                      目前狀態:<span
                        v-if="tempCoupon.is_enabled"
                        class="text-success"
                        >O</span
                      >
                      <span v-else>X</span></span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger RWDon"
              @click="openDeleteModal(item)"
            >
              刪除
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- delete -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除折扣碼</span>
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
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong>
            折扣碼(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">
              確認刪除
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

export default {
  name: 'Coupons',
  data () {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    pagination
  },
  methods: {
    getCoupons (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        vm.isLoading = false
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
      } else {
        this.tempCoupon = { ...item }
        this.isNew = false
      }
      $('#couponModal').modal('show')
    },
    updateCoupon () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        if (response.data.success) {
          $('#couponModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#couponModal').modal('hide')
          vm.getCoupons()
          alert('新增失敗')
        }
      })
    },
    openDeleteModal (item) {
      const vm = this
      $('#delCouponModal').modal('show')
      vm.tempCoupon = { ...item }
    },
    deleteCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      vm.$http.delete(api).then(() => {
        $('#delCouponModal').modal('hide')
        vm.getCoupons()
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
}

.RWDon {
  display: none;
}
@media (max-width: 576px) {
  td {
    padding: 6px 6px 6px 6px;
    font-size: 15px;
  }

  .RWDnone {
    display: none;
  }

  .RWDon {
    display: block;
  }
}
</style>
