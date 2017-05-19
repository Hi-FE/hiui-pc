# SmoothScroll

> 平滑滚动

## 代码示例

<test></test>

<script>
  import test from '@/pages/demo/SmoothScroll.vue';

  export default {
    components: {
      test
    }
  }
</script>

## API

`this.$smoothScroll(target, time, offset)`

## Params

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| target | 目标位置，可选值`Number/Element`  | `Number/Object` | `0` |
| time | 滚动动画时间  | `Number` | `500` |
| offset | 偏移值，一般用于target为`Element`时  | `Number` | `0` |
