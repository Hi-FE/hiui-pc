<template>
  <div :class="component_class" :style="component_style">
    <div
      v-for="obj in allYear"
      :class="[
        obj.classname,
        {
          disabled: obj.disabled,
          today: obj.isToday,
          active: obj.active
        }
      ]"
      @click="clickYear(obj)">
      <span>{{ obj.year }}</span>
    </div>
  </div>
</template>

<script>
  import { isSameDate } from '@/tools'

  const prefixCls = 'hiui-calendar-year'

  export default {
    name: 'CalendarYear',
    props: {
      daterange: Boolean,
      date: [Object, Date],
      date_range: Array,
      year_start: Number,
      filter: Function,
      width: String,
      height: {
        type: String,
        default: '250px'
      }
    },
    data () {
      return {
        YEARS: 20
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
      allYear () {
        let result = []

        for (let i = 0; i < this.YEARS; i++) {
          let date = new Date(this.year_start + i, 0, 1)
          let filter_result = this.filter ? this.filter(date, 'year') : {}
          result.push({
            year: this.year_start + i,
            date,
            active: this.isActive(date),
            classname: `${prefixCls}-item`,
            ...filter_result
          })
        }

        return result
      }
    },
    methods: {
      isActive (date) {
        if (this.daterange) {
          return this.date_range && this.date_range.some((d) => isSameDate(d, date, 'year'))
        } else {
          return isSameDate(this.date, date, 'year')
        }
      },
      clickYear (obj) {
        if (obj.disabled) {
          return false
        }

        obj.callback && obj.callback(obj.date)

        this.$emit('click_year', obj)
      }
    }
  }
</script>
