# Toast

> 提示

## 代码示例

<test></test>

<script>
  import test from '@/pages/demo/Toast.vue';

  export default {
    components: {
      test
    }
  }
</script>

## API

```js
this.$toast(content, type, time, callback)
```

## Paramsl

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| content | 提示文本  | `String` | - |
| type | 主题，可选值`default / primary / success / warning / error`  | `String` | - |
| time | 存在时间  | `Number` | 2000 |
| callback | 消失后回调  | `Function` | - |
