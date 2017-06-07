<template>
  <div :class="component_class" :style="component_style">
    CalendarMonth
  </div>
</template>

<script>
  const prefixCls = 'hiui-calendar-month'

  export default {
    name: 'CalendarMonth',
    props: {
      year: Number,
      filter: Function,
      width: String,
      height: {
        type: String,
        default: '250px'
      }
    },
    data () {
      return {
        MONTHS: 12
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls
        ]
      },
      component_style () {
        return {
          width: this.width,
          height: this.height
        }
      }
    },
    methods: {
    }
  }
</script>
