<template>
  <div :class="component_class">
    CalendarMonth
  </div>
</template>

<script>
  const prefixCls = 'hiui-calendar-month'

  export default {
    name: 'CalendarMonth',
    props: {
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
      }
    },
    methods: {
    }
  }
</script>
