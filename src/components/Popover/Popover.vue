<template>
  <span>
    <transition :name="transitionName[reverse_type]" @after-leave="afterLeave">
      <div ref="popover" v-show="show" :class="component_class" :style="component_style">
        <slot></slot>
      </div>
    </transition>
    <slot name="reference"></slot>
  </span>
</template>

<style lang="stylus">
  @import './style/';

  _t = .3s;
  slide-down('hiui-popover-', _t);
  slide-up('hiui-popover-', _t);
  slide-left('hiui-popover-', _t);
  slide-right('hiui-popover-', _t);
</style>

<script>
  import { isValid, on, off } from '@/tools'

  const prefixCls = 'hiui-popover'
  const placementMap = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  }

  export default {
    name: 'Popover',
    props: {
      placement: {
        default: 'top',
        type: String,
        validator (val) {
          return isValid(['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right', 'left-top', 'left', 'left-bottom', 'right-top', 'right', 'right-bottom'], val)
        }
      },
      auto_reverse: {
        default: true,
        type: Boolean
      },
      offset: {
        default: 10,
        type: Number
      },
      trigger: {
        default: 'click',
        type: String,
        validator (val) {
          return isValid(['click', 'hover', 'focus', 'manual'], val)
        }
      },
      show_arrow: {
        default: true,
        type: Boolean
      },
      border_color: {
        default: true,
        type: [String, Boolean]
      },
      use_shadow: {
        default: true,
        type: [String, Boolean]
      },
      width: Number,
      z_index: Number,
      border_radius: Number
    },
    data () {
      return {
        show: false,
        elem: null,
        popover_width: 0,
        popover_height: 0,
        offsetTop: 0,
        offsetLeft: 0,
        offsetWidth: 0,
        offsetHeight: 0,
        bounds: null,
        reference: null,
        timer: null,
        is_reverse: false,
        scrollTop: 0,
        scrollLeft: 0,
        transitionName: {
          top: 'hiui-popover-slide-down',
          bottom: 'hiui-popover-slide-up',
          left: 'hiui-popover-slide-right',
          right: 'hiui-popover-slide-left'
        }
      }
    },
    watch: {
      show (val) {
        if (val) {
          document.body.appendChild(this.$refs.popover)
        }
        val ? this.$emit('show') : this.$emit('hide')
      },
      scrollTop (val) {
        if (this.show && this.auto_reverse) {
          this.setReverse()
        }
      },
      scrollLeft (val) {
        if (this.show && this.auto_reverse) {
          this.setReverse()
        }
      }
    },
    computed: {
      position_type () {
        return this.placement.split('-')[0]
      },
      reverse_type () {
        return this.is_reverse ? placementMap[this.position_type] : this.position_type
      },
      align_type () {
        return this.placement.split('-')[1]
      },
      current_placement () {
        return this.reverse_type + (this.align_type ? `-${this.align_type}` : '')
      },
      component_class () {
        return [
          prefixCls,
          {
            [`${prefixCls}-${this.current_placement}`]: this.show_arrow,
            [`${prefixCls}-use_shadow`]: this.use_shadow
          }
        ]
      },
      component_style () {
        return Object.assign({}, this.component_border, this.component_width, this.position, this.align)
      },
      component_width () {
        return {
          width: this.width ? `${this.width}px` : '',
          borderRadius: this.border_radius ? `${this.border_radius}px` : '',
          borderColor: this.border_color,
          zIndex: this.z_index
        }
      },
      component_border () {
        return this.border_color === false ? {
          border: 'none'
        } : {}
      },
      position () {
        let pos = {}

        switch (this.reverse_type) {
          case 'top':
            pos.top = this.offsetTop - this.popover_height - this.offset
            break
          case 'bottom':
            pos.top = this.offsetTop + this.offsetHeight + this.offset
            break
          case 'left':
            pos.left = this.offsetLeft - this.popover_width - this.offset
            break
          case 'right':
            pos.left = this.offsetLeft + this.offsetWidth + this.offset
            break
          default:
            break
        }

        for (let key in pos) {
          pos[key] += 'px'
        }

        return pos
      },
      align () {
        let align = {}

        switch (this.align_type) {
          case 'left':
            align.left = this.offsetLeft
            break
          case 'right':
            align.left = this.offsetLeft - (this.popover_width - this.offsetWidth)
            break
          case 'top':
            align.top = this.offsetTop
            break
          case 'bottom':
            align.top = this.offsetTop - (this.popover_height - this.offsetHeight)
            break
          default:
            if (this.reverse_type === 'top' || this.reverse_type === 'bottom') {
              align.left = this.offsetLeft + (this.offsetWidth - this.popover_width) / 2
            } else {
              align.top = this.offsetTop + (this.offsetHeight - this.popover_height) / 2
            }
            break
        }

        for (let key in align) {
          align[key] += 'px'
        }

        return align
      }
    },
    methods: {
      setReverse () {
        let type = this.position_type

        if (type === 'top' && this.scrollTop > this.offsetTop - this.popover_height - this.offset) {
          this.is_reverse = true
          return false
        }
        if (type === 'bottom' && this.scrollTop < this.offsetTop + this.offsetHeight + this.popover_height + this.offset - document.documentElement.clientHeight) {
          this.is_reverse = true
          return false
        }
        if (type === 'left' && this.scrollLeft > this.offsetLeft - this.popover_width - this.offset) {
          this.is_reverse = true
          return false
        }
        if (type === 'right' && this.scrollLeft < this.offsetLeft + this.offsetWidth + this.popover_width + this.offset - document.documentElement.clientWidth) {
          this.is_reverse = true
          return false
        }

        this.is_reverse = false
      },
      open () {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
          return false
        }
        this.show = true
        this.$nextTick(this.update)
      },
      close () {
        this.timer = setTimeout(() => {
          this.show = false
          this.timer = null
        }, 150)
      },
      toggle() {
        this.show ? this.close() : this.open()
      },
      update () {
        this.getReferenceData()
        this.popover_width = this.$refs.popover.offsetWidth
        this.popover_height = this.$refs.popover.offsetHeight
        this.setReverse()
      },
      getReferenceData () {
        let offset = this.getOffset()
        this.offsetTop = offset.top
        this.offsetLeft = offset.left
        this.offsetWidth = this.reference.offsetWidth
        this.offsetHeight = this.reference.offsetHeight
      },
      getOffset () {
        let el = this.reference
        let top = 0
        let left = 0

        while (el) {
          top += el.offsetTop
          left += el.offsetLeft
          el = el.offsetParent
        }

        return {
          top,
          left
        }
      },
      handleDocumentClick (e) {
        if (!this.$refs.popover || !this.reference || this.$refs.popover.contains(e.target) || this.reference.contains(e.target)) {
          return false
        }

        this.show = false
      },
      getScroll () {
        this.scrollLeft = window.pageXOffset || (document.documentElement.scrollLeft + document.body.scrollLeft)
        this.scrollTop = window.pageYOffset || (document.documentElement.scrollTop + document.body.scrollTop)
      },
      afterLeave () {
        document.body.removeChild(this.$refs.popover)
      }
    },
    mounted () {
      let el = this.reference = this.$refs.reference
      let popover = this.$refs.popover

      if (!el && this.$slots.reference && this.$slots.reference[0]) {
        el = this.reference = this.$slots.reference[0].elm
      }

      switch (this.trigger) {
        case 'hover': {
          on(el, 'mouseenter', this.open)
          on(el, 'mouseleave', this.close)
          on(popover, 'mouseenter', this.open)
          on(popover, 'mouseleave', this.close)
          break
        }
        case 'click': {
          on(el, 'click', this.toggle)
          on(document, 'click', this.handleDocumentClick)
          break
        }
        case 'focus': {
          if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
            on(el, 'focus', this.open)
            on(el, 'blur', this.close)
          } else {
            on(el, 'mousedown', this.open)
            on(el, 'mouseup', this.close)
          }
          break
        }
        default: {
          break
        }
      }
      on(document, 'scroll', this.getScroll)

      this.getScroll()
    },
    beforeDestroy () {
      if (document.body.contains(this.$refs.popover)) {
        document.body.removeChild(this.$refs.popover)
      }
    },
    destroyed () {
      let el = this.reference

      off(document, 'scroll', this.getScroll)
      off(el, 'mouseenter', this.open)
      off(el, 'mouseleave', this.close)
      off(el, 'click', this.toggle)
      off(document, 'click', this.handleDocumentClick)
      off(el, 'focus', this.open)
      off(el, 'blur', this.close)
      off(el, 'mousedown', this.open)
      off(el, 'mouseup', this.close)
    }
  }
</script>
