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
        inited: true
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
    created: function () {
      // 保证父组件su-swiper初始化完成后才初始化swiper-slide
      this.$parent.$on('inited', () => {
        this.inited = true;
      })
    }
  }
</script>
