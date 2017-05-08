<template>
  <demo title="Tabs" class="tabs-demo">
    <demo-item name="Default" description="默认" :code="code" slot="left">
      <Tabs>
        <TabPane label="Tab One">第一个标签内容</TabPane>
        <TabPane label="Tab Two">第二个标签内容</TabPane>
        <TabPane label="Tab Three">第三个标签内容</TabPane>
      </Tabs>
    </demo-item>

    <demo-item name="Type" description="没有 padding 的类型" :code="nopadding_code" slot="right">
      <Tabs type="nopadding">
        <TabPane label="Tab One">第一个标签内容</TabPane>
        <TabPane label="Tab Two">第二个标签内容</TabPane>
        <TabPane label="Tab Three">第三个标签内容</TabPane>
      </Tabs>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scope>
  @import '../../style/';

  .tabs-demo .hiui-tab-pane {
    font-size: 14px;
    color: #999;
  }
</style>

<script>
  export default {
    data () {
      return {
        code: `
<Tabs>
  <TabPane label="Tab One">第一个标签内容</TabPane>
  <TabPane label="Tab Two">第二个标签内容</TabPane>
  <TabPane label="Tab Three">第三个标签内容</TabPane>
</Tabs>
        `,
        nopadding_code: `
<Tabs type="nopadding">
  <TabPane label="Tab One">第一个标签内容</TabPane>
  <TabPane label="Tab Two">第二个标签内容</TabPane>
  <TabPane label="Tab Three">第三个标签内容</TabPane>
</Tabs>
        `
      }
    }
  }
</script>
