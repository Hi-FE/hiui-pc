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

| 参数               | 说明                                       | 类型        | 默认值     |
| ---------------- | :--------------------------------------- | --------- | ------- |
| n_months         | 连续输出的月份数量,从本月之后算起(此参数受daterange参数影响,如daterange为true则n_months参数无效) | `Number`  | `4`     |
| is_show          | 日历是否显示                                   | `Boolean` | `false` |
| is_range         | 是否选择日期范围                                 | `Boolean` | `false` |
| daterange        | 日历范围输出                                   | `Boolean` | `false` |
| date_begin       | 起始日期(`daterange`为`true`时生效)              | `Array`   | -       |
| date_end         | 截止日期(`daterange`为`true`时生效)              | `Array`   | -       |
| is_today_disable | 是否禁用今天之前的日期                              | `Boolean` | `true`  |
| is_single_month  | 一次输出一个月份,月份可前后切换                         | `Boolean` | `false` |
| json_data        | 外部传入的json参数(价格)                          | `Object`  | -       |
| init_select_day  | 默认选中的日期（单选模式）                            | `Array`   | -       |
| init_range_begin | 默认选中的起始日期（多选模式）                          | `Array`   | -       |
| init_range_end   | 默认选中的截止日期（多选模式）                          | `Array`   | -       |
