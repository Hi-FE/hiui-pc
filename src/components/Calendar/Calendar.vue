<template>
  <div :class="component_class" :style="component_style">
    <div v-for="i in calendar_count" :class="wrap_class" :style="wrap_style">
      <!-- 日历模式 -->
      <template v-if="mode === 'date'">
        <header :class="header_class" :style="header_style">
          <Icon name="left" @click.native="prevMonth"></Icon>
          <span @click="mode = 'year'">{{ year }}年</span>
          <span @click="mode = 'month'">{{ month + 1 }}月</span>
          <Icon name="right" @click.native="nextMonth"></Icon>
        </header>
        <CalendarDate
          :daterange="daterange"
          :date="date"
          :date_range="date_range"
          :height="calendar_height"
          :year="year"
          :month="month"
          :days="days"
          :filter="filter"
          @click_day="clickDay"
        >
        </CalendarDate>
      </template>

      <!-- 月历模式 -->
      <template v-if="mode === 'month'">
        <header :class="header_class" :style="header_style">
          <Icon name="left" @click.native="year--"></Icon>
          <span @click="mode = 'year'">{{ year }}年</span>
          <Icon name="right" @click.native="year++"></Icon>
        </header>
        <CalendarMonth
          :daterange="daterange"
          :date="date"
          :date_range="date_range"
          :height="calendar_height"
          :year="year"
          :filter="filter"
          @click_month="clickMonth"
        >
        </CalendarMonth>
      </template>

      <!-- 年历模式 -->
      <template v-if="mode === 'year'">
        <header :class="header_class" :style="header_style">
          <Icon name="left" @click.native="year_start -= year_range"></Icon>
          <span class="year-range">{{ year_start }} - {{ year_start + year_range }}</span>
          <Icon name="right" @click.native="year_start += year_range"></Icon>
        </header>
        <CalendarYear
          :daterange="daterange"
          :date="date"
          :date_range="date_range"
          :height="calendar_height"
          :year_start="year_start"
          :filter="filter"
          @click_year="clickYear"
        >
        </CalendarYear>
      </template>
    </div>
  </div>
</template>

<style lang="stylus">
  @import './style/';
</style>

<script>
  import CalendarYear from './CalendarYear'
  import CalendarMonth from './CalendarMonth'
  import CalendarDate from './CalendarDate'
  import { formatDate, isValid, isSameDate } from '@/tools'
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
      date_filter: Function,
      month_filter: Function,
      year_filter: Function,
      days: {
        type: Array,
        default() {
          return ['日', '一', '二', '三', '四', '五', '六']
        }
      },
      picker: {
        type: String,
        default: 'date'
      },
      daterange: {
        type: Boolean,
        default: false
      },
      one_calendar: {
        type: Boolean,
        default: false
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
          return arr.some((val) => isValid(Object.keys(Rules.date), val))
        }
      },
      width: {
        type: String,
        default: '600px'
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
        mode: this.picker,
        year_range: 20,
        year_start: 0,
        date_range: []
      }
    },
    watch: {
      mode (val) {
        if (val === 'year') {
          this.year_start = ~~(this.year / 20) * 20
        }
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
      wrap_class () {
        return [
          `${prefixCls}-wrap`
        ]
      },
      wrap_style () {
        return {
          width: `${1 / this.calendar_count * 100}%`
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
      calendar_count () {
        return !this.daterange ? 1 : this.one_calendar ? 1 : 2
      },
      display () {
        return this.daterange ? (`${formatDate(this.begin_date, this.format)}~${formatDate(this.end_date, this.format)}`) : formatDate(this.date, this.format)
      }
    },
    methods: {
      filter (date, type) {
        let result = {
          disabled: false,
          isToday: false,
          callback: null
        }

        // 判断是否高亮今天
        if (this.mark_today && isSameDate(date, this.today, type)) {
          result.isToday = true
        }

        // 用户自定义过滤方法
        let custom_filter = `${type}_filter`
        if (this[custom_filter] && !this[custom_filter](date)) {
          result.disabled = true
        }

        // 内置过滤方法
        if (this.rules && this.rules.length) {
          Array.from(this.rules, (filter_name) => {
            if (Rules[type][filter_name] && Rules[type][filter_name](date)) {
              result.disabled = true
            }
          })
        }

        // 判断是否是当前选中日期
        // if (this.daterange) {
        //   Array.from(this.date_range, (d) => {
        //     result.active = formatDate(date, 'yyyy-MM-dd') === formatDate(d, 'yyyy-MM-dd')
        //   })
        // } else {
        //   if (this.parse_date && +date === +this.parse_date.date) {
        //     result.active = true
        //   }
        // }

        return result
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
        if (this.daterange) {
          if (this.date_range.length === 1) {
            this.date_range = this.date_range[0] > obj.date ? [obj.date].concat(this.date_range) : this.date_range.concat([obj.date])
            this.$nextTick()
            .then(() => {
              this.$emit('update:begin_date', this.date_range[0])
              this.$emit('update:end_date', this.date_range[1])
            })
            .then(() => {
              this.$emit('update:format_date', this.display)
            })
          } else {
            this.date_range = [obj.date]
          }
        } else {
          this.$emit('change', obj.date)
          this.$nextTick(() => this.$emit('update:format_date', this.display))
        }
      },
      clickMonth (obj) {
        this.month = obj.month
        this.mode = this.picker === 'month' ? 'month' : 'date'
      },
      clickYear (obj) {
        this.year = obj.year
        this.mode = this.picker === 'year' ? 'year' : 'month'
      }
    },
    mounted () {
      this.year_start = ~~(this.year / 20) * 20
      if (this.daterange && this.begin_date) {
        this.date_range = [this.begin_date]
      }
    }
  }
</script>
