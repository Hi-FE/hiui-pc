<template>
  <section class="calendar"
           :class="component_class"
           v-show="is_show">

    <h2 class="pure-g" v-if="is_single_month">
      <div class="pure-u-1-8">
        <a :class="{ 'opacity-hidden': is_disable_prev }"
           @click="!is_disable_prev && preMonth()">
          <Icon class="icon" name="left"></Icon>
        </a>
      </div>
      <div class="info pure-u-3-4">
        <span class="year"
              :class="{ active: is_select_year }"
              @click="is_select_year = !is_select_year, is_select_month = false, scrollToTheYear()">
          {{ cur_year }} 年
        </span>
        <span class="month"
              :class="{ active: is_select_month }"
              @click="is_select_month = !is_select_month, is_select_year = false">
          {{ cur_month+1 }} 月
        </span>
      </div>
      <div class="pure-u-1-8">
        <a :class="{ 'opacity-hidden': is_disable_next}"
           @click="!is_disable_next && nextMonth()">
          <Icon name="right"></Icon>
        </a>
      </div>
    </h2>
    <!-- 星期头 -->
    <section class="day-title">
      <table v-show="!is_select_year && !is_select_month">
        <tbody>
        <tr>
          <td v-for="(day, index) in week_days"
              :class="{ 'color-red': index === 0 || index === week_days.length - 1 }">
            <div class="item">{{ day }}</div>
          </td>
        </tr>
        </tbody>
      </table>
    </section>

    <!-- 月 -->
    <section class="month" v-for="(item, index) in total_days" :key="index"
             v-show="!is_select_year && !is_select_month">
      <h3 v-if="!is_single_month">{{ item.year }} 年 {{ item.month }} 月</h3>
      <table>
        <tbody>
        <tr v-for="(day, k1, index) in item.arr" :key="index">
          <td v-for="(child, k2, index) in day" :key="index">
            <div class="item"
                 :class="{ 'selected': child.select,
                           'weekend': child.weekend,
                           'nodisplay': child.nodisplay,
                           'disable': child.disable,
                           'range-begin' : child.range_begin,
                           'range-end' : child.range_end }"
                 @mousedown="!child.nodisplay && !child.disable && select(k1, k2, cur_year, item.month, $event)">
              <em>{{ child.day }}</em>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
    <!-- 选择年 -->
    <section class="select-year select"
             ref="select_year"
             v-show="is_select_year">
      <table>
        <tbody>
        <tr v-for="(year_tr, index) in select_year_data">
          <td v-for="year in year_tr">
            <div class="item"
                 :class="{ disable: !year.enable }"
                 @click="year.enable && selectYear(year.value)">
              {{year.value}}
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
    <!-- 选择月 -->
    <section class="select-month select"
             v-show="is_select_month">
      <table>
        <tbody>
        <tr v-for="month_tr in select_month_data">
          <td v-for="month in month_tr">
            <div class="item"
                 :class="{ disable: !month.enable }"
                 @click="month.enable && selectMonth(month.value)">
              {{month.value}}
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
    <!-- 可选信息提示 -->
    <div class="can-select-tips pure-g">
      <div class="pure-u-1-2 left">
        <span class="can-select-block block">1</span>
        可选日期
      </div>
      <div class="pure-u-1-2 right">
        <span class="cant-select-block block">1</span>
        不可选日期
      </div>
    </div>
  </section>
</template>

<style lang="stylus">
  @import './style/';
</style>

