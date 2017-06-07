<template>
  <table :class="component_class">
    <thead>
      <tr>
        <th v-for="d in days">
          {{ d }}
        </th>
      </tr>
    </thead>
    <tbody :class="component_class">
      <tr v-for="row in allDays">
        <td v-for="obj in row" :class="[obj.className]">
          {{ obj.day }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  const prefixCls = 'hiui-calendar-day'

  export default {
    name: 'CalendarDay',
    props: {
      year: Number,
      month: Number,
      filter: Function,
      days: {
        type: Array,
        default() {
          return ['日', '一', '二', '三', '四', '五', '六']
        }
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
              result[i].push({
                day,
                date,
                className: ['prev_month'].concat(this.filter(date))
              })
            } else if (cur >= this.firstDay + this.curMonthDays) {
              let day = cur - (this.firstDay + this.curMonthDays - 1)
              let date = new Date(this.year, this.month + 1, day)
              result[i].push({
                day,
                date,
                className: ['next_month'].concat(this.filter(date))
              })
            } else {
              let day = cur - this.firstDay + 1
              let date = new Date(this.year, this.month, day, day)
              result[i].push({
                day,
                date,
                className: ['cur_month'].concat(this.filter(date))
              })
            }
          }
        }

        return result
      }
    },
    methods: {

    }
  }
</script>
