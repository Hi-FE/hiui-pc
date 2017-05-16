<template>
  <div :class="component_class" :style="tab_style">
    <div v-for="(item, i) in tab_data"
         :key="i" @click="handleClick(i, item.name)"
         @mouseenter="handleMouseEnter(i, item.name)"
         :class="[item_class, { active: value === i }]"
         :style="[item_style, value === i ? activeStyle : {}]"
         >
         <Icon v-if="item.icon" class="hiui-icon-prefix" :name="item.icon"></Icon>
         {{ item.name }}
         <Icon v-if="item.suffix_icon" class="hiui-icon-suffix" :name="item.suffix_icon"></Icon>
    </div>
  </div>
</template>

<style lang="stylus">
  @import './style/';
</style>

<script>
  import Icon from '../Icon'
  import 'purecss/build/base-min.css';
  import 'purecss/build/grids-min.css';

  const prefixCls = 'hiui-tab'

  export default {
    name: 'Tab',
    components: {
      Icon
    },
    props: {
      value: {
        default: 0,
        type: Number
      },
      data: {
        default: [],
        type: Array
      },
      trigger: {
        default: 'click',
        type: String
      },
      type: {
        default: 'padding',
        type: String
      },
      width: [Number, String],
      theme: String,
      activeStyle: Object
    },
    data () {
      return {
        isPercent: false
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls,
          {
            [`${prefixCls}-${this.theme}`]: this.theme,
            [`${prefixCls}-${this.type && this.type.split(':')[0]}`]: this.type
          }
        ]
      },
      item_class () {
        return [
          `${prefixCls}-item`,
          {
            [`pure-u-1-${this.data.length}`]: this.isPercent
          }
        ]
      },
      item_style () {
        let style
        if (this.bar_type === 'fix_width') {
          let val = this.type.split(':')[1]

          this.isPercent = !val

          style = val && {
            width: val
          }
        }

        return style || {}
      },
      bar_type () {
        return this.type && this.type.split(':')[0]
      },
      tab_style () {
        return this.width ? {
          width: this.width + (typeof this.width === 'number' ? 'px' : '')
        } : null
      },
      tab_data () {
        return Array.from(this.data, (item) => typeof item === 'object' ? item : { name: item })
      }
    },
    methods: {
      handleClick (i, title) {
        if (this.trigger !== 'click' || i === this.value) {
          return false
        }

        this.$emit('input', i)
        this.$emit('change', i, title)
      },
      handleMouseEnter (i, title) {
        if (this.trigger !== 'hover' || i === this.value) {
          return false
        }

        this.$emit('input', i)
        this.$emit('change', i, title)
      }
    }
  }
</script>
