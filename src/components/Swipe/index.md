# Swipe

> 走马灯

## 代码示例

<test></test>

<script>
  import test from '@/pages/demo/Swipe.vue';

  export default {
    components: {
      test
    }
  }
</script>

## API

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| value | Swipe的当前下标，请使用`v-model`获取及设置  | - | - |
| preview | 预览展示的滑块数目  | `Number` | 1 |
| between | 每个滑块之间的间距  | `Number` | 0 |
| trigger | index的触发时机, 可选值`change`/`progress`  | `String` | change |
| arrow | 箭头, 可选值`true`/`false`/`'hover'`  | `String, Boolean` | false |
| index | 显示下标, 可选值`true`/`false`  | `Boolean` | false |
| index_trigger | 下标触发滑动的方式, 可选值`click`/`hover`/`false`  | `String`/`Boolean` | click |
| sliding_num | 同时滑动的滑块个数  | `Number` | 1 |
| loop | 无限循环滑动  | `Boolean` | true |
| free | 滑块自由滑动  | `Boolean` | false |
| coverflow | coverflow过渡效果  | `Boolean` | false |
| autoplay | 自动滑动  | `Boolean` | false |
| update_by | 指定更新数据源，Swipe会监听它，用于更新Swipe状态 | - | - |
