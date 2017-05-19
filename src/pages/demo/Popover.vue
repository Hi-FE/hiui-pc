<template>
  <demo title="Popover" class="popover-demo">
    <demo-item name="default" description="默认" :code="code" slot="left">
      <Popover ref="popover1">
        HaHaHa
      </Popover>
      <Btn v-if="show" v-popover:popover1>hover!!!</Btn>
      <Btn @click="show = false">remove</Btn>
      <!-- <Btn v-popover:popover1.click>Click!!!</Btn> -->
      <!-- <Btn v-popover:popover1.focus>Focus!!!</Btn> -->
      <!-- <Btn v-popover:popover1.manual>Manual!!!</Btn> -->
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
        show: true,
        code: `
<Popover></Popover>
        `
      }
    }
  }
</script>
