<template>
  <div :class="component_class"
       @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<style lang="stylus">
@import '../../style/';
.hiui-select-item {
    position:relative;
    padding: 10px 16px;
    background-color: #fff;
    cursor: pointer;
    white-space: nowrap;
    &.active {
      color:_red
    }
    &:hover {
      background-color: _grey_lighter
    }
    & + & {
      border-top: 1px solid #eee;
    }
  }
</style>

<script>
  const prefixCls = 'hiui-select-item'

  export default {
    name: 'SelectItem',
    props: {
      active: Boolean
    },
    data () {
      return {
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls,
          {active: this.active}
        ]
      }
    }
  }
</script>
