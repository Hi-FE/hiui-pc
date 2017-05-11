<template>
  <span :class="component_class" :style="component_style">
    <small>&yen;</small><em> <slot></slot></em>
  </span>
</template>

<style lang="stylus">
  @import './style/';
</style>

<script>
  const prefixCls = 'hiui-price'

  export default {
    name: 'Price',
    props: {
      super: {
        type: Boolean,
        default: false
      },
      delete: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: '#f02f45'
      },
      fontSize: {
        type: Number,
        default: 24
      }
    },
    data () {
      return {
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls,
          {
            [`${prefixCls}-sup`]: this.super,
            [`${prefixCls}-delete`]: this.delete
          }
        ]
      },
      component_style () {
        return {
          'color': this.color,
          'font-size': `${this.fontSize}px`,
          'line-height': `${this.fontSize}px`
        }
      }
    }
  }
</script>
