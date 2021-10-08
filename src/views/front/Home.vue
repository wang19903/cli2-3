<template>
  <div>
    <div class="bgImg">
      <div class="slogan"><span>{{ $t('Home.Solgan') }}</span></div>
      <div class="linkDiv">
        <router-link to="/products">{{ $t('Home.GoShop') }}</router-link>
      </div>
    </div>
    <div class="container-fluid p-0 homeContainer mt-5">
      <div
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
        class="homeHead mt-5 mb-5 rounded"
        v-clipboard:copy="message"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >
        <img src="@/assets/img/home-head.jpg" alt="優惠碼" />
        <div
          class="copy-div"
          v-clipboard:copy="message"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        ><!--Head-->
          <h1>{{ $t('Home.Head.H1') }}</h1>
          <h3>{{ $t('Home.Head.H3') }}</h3>
          <p>{{ $t('Home.Head.BeforeCouponText') }}<span> order999 </span>{{ $t('Home.Head.AfterCouponText') }}</p>
          <p>{{ $t('Home.Head.ClickHere') }}</p>
        </div>
      </div>

      <span class="news">{{ $t('Home.News.Title') }}</span>
      <div
        data-aos="fade-right"
        data-aos-easing="linear"
        data-aos-duration="1500"
        class="homePromote mt-5 d-flex"
      >
        <div class="d-flex align-items-center justify-content-center flex-column">
          <h3>{{ $t('Home.News.FirstH3') }}<br />{{ $t('Home.News.FirstName') }}</h3>
          <p>
            {{ $t('Home.News.FirstP') }}<br />{{ $t('Home.News.FirstP2') }}
          </p>

          <router-link to="/product/-MU7jaUl3bMSvBesWTsI">
            {{ $t('Home.GoShop') }}
          </router-link>
        </div>
        <img src="@/assets/img/promote.jpg" alt="推薦-商品餛飩" />
      </div>

      <div
        data-aos="fade-right"
        data-aos-easing="linear"
        data-aos-duration="1500"
        class="homePromote  mb-5 d-flex"
      >
        <div class="d-flex align-items-center justify-content-center flex-column">
          <h3>{{ $t('Home.News.SecondH3') }}<br />{{ $t('Home.News.SecondName') }}</h3>
          <p>
            {{ $t('Home.News.SecondP') }}<br />{{ $t('Home.News.SecondP2') }}
          </p>

          <router-link to="/product/-MU7gZKyqTwbqnDrKE1q">
            {{ $t('Home.GoShop') }}
          </router-link>
        </div>
        <img src="@/assets/img/promote2.jpg" alt="推薦-豬耳" />
      </div>

      <span class="about">{{ $t('Home.About.Title') }}</span>

      <div class="homeContent mt-5 mb-5">
        <div class="text-left content">
          <div
            data-aos="fade-down-right"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <p>{{ $t('Home.About.P') }}
            </p>
            <br />
          </div>
        </div>
      </div>

      <span class="about">{{ $t('Home.About.Info') }}</span>
      <div class="mt-5 p-0 d-flex homeMap container-fluid justify-content-between flex-wrap">
        <div class="row col-md-6">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1807.9691171860352!2d121.51363435855448!3d25.002214653186215!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9de7abb70a7%3A0xbdcb8c32df0f7b7!2z5ZyL56uL6Ie654Gj5ZyW5pu46aSo!5e0!3m2!1szh-TW!2stw!4v1617855188076!5m2!1szh-TW!2stw" allowfullscreen="" loading="lazy"></iframe>
        </div>
        <div class="transport row col-md-6 m-0 p-0 text-left">
          <font-awesome-icon icon="map-marker-alt" size="1x"/>
          {{ $t('Home.About.Adress') }}<br>
          <p>{{ $t('Home.About.NearAdressInfo') }}<br>
          {{ $t('Home.About.ParkingInfo') }}
          </p>
          <div class="d-flex justify-content-start align-items-end"
          >
            <div
              data-aos="fade-down-right"
              data-aos-easing="linear"
              data-aos-duration="750"
            >
              <ul class="pt-2 pl-0">
                <li class="h2">{{ $t('Home.About.Noice[0]') }}</li>
                <li>{{ $t('Home.About.Noice[1]') }}</li>
                <li>{{ $t('Home.About.Noice[2]') }}</li>
                <li>{{ $t('Home.About.Noice[3]') }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <GoTop />
    </div>
  </div>
</template>

<script>
import GoTop from '@/components/front/GoTop.vue'

export default {
  name: 'Home',
  components: {
    GoTop
  },
  data () {
    return {
      message: 'order999',
      on: ''
    }
  },
  methods: {
    onCopy () {
      const vm = this
      vm.on = 1
      vm.copyCoupon()
    },
    onError () {
      const vm = this
      vm.on = 0
      vm.copyCoupon()
    },
    copyCoupon () {
      const vm = this
      if (vm.on === 1) {
        vm.$store.dispatch('updateMessage', {
          message: '複製成功',
          status: 'success'
        })
      } else {
        vm.$store.dispatch('updateMessage', {
          message: '複製失敗',
          status: 'success'
        })
      }
    }
  }
}
</script>
