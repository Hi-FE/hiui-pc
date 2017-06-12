<template>
  <div>
    <header :class="header_class" :style="header_style">
      <Icon v-show="!filter(new Date(year, month - 1), 'month').disabled" name="left" @click.native="prevMonth"></Icon>
      <span @click="$emit('click_year', { year, month })">{{ year }}年</span>
      <span @click="$emit('click_month', { year, month })">{{ month + 1 }}月</span>
      <Icon v-show="!filter(new Date(year, month + 1), 'month').disabled" name="right" @click.native="nextMonth"></Icon>
    </header>
    <table :class="component_class" :style="component_style">
      <tbody class="hiui-calendar-date-body">
        <tr>
          <th v-for="d in days">
            {{ d }}
          </th>
        </tr>
        <tr v-for="row in allDays">
          <td
            v-for="obj in row"
            :class="[
              obj.classname,
              {
                disabled: obj.disabled,
                today: obj.isToday,
                inRange: inRange(obj.date),
                isHover: isHover(obj.date),
                active: obj.active
              }
            ]"
            @click="clickDay(obj)"
            @mouseenter="mouseenterDay(obj)"
            >&nbsp;
            <div class="hiui-calendar-date-slot">
              <slot :date="obj.date" :day="obj.day" :month="month" :year="year">
                <span class="hiui-calendar-date-default-slot">
                  {{ obj.day }}
                </span>
              </slot>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { isSameDate } from '@/tools'

  const prefixCls = 'hiui-calendar-date'
  const today = new Date()

  export default {
    name: 'CalendarDate',
    props: {
      daterange: Boolean,
      default_date: Date,
      date: [Object, Date],
      date_range: Array,
      filter: Function,
      hover_range: Array,
      days: {
        type: Array,
        default() {
          return ['日', '一', '二', '三', '四', '五', '六']
        }
      },
      width: String,
      height: {
        type: String,
        default: '250px'
      },
      header_height: {
        type: String,
        default: '60px'
      }
    },
    data () {
      return {
        COL: 7,
        ROW: 6,
        year: this.date ? this.date.getFullYear() : this.default_date.getFullYear(),
        month: this.date ? this.date.getMonth() : this.default_date.getMonth(),
        range: []
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
          width: this.width,
          height: this.height
        }
      },
      header_style () {
        return {
          height: this.header_height,
          lineHeight: this.header_height
        }
      },
      header_class () {
        return [
          'hiui-calendar-header'
        ]
      },
      firstDay () {
        let day = new Date(this.year, this.month).getDay()
        return (day < 3) ? (day + 7) : day
      },
      febDays() {
        return (this.year % 100 === 0 ? (this.year % 400 === 0 ? 29 : 28) : (this.year % 4 === 0 ? 29 : 28))
      },
      allMonthDays () {
        return [31, this.febDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      },
      curMonthDays () {
        return this.allMonthDays[this.month]
      },
      prevMonthDays () {
        return this.month > 0 ? this.allMonthDays[this.month - 1] : 31
      },
      allDays () {
        let result = []
        for (let i = 0; i < this.ROW; i++) {
          result[i] = []
          for (let j = 0; j < this.COL; j++) {
            let cur = i * 7 + j
            let day, month, date, filter_result, classname

            if (cur < this.firstDay) {
              day = this.prevMonthDays - (this.firstDay - cur - 1)
              month = this.month - 1
              classname = 'prev_month'
            } else if (cur >= this.firstDay + this.curMonthDays) {
              day = cur - (this.firstDay + this.curMonthDays - 1)
              month = this.month + 1
              classname = 'next_month'
            } else {
              day = cur - this.firstDay + 1
              month = this.month
              classname = 'cur_month'
            }

            date = new Date(this.year, month, day)
            filter_result = this.filter ? this.filter(date, 'date') : {}

            result[i].push({
              day,
              date,
              classname,
              active: this.isActive(date),
              ...filter_result
            })
          }
        }

        return result
      }
    },
    watch: {
      date_range (val) {
        if (val && val.length === 1 && this.range.length) {
          this.$emit('update:hover_range', null)
        }
      },
      month (val) {
        this.$emit('change', {
          year: this.year,
          month: val
        })
      }
    },
    methods: {
      clickDay (obj) {
        if (obj.disabled || obj.active) {
          return false
        }

        obj.callback && obj.callback(obj.date)

        this.$emit('get_day', obj)
      },
      isActive (date) {
        if (this.daterange) {
          return this.date_range && this.date_range.some((d) => isSameDate(d, date, 'date'))
        } else {
          return isSameDate(this.date, date, 'date')
        }
      },
      inRange (date) {
        return this.hover_range && this.hover_range.length === 2 && +date > this.hover_range[0] && +date < this.hover_range[1]
      },
      isHover (date) {
        if (this.hover_range && this.hover_range.length === 2 && this.date_range.length === 1) {
          return date > this.date_range[0] ? +date === +this.hover_range[1] : +date === +this.hover_range[0]
        }

        return false
      },
      mouseenterDay (obj) {
        if (!this.daterange || obj.disabled || obj.active || this.date_range.length !== 1) {
          return false
        }

        let time = +obj.date
        this.range = [time, +this.date_range[0]].sort((a, b) => a - b)
        this.$emit('update:hover_range', this.range)
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
      }
    }
  }
</script>
