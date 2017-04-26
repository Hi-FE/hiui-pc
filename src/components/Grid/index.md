# Grid

> 栅格

## 概念

> 24 栅格系统

<Row class="grid-concept-demo" :gutter="1">
  <Col :span="6"> col-6 </Col>
  <Col :span="6"> col-6 </Col>
  <Col :span="6"> col-6 </Col>
  <Col :span="6"> col-6 </Col>
</Row>

<Row class="grid-concept-demo" :gutter="1">
  <Col :span="8"> col-8 </Col>
  <Col :span="8"> col-8 </Col>
</Row>

<Row class="grid-concept-demo" :gutter="1">
  <Col :span="6" :offset="6"> col-6 offset-6 </Col>
  <Col :span="6" :offset="6"> col-6 offset-6 </Col>
</Row>

<style>
  .grid-concept-demo {
    margin-bottom: 10px;
    background-image: linear-gradient(90deg,#f5f5f5 4.16666667%,#eee 0,#eee 8.33333333%,#f5f5f5 0,#f5f5f5 12.5%,#eee 0,#eee 16.66666667%,#f5f5f5 0,#f5f5f5 20.83333333%,#eee 0,#eee 25%,#f5f5f5 0,#f5f5f5 29.16666667%,#eee 0,#eee 33.33333333%,#f5f5f5 0,#f5f5f5 37.5%,#eee 0,#eee 41.66666667%,#f5f5f5 0,#f5f5f5 45.83333333%,#eee 0,#eee 50%,#f5f5f5 0,#f5f5f5 54.16666667%,#eee 0,#eee 58.33333333%,#f5f5f5 0,#f5f5f5 62.5%,#eee 0,#eee 66.66666667%,#f5f5f5 0,#f5f5f5 70.83333333%,#eee 0,#eee 75%,#f5f5f5 0,#f5f5f5 79.16666667%,#eee 0,#eee 83.33333333%,#f5f5f5 0,#f5f5f5 87.5%,#eee 0,#eee 91.66666667%,#f5f5f5 0,#f5f5f5 95.83333333%,#eee 0);
  }
  .grid-concept-demo .hiui-grid-col {
    height: 60px;
    line-height: 60px;
    background-color: rgba(0,160,233,.5);
    text-align: center;
    color: #fff;
  }
</style>

## 代码示例

</template>
  <test></test>
</template>

<script>
  import test from '@/pages/demo/Grid.vue';

  export default {
    components: {
      test
    }
  }
</script>

## API

| 参数 | 说明 | 类型 | 默认值 |
| ----|:-----| ---- | ---- |
| span | 栅格格数，为`0`时为`display: none`  | `Number|String` | - |
| offset | 栅格往右偏移个数  | `Number|String` | - |
| push | 栅格往右移动个数，原占位不变  | `Number|String` | - |
| pull | 栅格往左移动个数，原占位不变  | `Number|String` | - |
| xsm | `<768px` 响应式栅格，可为栅格格数 或 一个包含多个属性的对象  | `Number|String|Object` | - |
| sm | `>=768px` 响应式栅格，可为栅格格数 或 一个包含多个属性的对象  | `Number|String|Object` | - |
| md | `>=992px` 响应式栅格，可为栅格格数 或 一个包含多个属性的对象  | `Number|String|Object` | - |
| lg | `>=1200px` 响应式栅格，可为栅格格数 或 一个包含多个属性的对象  | `Number|String|Object` | - |
| xlg | `>=1600px` 响应式栅格，可为栅格格数 或 一个包含多个属性的对象  | `Number|String|Object` | - |



