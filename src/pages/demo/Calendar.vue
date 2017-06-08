<template>
  <demo title="Calendar" class="calendar-demo">
    <demo-item name="default" description="默认" :code="code">
      <div>{{ format_date }}</div>
      <Calendar
        :daterange="true"
        :begin_date.sync="begin_date"
        :end_date.sync="end_date"
        :format_date.sync="format_date"
        :rules="['untilToday']"
        :one_calendar="false"
      >
      </Calendar>
    </demo-item>
  </demo>
</template>

<style lang="stylus">
  @import '../../style/';

  .calendar-demo {
    table {
      margin: 0!important;
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        begin_date: null,
        end_date: null,
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
