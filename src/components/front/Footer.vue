<template>
    <div class="p-0 pt-3 footContainer mt-auto">
      <div class="maxWidth">
      <ul
        class="row no-gutters d-flex justify-content-between flex-nowrap pl-0"
      >
        <li class="col-sm-1 p-0 d-flex">
          <div class="footTxt d-flex flex-column">
            <span>{{ $t('Footer.ShopNameTop') }}</span>
            <span>{{ $t('Footer.ShopNameDonw') }}</span>
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
            <br />{{ $t('Footer.TIME') }}
            <br />{{ $t('Footer.LastOrder') }}
            <br />{{ $t('Footer.MondayOff') }}
          </p>
        </li>
      </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
