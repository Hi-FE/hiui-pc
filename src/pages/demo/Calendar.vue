<template>
  <demo title="Calendar" class="calendar-demo">
    <demo-item name="default" description="默认单日期" :code="code">
      <div class="calendar_result">
        Date: {{ default_date }}<br />
        Format: {{ default_format_date }}<br />
        <Calendar
          v-model="default_date"
          :format_date.sync="default_format_date"
        >
        </Calendar>
      </div>
    </demo-item>

    <demo-item name="daterange" description="默认多日期" :code="daterange_code">
      <div class="calendar_result">
        Begin Date: {{ daterange_begin_date }}<br />
        End Date: {{ daterange_end_date }}<br />
        Format: {{ daterange_format_date }}<br />
        <Calendar
          :daterange="true"
          :begin_date.sync="daterange_begin_date"
          :end_date.sync="daterange_end_date"
          :format_date.sync="daterange_format_date"
        >
        </Calendar>
      </div>
    </demo-item>

    <demo-item name="picker" description="日历类型" :code="picker_code">
      <div class="calendar_result">
        Datepick: {{ datepick_format_date }}<br />
        <Calendar
          v-model="datepick_date"
          :format_date.sync="datepick_format_date"
        >
        </Calendar>
      </div>
      <div class="calendar_result">
        MonthPick: {{ monthpick_format_date }}<br />
        <Calendar
          v-model="monthpick_date"
          :format_date.sync="monthpick_format_date"
          :picker="'month'"
          :format="'yyyy-MM'"
        >
        </Calendar>
      </div>
      <div class="calendar_result">
        YearPick: {{ yearpick_format_date }}<br />
        <Calendar
          v-model="yearpick_date"
          :format_date.sync="yearpick_format_date"
          :picker="'year'"
          :format="'yyyy'"
        >
        </Calendar>
      </div>
    </demo-item>

    <demo-item name="rule" description="禁用规则" :code="rule_code">
      <div class="calendar_result">
        禁用周末: {{ weekend_format_date }}<br />
        <Calendar
          v-model="weekend_date"
          :rules="['unableSat', 'unableSun']"
          :format_date.sync="weekend_format_date"
        >
        </Calendar>
      </div>
      <div class="calendar_result">
        从今天起: {{ fromtoday_format_date }}<br />
        <Calendar
          v-model="fromtoday_date"
          :rules="['fromToday']"
          :format_date.sync="fromtoday_format_date"
        >
        </Calendar>
      </div>
      <div class="calendar_result">
        自定义禁用规则: {{ custom_format_date }}<br />
        <Calendar
          v-model="custom_date"
          :custom_filter="unableFirstWeek"
          :format_date.sync="custom_format_date"
        >
        </Calendar>
      </div>
    </demo-item>

    <demo-item name="format" description="格式化" :code="format_code">
      <div class="calendar_result">
        Format: {{ format_format_date }}<br />
        <Calendar
          :daterange="true"
          :begin_date.sync="format_begin_date"
          :end_date.sync="format_end_date"
          :format="'yyyy/MM/dd'"
          :separator="' - '"
          :format_date.sync="format_format_date"
        >
        </Calendar>
      </div>
    </demo-item>

    <demo-item name="popover" description="和 `Popover` 组件一起使用" :code="popover_code">
      <Popover :placement="'bottom-left'" :ref="'popover'">
        <Calendar
          :daterange="true"
          :begin_date.sync="begin_date"
          :end_date.sync="end_date"
          :format_date.sync="format_date"
          @complete="() => this.$refs.popover.close()"
        >
        </Calendar>
        <Input slot="reference" v-model="format_date" :readonly="true" placeholder="no lazy"></Input>
      </Popover>

      <Popover :placement="'bottom-left'" :ref="'lazy_popover'">
        <Calendar
          :daterange="true"
          :begin_date.sync="lazy_begin_date"
          :end_date.sync="lazy_end_date"
          :format_date.sync="lazy_format_date"
          :lazy="false"
          @complete="() => this.$refs.lazy_popover.close()"
        >
        </Calendar>
        <Input slot="reference" v-model="lazy_format_date" :readonly="true" placeholder="lazy"></Input>
      </Popover>
    </demo-item>
  </demo>
</template>

