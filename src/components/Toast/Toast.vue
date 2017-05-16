<template>
  <transition name="fade" @after-leave="afterLeave">
    <div v-if="show" :class="component_class">
      {{ content }}
    </div>
  </transition>
</template>

<style lang="stylus">
  @import './style/';
</style>

<script>
  const prefixCls = 'hiui-toast'

  export default {
    name: 'Toast',
    data () {
      return {
        show: false,
        content: '',
        time: 2000,
        type: '',
        callback: null
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls,
          {
            [`${prefixCls}-${this.type}`]: this.type && this.type !== 'default'
          }
        ]
      }
    },
    methods: {
      close () {
        this.show = false
      },
      afterLeave () {
        this.$destroy(true)
      }
    },
    mounted () {
      document.body.appendChild(this.$el)
      this.time && setTimeout(this.close, this.time)
    },
    beforeDestroy () {
      document.body.removeChild(this.$el)
      this.callback && this.$nextTick(() => {
        this.callback()
      })
    },
    destroyed() {
      this.$emit('destroyed')
    }
  }
</script>
