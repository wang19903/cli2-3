<template>
  <div class="wrap container-fluid p-0">
    <div class="content ">
    <Navbar />
    <Slick />

    <div class="pt-2 pb-2 container no-gutters">
      <div class="row d-flex justify-content-center flex-md-nowrap">
        <div class="col-ms-6 pr-3 pl-3 pb-2">
          <div data-aos="fade-right" data-aos-duration="3000">
            <img src="@/assets/img/box2.png" class="img-fluid" alt="..." />
          </div>
        </div>

        <div class="col-ms-6 pr-3 pl-3">
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
    <Footer class="footer"/>
    
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






