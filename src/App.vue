<template>
  <div id="app">
    <Alert />
      <!-- <h1>{{ $t('GENERAL.OK') }}</h1> -->
    <router-view />
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue'

export default {
  name: 'app',
  components: {
    Alert
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/all.scss';
</style>
