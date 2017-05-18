# Modal

> 弹出层

## 代码示例

<test></test>

<script>
  import test from '@/pages/demo/Modal.vue';

  export default {
    components: {
      test
    }
  }
</script>

## API

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| show | 控制弹出层显示，请使用`v-model`获取及设置  | `Boolean` | - |
| type | 弹出层类型，可选值`center/top/bottom/left/right`  | `String` | `center` |
| use_close | 是否显示关闭按钮 | `Boolean` | `true` |
| use_mask | 是否显示遮罩层 | `Boolean` | `false` |
| mask_close | 点击遮罩层是否关闭弹出层 | `Boolean` | `true` |
| classname | 自定义弹出层类名 | `String/Array` | - |
| prevent_scroll | 是否禁止页面滚动 | `Boolean` | `true` |