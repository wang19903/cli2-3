<template>
  <div class="vh-100 d-flex  flex-column">
    <loading :active.sync="isLoading"></loading>
    <Opening />
    <Navbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/front/Navbar.vue'
import Footer from '@/components/front/Footer.vue'
import Opening from '@/components/front/Opening.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Footer,
    Opening
  },
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>
