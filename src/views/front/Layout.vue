<template>
  <div>
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

export default {
  name: 'Layout',
  components: {
    Navbar,
    Footer,
    Opening
  }
}
</script>
