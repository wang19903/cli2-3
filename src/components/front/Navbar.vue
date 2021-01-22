<template>
  <div>
    <!-- <loading :active.sync="isLoading"></loading> -->
    <nav class="navbar navbar-expand-lg border-bottom border-dark cartPosition">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <a href="#">
            <img src="../../assets/img/logo.png" style="height: 45px" alt="" />
          </a>
        </router-link>
        <!-- Navbar Link        -->

        <router-link to="">
          <b-list-group horizontal="md">
            <router-link to="/products">
            <b-list-group-item class="p-0">
              <b-button  title="全部產品" class="bg-logo firstBtn">
                <i class="fas fa-concierge-bell fa-lg"></i><span class="firstTip">全部產品</span> </b-button
            ></b-list-group-item>
            </router-link >
            <b-list-group-item class="p-0 cartBtn">
              <b-button
               title="購物車"
                class="bg-logo secondBtn"
                data-toggle="dropdown"
                data-flip="false"
              >
                <i class="fas fa-shopping-cart fa-lg cartIcon">
                <b-badge
                  variant="light"
                  v-if="carts.carts"
                  class="badge badge-info"
                  >{{ carts.carts.length }}</b-badge
                ></i><span class="secondTip">購物車</span>
              </b-button>
              <div
                class="dropdown-menu dropdown-menu-right p-1 dropdown-cart"
                data-offset="400"
              >
                <div class="dropdown ml-auto mr-3">
                  <table class="table mt-4">
                    <thead>
                      <th></th>
                      <th>品名</th>
                      <th>數量</th>
                      <th class="text-right">單價</th>
                    </thead>
                    <tbody>
                      <tr v-for="item in carts.carts" :key="item.id">
                        <td class="align-middle">
                          <button
                            type="button"
                            class="btn btn-outline-danger btn-sm"
                            @click="deleteCart(item.id)"
                          >
                            <i class="far fa-trash-alt"></i>
                          </button>
                        </td>
                        <td class="align-middle" style="max-width:120px">
                          {{ item.product.title }}
                        </td>
                        <td class="align-middle">
                          {{ item.qty }}/{{ item.product.unit }}
                        </td>
                        <td class="align-middle text-right">
                          {{ item.final_total }}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3" class="text-right">總計</td>
                        <td class="text-right">{{ carts.total }}</td>
                      </tr>
                      <tr v-if="carts.final_total !== carts.total">
                        <td colspan="3" class="text-right text-success">
                          折扣價
                        </td>
                        <td class="text-right text-success">
                          {{ carts.final_total }}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <button class="btn btn-logo btn-block mt-3" >前往結帳</button>
                </div>
              </div>

            </b-list-group-item>
      <router-link to="/login">
            <b-list-group-item class="p-0">
              <b-button  title="後台管理" class="bg-logo thirdBtn">
                <i class="fas fa-user fa-lg"></i><span class="thirdTip">後台管理</span>
              </b-button>
            </b-list-group-item>
            </router-link>
          </b-list-group>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      carts: [],
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        vm.carts = response.data.data;
      });
    },
    deleteCart(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(api).then((response) => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
  },
  created() {
    const vm = this;
    this.getCart();
    this.$bus.$on("updateCart", () => {
      vm.getCart();
    });
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/front_navber";
</style>