<template>
  <demo title="Calendar" class="calendar-demo">
    <demo-item name="default" description="默认" :code="code">
      <Calendar v-model="date" :filter="fromToday" :rules="['fromToday']"></Calendar>
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
        date: new Date(),
        code: `
<Calendar></Calendar>
        `
      }
    },
    methods: {
      fromToday (date) {
        if (date < new Date()) {
          return false
        }
        return true
      }
    }
  }
</script>
