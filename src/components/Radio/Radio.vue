<template>
  <span :class="component_class">
    <i class="radio-icon">
      <transition name="bounce">
        <i class="active-sign" v-show="is_active" :style="active_style"></i>
      </transition>
    </i>
    <input class="hidden-input" :id="_uid" type="radio" :value="cur_value" @click="!disabled && triggerHandler(cur_value)">
    <label class="radio-label" :for="_uid"><slot></slot></label>
  </span>
</template>

<style lang="stylus">
  @import './style/';

  bounce();
</style>

<script>
  const prefixCls = 'hiui-radio'

  export default {
    name: 'Radio',
    props: {
      value: {},
      checked: {},
      size: {
        default: 'md',
        type: String
      },
      color: String,
      disabled: Boolean
    },
    model: {
      prop: 'checked',
      event: 'input'
    },
    data () {
      return {
      }
    },
    computed: {
      component_class () {
        const { size, disabled, is_active } = this
        return [
          prefixCls,
          `${prefixCls}-${size}`,
          { disabled, active: is_active }
        ]
      },
      is_active: function () {
        const { cur_value, checked } = this;
        return cur_value === checked
      },
      active_style: function () {
        return {
          backgroundColor: this.color
        }
      },
      cur_value: function () {
        return this.value || this.$slots.default[0].text
      }
    },
    methods: {
      triggerHandler: function (value) {
        const { checked } = this
        value = checked === value && checked ? '' : value;
        this.$emit('input', value)
      }
    }
  }
</script>