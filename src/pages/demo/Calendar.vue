<template>
  <demo title="Icon" class="icon-demo">
    <demo-item name="Default" description="默认" :code="size_code" lang="js">
      <Btn @click.native="$calendar()">Calendar</Btn>
      <div>{{ date }}</div>
      <div class="calendar-warp">
        <vCalendar :is_show="true"
                   :is_range="false"
                   :is_single_month="true"
                   :is_today_disable="true"
                   @get-first-value="date = arguments[0]"></vCalendar>
      </div>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scope>
  @import '../../style/';
  .calendar-warp { width: 320px; }
</style>

<script>
  export default {
    data () {
      return {
        date: '',
        size_code: `
this.$calendar()
        `
      }
    }
  }
</script>
