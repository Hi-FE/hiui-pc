<template>
  <transition name="fade">
    <div v-if="show" :class="component_class" :style="component_style" @click="backTop">
      <slot><Icon name="up"></Icon></slot>
    </div>
  </transition>
</template>

<style lang="stylus">
  @import './style/';

  fade();
</style>

<script>
  import { scrollToTop } from '../SmoothScroll/SmoothScroll'
  import { getStyles } from '@/tools'

  const prefixCls = 'hiui-backTop'

  export default {
    name: 'BackTop',
    props: {
      height: {
        default: 200,
        type: Number
      },
      time: {
        default: 500,
        type: Number
      },
      bottom: Number,
      right: Number
    },
    data () {
      return {
        scrollTop: 0,
        show: false
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls
        ]
      },
      component_style () {
        return getStyles({
          bottom: typeof this.bottom === 'number' && `${this.bottom}px`,
          right: typeof this.right === 'number' && `${this.right}px`
        })
      }
    },
    watch: {
      scrollTop (val) {
        if (val > this.height) {
          this.show = true
        } else {
          this.show = false
        }
      }
    },
    methods: {
      backTop () {
        scrollToTop()
      },
      bindEvent () {
        document.addEventListener('scroll', this.scroll, false)
      },
      unbindEvent () {
        document.removeEventListener('scroll', this.scroll, false)
      },
      scroll () {
        this.scrollTop = window.pageYOffset || (document.documentElement.scrollTop + document.body.scrollTop)
      }
    },
    mounted() {
      this.bindEvent()
    },
    beforeDestroy() {
      this.unbindEvent()
    }
  }
</script>
