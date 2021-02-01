<template>
  <div class="bgImg">
    <!-- <loading :active.sync="isLoading"></loading> -->
    <b-navbar
      toggleable="sm"
      type="dark"
      variant="logo"
      class="border-bottom border-dark"
    >
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <b-navbar-brand href="">
            <img src="../../assets/img/logo.png" style="height: 45px" alt="" />
          </b-navbar-brand>
        </router-link>
        <!-- Navbar Link        -->
        <!---->
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!---->
          <b-navbar-nav class="ml-auto">
            <!-- <b-list-group horizontal="md"> -->
            <router-link to="/products" class="bg-logo firstBtn">
              <!-- <b-list-group-item class="p-0"> -->
              <b-button title="全部產品" class="">
                <font-awesome-icon
                  icon="concierge-bell"
                  size="lg"
                  class="fas"
                /><span class="">全部產品</span>
              </b-button>
              <!-- </b-list-group-item> -->
            </router-link>

            <!-- <b-list-group-item class="p-0 cartBtn"> -->
            <b-button
              title="購物車"
              class="bg-logo secondBtn cartRwdicon"
              data-toggle="dropdown"
              data-flip="false"
              ><i class="fas fa-shopping-cart fa-lg" />
              <i class="cartIcon"
                ><div
                  variant=""
                  v-if="cart.carts"
                  class="badge badge-light"
                  >{{ cart.carts.length }}</div
                ></i
              ><span class="secondTip">購物車</span>
            </b-button>
            <div
              class="dropdown-menu dropdown-menu-right dropdown-cart"
              data-offset="400"
            >
              <div class="dropdown">
                <table class="table">
                  <thead>
                    <th></th>
                    <th>品名</th>
                    <th>數量</th>
                    <th class="text-right">單價</th>
                  </thead>
                  <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                      <td class="align-middle">
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click="deleteCart(item.id)"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </td>
                      <td class="align-middle" style="max-width: 120px">
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
                      <td class="text-right">{{ cart.total }}</td>
                    </tr>
                    <tr v-if="cart.final_total !== cart.total">
                      <td colspan="3" class="text-right text-success">
                        折扣價
                      </td>
                      <td class="text-right text-success">
                        {{ cart.final_total }}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <button class="btn border btn-block mt-3">前往結帳</button>
              </div>
            </div>

            <!-- </b-list-group-item> -->

            <router-link to="/login" class="bg-logo thirdBtn">
              <!-- <b-list-group-item class="p-0"> -->
              <b-button title="後台管理" class="">
                <font-awesome-icon icon="user" size="lg" class="fas" /><span
                  class=""
                  >後台管理</span
                >
              </b-button>
              <!-- </b-list-group-item> -->
            </router-link>
            <!-- </b-list-group> -->
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Navbar",
  data() {
    return {
    };
  },
  methods: {
    removeCart(id) {
      this.$store.dispatch('cartsModules/removeCart', id);
    },
    ...mapActions('cartsModules',['getCart']),
  },
    computed: {
    ...mapGetters('cartsModules', ['cart']),
    ...mapGetters(['isLoading']),
  },
  created() {
    this.getCart();
    this.$bus.$on("updateCart", () => {
    });
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/front_navber";
</style>