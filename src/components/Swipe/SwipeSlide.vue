<template>
  <div :class="component_class">
    <template v-if="inited">
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
    props: {
    },
    data () {
      return {
        inited: false
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls,
          'swiper-slide'
        ]
      }
    },
    mounted: function () {
      // Make sure init SwipeSlide slot after Swipe init;
      // For slot content can get the width and others information correctly
      this.inited = true;
    }
  }
</script>
