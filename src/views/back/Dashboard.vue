<template>
  <div>
    <Navbar />
    <Alert />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/back/Sidebar.vue'
import Navbar from '@/components/back/Navbar.vue'
import Alert from '@/components/Alert.vue'

export default {
  components: {
    Sidebar,
    Navbar,
    Alert
  },
  created () {
    const mycookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = mycookie
  }
}
</script>
