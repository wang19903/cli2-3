<template>
  <div>
    <div class="p-0 pt-3 footContainer">
      <div class="maxWidth">
      <ul
        class="row no-gutters d-flex justify-content-between flex-nowrap pl-0"
      >
        <li class="col-sm-1 p-0 d-flex">
          <div class="footTxt">
            <span>鼎鮮</span>
            <span>飯麵</span>
          </div>

          <ul class="d-flex p-0">
            <li class="fb">
              <a href="https://www.facebook.com/">
                <font-awesome-icon
                  :icon="{ prefix: 'fab', iconName: 'facebook-square' }"
              /></a>
            </li>
            <li class="ig">
              <a href="https://www.instagram.com/">
                <font-awesome-icon
                  :icon="{ prefix: 'fab', iconName: 'instagram' }"
              />
              </a>
            </li>
          </ul>
        </li>
        <li class="col-md-3 rightbox">
          <p class="text-center">&copy; All Right Reserved(Demo)</p>
        </li>
        <li class="col-lg-4 col-md-5 col-6 text-left pr-1 infobox">
          <p>
            <font-awesome-icon icon="phone" size="1x" class="fas" />+886
            2992915311
            <br />
            營業時間:AM11:30-PM2:30，PM5:00-PM9:00<br />
            最後點餐時間:結束前30分鐘，依現場為準。
            <br />周一公休
          </p>
        </li>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
