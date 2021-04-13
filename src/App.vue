<template>
  <div id="app">
    <Alert />
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

body {
  overflow-x: hidden;
  user-select: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: auto;
}

.wrapper {
  min-height: calc(100vh - 153px);
}

.footer {
  height: 185px;
}

ul {
  margin: 0;
}
</style>
