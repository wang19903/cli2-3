<template>
  <div>
    <div class="bgImg">
      <div class="slogan"><span>{{ $t('GENERAL.SLOGAN') }}</span></div>
      <div class="linkDiv">
        <router-link to="/products">{{ $t('GENERAL.GOSHOP') }}</router-link>
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
        >
          <h1>{{ $t('GENERAL.NAME') }}</h1>
          <h3>{{ $t('GENERAL.AD_OPEN') }}</h3>
          <p>{{ $t('GENERAL.AD_OPEN_P') }}<span>{{ $t('GENERAL.AD_OPEN_CODE') }}</span>{{ $t('GENERAL.AD_OPEN_P2') }}</p>
          <p>{{ $t('GENERAL.AD_OPEN_CLICKHERE') }}</p>
        </div>
      </div>

      <span class="news">{{ $t('GENERAL.NEWS') }}</span>
      <div
        data-aos="fade-right"
        data-aos-easing="linear"
        data-aos-duration="1500"
        class="homePromote mt-5 d-flex"
      >
        <div class="d-flex align-items-center justify-content-center flex-column">
          <h3>{{ $t('GENERAL.NEWS_1') }}<br />{{ $t('GENERAL.NEWS_1_NAME') }}</h3>
          <p>
            {{ $t('GENERAL.NEWS_1_P') }}<br />{{ $t('GENERAL.NEWS_1_P2') }}
          </p>

          <router-link to="/product/-MU7jaUl3bMSvBesWTsI">
            {{ $t('GENERAL.GOSHOP') }}
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
          <h3>{{ $t('GENERAL.NEWS_2') }}<br />{{ $t('GENERAL.NEWS_2_NAME') }}</h3>
          <p>
            {{ $t('GENERAL.NEWS_2_P') }}<br />{{ $t('GENERAL.NEWS_2_P2') }}
          </p>

          <router-link to="/product/-MU7gZKyqTwbqnDrKE1q">
            {{ $t('GENERAL.GOSHOP') }}
          </router-link>
        </div>
        <img src="@/assets/img/promote2.jpg" alt="推薦-豬耳" />
      </div>

      <span class="about">{{ $t('GENERAL.ABOUT') }}</span>

      <div class="homeContent mt-5 mb-5">
        <div class="text-left content">
          <div
            data-aos="fade-down-right"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <p>{{ $t('GENERAL.ABOUT_P') }}
            </p>
            <br />
          </div>
        </div>
      </div>

      <span class="about">{{ $t('GENERAL.INFO') }}</span>
      <div class="mt-5 p-0 d-flex homeMap container-fluid justify-content-between flex-wrap">
        <div class="row col-md-6">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1807.9691171860352!2d121.51363435855448!3d25.002214653186215!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9de7abb70a7%3A0xbdcb8c32df0f7b7!2z5ZyL56uL6Ie654Gj5ZyW5pu46aSo!5e0!3m2!1szh-TW!2stw!4v1617855188076!5m2!1szh-TW!2stw" allowfullscreen="" loading="lazy"></iframe>
        </div>
        <div class="transport row col-md-6 m-0 p-0 text-left">
          <font-awesome-icon icon="map-marker-alt" size="1x"/>
          {{ $t('GENERAL.ADRESS') }}<br>
          <p>{{ $t('GENERAL.ADRESS_INFO') }}<br>
          {{ $t('GENERAL.ADRESS_INFO2') }}
          </p>
          <div class="d-flex justify-content-start align-items-end"
          >
            <div
              data-aos="fade-down-right"
              data-aos-easing="linear"
              data-aos-duration="750"
            >
              <ul class="pt-2 pl-0">
                <li class="h2">{{ $t('GENERAL.FOOD_NOTICE') }}</li>
                <li>{{ $t('GENERAL.FOOD_NOTICE_P') }}</li>
                <li>{{ $t('GENERAL.FOOD_NOTICE_P2') }}</li>
                <li>{{ $t('GENERAL.FOOD_NOTICE_P3') }}</li>
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
