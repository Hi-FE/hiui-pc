<template>
  <div :class="component_class" :style="component_style">
    <div
      v-for="obj in allMonth"
      :class="[
        obj.classname,
        {
          disabled: obj.disabled,
          today: obj.isToday,
          active: obj.active
        }
      ]"
      @click="clickMonth(obj)">
      <span>{{ obj.month + 1 }}月</span>
    </div>
  </div>
</template>

<script>
  import { isSameDate } from '@/tools'

  const prefixCls = 'hiui-calendar-month'

  export default {
    name: 'CalendarMonth',
    props: {
      daterange: Boolean,
      date: [Object, Date],
      date_range: Array,
      year: Number,
      filter: Function,
      width: String,
      height: {
        type: String,
        default: '250px'
      }
    },
    data () {
      return {
        MONTHS: 12
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
      allMonth () {
        let result = []

        for (let i = 0; i < this.MONTHS; i++) {
          let date = new Date(this.year, i, 1)
          let filter_result = this.filter ? this.filter(date, 'month') : {}
          result.push({
            month: i,
            date,
            classname: `${prefixCls}-item`,
            active: this.isActive(date),
            ...filter_result
          })
        }

        return result
      }
    },
    methods: {
      isActive (date) {
        if (this.daterange) {
          return this.date_range && this.date_range.some((d) => isSameDate(d, date, 'month'))
        } else {
          return isSameDate(this.date, date, 'month')
        }
      },
      clickMonth (obj) {
        if (obj.disabled) {
          return false
        }

        obj.callback && obj.callback(obj.date)

        this.$emit('click_month', obj)
      }
    }
  }
</script>
