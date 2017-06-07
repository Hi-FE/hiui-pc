<template>
  <table :class="component_class" :style="component_style">
    <tbody>
      <tr>
        <th v-for="d in days">
          {{ d }}
        </th>
      </tr>
      <tr v-for="row in allDays">
        <td
          v-for="obj in row"
          :class="[
            obj.className,
            {
              disabled: obj.disabled,
              today: obj.isToday,
              active: obj.active
            }
          ]"
          @click="clickDay(obj)"
          >
          {{ obj.day }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  const prefixCls = 'hiui-calendar-date'

  export default {
    name: 'CalendarDate',
    props: {
      year: Number,
      month: Number,
      filter: Function,
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
      }
    },
    data () {
      return {
        COL: 7,
        ROW: 6
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
            if (cur < this.firstDay) {
              let day = this.prevMonthDays - (this.firstDay - cur - 1)
              let date = new Date(this.year, this.month - 1, day)
              let filter_result = this.filter(date)
              result[i].push({
                day,
                date,
                ...filter_result,
                className: ['prev_month']
              })
            } else if (cur >= this.firstDay + this.curMonthDays) {
              let day = cur - (this.firstDay + this.curMonthDays - 1)
              let date = new Date(this.year, this.month + 1, day)
              let filter_result = this.filter(date)
              result[i].push({
                day,
                date,
                ...filter_result,
                className: ['next_month']
              })
            } else {
              let day = cur - this.firstDay + 1
              let date = new Date(this.year, this.month, day)
              let filter_result = this.filter(date)
              result[i].push({
                day,
                date,
                ...filter_result,
                className: ['cur_month']
              })
            }
          }
        }

        return result
      }
    },
    methods: {
      clickDay (obj) {
        if (obj.disabled || obj.active) {
          return false
        }

        obj.callback && obj.callback(obj.date)

        this.$emit('click_day', obj)
      }
    }
  }
</script>
