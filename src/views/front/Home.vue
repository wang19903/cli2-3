<template>
  <div class="container-fluid p-0">
    <div class="wrapper">
      <Navbar />
      <Slick />
      <div class="container-fluid pt-2 pb-2">
        <div class="row d-flex justify-content-center">
          <div class="col-md-6 p-1">
            <div data-aos="fade-right" data-aos-duration="3000"
            type="button"
            v-clipboard:copy="message"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            :style="{backgroundImage: 'url(' + require('@/assets/img/box2.png') + ')'}"
            class="copyDiv"
            > 
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
<ul class="d-flex justify-content-around">
  <li>
    <img src="@/assets/img/11.jpg" alt="" class="li_img">
    <p>努力工作買不起房</p>
  </li>
  <li><img src="@/assets/img/22.jpg" alt="" class="li_img">
    <p>就好像</p></li>
  <li><img src="@/assets/img/login.jpg" alt="" class="li_img">
    <p>在非洲採收可可的小孩買不起巧克力一樣</p></li>
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
      message: "感謝你的注意!!",
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
.copyDiv{
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover;
}
ul{
  list-style-type: none;
}

.li_img{
  width: 100px;
  height: 100px;
}

</style>