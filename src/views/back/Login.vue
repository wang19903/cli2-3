<template>
  <div class="wrap">
    <loading :active.sync="isLoading"></loading>
    <main
      class="form-signin pt-5"
      @submit.prevent="signin"
      @keyup.enter="signin"
    >
      <form class="pt-5">
        <h1 class="h3 mb-3 fw-normal text-center">請登入帳號</h1>
        <label for="inputEmail" class="visually-hidden">使用者信箱</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="請輸入信箱"
          required
          autofocus
          v-model="user.username"
        />
        <label for="inputPassword" class="visually-hidden pt-3">密碼</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="請輸入密碼"
          required
          v-model="user.password"
        />
        <div class="btnwrap ">
          <button class="w-100 btn btn-lg btn-dark mt-3" type="submit">
            登入
          </button>
        </div>
        <p class="mt-5 pt-2 mb-3 text-muted text-center">
          &copy; All Right Reserved(demo)
        </p>
      </form>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      vm.$store.dispatch('updataLoading', true)
      vm.$http.post(api, vm.user).then(response => {
        vm.$store.dispatch('updataLoading', false)
        if (response.data.success) {
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'success'
          })
          const token = response.data.token
          const expired = response.data.expired
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
          vm.$router.push('/admin/products')
        } else {
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger'
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
.wrap {
  background-image: url('~@/assets/img/login.jpg');
  opacity: 0.9;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 100vh;
  padding-top: 270px;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

button {
  font-weight: bold;
  color: black;
}
.btnwrap :hover {
  color: #fff;
}
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}

@media (max-width: 768px) {
  .wrap {
    padding-top: 200px;
  }
}

@media (max-width: 576px) {
  .wrap {
    padding-top: 100px;
  }
}
</style>
