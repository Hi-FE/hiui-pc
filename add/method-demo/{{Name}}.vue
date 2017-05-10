<template>
  <demo title="Icon" class="icon-demo">
    <demo-item name="Default" description="默认" :code="size_code" lang="js">
      <Btn @click.native="${{name}}()">{{Name}}</Btn>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';
</style>

<script>
  export default {
    data () {
      return {
        size_code: `
this.${{name}}()
        `
      }
    }
  }
</script>
