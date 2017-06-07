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
| begin_date | 日历起始日期，`daterange = true`时有效，请设置`.sync`  | `Date` | - |
| end_date | 日历结束日期，`daterange = true`时有效，请设置`.sync`  | `Date` | - |
| picker | 日历类型，可选值`date`/`month`/`year` | `String` | `date` |
| filter | 过滤方法，具体看下方 | `Function` | - |
| rules | 内置过滤方法，可选值看下方 | `Array` | - |
| one_calendar | 是否单个日历显示，`daterange = true`时有效，默认两个日历 | `Boolean` | `false` |
| is_inline | 是否行内显示 | `Boolean` | `false` |
| format | 格式化展示的值, 默认`yyyy-MM-dd` | `String` | - |

| 事件 | 说明 | 回调参数 |
| ----|:-----| ---- |
| change_date | 当日期改变时的回调 | `[ date <Date:单选日期>]`/`[ begin_date <Date:日期>, end_date <Date:结束日期>]` |
| change_mode | 当模式改变时的回调 | `[ mode <String:模式>]` |

```js
function filter (date) {
  // 返回 true 则可用，返回 false 则禁用
  return Boolean
}

const rules = [
  'fromToday', // 从今天起（包含今天）
  'fromTomorrow', // 从明天起（不包含今天）
  'untillToday', // 直至今天（包含今天）
  'untillTomorrow', // 直至明天（不包含今天）
  'unableSun', // 禁用周日
  'unableMon', // 禁用周一
  'unableTues', // 禁用周二
  'unableWed', // 禁用周三
  'unableThur', // 禁用周四
  'unableFri', // 禁用周五
  'unableSat' // 禁用周六
]
```

## Slot

| 名字 | 说明 |
| ----|:-----|
| day | 日期 |
| month | 月份 |
| year | 年份 |
| display |  展示 |

[#](https://vuefe.cn/v2/guide/components.html#作用域插槽) 使用 具有特殊属性 `scope` 的 `<template>` 元素做插槽时，可在作用域中获取 `day`/`month`/`year`数据, `nextMonth`/`prevMonth`/`nextYear`/`prevYear`/.

