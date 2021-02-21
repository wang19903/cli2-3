<template>
  <div class="container-fluid p-0">
    <div class="wrapper">
      <Navbar />
      <Slick />
      <div class="container-fluid  pt-2 pb-2">
        <div class="row d-flex justify-content-center ">
          <div class="col-md-6 p-1">
            <div data-aos="fade-right" data-aos-duration="3000">
              <img src="@/assets/img/box2.png" class="img-fluid" alt="..." />
            </div>
          </div>

          <div class="col-md-6 p-1">
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
      <GoTop />
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import Slick from "@/components/front/Lightbox";
import Navbar from "@/components/front/Navbar";
import Footer from "@/components/front/Footer";
import GoTop from "@/components/front/GoTop";

export default {
  name: "home",
  components: {
    Slick,
    Navbar,
    Footer,
    GoTop,
  },
};
</script>