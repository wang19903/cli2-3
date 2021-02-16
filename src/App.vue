<template>
  <div id="app">
    <router-view />
    
  </div>
</template>

<style lang="scss">
#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: auto;
  max-width: 1024px;
}
html,
body  {
  background-color: rgba(212, 208, 189, 0.336);  
}


html {
    position: relative;
    min-height: 100%;
}
body {
    margin: 0 0 100px; /* bottom = footer height */
}
.footer {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100px;
    width: 100%;
}
</style>
