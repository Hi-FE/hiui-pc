<template>
  <div :class="component_class" :style="component_style">
    <template v-for="(mode, i) in calendars">
      <!-- 日历模式 -->
      <CalendarDate
        v-show="mode === 'date'"
        :ref="`date${i}`"
        :key="`date${i}`"
        :class="wrap_class"
        :style="wrap_style"
        :daterange="daterange"
        :date="date"
        :date_range="date_range"
        :hover_range.sync="hover_range"
        :height="calendar_height"
        :header_height="header_height"
        :days="days"
        :filter="(date, type) => filter(date, type, i)"
        @get_day="getDate"
        @click_month="(obj) => setMonth(obj, i)"
        @click_year="(obj) => setYear(obj, i)"
        @change="setLinkageRange"
      >
        <template scope="obj">
          <slot :day="obj.day">
            {{ obj.day }}
          </slot>
        </template>
      </CalendarDate>

      <!-- 月历模式 -->
      <CalendarMonth
        v-show="mode === 'month'"
        :ref="`month${i}`"
        :key="`month${i}`"
        :class="wrap_class"
        :style="wrap_style"
        :daterange="daterange"
        :date="date"
        :date_range="date_range"
        :height="calendar_height"
        :header_height="header_height"
        :filter="(date, type) => filter(date, type, i)"
        @get_month="(obj) => getMonth(obj, i)"
        @click_year="(obj) => setYear(obj, i)"
      >
      </CalendarMonth>

      <!-- 年历模式 -->
      <CalendarYear
        v-show="mode === 'year'"
        :ref="`year${i}`"
        :key="`year${i}`"
        :class="wrap_class"
        :style="wrap_style"
        :daterange="daterange"
        :date="date"
        :date_range="date_range"
        :height="calendar_height"
        :header_height="header_height"
        :filter="(date, type) => filter(date, type, i)"
        @get_year="(obj) => getYear(obj, i)"
      >
      </CalendarYear>
    </template>
  </div>
</template>

<style lang="stylus">
  @import './style/';

  fade('hiui-calendar-');
  bounce-center('hiui-calendar-');
  slide-down('hiui-calendar-');
  slide-up('hiui-calendar-');
  slide-left('hiui-calendar-');
  slide-right('hiui-calendar-');
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
      custom_filter: Function,
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
      lazy: {
        type: Boolean,
        default: true
      },
      daterange: {
        type: Boolean,
        default: false
      },
      separator: {
        type: String,
        default: ' ~ '
      },
      one_calendar: {
        type: Boolean,
        default: false
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
      calendar_width: {
        type: String,
        default: '300px'
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
        date_range: [],
        linkage_range: [],
        hover_range: [],
        calendars: []
      }
    },
    watch: {
    },
    computed: {
      component_class () {
        return [
          prefixCls
        ]
      },
      component_style () {
        return {
        }
      },
      wrap_class () {
        return [
          `${prefixCls}-wrap`
        ]
      },
      wrap_style () {
        return {
          width: this.calendar_width
        }
      },
      header_class () {
        return [
          `${prefixCls}-header`
        ]
      },
      display () {
        return this.daterange ? (`${formatDate(this.begin_date, this.format)}${this.separator}${formatDate(this.end_date, this.format)}`) : formatDate(this.date, this.format)
      }
    },
    methods: {
      filter (date, type, i) {
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
        if (this.custom_filter) {
          result.disabled = !!this.custom_filter(date, type, i)
        }

        // 内置过滤方法
        if (this.rules && this.rules.length) {
          Array.from(this.rules, (filter_name) => {
            if (Rules[type][filter_name] && Rules[type][filter_name](date, type)) {
              result.disabled = true
            }
          })
        }

        if (this.daterange && !this.one_calendar && type !== 'date') {
          if (i === 0) {
            if (this.linkage_range[1]) {
              result.disabled = Rules.untilSomeDate(date, this.linkage_range[1], type)
            }
          } else {
            if (this.linkage_range[0]) {
              result.disabled = Rules.fromSomeDate(date, this.linkage_range[0], type)
            }
          }
        }

        return result
      },
      setDate (date) {
        if (this.daterange) {
          if (this.date_range.length === 1) {
            this.date_range = this.date_range[0] > date ? [date].concat(this.date_range) : this.date_range.concat([date])

            this.update(true)
          } else {
            this.date_range = [date]
            !this.lazy && this.update(false)
          }
        } else {
          this.$emit('change', date)
          this.$nextTick(() => {
            this.$emit('complete', date, this.display)
            this.$emit('update:format_date', this.display)
          })
        }
      },
      getDate ({ date }) {
        this.setDate(date)
      },
      getMonth ({ date, month, year }, i) {
        if (this.picker === 'month') {
          this.setDate(date)
          return false
        }

        this.calendars.splice(i, 1, 'date')

        this.$nextTick(() => {
          if (this.$refs[`date${i}`][0]) {
            this.$refs[`date${i}`][0].month = month
            this.$refs[`date${i}`][0].year = year
          }
        })
      },
      getYear ({ date, year }, i) {
        if (this.picker === 'year') {
          this.setDate(date)
          return false
        }

        this.calendars.splice(i, 1, 'month')

        this.$nextTick(() => {
          if (this.$refs[`month${i}`][0]) {
            this.$refs[`month${i}`][0].year = year
          }
        })
      },
      setMonth ({ year }, i) {
        this.calendars.splice(i, 1, 'month')
        this.setLinkageRange()

        this.$nextTick(() => {
          if (this.$refs[`month${i}`][0]) {
            this.$refs[`month${i}`][0].year = year
          }
        })
      },
      setYear ({ year }, i) {
        this.calendars.splice(i, 1, 'year')
        this.setLinkageRange()

        this.$nextTick(() => {
          if (this.$refs[`year${i}`][0]) {
            this.$refs[`year${i}`][0].year = year
          }
        })
      },
      setLinkageRange () {
        this.linkage_range = Array.from(this.calendars, (name, i) => {
          if (name !== 'date') {
            return null
          } else {
            let vm = this.$refs[`${name}${i}`][0]
            return new Date(vm.year, vm.month)
          }
        })
      },
      update (isComplete) {
        this.$nextTick()
        .then(() => {
          this.$emit('update:begin_date', this.date_range[0])
          this.$emit('update:end_date', this.date_range[1])
        })
        .then(() => {
          isComplete && this.$emit('complete', this.date_range, this.display)
          this.$emit('update:format_date', this.display)
        })
      },
      initCalendar () {
        this.calendars = !this.daterange ? [this.picker] : this.one_calendar ? [this.picker] : [this.picker, this.picker]
      },
      initDateRange () {
        if (this.daterange && this.begin_date) {
          this.date_range = this.end_date ? [this.begin_date, this.end_date] : [this.begin_date]
        }
      }
    },
    mounted () {
      this.initCalendar()
      this.initDateRange()
      this.date && this.$emit('update:format_date', this.display)
      this.calendars.length === 2 && this.$nextTick(() => this.setLinkageRange())
    }
  }
</script>
