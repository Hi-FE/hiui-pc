<template>
  <transition name="fade">
    <div v-if="show" :class="component_class">
      <div v-if="use_mask" class="hiui-modal-mask" @click="closeModal('mask')"></div>
      <transition :name="transitionName[type]">
        <div v-show="modal_show" :class="container_class">
          <Icon v-if="use_close" :class="icon_class" name="close" role="button" @click.native="closeModal()"></Icon>
          <div :class="body_class" :style="body_style">
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
  import { isValid, getStyles } from '@/tools';
  const prefixCls = 'hiui-modal'

  export default {
    name: 'Modal',
    props: {
      show: false,
      type: {
        default: 'center',
        type: String,
        validator (val) {
          return isValid(['center', 'top', 'bottom', 'left', 'right'], val)
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
      use_shadow: {
        default: true,
        type: Boolean
      },
      border_radius: String,
      background_color: String
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
      container_class () {
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
          `${prefixCls}-body`,
          {
            [`${prefixCls}-body-use_shadow`]: this.use_shadow
          }
        ]
        return classNames
      },
      body_style () {
        return getStyles({
          backgroundColor: this.background_color,
          borderRadius: this.border_radius
        })
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
