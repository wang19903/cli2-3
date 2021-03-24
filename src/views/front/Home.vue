<template>
  <div class="container-fluid p-0 home-container">
    <div class="bgImg">
      <p class="slogan">鼎中美食 鮮香味美<br /></p>
      <div class="linkDiv">
        <router-link to="/products">前往賣場</router-link>
      </div>
    </div>
    <Alert />
    <div
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      class="home-head mt-5 mb-5"
    >
      <img src="@/assets/img/home-head.jpg" alt="優惠碼" />
      <div
        class="copy-div"
        v-clipboard:copy="message"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >
        <h1>鼎鮮飯麵</h1>
        <h3>官方網站開幕</h3>
        <p>結帳輸入優惠碼<span>order999</span>享 九折優待</p>
        <p>點擊即可複製</p>
      </div>
    </div>

    <span class="news">最|新|消|息</span>
    <div
      data-aos="fade-right"
      data-aos-easing="linear"
      data-aos-duration="1500"
      class="home-promote d-flex"
    >
      <div>
        <h3>新產品<br />冷凍餛飩</h3>
        <p>
          輕鬆料理，可以加進麵、火鍋，也可以蒸、煎或油炸<br />更可以發會創意，做成自己喜歡的料理
        </p>

        <router-link to="/product/-MU7jaUl3bMSvBesWTsI"> 前往賣場 </router-link>
      </div>
      <img src="@/assets/img/promote.jpg" alt="推薦-商品餛飩" />
    </div>

    <span class="about">關於我們</span>

    <div class="home-content d-flex">
      <div
        data-aos="fade-up-right"
        data-aos-easing="linear"
        data-aos-duration="1500"
      >
        <img src="@/assets/img/content.jpg" alt="說明範例圖" />
      </div>
      <div class="text-left">
        <div
          data-aos="fade-up-left"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <p>
            從路邊攤滷味起家，在沒有宣傳下憑著手藝及堅持，慢慢累積顧客，並且在與客戶的交流下，慢慢改良產品，
            經過多年的努力，在老客戶的累積下開出了店面，增加產品轉為中式創意料理店，中式番茄肉醬加上新鮮食材，健康美味；
            純手工餛飩以及獨家醬料，在其他地方吃不到的味道。每到過年，老客戶都會來下訂滷味作為年菜，買餛飩或醬料來送禮。
            如今要邁入二十個年頭，對於顧客的回饋，鼎鮮飯麵會繼續保持品質，並努力回應顧客的需求。
          </p>
          <br />
        </div>
        <div
          class="d-flex justify-content-md-between flex-wrap home-content-ulwrap"
        >
          <div
            data-aos="fade-up-left"
            data-aos-easing="linear"
            data-aos-duration="750"
          >
            <ul class="pt-2">
              <li class="h2">我們的堅持</li>
              <li>絕不使用人工添加物</li>
              <li>每日採購新鮮食材，現點現做</li>
              <li>食品來源:牛:澳洲 豬:台灣</li>
            </ul>
          </div>
          <div
            data-aos="zoom-out"
            data-aos-easing="linear"
            data-aos-duration="750"
          >
            <img
              src="@/assets/img/id.jpg"
              alt="來源規定標章"
              class="home-content-img"
            />
          </div>
        </div>
      </div>
    </div>

    <GoTop />
  </div>
</template>

<script>
import GoTop from '@/components/front/GoTop.vue'
import Alert from '@/components/AlertMessage.vue'

export default {
  name: 'home',
  components: {
    Alert,
    GoTop,
  },
  data() {
    return {
      message: 'order999',
      on: '',
    }
  },
  methods: {
    onCopy() {
      const vm = this
      vm.on = 1
      vm.alert()
    },
    onError() {
      const vm = this
      vm.on = 0
      vm.alert()
    },
    alert() {
      const vm = this
      if ((vm.on = 1)) {
        vm.$store.dispatch('updateMessage', {
          message: '複製成功',
          status: 'success',
        })
      } else {
        vm.$store.dispatch('updateMessage', {
          message: '複製失敗',
          status: 'success',
        })
      }
    },
  },
}
</script>

