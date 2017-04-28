<template>
  <div :class="component_class" :style="styles">
    <slot></slot>
  </div>
</template>

<style lang="stylus">
  @import '../../style/';

  .hiui-grid-row {
    display: block;
    position: relative;
    margin-left: 0;
    margin-right: 0;
    clearfix()
  }
</style>

<script>
  const prefixCls = 'hiui-grid-row'

  export default {
    name: 'Row',
    props: {
      gutter: {
        default: 0,
        type: Number
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls
        ]
      },
      styles () {
        return this.gutter ? {
          marginLeft: `${this.gutter / -2}px`,
          marginRight: `${this.gutter / -2}px`
        } : {}
      }
    },
    watch: {
      gutter (val) {
        this.updateGutter(val)
      }
    },
    methods: {
      updateGutter (val) {
        Array.from(this.$children, (vm) => {
          if (vm && typeof vm.gutter === 'number') {
            vm.gutter = val
          }
        })
      }
    }
  }
</script>
