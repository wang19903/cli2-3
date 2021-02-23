<template>
  <div class="container p-0 pt-2">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <router-link to="categorylist/-ML8mX5lDMN3dt-f47QL">
          <img src="@/assets/img/box1.jpg" />
        </router-link>
      </swiper-slide>

      <swiper-slide>
        <router-link to="/product/-MU7jaUl3bMSvBesWTsI">
          <img src="@/assets/img/promote.png" alt="abc" />
        </router-link>
      </swiper-slide>

      <div slot="pagination" class="swiper-pagination" />
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "SwiperExampleSpaceBetween",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        speed: 3500,
        loop: true,
        autoplay: {
          delay: 4000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
};
</script>

<style scoped lang="scss">
.container {
  max-width: 1024px;
  position: relative;
  z-index: 0;
}
img {
  width: 100%;
  max-height: 424px;
}
</style>

