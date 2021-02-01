<template>
  <div>
    <nav
      class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
    >
      <router-link class="navbar-brand" to="/">
          <a href="#" class="text-logo pl-3 pr-3">
           回首頁
          </a>
        </router-link>
      <button
        class="navbar-toggler position-absolute d-md-none collapsed "
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      /> -->
      <ul class="navbar-nav pr-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link logout" href="#" @click.prevent="signout()">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template> 

<script>
export default {
  name: "navbar",
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          //  const token = response.data.token;
          //  const expired = response.data.expired;
          //  console.log(token, expired);
          //  document.cookie = `someCookieName=${token}; expires=${new Date(expired)};`;
          vm.$router.push("/login");
        }
      });
    },
  },
};
</script>

<style scoped>
@media (max-width: 430px) {
  .logout{
    padding-right: 65px;
  }
  #sidebarMenu{
    padding-top: 0px;
  }

}
</style>