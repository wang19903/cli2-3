<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="wrap">
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="100">購買時間</th>
          <th width="180">客戶名稱</th>
          <th width="200">Email</th>
          <th width="200">購買款項</th>
          <th width="100">應付金額</th>
          <th width="80">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in sortOrder" :key="key">
          <td>{{ item.create_at | date }}</td>
          <td>{{ item.user.name }}</td>
          <td>{{ item.user.email }}</td>
          <ul class="list-unstyled">
            <li v-for="(orders, i) in item.orders" :key="i">
              {{ product.product.title }} / 數量：{{ product.qty
              }}{{ product.product.unit }}
            </li>
          </ul>
          <td class="text-right">
            {{ item.total | currency }}
          </td>
          <td class="text-right">
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else class="text-danger">尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <pagination
      class="fixed-bottom"
      v-if="orders.length"
      :pagination="pagination"
      @emitPage="getProducts($event)"
    ></pagination>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import pagination from "@/components/Pagination";

export default {
  name: "Orders",
  data() {
    return {
      orders: [],
      pagination: {},
      tempProduct: {},
      //isNew: false,
      isLoading: false,
    };
  },
  components: {
    pagination,
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
  },
  computed: {
    sortOrder() {
      const vm = this;
      let newOrder = [];
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return newOrder;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
}
</style>