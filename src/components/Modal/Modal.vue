<template>
  <transition name="fade">
    <div v-if="show" :class="component_class">
      <div v-if="maskShow" class="hiui-modal-mask" @click="closeModal('mask')"></div>
      <transition :name="transitionName[type]">
        <div v-show="modal_show" :class="modal_class">
          <Icon v-if="btnShow" :class="icon_class" name="close" role="button" @click.native="closeModal()"></Icon>
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
      btnShow: {
        default: true,
        type: Boolean
      },
      maskShow: {
        default: true,
        type: Boolean
      },
      maskClose: {
        default: true,
        type: Boolean
      },
      preventScroll: {
        default: true,
        type: Boolean
      },
      className: [String, Array]
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

        this.preventScroll && document.documentElement.classList[val ? 'add' : 'remove']('hiui-modal-banScroll')
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
            [`${prefixCls}-hasMask`]: this.maskShow
          }
        ]
        return classNames
      },
      body_class () {
        let classNames = [
          `${prefixCls}-body`
        ]
        if (Array.isArray(this.className)) {
          classNames = classNames.concat(this.className)
        } else {
          classNames.push({
            [this.className]: this.className
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
        if (name === 'mask' && !this.maskClose) {
          return false
        }
        this.$emit('switch', false)
      }
    }
  }
</script>
