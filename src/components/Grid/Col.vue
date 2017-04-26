<template>
  <div :class="component_class" :style="styles">
    <slot></slot>
  </div>
</template>

<style lang="stylus">
  @import './style/'
</style>

<script>
  const prefixCls = 'hiui-grid-col'

  export default {
    name: 'Col',
    props: {
      span: [Number, String],
      offset: [Number, String],
      pull: [Number, String],
      push: [Number, String],
      xsm: [Number, String, Object],
      sm: [Number, String, Object],
      md: [Number, String, Object],
      lg: [Number, String, Object],
      xlg: [Number, String, Object]
    },
    data () {
      return {
        gutter: 0
      }
    },
    computed: {
      component_class: function () {
        let classList = [
          `${prefixCls}`,
          {
            [`${prefixCls}-${this.span}`]: this.span,
            [`${prefixCls}-offset-${this.offset}`]: this.offset,
            [`${prefixCls}-push-${this.push}`]: this.push,
            [`${prefixCls}-pull-${this.pull}`]: this.pull
          }
        ]

        let size_o = ['xsm', 'sm', 'md', 'lg', 'xlg']
        size_o.forEach(size => {
          if (typeof this[size] === 'number' || typeof this[size] === 'string') {
            classList.push(`${prefixCls}-${size}-${this[size]}`)
          } else if (typeof this[size] === 'object') {
            let props = this[size]
            Object.keys(props).forEach(prop => {
              classList.push(
                prop !== 'span'
                  ? `${prefixCls}-${size}-${prop}-${props[prop]}`
                  : `${prefixCls}-${size}-${props[prop]}`
              )
            })
          }
        })
        return classList
      },
      styles () {
        return this.gutter ? {
          paddingLeft: `${this.gutter / 2}px`,
          paddingRight: `${this.gutter / 2}px`
        } : {}
      }
    },
    mounted () {
      this.gutter = this.$parent.gutter
    }
  }
</script>
