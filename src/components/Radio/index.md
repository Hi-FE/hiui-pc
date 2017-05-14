# Radio

> 单选框

## 代码示例

<test></test>

<script>
  import test from '@/pages/demo/Radio.vue';

  export default {
    components: {
      test
    }
  }
</script>

## API

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| checked | 单选框当前选中的数据，请使用v-model获取及设置  | - | - |
| value | 单选框值 |  | `slot内容` |
| size | 单选框尺寸，可选值 `sm`/`md`/`lg` | `String` | `md` |
| color | 单选框颜色 | `String` | `#f02f45` |
| disabled | 是否禁用 | `Boolean` | `false` |
