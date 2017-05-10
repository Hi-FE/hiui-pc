<template>
  <demo title="Icon" class="icon-demo">
    <demo-item name="Default" description="默认" :code="size_code" lang="js">
      <Btn @click.native="$toast(new Date().toLocaleString())">Toast</Btn>
    </demo-item>

    <demo-item class="type-btn-group" name="Type" description="主题" :code="size_code" lang="js">
      <Btn @click.native="$toast(new Date().toLocaleString(), 'default')">Default</Btn>
      <Btn @click.native="$toast(new Date().toLocaleString(), 'primary')">Primary</Btn>
      <Btn @click.native="$toast(new Date().toLocaleString(), 'success')">Success</Btn>
      <Btn @click.native="$toast(new Date().toLocaleString(), 'warning')">Warning</Btn>
      <Btn @click.native="$toast(new Date().toLocaleString(), 'error')">Error</Btn>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';

  .type-btn-group .hiui-btn {
    _colors = _blue _green _yellow _red;
    _start = 2;

    for color, _i in _colors {
      &:nth-child({_start + _i}) {
        color: _white;
        border-color: color;
        background-color: color;
      }
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        size_code: `
this.$toast(new Date().toLocaleString())
        `,
        type_code: `
<Btn @click.native="$toast(new Date().toLocaleString(), 'default')">Default</Btn>
<Btn @click.native="$toast(new Date().toLocaleString(), 'primary')">Primary</Btn>
<Btn @click.native="$toast(new Date().toLocaleString(), 'success')">Success</Btn>
<Btn @click.native="$toast(new Date().toLocaleString(), 'warning')">Warning</Btn>
<Btn @click.native="$toast(new Date().toLocaleString(), 'error')">Error</Btn>
        `
      }
    }
  }
</script>
