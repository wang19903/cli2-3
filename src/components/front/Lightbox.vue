<template>
  <div class="container-fluid">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <router-link to="/product/-MQLq88vyZuiaLnRve9i">
          <img src="@/assets/img/UL1.jpg" alt="推薦商品導引" />
        </router-link>
      </swiper-slide>

      <swiper-slide>
        <router-link to="/product/-MU7jaUl3bMSvBesWTsI">
          <img src="@/assets/img/aos2.jpg" alt="推薦商品導引" />
        </router-link>
      </swiper-slide>

      <div slot="pagination" class="swiper-pagination" />
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'SwiperExampleSpaceBetween',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOption: {
        speed: 3500,
        loop: true,
        autoplay: {
          delay: 4000
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  z-index: 0;
}
img {
  width: 100%;
  max-height: 100%;
  background-size: cover;
}
</style>
