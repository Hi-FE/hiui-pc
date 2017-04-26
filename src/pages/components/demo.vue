<template>
  <Row class="demo-container" :gutter="20">
    <Col span="24">
      <slot></slot>
    </Col>
    <Col ref="left" span="12">
      <slot name="left"></slot>
    </Col>
    <Col rref="right" span="12">
      <slot name="right"></slot>
    </Col>
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
