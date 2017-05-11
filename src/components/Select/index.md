# Select

> 选择器

## 代码示例

<test></test>

<script>
  import test from '@/pages/demo/Select.vue';

  export default {
    components: {
      test
    }
  }
</script>

## API

### Select

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| size | 选择器尺寸，可选值 `sm`/`md`/`lg` | `String` | `md` |
| color | 选择器聚焦时的颜色, 支持两种格式`#f00`/`rgb(255,255,255)` | `String` | - |
| label | 标题 | `String` | `请选择`/`已选择` |
| data | 选择器数据 | `Array` | - |
| show_by | 指定选项展示的值, 默认展示data[index] | `String` | - |
| value_by | 指定选项返回的值, 默认返回data[index] | `String` | - |
| float | 标题是否浮动 | `Boolean` | `false` |
| disabled | 是否禁用 | `Boolean` | `false` |
| default_first | 是否默认选中第一个选项 | `Boolean` | `false` |


| 事件 | 说明 |
| ----|:----- |
| close | 关掉当前Select选择器 |
| form-verify | 验证当前选择器是否选中 |


### SelectItem

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| active | 选中状态  | `Boolean` | `false` |
