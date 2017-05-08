<template>
  <div :class="component_class" v-show="show">
    <slot></slot>
  </div>
</template>

<style lang="stylus">
  @import './style/';
</style>

<script>
  const prefixCls = 'hiui-tab-pane'

  export default {
    name: 'TabPane',
    props: {
      label: String,
      name: String,
      disabled: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {
        show: false
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls
        ]
      }
    },
    mounted () {
      this.$parent.updateBar()
    }
  }
</script>
