<template>
  <div class="main position-relative">
    <div>
      <div class="wrap border border-dark rounded">
        <div class="animate">
          <span>404</span>
        </div>
        <p>阿哩...好像出錯了<br/>我們會馬上處理，請點擊下方文字吧</p>
        <div class="btn-wrap btn btn-dark">
        <router-link to="/" > 點擊返回首頁 </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '404'
}
</script>

<style lang="scss" scoped>
.main {
height: 100vh;
width: 100vw;
background: gray;
}
.wrap {
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    padding:1rem;
    background: gray;
    animation: walk 2s ;
    animation-iteration-count: 1;
  a {
    color: #fff;
  }
}
.animate {
  transform-style: (preserve-3d);
  transform: rotateY(0deg);
  transform-origin: (0, 0); // 改變中心點
  animation: spin 4s infinite;
  span {
    font-size: 150px;
  }
}
@keyframes spin {
  0% {
    transform: (rotateY(0deg));
    color: gray;
  }
  50% {
    transform: (rotateY(180deg));
    color: #fff;
  }
  100% {
    transform: (rotateY(360deg));
  }
}
@keyframes walk {
  0% {
    transform: translate(-50%, -150%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}

@media (max-width: 976px){

}
</style>
