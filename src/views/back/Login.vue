<template>
  <div class="wrap">
    <loading :active.sync="isLoading"></loading>
    <main class="form-signin pt-5" @submit.prevent="signin" @keyup.enter="signin">
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
        <label for="inputPassword" class="visually-hidden">密碼</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="請輸入密碼"
          required
          v-model="user.password"
        />
        <!-- <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div> -->
        <div class="btnwrap">
        <button class="w-100 btn btn-lg btn-dark mt-3" type="submit">
          登入
        </button>
        </div>
        <p class="mt-5 pt-2 mb-3 text-muted text-center">&copy;  All Right Reserved(demo)</p>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      user: {
        username: 'lf21715@yahoo.com.tw',
        password: '19900917',
      },
      isLoading: false,
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      const vm = this;
      vm.isLoading = true;
      this.$http.post(api, vm.user).then((response) => {
        vm.isLoading = false;
        if (response.data.success) {
           const token = response.data.token;
           const expired = response.data.expired;
           document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
           vm.$router.push('/admin/products');
        }else{
          vm.$store.dispatch('updateMessage', {
            message: '上傳圖片失敗',
            status: 'danger',
          });
        }
      });
    },
  },
};
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
.wrap{
  background-image:url("~@/assets/img/login.jpg");
  opacity: .9;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height:100vh;
  padding-top: 270px;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

button{
  font-weight: bold;
  color:black;
}
.btnwrap :hover{
  box-shadow: 1px 1px  rgb(182, 145, 67);
  color: #fff;
}
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}

@media(max-width:768px){
  
}
</style>

