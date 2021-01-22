<template>
  <div>
    <Navbar />

    <!-- <div class="contain">
      <div class="list">
        <div class="empty" v-if="FavoriteProduct.length === 0">
          <h3><span>目前無願望清單</span></h3>
          <p><span>點擊「追蹤」，即可加入願望清單</span></p>
          <div class="link">
            <router-link to="">立即選購</router-link>
          </div>
          <img src="" alt="目前無願望清單" />
        </div>
        <h2 v-if="FavoriteProduct.length !== 0"><span>願</span>望清單</h2>
        <Product
          :productInfo="item"
          v-for="item in FavoriteProduct"
          :key="item.id"
        />
      </div>

      <router-link to="" class="continue" v-if="FavoriteProduct.length !== 0"
        ><span>繼續購物</span>
      </router-link>
    </div> -->

    <Footer />
  </div>
</template>

<script>
import Navbar from "../../components/front/Navbar";
import Footer from "../../components/front/Footer";
import Product from "../../components/front/Product";

export default {
  name: "Favor",
  components: {
    Navbar,
    Footer,
    Product,
  },
  // data() {
  //   return {
  //     FavoriteProduct: [],
  //     favoriteID: [],
  //   };
  // },
  // created() {
  //   this.favoriteID = JSON.parse(localStorage.getItem("id"));
  //   this.getFavoriteProduct();
  // },
  // methods: {
  //   getFavoriteProduct() {
  //     const vm = this;
  //     const temparr = [];
  //     vm.favoriteID.forEach((id) => {
  //       const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/product/${id}`;
  //       vm.$http.get(api).then((res) => {
  //         temparr.push(res.data.product);
  //       });
  //     });
  //     vm.FavoriteProduct = temparr;
  //   },

  //   getremoveID(id) {
  //     this.FavoriteProduct.forEach((item, index) => {
  //       if (item.id === id) {
  //         this.FavoriteProduct.splice(index, 1);
  //       }
  //     });
  //   },
  // },
};
</script>

<style scoped lang="scss">
@import "@/assets/favor.scss";
</style>