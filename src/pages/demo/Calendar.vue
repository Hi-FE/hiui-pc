<template>
  <demo title="Icon" class="icon-demo">
    <demo-item name="singleDate" description="单日期选择" :code="single_date" lang="js">
      <div>日期: {{ demo_single_date }}</div>
      <div class="calendar-warp">
        <vCalendar :is_show="true"
                   :is_range="false"
                   :is_single_month="true"
                   :is_today_disable="true"
                   @get-first-value="demo_single_date = arguments[0]"></vCalendar>
      </div>
    </demo-item>

    <demo-item name="doubleDate" description="双日期选择" :code="double_date" lang="js">
      <div>起止日期:  {{ demo_from_date }} <Icon name="arrowright"></Icon> {{ demo_ret_date }}</div>
      <div class="calendar-warp">
        <vCalendar :is_show="true"
                   :is_range="true"
                   :is_single_month="true"
                   :is_today_disable="true"
                   @get-first-value="demo_from_date = arguments[0]"
                   @get-sec-value="demo_ret_date = arguments[0]"></vCalendar>
      </div>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';
  .calendar-warp { width: 320px; }
</style>

<script>
  export default {
    data () {
      return {
        demo_single_date: '',
        demo_from_date: '',
        demo_ret_date: '',
        single_date: `
<vCalendar :is_show="true"
           :is_range="false"
           :is_single_month="true"
           :is_today_disable="true"
           @get-first-value="date = arguments[0]"></vCalendar>
        `,
        double_date: `
<vCalendar :is_show="true"
           :is_range="true"
           :is_single_month="true"
           :is_today_disable="true"
           @get-first-value="demo_from_date = arguments[0]"
           @get-sec-value="demo_ret_date = arguments[0]"></vCalendar>
`
      }
    }
  }
</script>
