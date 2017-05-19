<template>
  <div v-show="show" :class="component_class" :style="component_style">
    <slot></slot>
  </div>
</template>

<style lang="stylus">
  @import './style/';
</style>

<script>
  import { isValid } from '@/tools'

  const prefixCls = 'hiui-popover'

  export default {
    name: 'Popover',
    props: {
      placement: {
        default: 'top',
        type: String,
        validator (val) {
          return isValid(['top/left', 'top', 'top/right', 'bottom/left', 'bottom', 'bottom/right', 'left/top', 'left', 'left/bottom', 'right/top', 'right', 'right/bottom'], val)
        }
      },
      auto_reverse: {
        default: true,
        type: Boolean
      }
    },
    data () {
      return {
        show: false,
        elem: null,
        width: 0,
        height: 0,
        bounds: null,
        trigger: []
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls
        ]
      },
      component_style () {
        return this.bounds ? {
          top: `${this.bounds.top - this.height}px`,
          left: `${this.bounds.left - this.width}px`
        } : null
      }
    },
    methods: {
      open () {
        this.show = true
        this.$nextTick(this.update)
      },
      close () {
        this.show = false
      },
      toggle() {
        this.show ? this.close() : this.open()
      },
      update () {
        this.updateTrigger()
        this.width = this.$el.offsetWidth
        this.height = this.$el.offsetHeight
      },
      updateTrigger () {
        this.bounds = this.elem.getBoundingClientRect()
      },
      handleDocumentClick (e) {
        if (!this.$el || !this.elem || this.$el.contains(e.target) || this.elem.contains(e.target)) {
          return false
        }

        this.show = false;
      }
    }
  }
</script>
