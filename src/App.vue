<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="stylus">
	@import './style/core/';
  @import './../node_modules/purecss/build/base-min.css';
  @import './../node_modules/purecss/build/grids-min.css';

  html {
    color: #666;
  }
</style>

<script>
  export default {
    name: 'app'
  }
</script>
