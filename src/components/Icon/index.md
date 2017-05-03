# Icon

> 图标

## 代码示例

<test></test>

<script>
  import test from '@/pages/demo/Icon.vue';

  export default {
    components: {
      test
    }
  }
</script>

## API

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| name | 图标类型 | `String` | - |
| size | 图标尺寸 | `Number` | - |
| color | 图标颜色 | `String` | - |
| rotate | 是否旋转 | `Boolean` | `false` |

## 图标列表

> 点击图标复制代码

<IconList></IconList>

<script>
  import test from '@/pages/demo/Icon.vue';
  import IconList from '@/pages/demo/IconList.vue';

  export default {
    components: {
      test,
      IconList
    }
  }
</script>