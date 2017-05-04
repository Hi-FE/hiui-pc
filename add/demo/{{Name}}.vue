<template>
  <demo title="{{Name}}" class="{{name}}-demo">
    <demo-item name="Default" description="默认" :code="code" slot="left">
      <{{cname}}></{{cname}}>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scope>
  @import '../../style/';
</style>

<script>
  export default {
    data () {
      return {
        code: `
<{{cname}}></{{cname}}>
        `
      }
    }
  }
</script>
