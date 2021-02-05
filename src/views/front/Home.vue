<template>
  <div class="wrap">
    <Navbar />
    <Slick />

    <div class="container-fluid ">
      <div class="row d-flex justify-content-center flex-md-nowrap">
        <div class="col-ms-6 pr-2 pl-2 pb-2">
          <div data-aos="fade-right" data-aos-duration="3000">
            <img src="@/assets/img/box2.png" class="img-fluid" alt="..." />
          </div>
        </div>

        <div class="col-ms-6 pr-2 pl-2">
          <div
            data-aos="flip-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="3000"
          >
            <img src="@/assets/img/box2.png" class="img-fluid" alt="..." />
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Slick from "@/components/front/Lightbox";
import Navbar from "@/components/front/Navbar";
import Footer from "@/components/front/Footer";

export default {
  name:"home",
  components: {
    Slick,
    Navbar,
    Footer,
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/Home.scss";
</style>




