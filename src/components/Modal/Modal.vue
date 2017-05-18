<template>
  <transition name="fade">
    <div v-if="show" :class="component_class">
      <div v-if="use_mask" class="hiui-modal-mask" @click="closeModal('mask')"></div>
      <transition :name="transitionName[type]">
        <div v-show="modal_show" :class="modal_class">
          <Icon v-if="use_close" :class="icon_class" name="close" role="button" @click.native="closeModal()"></Icon>
          <div :class="body_class">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style lang="stylus">
  @import './style/';

  bounce-center();
  slide-down();
  slide-up();
  slide-left();
  slide-right();
</style>

<script>
  const prefixCls = 'hiui-modal'

  export default {
    name: 'Modal',
    props: {
      show: false,
      type: {
        default: 'center',
        type: String,
        validator (val) {
          return ['center', 'top', 'bottom', 'left', 'right'].some((str) => str === val)
        }
      },
      use_close: {
        default: true,
        type: Boolean
      },
      use_mask: {
        default: true,
        type: Boolean
      },
      mask_close: {
        default: true,
        type: Boolean
      },
      prevent_scroll: {
        default: true,
        type: Boolean
      },
      classname: [String, Array]
    },
    model: {
      prop: 'show',
      event: 'switch'
    },
    data () {
      return {
        modal_show: this.show,
        transitionName: {
          center: 'bounce-center',
          top: 'slide-down',
          bottom: 'slide-up',
          left: 'slide-right',
          right: 'slide-left'
        }
      }
    },
    watch: {
      show (val) {
        this.$nextTick(() => {
          this.modal_show = val
        })

        this.prevent_scroll && document.documentElement.classList[val ? 'add' : 'remove']('hiui-modal-banScroll')
      }
    },
    computed: {
      component_class () {
        return [
          `${prefixCls}-wrap`
        ]
      },
      modal_class () {
        let classNames = [
          prefixCls,
          `${prefixCls}-${this.type}`,
          {
            [`${prefixCls}-hasMask`]: this.use_mask
          }
        ]
        return classNames
      },
      body_class () {
        let classNames = [
          `${prefixCls}-body`
        ]
        if (Array.isArray(this.classname)) {
          classNames = classNames.concat(this.classname)
        } else {
          classNames.push({
            [this.classname]: this.classname
          })
        }
        return classNames
      },
      icon_class () {
        return [
          `${prefixCls}-close`
        ]
      }
    },
    methods: {
      closeModal (name) {
        if (name === 'mask' && !this.mask_close) {
          return false
        }
        this.$emit('switch', false)
      }
    }
  }
</script>
