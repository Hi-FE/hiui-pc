<template>
  <demo title="Grid">
    <demo-item class="grid-demo" name="Default" description="基础栅格" :code="code">
      <Row>
        <Col :span="12"> col-12 </Col>
        <Col :span="12"> col-12 </Col>
      </Row>

      <Row>
        <Col :span="6"> col-6 </Col>
        <Col :span="6"> col-6 </Col>
        <Col :span="6"> col-6 </Col>
        <Col :span="6"> col-6 </Col>
      </Row>

      <Row>
        <Col :span="8"> col-8 </Col>
        <Col :span="8"> col-8 </Col>
        <Col :span="8"> col-8 </Col>
      </Row>
    </demo-item>

    <demo-item class="grid-gutter-demo" name="Gutter" description="间隔" :code="gutter_code">
      <Row :gutter="20">
        <Col :span="6">
          <div class="gutter-box">col-6</div>
        </Col>
        <Col :span="6">
          <div class="gutter-box">col-6</div>
        </Col>
        <Col :span="6">
          <div class="gutter-box">col-6</div>
        </Col>
        <Col :span="6">
          <div class="gutter-box">col-6</div>
        </Col>
      </Row>
    </demo-item>

    <demo-item class="grid-demo" name="Offset" description="区块偏移" :code="offset_code">
      <Row>
        <Col :span="8"> col-8 </Col>
        <Col :span="8" :offset="8"> col-8 offset-8 </Col>
      </Row>

      <Row>
        <Col :span="6" :offset="6"> col-6 offset-6 </Col>
        <Col :span="6" :offset="6"> col-6 offset-6 </Col>
      </Row>

      <Row>
        <Col :span="12" :offset="6"> col-12 offset-6 </Col>
      </Row>
    </demo-item>

    <demo-item class="grid-demo" name="Pull & Push" description="区块排序" :code="sort_code">
      <Row>
        <Col :span="18" :push="6"> col-18 push-6 </Col>
        <Col :span="6" :pull="18"> col-6 pull-18 </Col>
      </Row>
    </demo-item>

    <demo-item class="grid-demo" name="Responsive" description="响应式" :code="responsive_code">
      <Row>
        <Col :xsm="0" :sm="4" :md="6" :lg="8" :xlg="6" >Col</Col>
        <Col :xsm="24" :sm="16" :md="12" :lg="8" :xlg="{ span: 6, offset: 3 }" >Col</Col>
        <Col :xsm="0" :sm="4" :md="6" :lg="8" :xlg="{ span: 6, offset: 3 }" >Col</Col>
      </Row>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';

  .grid-demo .hiui-grid-row {
    height: 60px;
    line-height: 60px;
    margin: 10px 0;

    .hiui-grid-col {
      height: 100%;
      background-color: rgba(_blue, .7);
      text-align: center;
      color: #fff;

      &:nth-child(2n) {
        background-color: darken(@background-color, 20%);
      }
    }
  }

  .grid-gutter-demo .hiui-grid-row {
    height: 60px;
    line-height: 60px;
    margin: 10px 0;

    .gutter-box {
      height: 100%;
      background-color: rgba(_blue, .7);
      text-align: center;
      color: #fff;

      &:nth-child(2n) {
        background-color: darken(@background-color, 20%);
      }
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        code: `
<Row>
  <Col :span="12"> col-12 </Col>
  <Col :span="12"> col-12 </Col>
</Row>

<Row>
  <Col :span="6"> col-6 </Col>
  <Col :span="6"> col-6 </Col>
  <Col :span="6"> col-6 </Col>
  <Col :span="6"> col-6 </Col>
</Row>

<Row>
  <Col :span="8"> col-8 </Col>
  <Col :span="8"> col-8 </Col>
  <Col :span="8"> col-8 </Col>
</Row>
        `,
        gutter_code: `
<Row :gutter="20">
  <Col :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
  <Col :span="6">
    <div class="gutter-box">col-6</div>
  </Col>
</Row>
        `,
        offset_code: `
<Row>
  <Col :span="8"> col-8 </Col>
  <Col :span="8" :offset="8"> col-8 offset-8 </Col>
</Row>

<Row>
  <Col :span="6" :offset="6"> col-6 offset-6 </Col>
  <Col :span="6" :offset="6"> col-6 offset-6 </Col>
</Row>

<Row>
  <Col :span="12" :offset="6"> col-12 offset-6 </Col>
</Row>
        `,
        sort_code: `
<Row>
  <Col :span="18" :push="6"> col-18 push-6 </Col>
  <Col :span="6" :pull="18"> col-6 pull-18 </Col>
</Row>
        `,
        responsive_code: `
<Row>
  <Col :xsm="0" :sm="4" :md="6" :lg="8" :xlg="6" >Col</Col>
  <Col :xsm="24" :sm="16" :md="12" :lg="8" :xlg="{ span: 6, offset: 3 }" >Col</Col>
  <Col :xsm="0" :sm="4" :md="6" :lg="8" :xlg="{ span: 6, offset: 3 }" >Col</Col>
</Row>
        `
      }
    }
  }
</script>
