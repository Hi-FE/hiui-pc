<template>
  <div :class="component_class" :style="custom_style.self" v-clickothers="clickOthers">
    <!-- handler -->
    <div class="handler"
         @click="clickHandler"
         @mouseenter="hoverHandler(true)"
         @mouseleave="hoverHandler(false)">
      <!-- <icon v-if="!float && icon" class="icon" :name="icon" color="#979797"></icon> -->
      <p class="label" v-show="float || !show_val" :class="{ float: show_val && float }">{{ label || (show_val ? '已选择' : '请选择') }} </p>
      <p class="selected" :class="{ float: show_val && float }">{{ show_val }}</p>
      <span class="arrow" :style="custom_style.arrow"></span>
    </div>
    <!-- 下拉内容 -->
    <transition name="slide-down">
      <div class="body"
           v-show="is_active">
        <slot>
          <SelectItem v-for="(item, index) in data"
                      :key="index"
                      :color="color"
                      :active="value_by ? value === item[value_by] : item === value"
                      @click="itemClick(item, index)">
            {{ item[show_by] || item }}
          </SelectItem>
        </slot>
      </div>
    </transition>
    <!-- 响应Tab键 -->
    <input class="tab-hack" ref="tab_hack" type="text" @focus="is_active = true" @blur="is_active= false">
    <!-- 禁用遮罩 -->
    <div class="disabled-mask" v-show="disabled"></div>
  </div>
</template>

<style lang="stylus">
  @import './style/';
  .tab-hack { position:absolute;opacity:0 }
  .disabled-mask { position:absolute;z-index:9;top:0;left:0;bottom:0;right:0;background-color:rgba(255,255,255,.6);cursor:not-allowed }
  .slide-down-enter-active, .slide-down-leave-active {transition: opacity .3s, transform .3s; }
  .slide-down-enter, .slide-down-leave-active {opacity: 0;transform: translateY(-15px) }
</style>

<script>
  import clickothers from './directive/clickothers.js'
  const prefixCls = 'hiui-select'

  export default {
    name: 'Select',
    directives: { clickothers },
    props: {
      size: { default: 'md', type: String },
      color: String,
      data: Array,
      value: {},
      show_by: String,
      value_by: String,
      label: String,
      icon: String,
      default_first: Boolean,
      disabled: Boolean,
      float: Boolean
    },
    data () {
      return {
        is_active: false,
        is_hover: false,
        is_error: false
      }
    },
    components: {
      'SelectItem': require('./SelectItem.vue')
    },
    computed: {
      component_class () {
        const { is_active, is_hover, is_error, icon, float, disabled, size } = this;
        return [
          prefixCls,
          `${prefixCls}-${size}`,
          { active: is_active, hover: is_hover, error: is_error, 'has-icon': !!icon, float, disabled }
        ]
      },
      custom_style: function () {
        const { color, is_hover, is_active } = this;
        if (!color) return {}
        let rgb = color.indexOf('rgb') === -1 ? this.hexToRgb(color) : color.replace(/[^\d,]/g, '').split(',');
        const _boxshadow = is_active ? `0 0 0 2px rgba(${rgb.r || rgb[0] || 0},${rgb.g || rgb[1] || 0},${rgb.b || rgb[2] || 0},.2)` : undefined;
        const _color = is_hover || is_active ? color : undefined;
        return {
          self: {
            borderColor: _color,
            boxShadow: _boxshadow
          },
          arrow: {
            borderColor: _color
          }
        }
      },
      show_val: function () {
        const { data, value, show_by, value_by } = this;
        if (!data) return value;
        for (let i = 0, len = data.length, cur_val; i < len; i++) {
          cur_val = value_by ? data[i][value_by] : data[i];
          if (cur_val === value) return show_by ? data[i][show_by] : data[i];
        }
      },
      is_error_value: function () {
        const { value, value_by, data } = this;
        if (!data) return false;
        return data.findIndex((item, index) => value_by ? item[value_by] === value : value === item) === -1
      }
    },
    watch: {
      is_active: function (active) {
        this.$emit('active', active)
      },
      value: function (value) {
        this.dealErrorValue();
        value && this.verfiy(value);
      }
    },
    created: function () {
      this.registerEvents();
      this.dealErrorValue()
      this.defaultFirst()
    },
    methods: {
      clickHandler: function () {
        this.is_active = !this.is_active
      },
      hoverHandler: function (hover) {
        this.is_hover = hover;
      },
      itemClick: function (item, index) {
        const { value_by } = this;
        let cur_val = value_by ? item[value_by] : item;
        this.$emit('input', cur_val, index);
        this.$emit('verify', true)
        this.$refs.tab_hack.focus();
        this.is_error = false
        this.is_active = false
      },
      clickOthers: function () {
        this.is_active = false
      },
      verfiy: function (value) {
        this.is_error = !value && value !== 0;
        this.$emit('verify', !this.is_error)
      },
      dealErrorValue: function () {
        const { is_error_value } = this;
        // value不存在data中，则清空或者应用第一个选项
        if (is_error_value) {
          this.$emit('input', '');
          this.$emit('verify', false);
        }
      },
      defaultFirst: function () {
        const { value_by, value, data, default_first, is_error_value } = this;
        if (!default_first) return;
        let cur_value = is_error_value ? (value_by ? data[0][value_by] : data[0]) : value;
        this.$emit('input', cur_value, 0)
        this.$emit('verify', !!cur_value)
      },
      registerEvents: function () {
        const handler = () => {
          this.verfiy(this.value);
        }
        this.$root.$on('form-verify', handler)
        this.$on('form-verify', handler)
        this.$on('close', () => {
          this.is_active = false;
        })
      },
      hexToRgb: function (hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
        });

        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }
    }
  }
</script>