<script>
  const prefixCls = 'hiui-calendar'

  export default {
    name: 'vCalendar',
    props: {
      // 连续输出的月份数量,从本月之后算起(此参数受daterange参数影响,如daterange为true则n_months参数无效)
      n_months: {
        type: Number,
        default: 4
      },
      // 日历是否显示
      is_show: {
        type: Boolean,
        default: false
      },
      // 是否选择日期范围
      is_range: {
        type: Boolean,
        default: false
      },
      // 日历范围输出（如果此参数为true,则n_months参数无效）
      daterange: {
        type: Boolean,
        default: false
      },
      date_begin: {
        type: Array,
        default: Array
      },
      date_end: {
        type: Array,
        default: Array
      },
      // 是否禁用今天之前的日期,默认禁用
      is_today_disable: {
        type: Boolean,
        default: true
      },

      // 一次输出一个月份,月份可前后切换
      is_single_month: {
        type: Boolean,
        default: false
      },
      json_data: {
        type: Object,
        default: Object
      },
      init_select_day: {
        type: Array,
        default: Array
      },
      init_range_begin: {
        type: Array,
        default: Array
      },
      init_range_end: {
        type: Array,
        default: Array
      }
    },
    data: function () {
      return {
        first_value: '', // 单选时绑定的值、多选是绑定的第一个值
        sec_value: '', // 多选时绑定的第二个值
        cur_year: 0,
        cur_month: 0,
        today: 0, // 今天时间
        year: 0, // 当前年份
        month: 0, // 当前月份
        day: 0, // 当前日期
        total_days: [], // 总天数
        select_day: [], // 选择天数(单选用)
        days: [], // 当前月份的天数
        rangeBegin: [], // 范围选择起始日期
        rangeEnd: [], // 范围选择结束日期
        formated_json_data: {},
        sep: '-',
        is_select_year: false,
        is_select_month: false,
        select_data: {
          cur_year: 0,
          cur_month: 0
        },
        week_days: ['日', '一', '二', '三', '四', '五', '六'],
        illegal: false
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls
        ]
      },
      is_disable_prev: function () {
        var self = this
        if (self.daterange) {
          if (parseInt(self.cur_year) === parseInt(self.date_begin[0]) && parseInt(self.cur_month) + 1 === parseInt(self.date_begin[1])) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
      is_disable_next: function () {
        var self = this
        if (self.daterange) {
          if (parseInt(self.cur_year) === parseInt(self.date_end[0]) && parseInt(self.cur_month) + 1 === parseInt(self.date_end[1])) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
      select_year_data: function () {
        let result = [];
        let temp = [];
        let i = 1;
        let nowYear = new Date().getFullYear();
        for (let year = nowYear - 200; year <= nowYear + 200; year++) {
          temp.push({
            value: year,
            enable: this.daterange ? (year >= this.date_begin[0] && year <= this.date_end[0]) : true
          });
          if (i % 3 === 0) {
            result.push(temp);
            temp = [];
          }
          i++;
        }
        return result;
      },
      select_month_data: function () {
        let result = [];
        let temp = [];
        let cur_date = '';
        const date_begin = [this.date_begin[0], this.date_begin[1], '01'].join('/');
        const date_end = [this.date_end[0], this.date_end[1], '01'].join('/');
        for (let month = 0, enable = false; month <= 11; month++) {
          cur_date = `${this.cur_year}/${month + 1 < 10 ? '0' + (month + 1) : month + 1}/01`;
          enable = this.daterange ? (cur_date >= date_begin && cur_date <= date_end) : true
          temp.push({
            value: month + 1,
            enable: enable
          });
          if ((month + 1) % 3 === 0) {
            result.push(temp);
            temp = [];
          }
        }
        return result;
      }
    },
    mounted () {
      var now = new Date()

      this.year = now.getFullYear() // 本年
      this.month = now.getMonth() // 本月
      this.day = now.getDate() // 本日
      if (this.range) {
        this.rangeBegin = Array
        this.rangeEnd = Array
      }
      this.today = Number(new Date(this.year, this.month, this.day))
      // this.cur_year = this.year
      // this.cur_month = this.month
      if (this.daterange) {
        this.cur_year = parseInt(this.date_begin[0])
        this.cur_month = parseInt(this.date_begin[1]) - 1
      } else {
        this.cur_year = this.year
        this.cur_month = this.month
      }
      // 设置指定选择日期
      if (this.init_select_day.length > 0) {
        this.select_day[0] = this.init_select_day[0];
        this.select_day[1] = this.init_select_day[1] - 1;
        this.select_day[2] = this.init_select_day[2]
      }
      // 设置指定开始日期
      if (this.init_range_begin.length > 0) {
        this.rangeBegin[0] = this.init_range_begin[0];
        this.rangeBegin[1] = this.init_range_begin[1] - 1;
        this.rangeBegin[2] = this.init_range_begin[2]
      }
      // 设置指定结束日期
      if (this.init_range_end.length > 0) {
        this.rangeEnd[0] = this.init_range_end[0];
        this.rangeEnd[1] = this.init_range_end[1] - 1;
        this.rangeEnd[2] = this.init_range_end[2]
      }
      this.render();
    },
    watch: {
      json_data: function () {
        this.render();
      },
      cur_month: function (cur_month) {
        this.select_data.cur_month = cur_month;
      },
      cur_year: function (cur_year) {
        this.select_data.cur_year = cur_year;
      },
      date_begin: function () {
        if (this.daterange) {
          this.cur_year = parseInt(this.date_begin[0])
          this.cur_month = parseInt(this.date_begin[1]) - 1
          this.select_day = []
        }
        this.render();
      },
      init_select_day: function (init_select_day) {
        if (isNaN(parseInt(init_select_day[0])) || isNaN(parseInt(init_select_day[1]))) return;
        this.cur_year = ~~init_select_day[0]
        this.cur_month = ~~init_select_day[1] - 1
        // 设置指定选择日期
        if (this.init_select_day.length > 0) {
          this.select_day[0] = this.init_select_day[0];
          this.select_day[1] = this.init_select_day[1] - 1;
          this.select_day[2] = this.init_select_day[2]
        }
        this.render();
      },
      init_range_begin: function (init_range_begin) {
        if (isNaN(parseInt(init_range_begin[0])) || isNaN(parseInt(init_range_begin[1]))) return;
        this.cur_year = ~~init_range_begin[0]
        this.cur_month = ~~init_range_begin[1] - 1
        // 设置指定选择日期
        if (this.init_range_begin.length > 0) {
          this.rangeBegin[0] = this.init_range_begin[0];
          this.rangeBegin[1] = this.init_range_begin[1] - 1;
          this.rangeBegin[2] = this.init_range_begin[2]
        }
        this.render();
      },
      init_range_end: function (init_range_end) {
        if (isNaN(parseInt(init_range_end[0])) || isNaN(parseInt(init_range_end[1]))) return;
        this.cur_year = ~~init_range_end[0]
        this.cur_month = ~~init_range_end[1] - 1
        // 设置指定选择日期
        if (this.init_range_end.length > 0) {
          this.rangeEnd[0] = this.init_range_end[0];
          this.rangeEnd[1] = this.init_range_end[1] - 1;
          this.rangeEnd[2] = this.init_range_end[2]
        }
        this.render();
      }
    },
    methods: {
      zero: function (n) {
        return n < 10 ? '0' + n : n
      },
      // 渲染日期列表
      render: function () {
        var self = this
        self.total_days = []

        // 统一json_data的数据格式
        var format_json = !!self.json_data
        if (format_json) {
          var new_json_data = {}
          for (var time in self.json_data) {
            var temp_date = new Date(parseInt(time))
            var temp_year = temp_date.getFullYear()
            var temp_month = temp_date.getMonth()
            var temp_day = temp_date.getDate()
            new_json_data[Number(new Date(temp_year, temp_month, temp_day))] = true;
          }
          self.formated_json_data = new_json_data
        }

        // 1.连续输出模式
        if (!self.is_single_month) {
          // 1.1不是日期范围输出,则输出连续n_months个月
          if (!self.daterange) {
            // kds变量为连续输出的月份数量
            var y = self.year
            var m = self.month
            for (var kds = 0; kds < self.n_months; kds++, m++) {
              // 月份数到达13后的处理方式
              if (m === 12) {
                m = 0
                y = y + 1
              }
              var fin_temp = {}
              fin_temp.arr = self.renderMonth(y, m)
              fin_temp.year = y
              fin_temp.month = m + 1
              self.total_days.push(fin_temp)
            }
          } else { // 1.2范围内日期输出
            var new_begin;
            var new_end;
            // 判断合法日期
            var b = Number(new Date(self.date_begin[0], self.date_begin[1], self.date_begin[2]))
            var e = Number(new Date(self.date_end[0], self.date_end[1], self.date_end[2]))
            // 非法日期
            if (b > e) {
              new_begin = self.date_end;
              new_end = self.date_begin;
              self.illegal = true;
              // throw new Error('日期范围不合法!')
            } else { // 合法时间
              new_begin = self.date_begin;
              new_end = self.date_end;
            }
            var r_y = ~~new_begin[0]
            var r_m = new_begin[1] - 1
            var step
            // 开始时间和结束时间都在一个月内
            if (new_begin[0] === new_end[0] && new_begin[1] === new_end[1]) {
              step = 0
            } else if (new_begin[0] === new_end[0] && new_begin[1] < new_end[1]) {
              // 开始时间和结束时间都在同一年内
              step = ~~new_end[1] - ~~new_begin[1]
            } else if (new_begin[0] < new_end[0]) {
              // 开始时间和结束时间不在一年内
              step = (12 - ~~new_begin[1]) + 12 * (~~new_end[0] - ~~new_begin[0] - 1) +
                ~~new_end[1]
            }

            for (var r_kds = 0; r_kds <= step; r_kds++, r_m++) {
              // 月份数到达13后的处理方式
              if (r_m === 12) {
                r_m = 0
                r_y = r_y + 1
              }
              var fin_temp_t = {}
              fin_temp_t.arr = self.renderMonth(r_y, r_m)
              fin_temp_t.year = r_y
              fin_temp_t.month = r_m + 1
              self.total_days.push(fin_temp_t)
            }
          }
        } else { // 2.单月输出模式
//          var yy = self.cur_year
//          var mm = self.cur_month
          if (self.daterange) {
            // 区间日期输出
            // 判断合法日期
            var bb = Number(new Date(self.date_begin[0], self.date_begin[1], self.date_begin[2]))
            var ee = Number(new Date(self.date_end[0], self.date_end[1], self.date_end[2]))
            // 非法日期
            if (bb > ee) {
              self.illegal = true;
              // throw new Error('日期范围不合法!')
            }
          }
          self.total_days = []

          var fin_temp_s = {}
          fin_temp_s.arr = self.renderMonth(self.cur_year, self.cur_month)
          fin_temp_s.year = self.cur_year
          fin_temp_s.month = self.cur_month + 1
          self.total_days.push(fin_temp_s)
          // 区间输出end
        }
        // 单月输出end
      },
      // 日期选中
      select: function (k1, k2, year, mon, e) {
        if (e !== undefined) e.stopPropagation()
        var self = this
        // self.$dispatch('select-data', year, mon)
        // 日期范围选择
        if (self.is_range) {
          var select_days = []
          // 寻找本月日期数组
          for (var i = 0; i < self.total_days.length; i++) {
            if (self.total_days[i].year === year && self.total_days[i].month === mon) {
              select_days = self.total_days[i].arr
              break
            }
          }
          if (self.rangeBegin.length === 0 || self.rangeEndTemp !== 0) {
            self.rangeBegin = [year, mon - 1, select_days[k1][k2].day]
            self.rangeBeginTemp = self.rangeBegin
            self.rangeEnd = [year, mon - 1, select_days[k1][k2].day]
            self.rangeEndTemp = 0
            // 输出
            self.first_value = self.output(self.rangeBegin)
            self.sec_value = ''
          } else { // 选择结束时间
            // 判断结束日期小于开始日期则重置始发日期
            self.rangeEnd = [year, mon - 1, select_days[k1][k2].day]
            if (+new Date(self.rangeEnd[0], self.rangeEnd[1], self.rangeEnd[2]) < +new Date(self.rangeBegin[0], self.rangeBegin[1], self.rangeBegin[2])) {
              self.rangeBegin = self.rangeEnd
              self.first_value = self.output(self.rangeBegin)
              // self.rangeEnd = self.rangeBeginTemp
              // alert('结束时间不能在起始时间之前!')
              // return
            } else {
              self.rangeEndTemp = 1
              // 输出
              self.sec_value = self.output(self.rangeEnd)
            }
          }

          // 数据初始化
          self.total_days = []
          self.render()
        } else { // 单选
          var select_days_s = []
          // 寻找本月日期数组
          for (var k = 0; k < self.total_days.length; k++) {
            if (self.total_days[k].year === year && self.total_days[k].month === mon) {
              select_days_s = self.total_days[k].arr
              break
            }
          }
          var d = select_days_s[k1][k2].day
          self.select_day[0] = year
          self.select_day[1] = mon - 1
          self.select_day[2] = d
          self.first_value = self.output(self.select_day)
          self.render()
        }
        // 将选中的时间格式化后传递到父组件
        self.$emit('get-first-value', self.first_value);
        self.$emit('get-sec-value', self.sec_value);
      },
      // 格式化输出
      output: function (args) {
        var self = this
        return args[0] + self.sep + self.zero(args[1] + 1) + self.sep + self.zero(args[2])
      },
      // 上一个月
      preMonth: function () {
        var self = this
        if (parseInt(self.cur_month) === 0) {
          self.cur_month = 11
          self.cur_year = parseInt(self.cur_year) - 1
        } else {
          self.cur_month = parseInt(self.cur_month) - 1
        }
        self.render()
      },
      // 下一月
      nextMonth: function () {
        var self = this
        if (parseInt(self.cur_month) === 11) {
          self.cur_month = 0
          self.cur_year = parseInt(self.cur_year) + 1
        } else {
          self.cur_month = parseInt(self.cur_month) + 1
        }
        self.render()
      },
      renderMonth: function (y, m) {
        var self = this
        var firstDayOfMonth = new Date(y, m, 1).getDay() // 当月第一天
        var lastDateOfMonth = new Date(y, m + 1, 0).getDate() // 当月最后一天
        var lastDayOfLastMonth = new Date(y, m, 0).getDate() // 最后一月的最后一天
        var i
        var line = 0
        var temp = []
        for (i = 1; i <= lastDateOfMonth; i++) {
          var dow = new Date(y, m, i).getDay()
          // 第一行
          if (dow === 0) {
            temp[line] = []
          } else if (i === 1) {
            temp[line] = []
            var k_first = lastDayOfLastMonth - firstDayOfMonth + 1
            for (var j = 0; j < firstDayOfMonth; j++) {
              // 非本月日期不显示
              temp[line].push({day: k_first, nodisplay: true})
              k_first++
            }
          }
          // 获得星期数
          var thisDay = new Date(y, m, i).getDay()
          // 当天时间
          var thisTime = Number(new Date(y, m, i))
          // 日期多选
          if (self.is_range) {
            var options;
            if (self.illegal) {
              options = {day: i, disable: true}
            } else {
              options = {day: i}
            }
            if (self.rangeBegin.length > 0) {
              var beginTime = Number(new Date(self.rangeBegin[0], self.rangeBegin[1], self.rangeBegin[2]))
              var endTime = Number(new Date(self.rangeEnd[0], self.rangeEnd[1], self.rangeEnd[2]))
              if (beginTime <= thisTime && endTime >= thisTime && !self.formated_json_data[thisTime]) {
                options.select = true
              }
              if (beginTime === thisTime) {
                options.range_begin = true
              } else if (endTime === thisTime) {
                options.range_end = true
              }
            }
            if (self.daterange) {
              // 日期范围输出的情况下禁用边界外的日期
              var r_b_m = Number(new Date(self.date_begin[0], self.date_begin[1] -
                1, self.date_begin[2]))
              var r_e_m = Number(new Date(self.date_end[0], self.date_end[1] - 1, self.date_end[2]))
              if (thisTime < r_b_m || thisTime > r_e_m) {
                options.disable = true
              }
            }
            // 今天之前的日期禁用
            if (self.is_today_disable) {
              if (thisTime < self.today) {
                options.disable = true
              }
            }
            // 周末时间
            if (thisDay === 0 || thisDay === 6) {
              options.weekend = true
            }
            // 结合json数据
            var json = !!self.formated_json_data
            if (json && !self.illegal) {
              if (self.formated_json_data[thisTime]) {
                options.disable = true
              }
            }
            temp[line].push(options)
          } else { // 日期单选
            var options_s;
            if (self.illegal) {
              options_s = {day: i, disable: true}
            } else {
              options_s = {day: i}
            }
            var thisTime_s = Number(new Date(y, m, i))
            var selectTime_s = Number(new Date(self.select_day[0], self.select_day[1], self.select_day[2]))
            if (self.daterange) {
              // 日期范围输出的情况下禁用边界外的日期
              var r_b_s = Number(new Date(self.date_begin[0], self.date_begin[1] -
                1, self.date_begin[2]))
              var r_e_s = Number(new Date(self.date_end[0], self.date_end[1] - 1, self.date_end[2]))
              if (thisTime_s < r_b_s || thisTime_s > r_e_s) {
                options_s.disable = true
              }
            }
            // 今天之前的日期禁用
            if (self.is_today_disable) {
              if (thisTime_s < self.today) {
                options_s.disable = true
              }
            }
            if (thisDay === 0 || thisDay === 6) {
              options_s.weekend = true
            }
            if (thisTime_s === selectTime_s) {
              options_s.select = true
            }
            // 结合json数据
            var json_s = !!self.formated_json_data
            if (json_s && !self.illegal) {
              if (self.formated_json_data[thisTime_s]) {
                options_s.disable = true
              }
            }
            temp[line].push(options_s)
          }

          // 最后一行
          if (dow === 6) {
            line++
          } else if (i === lastDateOfMonth) {
            var k_last = 1
            for (dow; dow < 6; dow++) {
              temp[line].push({day: k_last, nodisplay: true})
              k_last++
            }
          }
        }
        return temp
      },
      selectYear: function (year) {
        this.cur_year = year;
        this.render();
        this.is_select_year = false;
      },
      selectMonth: function (month) {
        this.cur_month = month - 1;
        this.render();
        this.is_select_month = false;
      },
      scrollToTheYear: function () {
        setTimeout(() => {
          this.$refs.select_year.scrollTop = Math.round((this.cur_year - this.select_year_data[0][0].value - 1) / 3) * 55 - 65;
        }, 50)
      }
    }
  }
</script>
