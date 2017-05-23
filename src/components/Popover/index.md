# Popover

> 弹出框

## 代码示例

<test></test>

<script>
  import test from '@/pages/demo/Popover.vue';

  export default {
    components: {
      test
    }
  }
</script>

## API

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| placement | 弹出框出现的位置，可选值`top-left/top/top-right bottom-left/bottom/bottom-right left-top/left/left-bottom right-top/right/right-bottom`  | `String` | `top` |
| auto_reverse | 当弹出框超出页面可视区域时，是否自动反方向 | `Boolean` | `true` |
| offset | 弹出框出现位置的偏移值 | `Number` | `10` |
| trigger | 触发方式，可选值`click/hover/focus/manual` | `String` | `click` |
| show_arrow | 是否显示箭头 | `Boolean` | `true` |
| border_color | 边框颜色，当为`false`时不显示边框 | `Boolean/String` | `#ccc` |
| border_radius | 边框圆角 | `Number` | `3` |
| use_shadow | 是否有边框阴影 | `Boolean` | `true` |
| width | 弹出框宽度，默认`最小宽度150px` | `Number` | -  |

| 事件 | 说明 | 回调参数 |
| ---- |:-----| ---- |
| show | 显示时触发 | - |
| hide | 关闭时触发 | - |

| 方法 | 说明 |
| ----|:-----|
| open | 打开弹出框 |
| close | 关闭弹出框 |
| toggle | 切换弹出框状态 |

## Slot

| 名字 | 说明 |
| ----|:-----|
| default | 弹出框的内容 |
| reference | 触发弹出框显示的元素 |
