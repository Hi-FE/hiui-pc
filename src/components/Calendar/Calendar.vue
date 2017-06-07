<template>
  <div :class="component_class" :style="component_style">
    <!-- 日历模式 -->
    <template v-if="mode === 'date'">
      <header :class="header_class" :style="header_style">
        <Icon name="left" @click.native="prevMonth"></Icon>
        <span>{{ year }}年</span>
        <span>{{ month + 1 }}月</span>
        <Icon name="right" @click.native="nextMonth"></Icon>
      </header>
      <CalendarDate :height="calendar_height" :year="year" :month="month" :days="days" :filter="day_filter" @click_day="clickDay"></CalendarDate>
    </template>

    <!-- 月历模式 -->
    <template v-if="mode === 'month'">
      <header :class="header_class" :style="header_style">
        <Icon name="left" @click.native="year++"></Icon>
        <span>{{ year }}年</span>
        <Icon name="right" @click.native="year--"></Icon>
      </header>
      <CalendarMonth :height="calendar_height" :year="year" :filter="month_filter" @click_day="clickMonth"></CalendarMonth>
    </template>

    <!-- 年历模式 -->
    <template v-if="mode === 'year'">
      <header :class="header_class" :style="header_style">
        <Icon name="left" @click.native="prevMonth"></Icon>
        <span>{{ year }}年</span>
        <span>{{ month + 1 }}月</span>
        <Icon name="right" @click.native="nextMonth"></Icon>
      </header>
      <CalendarDate :height="calendar_height" :year="year" :month="month" :days="days" :filter="day_filter" @click_day="clickDay"></CalendarDate>
    </template>

  </div>
</template>

<style lang="stylus">
  @import './style/';
</style>

<script>
  import CalendarYear from './CalendarYear'
  import CalendarMonth from './CalendarMonth'
  import CalendarDate from './CalendarDate'
  import { formatDate, isValid } from '@/tools'
  import Rules from './rules'

  const prefixCls = 'hiui-calendar'
  const today = new Date()

  export default {
    name: 'Calendar',
    components: {
      CalendarYear,
      CalendarMonth,
      CalendarDate
    },
    props: {
      date: [Object, Date],
      begin_date: [Object, Date],
      end_date: [Object, Date],
      filter: Function,
      days: {
        type: Array,
        default() {
          return ['日', '一', '二', '三', '四', '五', '六']
        }
      },
      picker: {
        type: String,
        default: 'month'
      },
      daterange: {
        type: Boolean,
        default: false
      },
      one_calendar: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'day'
      },
      is_inline: {
        type: Boolean,
        default: true
      },
      format: {
        type: String,
        default: 'yyyy-MM-dd'
      },
      mark_today: {
        type: Boolean,
        default: true
      },
      rules: {
        type: Array,
        validator (arr) {
          return arr.some((val) => isValid(Object.keys(Rules), val))
        }
      },
      width: {
        type: String,
        default: '350px'
      },
      calendar_height: {
        type: String,
        default: '250px'
      },
      header_height: {
        type: String,
        default: '60px'
      }
    },
    model: {
      prop: 'date',
      event: 'change'
    },
    data () {
      return {
        today: today,
        year: this.date ? this.date.getFullYear() : today.getFullYear(),
        month: this.date ? this.date.getMonth() : today.getMonth(),
        mode: this.picker
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
          width: this.width
        }
      },
      header_class () {
        return [
          `${prefixCls}-header`
        ]
      },
      header_style () {
        return {
          height: this.header_height,
          lineHeight: this.header_height
        }
      },
      display () {
        return this.daterange ? (`${formatDate(this.begin_date, this.format)} - ${formatDate(this.end_date, this.format)}`) : formatDate(this.date, this.format)
      },
      parse_date () {
        let obj = this.date ? {
          year: this.date.getFullYear(),
          month: this.date.getMonth(),
          day: this.date.getDate()
        } : null

        return obj ? Object.assign(obj, {
          date: new Date(obj.year, obj.month, obj.day)
        }) : null
      },
      parse_begin_date () {
        let obj = this.begin_date ? {
          year: this.begin_date.getFullYear(),
          month: this.begin_date.getMonth(),
          day: this.begin_date.getDate()
        } : null

        return obj ? Object.assign(obj, {
          date: new Date(obj.year, obj.month, obj.day)
        }) : null
      },
      parse_end_date () {
        let obj = this.end_date ? {
          year: this.end_date.getFullYear(),
          month: this.end_date.getMonth(),
          day: this.end_date.getDate()
        } : null

        return obj ? Object.assign(obj, {
          date: new Date(obj.year, obj.month, obj.day)
        }) : null
      }
    },
    methods: {
      day_filter (date) {
        let result = {
          disabled: false,
          isToday: false,
          active: false,
          callback: null,
          className: []
        }

        // 判断是否高亮今天
        if (this.mark_today && formatDate(date, 'yyyy-MM-dd') === formatDate(this.today, 'yyyy-MM-dd')) {
          result.isToday = true
        }

        // 用户自定义过滤方法
        if (this.filter && !this.filter(date)) {
          result.disabled = true
        }

        // 内置过滤方法
        if (this.rules && this.rules.length) {
          Array.from(this.rules, (filter_name) => {
            if (Rules[filter_name](date)) {
              result.disabled = true
            }
          })
        }

        // 判断是否是当前选中日期
        if (this.datarange) {

        } else {
          if (this.parse_date && +date === +this.parse_date.date) {
            result.active = true
          }
        }

        return result
      },
      month_filter (month) {

      },
      prevMonth () {
        if (this.month === 0) {
          this.month = 11
          this.year--
        } else {
          this.month--
        }
      },
      nextMonth () {
        if (this.month === 11) {
          this.month = 0
          this.year++
        } else {
          this.month++
        }
      },
      clickDay (obj) {
        this.$emit('change', obj.date)
        this.$nextTick(() => this.$emit('update:format_date', this.display))
      },
      clickMonth (obj) {

      }
    }
  }
</script>
