<template>
  <div :class="component_class">
    <!-- <CalendarMonth :active="12"></CalendarMonth> -->
    <header>
      <Icon name="left"></Icon>
      <span>{{ year }}年</span>
      <span>{{ month }}月</span>
      <Icon name="right"></Icon>
    </header>
    <CalendarDay :year="year" :month="month" :days="days" :filter="day_filter"></CalendarDay>
  </div>
</template>

<style lang="stylus">
  @import './style/';
</style>

<script>
  import CalendarYear from './CalendarYear'
  import CalendarMonth from './CalendarMonth'
  import CalendarDay from './CalendarDay'
  import { formatDate, isValid } from '@/tools'
  const prefixCls = 'hiui-calendar'

  export default {
    name: 'Calendar',
    components: {
      CalendarYear,
      CalendarMonth,
      CalendarDay
    },
    props: {
      date: Date,
      begin_date: Date,
      end_date: Date,
      filter: Function,
      days: {
        type: Array,
        default() {
          return ['日', '一', '二', '三', '四', '五', '六']
        }
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
        default() {
          return []
        },
        validator (arr) {
          return arr.some((val) => isValid(['fromToday', 'fromTomorrow'], val))
        }
      }
    },
    model: {
      prop: 'date',
      event: 'input'
    },
    data () {
      return {
        today: new Date(),
        year: this.date.getFullYear(),
        month: this.date.getMonth(),
        mode: this.type
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls
        ]
      },
      display () {
        return this.daterange ? (`${formatDate(this.begin_date, this.format)} - ${formatDate(this.end_date, this.format)}`) : formatDate(this.date, this.format)
      }
    },
    methods: {
      day_filter (date) {
        let className = []
        if (this.mark_today && formatDate(date, 'yyyy-MM-dd') === formatDate(this.today, 'yyyy-MM-dd')) {
          className.push('today')
        }
        if (this.filter && !this.filter(date, formatDate(date, this.format))) {
          className.push('disabled')
        }
        if (this.rules.length) {
          Array.from(this.rules, (filter_name) => {
            this[filter_name](date) && className.push('disabled')
          })
        }
        return className
      },
      fromToday () {

      }
    }
  }
</script>
