# BackTop

> 回到顶部

## 代码示例

<test></test>

<script>
  import test from '@/pages/demo/BackTop.vue';

  export default {
    components: {
      test
    }
  }
</script>

## Slot

| 名字 | 说明 |
| ----|:-----|
| default | `BackTop`组件内容  |

## API

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| height | 页面滚动高度达到该值时才显示  | `Number` | `200` |
| right | 组件距离右边的距离  | `Number` | `30` |
| bottom | 组件距离底部的距离  | `Number` | `30` |
| time | 滚动的持续时间  | `Number` | `500` |
