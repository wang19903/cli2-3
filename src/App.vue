<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: auto;
  max-width: 1024px;
}
html,
body {
  background-color: rgba(212, 208, 189, 0.336);
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
