<template>
  <div class="container-fluid p-0">
<OP/>
    <div class="wrapper">
      <Navbar />
      <Slick />
      <div class="container-fluid p-0">
        <div class="row">
          <div class="col-md-6 pt-2">
            <div
              data-aos="fade-right"
              data-aos-duration="3000"
              type="button"
              v-clipboard:copy="message"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              :style="[
                {
                  backgroundImage:
                    'url(' + require('@/assets/img/aos1.png') + ')',
                },
                { 'width': '100%' },
                
                { 'background-size': 'cover' },
              {'background-position':'top center'}
              ]"
              class="infoDiv"
            ></div>
          </div>

          <div class="col-md-6 pt-2">
            <div
              data-aos="flip-up"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="3000"
              :style="[
                {
                  backgroundImage:
                    'url(' + require('@/assets/img/aos2.jpg') + ')',
                },
                { 'max-width': '100%' },
                { 'background-size': 'cover' },
                {'background-position':'top center'}
              ]"
              class="infoDiv"
            ></div>
          </div>
        </div>
        <div class="container-fluid p-0">
          <ul class="d-flex justify-content-around row p-0 m-0">
            <li class="col-md-4">
              <div class="rotate">
                <img src="@/assets/img/UL1.jpg" alt="" class="li_img" />
              </div>
              <p class="pt-2">
                從路邊攤滷味起家，在台深耕20年，深得顧客喜愛，逐漸開發多樣產品
              </p>
            </li>
            <li class="col-md-4">
              <div class="rotate">
                <img src="@/assets/img/UL2.jpg" alt="" class="li_img" />
              </div>
              <p class="pt-2">
                每日採購新鮮食材，不使用半成品，確保食品來源，關心顧客健康
              </p>
            </li>
            <li class="col-md-4">
              <div class="rotate">
                <img src="@/assets/img/UL3.jpg" alt="" class="li_img" />
              </div>
              <p class="pt-2">獨特口味，對於專業絕不馬虎</p>
            </li>
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
import OP from "@/components/front/Opening.vue";

export default {
  name: "home",
  components: {
    Slick,
    Navbar,
    Footer,
    GoTop,
    OP,
  },
  data: function () {
    return {
      message: "order999",
    };
  },
  methods: {
    onCopy: function (e) {
      alert("複製" + e.text + "摟~");
    },
    onError: function (e) {
      alert("Failed to copy texts");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/home.scss";
</style>