<style lang="stylus">
  @import '../../style/';

  .calendar-demo {
    table {
      margin: 0!important;
      overflow: hidden!important;
    }

    .calendar_result {
      margin: 0 20px 20px 0;
      font-size: 16px;
      line-height: 1.6;
      display: inline-block;
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        // 默认单日期
        default_date: new Date(),
        default_format_date: '',
        // 默认多日期
        daterange_begin_date: null,
        daterange_end_date: null,
        daterange_format_date: '',
        // 类型数据
        datepick_format_date: '',
        monthpick_format_date: '',
        yearpick_format_date: '',
        datepick_date: null,
        monthpick_date: null,
        yearpick_date: null,
        // 禁用规则
        weekend_date: null,
        weekend_format_date: '',
        fromtoday_date: null,
        fromtoday_format_date: '',
        custom_date: null,
        custom_format_date: '',
        // 格式化
        format_begin_date: null,
        format_end_date: null,
        format_format_date: '',
        // popover
        begin_date: null,
        end_date: null,
        format_date: '',
        // lazy
        lazy_begin_date: null,
        lazy_end_date: null,
        lazy_format_date: '',
        code: `
<div class="calendar_result">
  Date: {{ default_date }}<br />
  Format: {{ default_format_date }}<br />
  <Calendar
    v-model="default_date"
    :format_date.sync="default_format_date"
  >
  </Calendar>
</div>
        `,
        daterange_code: `
 <div class="calendar_result">
  Begin Date: {{ daterange_begin_date }}<br />
  End Date: {{ daterange_end_date }}<br />
  Format: {{ daterange_format_date }}<br />
  <Calendar
    :daterange="true"
    :begin_date.sync="daterange_begin_date"
    :end_date.sync="daterange_end_date"
    :format_date.sync="daterange_format_date"
  >
  </Calendar>
</div>
        `,
        picker_code: `
<div class="calendar_result">
  Datepick: {{ datepick_format_date }}<br />
  <Calendar
    v-model="datepick_date"
    :format_date.sync="datepick_format_date"
  >
  </Calendar>
</div>
<div class="calendar_result">
  MonthPick: {{ monthpick_format_date }}<br />
  <Calendar
    v-model="monthpick_date"
    :format_date.sync="monthpick_format_date"
    :picker="'month'"
    :format="'yyyy-MM'"
  >
  </Calendar>
</div>
<div class="calendar_result">
  YearPick: {{ yearpick_format_date }}<br />
  <Calendar
    v-model="yearpick_date"
    :format_date.sync="yearpick_format_date"
    :picker="'year'"
    :format="'yyyy'"
  >
  </Calendar>
</div>
        `,
        rule_code: `
<div class="calendar_result">
  禁用周末<br />
  <Calendar
    v-model="datepick_date"
    :rules="['unableSat', 'unableSun']"
    :format_date.sync="datepick_format_date"
  >
  </Calendar>
</div>
<div class="calendar_result">
  从今天起<br />
  <Calendar
    v-model="datepick_date"
    :rules="['fromToday']"
    :format_date.sync="datepick_format_date"
  >
  </Calendar>
</div>
<div class="calendar_result">
  自定义禁用规则<br />
  <!--
    unableFirstWeek (date, type) {
      if (type === 'date' && date.getDate() <= 7) return true
    }
  -->
  <Calendar
    v-model="datepick_date"
    :custom_filter="unableFirstWeek"
    :format_date.sync="datepick_format_date"
  >
  </Calendar>
</div>
        `,
        format_code: `
<div class="calendar_result">
  Format: {{ format_format_date }}<br />
  <Calendar
    :daterange="true"
    :begin_date.sync="format_begin_date"
    :end_date.sync="format_end_date"
    :format="'yyyy/MM/dd'"
    :separator="' - '"
    :format_date.sync="format_format_date"
  >
  </Calendar>
</div>
        `,
        popover_code: `
<Popover :placement="'bottom-left'" :ref="'popover'">
  <Calendar
    :daterange="true"
    :begin_date.sync="begin_date"
    :end_date.sync="end_date"
    :format_date.sync="format_date"
    @complete="() => this.$refs.popover.close()"
  >
  </Calendar>
  <Input slot="reference" v-model="format_date" :readonly="true" placeholder="no lazy"></Input>
</Popover>

<Popover :placement="'bottom-left'" :ref="'lazy_popover'">
  <Calendar
    :daterange="true"
    :begin_date.sync="lazy_begin_date"
    :end_date.sync="lazy_end_date"
    :format_date.sync="lazy_format_date"
    :lazy="false"
    @complete="() => this.$refs.lazy_popover.close()"
  >
  </Calendar>
  <Input slot="reference" v-model="lazy_format_date" :readonly="true" placeholder="lazy"></Input>
</Popover>
        `
      }
    },
    methods: {
      unableFirstWeek (date, type) {
        if (type === 'date' && date.getDate() <= 7) return true
      }
    }
  }
</script>
