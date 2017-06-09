# Calendar

> 日历

## 代码示例

<test></test>

<script>
  import test from '@/pages/demo/Calendar.vue';

  export default {
    components: {
      test
    }
  }
</script>

## API

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| date | 日历当前选中的日期，请使用`v-model`获取及设置  | `Date` | - |
| daterange | 是否开启范围模式 | `Boolean` | `false` |
| begin_date | 日历起始日期，`daterange`模式有效，请设置`.sync`  | `Date` | - |
| end_date | 日历结束日期，`daterange`模式有效，请设置`.sync`  | `Date` | - |
| picker | 日历类型，可选值`date`/`month`/`year` | `String` | `date` |
| custom_filter | 过滤方法，具体看下方 | `Function` | - |
| rules | 内置过滤方法，可选值看下方 | `Array` | - |
| days | 星期名称 | `Array` | `['日', '一', '二', '三', '四', '五', '六']` |
| lazy |  `daterange`模式时，是否懒惰完成 | `Boolean` | `true` |
| one_calendar | 是否单个日历显示，`daterange = true`时有效，默认两个日历 | `Boolean` | `false` |
| format | 格式化展示的值, 默认`yyyy-MM-dd` | `String` | - |
| separator | 分隔符号，`daterange`模式有效 | `String` | ` ~ ` |
| mark_today | 是否标志今天 | `Boolean` | `true` |
| calendar_width | 日历宽度 | `String` | `300px` |
| calendar_height | 日历高度 | `String` | `250px` |
| header_width | 日历宽度 | `String` | `60px` |

| 事件 | 说明 | 回调参数 |
| ----|:-----| ---- |
| complete | 当日期改变时的回调 | `[[date <Date:单选日期> / [begin_date, end_date] <Array:范围日期>], format_date<String:格式化日期>]` |

```js
/*
 * @param date  日期
 * @param type  渲染类型 [date, month, year]
 * @param index 索引 (默认为0，当 daterange 时为 0 或 1)
 */
function custom_filter (date, type, index) {
  // 返回 true 则禁用
  return Boolean
}

const rules = [
  'fromToday', // 从今天起（包含今天）
  'fromTomorrow', // 从明天起（不包含今天）
  'untilToday', // 直至今天（包含今天）
  'untilTomorrow', // 直至明天（不包含今天）
  'unableSun', // 禁用周日
  'unableMon', // 禁用周一
  'unableTues', // 禁用周二
  'unableWed', // 禁用周三
  'unableThur', // 禁用周四
  'unableFri', // 禁用周五
  'unableSat' // 禁用周六
]
```


