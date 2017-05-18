<template>
  <demo title="BackTop" class="backTop-demo">
    <demo-item name="default" description="默认" :code="code">
      <p>向下滚动300px，即可显示默认的BackTop组件</p>
      <BackTop></BackTop>
    </demo-item>
    <demo-item name="default" description="默认" :code="rocket_code">
      <p>向下滚动100px，即可自定义配置的BackTop组件</p>
      <BackTop :height="100" :bottom="100">
        <img :src="rocket" width="50" height="50" alt="backTop">
      </BackTop>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';

  .backTop-demo img {
    background-color: transparent;
    opacity: .8;
    transition: opacity .3s;

    &:hover {
      opacity: 1;
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        default_value: false,
        rocket: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEOElEQVR4Xu2a3VHcMBCAvYY3mAEqyPEGSA9QAVBBSAWBCkIqCFSQSwWQCkIqCFQAmZGANy4VhMz43uA2sxmbMcay1/rzXDg/3q1s7aeVdrW7kLzyB165/skMwMwCeiQghNhPkmRba33Q1zR62wKkPACckOKIeNoXhF4ArK+v783NzX0rr/pkMvlyfX19GNsSogMYDAbLi4uLd0mSLNcou6uUOo8JIToAKeWPJEl2DEreZ1m2OhqN7mNBiAqgvO9NCiLiV601HY5RnmgAWkz/mbKIuKW1vopBIBoAKeVRkiSfmEqdK6V2mbJOYlEAdFn9QptYVhAFgBDiEAA+d1mqWGdBLAB3ADDoAoBksyxbCe0RggOoC3q4IBDxo9Z6yJW3kQsOQAhxCgDvbSaHiFda6y2bsdwxwQFIKX8boj7WHB8eHlZvb29HLGELoaAAhBCbAHBpMa+nIYh4oLU+dXlH09igADr6/tp5IuJ3rfXetAKgi812w+Qv8v+MMog40lqvTisANEz8OMuyYeHi8kCJrsK1kWLIcyDYFmjY/8Yrr5SSbol0W3z2PD4+vru5uTkLYQUhATxlfErhbetNz+A2j5VSdJfw/gQDUHcAcuL7OssJeRAGA1C3kkop1veklNWz40IpZUqiOFkFa0I2X5BSvvAAnNg+PxApeCo/90qpFZt5tI0JCeBFBMgJakxZI671tClc/T8kgBcukHz6eDzeMt3waPUXFhYu626O/wWAnP5ZlmUHVQi56VOdoDbqCxULRLWAkvndUzEkTdN/vn0ymewBACVC61LlxbAgKfO+AHTdqiQ/AxCiaDKzABtb5IypCWY4w4wynBjC5gNTYwHT6Aapvrdksyp1Y6YRQFsyhM0GEX9prTun1TkfCLYFhBBnAPCWMwmGzFRehrrUAhsZhKwSBbOAjY2NYZqmHxir2yoSsnskCAAhxEke2rYqxxUI1UfkHUAI5QtIISB4BRBS+VAQvAHgtL9wzb1NjpNYaXtH8b8XAGtra4P5+XkqgTVdZ7lz4sh5a6byAsClAszRtk7Gl2t0BpCvPvX9RX98ZImcAdi0v/gi5aOBwgcASmJu+lKqy3t8NFA4ATDk8Lvo4CzrmidwAmAqZpa0+oOIRwBATY9PRU+63QHAm7L21d+oIJqm6TIAUI9Q07XaKVfoBKDJ99MpPR6PD4v0d35WXBV5vWrGqLjv51B3imJoXisYmvqMXGMCJwCmDhDOpMqlM0T8qbVuPEcaYDtVjkMAYJlkBQCrDcYAoVcAzxoaOCtf7PuK9bCVqIHAAm46bV0t4AlA18is0kDZSYlK5NlpbBWEE4DCDdrk7MoutGvCMx9LvYNLvbpBoimEIBc3tOnlo7whvcOmDS7fCvuujRNOFpAD2LdRnsbmLi+xLXkRBNtve70OO4dzPb7A2QJ6nLuXT88AeME4xS/5Cza6SV/42HnJAAAAAElFTkSuQmCC',
        code: `
<BackTop></BackTop>
        `,
        rocket_code: `
<BackTop :height="100" :bottom="100">
  <img :src="rocket" width="50" height="50" alt="backTop">
</BackTop>
        `
      }
    }
  }
</script>
