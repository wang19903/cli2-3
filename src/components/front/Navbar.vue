<template>
  <div class="bgImg">
    <div><p class="slogan">鼎中美食 鮮香味美</p></div>
    <loading :active.sync="isLoading"></loading>

    <nav class="navbar navbar-expand-md navbar-light border-bottom border-dark">
      <router-link class="navbar-brand p-0" to="/">
        <img
          src="@/assets/img/logo.png"
          style="height: 45px"
          alt="鼎鮮飯麵LOGO"
          class="nav-img"
        />
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link
              to="/products"
              class="bg-logo nav-link text-dark firstBtn"
              title="全部產品"
            >
              <font-awesome-icon
                icon="concierge-bell"
                size="lg"
                class="fas"
              /><span>全部產品</span>
            </router-link>
          </li>

          <li class="nav-item dropdown">
            <a
              title="購物車"
              class="bg-logo secondBtn cartRwdicon nav-link dropdown-toggle text-dark"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              data-flip="false"
            >
              <div class="spanCenter">
                <i class="fas fa-shopping-cart fa-lg" />
                <i class="cartIcon"
                  ><div
                    variant=""
                    v-if="cart.carts.length"
                    class="badge badge-light"
                  >
                    {{ cart.carts.length }}
                  </div></i
                ><span class="">購物車</span>
              </div>
            </a>

            <div
              class="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <table
                class="table 
                nav-table"
                v-if="cart.carts.length"
              >
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
                        class="btn btn-outline-dark btn-sm nav-btn"
                        @click="removeCart(item.id)"
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
                      {{ item.product.price | currency }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">{{ cart.total | currency }}</td>
                  </tr>
                  <tr v-if="cart.final_total !== cart.total">
                    <td colspan="3" class="text-right text-success">折扣價</td>
                    <td class="text-right text-success">
                      {{ cart.final_total }}
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div
                class="d-flex flex-column align-items-center"
                v-if="cart.carts.length === 0"
              >
                購物車尚未有商品唷!!
              </div>
              <button
                type="button"
                class="btn btn-block mt-3 nav-btn btn-outline-dark"
                @click="checkout"
                v-if="cart.carts.length"
              >
                前往結帳
              </button>
            </div>
          </li>

          <li class="nav-item active">
            <router-link
              to="/login"
              class="bg-logo nav-link text-dark thirdBtn"
              title="後台管理"
            >
              <font-awesome-icon icon="user" size="lg" class="fas" /><span
                >後台管理</span
              >
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  data() {
    return {}
  },
  methods: {
    removeCart(id) {
      this.$store.dispatch('cartsModules/removeCart', id)
    },
    checkout() {
      this.$router.push('/order')
    },
    ...mapActions('cartsModules', ['getCart']),
  },
  computed: {
    ...mapGetters('cartsModules', ['cart']),
    ...mapGetters(['isLoading']),
  },
  created() {
    this.getCart()
    this.$bus.$on('updateCart', () => {})
  },
}
</script>
