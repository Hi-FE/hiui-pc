<template>
  <span :class="component_class">
    <span class="box">
      <transition name="bounce">
        <i class="item" :style="{ backgroundColor: color }" v-show="active"></i>
      </transition>
    </span>
    <input class="hidden-input" :id="_uid" type="checkbox" :value="cur_value" @click="triggerHandler(cur_value)">
    <label class="checkbox-label" :for="_uid"><slot></slot></label>
  </span>
</template>

<style lang="stylus">
  @import './style/';

  bounce();
</style>

<script>
  const prefixCls = 'hiui-checkbox'

  export default {
    name: 'CheckBox',
    props: {
      size: {
        default: 'md',
        type: String
      },
      color: String,
      disabled: Boolean,
      value: {},
      checked: Array
    },
    model: {
      prop: 'checked',
      event: 'input'
    },
    data () {
      return {
        active: false
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls,
          `${prefixCls}-${this.size}`,
          {
            disabled: this.disabled,
            active: this.active
          }
        ]
      },
      cur_value: function () {
        return this.value || this.$slots.default[0].text
      }
    },
    created: function () {
      const { checked, cur_value } = this;
      if (!this.disabled) this.active = checked.findIndex(item => cur_value === item) !== -1
    },
    methods: {
      triggerHandler: function (target) {
        if (this.disabled) return;
        let checked = [].concat(this.checked)
        let index = checked.findIndex(item => {
          return item === target
        })
        if (index !== -1) checked.splice(index, 1)
        else checked.push(target)
        this.active = index === -1
        this.$emit('input', checked);
      }
    }
  }
</script>
