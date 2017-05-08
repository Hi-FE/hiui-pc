# Standard

> 一些基础的规范

尺寸相关变量在 `/src/style/themes/size/index.styl` 文件中修改

## Span

> 元素间的距离

<v-code :code="gap.join(' ')"></v-code>

基本的 xsm sm md lg xlg 五档间距，UI组件和公共业务组件强制要求，具体页面设计建议遵从。

## Size

> 基础尺寸，一般用于规范元素的高度，比如一个按钮的size。

### outer

<v-code :code="size_o.join(' ')"></v-code>

### inner

<v-code :code="size.join(' ')"></v-code>

outer用于Bar组件，inner用于Btn form等组件。

<script>
  import style from '@/style/index.styl';

  export default {
    data() {
      let { gap_xsm, gap_sm, gap_md, gap_lg, gap_xlg, size_sm, size_md, size_lg, size_o_sm, size_o_md, size_o_lg } = style
      return {
        gap: [gap_xsm, gap_sm, gap_md, gap_lg, gap_xlg],
        size: [size_sm, size_md, size_lg],
        size_o: [size_o_sm, size_o_md, size_o_lg]
      }
    }
  }
</script>