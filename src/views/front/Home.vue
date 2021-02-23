<template>
  <div class="container-fluid p-0">
    <div class="wrapper">
      <Navbar />
      <Slick />
      <div class="container-fluid pt-2 pb-2">
        <div class="row d-flex justify-content-center">
          <div class="col-md-6 p-1">
            <div data-aos="fade-right" data-aos-duration="3000"
             v-html="message"
            type="button"
            v-clipboard:copy="message"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            class="as">
            
              <img src="@/assets/img/box2.png" class="img-fluid dd" alt="..." />
            </div>
          </div>

          <div class="col-md-6 p-1">
            <div
              data-aos="flip-up"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="3000"
            >
              <img src="@/assets/img/box1.jpg" class="img-fluid" alt="..." />
            </div>
          </div>
        </div>
        <div>
<ul>
  <li>這邊</li>
  <li>放廣格文</li>
  <li>衝長度</li>
</ul>
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
  data: function () {
    return {
      message: "s",
    };
  },
  methods: {
    onCopy: function (e) {
      alert("You just copied: " + e.text);
    },
    onError: function (e) {
      alert("Failed to copy texts");
    },
  },
};
</script>
<style lang="scss" scoped>
.as{
height: 100%;
background-image: url(~@/assets/img/box2.png);
 background-repeat: no-repeat;

}


</style>