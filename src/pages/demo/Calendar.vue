<template>
  <demo title="Calendar" class="calendar-demo">
    <demo-item name="default" description="默认" :code="code">
      <div>{{ format_date }}</div>
      <Calendar v-model="date" :format_date.sync="format_date" :filter="fromToday" :rules="['unableSun', 'unableSat']"></Calendar>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';
</style>

<script>
  export default {
    data () {
      return {
        date: null,
        format_date: '',
        code: `
<Calendar></Calendar>
        `
      }
    },
    methods: {
      fromToday (date) {
        return true
      }
    }
  }
</script>
