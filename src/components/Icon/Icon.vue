<template>
  <i :class="component_class" :style="size_style"></i>
</template>

<style lang="stylus">
  @import '//at.alicdn.com/t/font_282173_sdpt3lesej.css';
  @import './style/';
</style>

<script>
  const prefixCls = 'hiui-icon'

  export default {
    name: 'Icon',
    props: {
      size: Number,
      name: {
        type: String,
        required: true
      },
      color: {
        default: '',
        type: String
      },
      rotate: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {
      }
    },
    computed: {
      component_class () {
        return [
          'iconfont',
          prefixCls,
          `icon-${this.name}`,
          {
            [`${prefixCls}-rotate`]: this.rotate
          }
        ]
      },
      size_style () {
        return {
          fontSize: this.size ? `${this.size}px` : '',
          color: this.color || ''
        }
      }
    }
  };
</script>
