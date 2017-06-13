<template>
  <div :class="component_class">
    <template>
      <slot></slot>
    </template>
  </div>
</template>

<style lang="stylus">
</style>

<script>

  const prefixCls = 'hiui-swipe-slide'

  export default {
    name: 'SwipeSlide',
    computed: {
      component_class () {
        return [
          prefixCls,
          'swiper-slide'
        ]
      }
    }
  }
</script>
