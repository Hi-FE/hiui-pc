# Tabs

> 标签页

## 代码示例

<test></test>

<script>
  import test from '@/pages/demo/Tabs.vue';

  export default {
    components: {
      test
    }
  }
</script>

## API

### Tabs

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| type | 标签类型，可选值`padding/no_padding/fix_width/fix_width:String`  | `String` | `padding` |
| active-style | 选中时标签样式  | `Object` | - |
| shouldChange | 标签切换前调用，返回false时则不切换标签[@params: name, vm]  | `Function` | - |

### TabPane

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| name | 标签Value，用于识别当前面板，默认为索引值  | `String` | - |
| icon | 前置图标  | `String` | - |
| disabled | 是否禁用标签  | `Boolean` | `false` |
