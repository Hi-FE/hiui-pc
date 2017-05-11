<template>
  <demo title="Icon" class="bar-demo">
    <demo-item name="default" description="默认" :code="no_padding_code">
      <Bar>
        I'm Bar.
      </Bar>
    </demo-item>
    <demo-item name="use_padding" description="包含padding" :code="have_padding_code">
      <Bar :use_padding="true">
        <Btn>Button</Btn>
        <Btn>Button</Btn>
        <Btn>Button</Btn>
      </Bar>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';

  .bar-demo .demo-main {
    position: relative;
    padding-bottom: _size_o_lg;

    code {
      margin: 10px;
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        no_padding_code: `
<!-- use_padding: false -->
<Bar>
  <Btn>Button</Btn>
</Bar>
        `,
        have_padding_code: `
<!-- use_padding: true -->
<Bar :use_padding="true">
  <Btn>Button</Btn>
  <Btn>Button</Btn>
  <Btn>Button</Btn>
</Bar>
        `
      }
    }
  }
</script>
