<template>
  <div :class="component_class">
    <div :class="bar_class">
      <div v-for="(item, index) in barList" :class="[bar_item_class, { disabled: item.disabled, active: active === item.name }]" @click="setActive(item)">
        {{ item.label }}
      </div>
    </div>
    <div :class="content_class">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="stylus">
  @import './style/';
</style>

<script>
  const prefixCls = 'hiui-tabs'

  export default {
    name: 'Tabs',
    props: {
      type: String,
      shouldChange: Function
    },
    data () {
      return {
        active: undefined,
        barList: []
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls
        ]
      },
      bar_class () {
        return [
          `${prefixCls}-bar`
        ]
      },
      bar_item_class () {
        return [
          `${prefixCls}-bar-item`,
          {
            [`${prefixCls}-bar-item-${this.type}`]: this.type
          }
        ]
      },
      content_class () {
        return [
          `${prefixCls}-content`
        ]
      }
    },
    methods: {
      getTabs () {
        return this.$children.filter(item => item.$options.name === 'TabPane')
      },
      updateBar () {
        this.barList.length = 0
        this.barList = Array.from(this.getTabs(), ($pane, i) => {
          return {
            vm: $pane,
            label: $pane.label,
            name: $pane.name || i,
            disabled: $pane.disabled
          }
        })

        if (this.barList.length > 0 && this.active === undefined) {
          this.active = this.barList[0].name
        }
        this.switchContent()
      },
      setActive (tab) {
        if (tab.disabled || tab.name === this.active) {
          return false
        }
        if (this.shouldChange) {
          if (this.shouldChange(tab.name, tab.vm) === false) {
            return false
          }
        }
        this.active = tab.name
        this.switchContent()
      },
      switchContent () {
        Array.from(this.barList, (obj) => {
          obj.vm.show = obj.name === this.active
        })
      }
    }
  }
</script>
