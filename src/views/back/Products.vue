<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="wrap">
      <div class="text-right mt-4">
        <button class="btn btn-primary" @click="openModal(true)">
          建立新產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="90">分類</th>
            <th>名稱</th>
            <th class="origin_price">原價</th>
            <th width="90">售價</th>
            <th width="70">上架</th>
            <th width="70">編輯</th>
            <th width="70">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-right origin_price">
              {{ item.origin_price | currency }}
            </td>
            <td class="text-right">
              {{ item.price | currency }}
            </td>
            <td class="text-right">
              <span v-if="item.is_enabled" class="text-success">O</span>
              <span v-else class="text-danger">X</span>
            </td>
            <td>
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openModal(false, item)"
              >
                編輯
              </button>
            </td>
            <td>
              <button
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
        class=""
        v-if="products.length"
        :pagination="pagination"
        @emitPage="getProducts($event)"
      ></pagination>
    </div>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
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
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <font-awesome-icon
                      icon="spinner"
                      spin
                      v-if="fileUploading"
                    />
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt=""
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="1"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">
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
            <button
              type="button"
              class="btn btn-primary"
              @click="updataProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- delete -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
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
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">
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
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      fileUploading: false,
    }
  },
  components: {
    pagination,
  },
  methods: {
    getProducts(page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      vm.$store.dispatch('updataLoading', true)
      this.$http.get(api).then(response => {
        vm.products = response.data.products
        vm.pagination = response.data.pagination
        vm.$store.dispatch('updataLoading', false)
      })
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = Object.assign({}, item)
        this.isNew = false
      }
      $('#productModal').modal('show')
    },
    updataProduct() {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        if (response.data.success) {
          $('#productModal').modal('hide')
          vm.getProducts()
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'success',
          })
        } else {
          $('#productModal').modal('hide')
          vm.getProducts()
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger',
          })
        }
      })
    },
    openDeleteModal(item) {
      const vm = this
      $('#delProductModal').modal('show')
      vm.tempProduct = Object.assign({}, item)
    },
    deleteProduct() {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      this.$http.delete(api).then(response => {
        if (response.data.success) {
          $('#delProductModal').modal('hide') // 關閉modal
          vm.getProducts() // 重新取得更新完的資料
          vm.$store.dispatch('updateMessage', {
            message: '刪除商品成功',
            status: 'success',
          })
        } else {
          $('#delProductModal').modal('hide') // 關閉modal
          vm.getProducts() // 重新取得更新完的資料
          vm.$store.dispatch('updateMessage', {
            message: '刪除商品成功失敗',
            status: 'danger',
          })
        }
      })
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0]
      const vm = this
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      vm.fileUploading = true
      this.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          vm.fileUploading = false
          if (response.data.success) {
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
            vm.$store.dispatch('updateMessage', {
              message: '上傳圖片成功',
              status: 'success',
            })
          } else {
            vm.$store.dispatch('updateMessage', {
              message: '上傳圖片失敗',
              status: 'danger',
            })
          }
        })
    },
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
  created() {
    this.getProducts()
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  font-size: 15px;
}
.origin_price {
  width: 90px;
}
@media (max-width: 375px) {
  .origin_price {
    display: none;
  }
}
</style>