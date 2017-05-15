<template>
  <div :class="component_class">
    <div :class="bar_class" ref="bar">
      <Icon v-if="over" :class="bar_prev_class" name="left" @click.native="slider('prev')"></Icon>
      <div class="hiui-tabs-bar-nav" ref="nav">
        <div class="hiui-tabs-bar-scroll" ref="scroll" :style="scroll_style">
          <div v-for="(item, index) in barList" :class="[bar_item_class, { disabled: item.disabled, active: active === item.name }]" :style="[bar_style, active === item.name ? activeStyle : {}]" @click="setActive(item)">
            <Icon v-if="item.icon" :name="item.icon"></Icon>
            {{ item.label }}
          </div>
        </div>
      </div>
      <Icon v-if="over" :class="bar_next_class" name="right" @click.native="slider('next')"></Icon>
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
  import Icon from '../Icon'

  const prefixCls = 'hiui-tabs'

  export default {
    name: 'Tabs',
    components: {
      Icon
    },
    props: {
      type: {
        default: 'padding',
        type: String
      },
      activeStyle: Object,
      shouldChange: Function
    },
    data () {
      return {
        nav_width: 0,
        active: undefined,
        over: false,
        sliderIndex: 0,
        curValue: 0,
        overValue: 0,
        sliderCount: 0,
        barList: []
      }
    },
    computed: {
      bar_type () {
        return this.type && this.type.split(':')[0]
      },
      bar_style () {
        if (this.bar_type === 'fix_width') {
          let val = this.type.split(':')[1]
          let isPercent

          if (val) {
            isPercent = val.slice(-1) === '%'
            val = parseFloat(val) / (isPercent ? 100 : 1)
          } else {
            isPercent = true
            val = parseFloat(1 / this.barList.length)
          }
          return {
            width: `${isPercent ? val * this.nav_width : val}px`
          }
        } else {
          return {}
        }
      },
      component_class () {
        return [
          prefixCls
        ]
      },
      bar_class () {
        return [
          `${prefixCls}-bar`,
          {
            [`${prefixCls}-bar-over`]: this.over
          }
        ]
      },
      bar_prev_class () {
        return [
          `${prefixCls}-bar-prev`,
          {
            'disabled': this.disabled_prev
          }
        ]
      },
      bar_next_class () {
        return [
          `${prefixCls}-bar-next`,
          {
            'disabled': this.disabled_next
          }
        ]
      },
      bar_item_class () {
        return [
          `${prefixCls}-bar-item`,
          {
            [`${prefixCls}-bar-item-${this.type && this.type.split(':')[0]}`]: this.type
          }
        ]
      },
      content_class () {
        return [
          `${prefixCls}-content`
        ]
      },
      disabled_prev () {
        return this.over && this.sliderIndex === 0
      },
      disabled_next () {
        return this.over && this.sliderIndex === this.sliderCount
      },
      scroll_style () {
        return this.over ? {
          transform: `translateX(${-this.sliderValue * this.sliderIndex}px)`
        } : {}
      },
      sliderValue () {
        return this.overValue / this.sliderCount
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
            icon: $pane.icon,
            name: $pane.name || i,
            disabled: $pane.disabled
          }
        })

        if (this.barList.length > 0 && this.active === undefined) {
          this.active = this.barList[0].name
        }
        this.switchContent()
      },
      updateValue () {
        this.overBar()
        this.$nextTick(() => {
          this.nav_width = this.$refs.nav.offsetWidth
          this.overValue = this.$refs.scroll.offsetWidth - this.nav_width
          this.sliderCount = Math.ceil(this.overValue / this.nav_width)
        })
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
      },
      overBar () {
        let { scroll, bar } = this.$refs

        if (scroll.offsetWidth - bar.offsetWidth > 0) {
          this.over = true
        } else {
          this.over = false
        }
      },
      slider (type) {
        if (!this.over) {
          return false
        }

        if (type === 'prev' && !this.disabled_prev) {
          this.sliderIndex -= 1
        } else if (type === 'next' && !this.disabled_next) {
          this.sliderIndex += 1
        }
      }
    },
    updated() {
      this.updateValue()
    },
    mounted () {
      window.addEventListener('resize', this.updateBar, false)
    },
    beforeStroy () {
      window.removeEventListener('resize', this.updateBar, false)
    }
  }
</script>
