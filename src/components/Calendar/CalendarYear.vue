<template>
  <div>
    <header :class="header_class" :style="header_style">
      <Icon name="left" @click.native="year -= YEARS"></Icon>
      <span class="year-range">{{ year_start }} - {{ year_start + YEARS }}</span>
      <Icon name="right" @click.native="year += YEARS"></Icon>
    </header>
    <div :class="component_class" :style="component_style">
      <div
        v-for="obj in allYear"
        :class="[
          obj.classname,
          {
            custom_style: custom_style,
            disabled: obj.disabled,
            today: obj.isToday,
            active: obj.active
          }
        ]"
        @click="clickYear(obj)">
        <div class="hiui-calendar-date-slot">
          <slot
            :date="obj.date"
            :year="obj.year"
            :disabled="obj.disabled"
            :active="obj.active"
            :today="obj.isToday"
            >
            <span class="hiui-calendar-date-default-slot">{{ obj.year }}</span>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { isSameDate } from '@/tools'

  const prefixCls = 'hiui-calendar-year'
  const today = new Date()

  export default {
    name: 'CalendarYear',
    props: {
      daterange: Boolean,
      date: [Object, Date],
      date_range: Array,
      filter: Function,
      width: String,
      height: {
        type: String,
        default: '250px'
      },
      header_height: {
        type: String,
        default: '60px'
      },
      custom_style: Boolean
    },
    data () {
      return {
        YEARS: 20,
        year: this.date ? this.date.getFullYear() : today.getFullYear()
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
      },
      year_start () {
        return ~~(this.year / 20) * 20
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

        this.$emit('get_year', obj)
      }
    }
  }
</script>
