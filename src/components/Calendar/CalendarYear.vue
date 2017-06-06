<template>
  <div :class="component_class">
    CalendarYear
  </div>
</template>

<script>
  const prefixCls = 'hiui-calendar-year'

  export default {
    name: 'CalendarYear',
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
