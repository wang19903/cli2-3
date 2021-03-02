<template>
  <div>
    <div class="container p-0 pt-3 footer">
      <ul class="row d-flex justify-content-between no-gutters mb-0">
        <li class="col-1 d-flex">
          <div class="txt">
            <span>鼎鮮</span>
            <span>飯麵</span>
          </div>
          <ul class="p-0 d-flex">
            <li class="fb">
              <a href="#">
                <font-awesome-icon
                  :icon="{ prefix: 'fab', iconName: 'facebook-square' }"
              /></a>
            </li>
            <li class="ig">
              <a href="#">
                <span style="color: brown">
                  <i class="fab fa-instagram"></i></span
              ></a>
            </li>
          </ul>
        </li>
        <li class="col-6 rightbox">
          <p class="right text-center">
            &copy; All Right Reserved(Demo)<br />
            本店絕對不會要求操作ATM<br />
            繼續瀏覽即同意提供cookies
          </p>
        </li>
        <li class="col-5 text-left pr-1 infobox">
          <p>
            <font-awesome-icon icon="phone" size="1x" class="fas" />+886
            2992915311
          </p>
          <p>
            <font-awesome-icon icon="map-marker-alt" size="1x" class="fas" />
            地址:新北市中和區安樂路x1號
          </p>
          <p>
            營業時間:AM11:30-PM2:30，PM5:00-PM9:00<br />
            最後點餐時間:結束前30分鐘，依現場為準。
            <br />周一公休
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped lang="scss">
@import "@/assets/front_footer";
</style>