<template>
  <demo title="Icon" class="icon-demo">
    <demo-item name="Default" description="默认" :code="size_code" lang="html">
      <Btn @click="$loading.start()">Start</Btn>
      <Btn @click="$loading.success()">Success</Btn>
      <Btn @click="$loading.error()">Error</Btn>
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
<Btn @click="$loading.start()">Start</Btn>
<Btn @click="$loading.success()">Success</Btn>
<Btn @click="$loading.error()">Error</Btn>
        `
      }
    }
  }
</script>
