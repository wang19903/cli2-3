<template>
  <div>
    <nav
      class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
    >
      <router-link class="navbar-brand text-logo pr-3" to="/">
        回首頁
      </router-link>
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav pr-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link logout" href="#" @click.prevent="signout()"
            >登出</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    signout () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      vm.$http.post(api).then(response => {
        if (response.data.success) {
          vm.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style scoped>
@media (max-width: 767px) {
  .navbar-brand {
    padding-left: 58px;
  }
}
</style>
