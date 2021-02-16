<template>
  <div>
    <div class="container p-0 pt-3">
      <ul class="row d-flex justify-content-between no-gutters mb-0">
        <li class="col-3 d-flex">
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
        <li class="col-5">
          <p class="right text-center">&copy; All Right Reserved(Demo)</p>
        </li>
        <li class="col-4 text-left pr-1">
          <p class="h5">
            <font-awesome-icon icon="phone" size="1x" class="fas" />09-29291531
          </p>
          <p class="h6">
            <font-awesome-icon icon="map-marker-alt" size="1x" class="fas" />
            地址:新北市中和區中安街51號
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