# Price

> 价格

## 代码示例

<test></test>

<script>
  import test from '@/pages/demo/Price.vue';

  export default {
    components: {
      test
    }
  }
</script>

## API

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| color | 颜色 | `String` | `#f02f45` |
| font_size | 字号大小 | `Number` | `24` |
| super | 价格符号是否对其文本的上标  | `Boolean` | `false` |
| delete | 是否为`Del`样式  | `Boolean` | `false` |
| suffix | 后缀文本  | `String/Number` | - |
| suffix_size | 后缀文本字体大小  | `Number` | `16` |
| no_shrink | 价格符号不缩小  | `Boolean` | `false` |
| symbol | 价格符号  | `String` | `￥` |
