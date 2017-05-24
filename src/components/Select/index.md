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
| value | 选择器当前选中的数据，请使用`v-model`获取及设置  | - | - |
| size | 选择器尺寸，可选值 `sm`/`md`/`lg` | `String` | `md` |
| color | 选择器聚焦时的颜色, 支持两种格式`#f00`/`rgb(255,255,255)` | `String` | - |
| label | 标题 | `String` | `请选择`/`已选择` |
| data | 选择器数据 | `Array` | - |
| show_by | 指定选项展示的值, 默认展示data[index] | `String` | - |
| value_by | 指定选项返回的值, 默认返回data[index] | `String` | - |
| float | 标题是否浮动 | `Boolean` | `false` |
| disabled | 是否禁用 | `Boolean` | `false` |
| default_first | 是否默认选中第一个选项 | `Boolean` | `false` |
| clear_invalid | 是否自动清空无效值, 如果value并未存在data数据中 | `Boolean` | `false` |


| 事件 | 说明 | 类型 | 使用 | 结果 |
| ----|:----- | ---- | ---- | ---- |
| close | 关掉当前Select选择器 | 触发事件 | `component.$emit('close')` | - |
| form-verify | 验证当前选择器是否选中 | 触发事件 | `component.$emit('form-verify')`/`this.$root.$emit('form-verify')` | - |


### SelectItem

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| active | 选中状态  | `Boolean` | `false` |
