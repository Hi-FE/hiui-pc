<template>
  <Row class="demo-container" :gutter="20">
    <vCol span="24">
      <slot></slot>
    </vCol>
    <vCol ref="left" span="12">
      <slot name="left"></slot>
    </vCol>
    <vCol rref="right" span="12">
      <slot name="right"></slot>
    </vCol>
  </Row>
</template>

<style lang="stylus" scope>
  @import '../../style/index.styl';

  .demo-container {
    position: relative;
    width: 100%;
    height: 100%;
    clearfix()
  }
</style>

<script>
  export default {
    name: 'demo',
    components: {
      Row: require('@/components/Grid/Row'),
      vCol: require('@/components/Grid/Col')
    },
    props: {
      title: {
        default: '',
        type: String
      },
      is_horizontal_center: {
        default: false,
        type: Boolean
      },
      is_vertical_center: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {
        cur: 'left'
      }
    }
  }
</script>
