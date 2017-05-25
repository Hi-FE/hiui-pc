<template>
  <demo title="Tabs" class="tabs-demo">
    <demo-item name="default" description="默认" :code="code" slot="left">
      <Tabs>
        <TabPane :label="'标签一'">第一个标签内容</TabPane>
        <TabPane :label="'标签二'">第二个标签内容</TabPane>
        <TabPane :label="'标签三'">第三个标签内容</TabPane>
      </Tabs>
    </demo-item>

    <demo-item class="type-group" name="type" :description="type_descr" :code="type_code" slot="right">
      <Tabs :type="'no_padding'">
        <TabPane :label="'标签一'">不使用padding的标签1</TabPane>
        <TabPane :label="'标签二'">不使用padding的标签2</TabPane>
        <TabPane :label="'标签三'">不使用padding的标签3</TabPane>
      </Tabs>

      <Tabs :type="'fix_width'">
        <TabPane :label="'标签一'">平分宽度的标签1</TabPane>
        <TabPane :label="'标签二'">平分宽度的标签2</TabPane>
        <TabPane :label="'标签三'">平分宽度的标签3</TabPane>
      </Tabs>

      <Tabs :type="'fix_width:20%'">
        <TabPane :label="'标签一'">固定宽度为20%的标签1</TabPane>
        <TabPane :label="'标签二'">固定宽度为20%的标签2</TabPane>
        <TabPane :label="'标签三'">固定宽度为20%的标签3</TabPane>
      </Tabs>
    </demo-item>

    <demo-item name="icon" description="图标" :code="icon_code" slot="left">
      <Tabs>
        <TabPane :label="'Home'" :icon="'home'">第一个标签内容</TabPane>
        <TabPane :label="'Cart'" :icon="'shoppingcart'">第二个标签内容</TabPane>
        <TabPane :label="'User'" :icon="'user'">第三个标签内容</TabPane>
      </Tabs>
    </demo-item>

    <demo-item name="activeStyle" description="选中样式" :code="style_code" slot="left">
      <Tabs :type="'no_padding'" :active-style="{ color: '#f02f45', borderBottomColor: '#f02f45' }">
        <TabPane :label="'机酒自由行'">机酒自由行</TabPane>
        <TabPane :label="'当地玩乐'">当地玩乐</TabPane>
        <TabPane :label="'出行必备'">出行必备</TabPane>
      </Tabs>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';

  .tabs-demo .hiui-tab-pane {
    font-size: 14px;
    color: #999;
  }

  .type-group .hiui-tabs&:not(:last-child) {
    margin-bottom: 40px;
  }
</style>

<script>
  export default {
    data () {
      return {
        code: `
<Tabs>
  <TabPane :label="'标签一'">第一个标签内容</TabPane>
  <TabPane :label="'标签二'">第二个标签内容</TabPane>
  <TabPane :label="'标签三'">第三个标签内容</TabPane>
</Tabs>
        `,
        type_code: `
<Tabs :type="'no_padding'">
  <TabPane :label="'标签一'">不使用padding的标签1</TabPane>
  <TabPane :label="'标签二'">不使用padding的标签2</TabPane>
  <TabPane :label="'标签三'">不使用padding的标签3</TabPane>
</Tabs>

<Tabs :type="'fix_width'">
  <TabPane :label="'标签一'">平分宽度的标签1</TabPane>
  <TabPane :label="'标签二'">平分宽度的标签2</TabPane>
  <TabPane :label="'标签三'">平分宽度的标签3</TabPane>
</Tabs>

<Tabs :type="'fix_width:20%'">
  <TabPane :label="'标签一'">固定宽度为20%的标签1</TabPane>
  <TabPane :label="'标签二'">固定宽度为20%的标签2</TabPane>
  <TabPane :label="'标签三'">固定宽度为20%的标签3</TabPane>
</Tabs>
        `,
        icon_code: `
<Tabs>
  <TabPane :label="'Home'" :icon="'home'">第一个标签内容</TabPane>
  <TabPane :label="'Cart'" :icon="'shoppingcart'">第二个标签内容</TabPane>
  <TabPane :label="'User'" :icon="'user'">第三个标签内容</TabPane>
  <TabPane :label="'Setting'" :icon="'setting'">第四个标签内容</TabPane>
</Tabs>
        `,
        style_code: `
<Tabs :type="'no_padding'" :active-style="{ color: '#f02f45', borderBottomColor: '#f02f45' }">
  <TabPane :label="'机酒自由行'">机酒自由行</TabPane>
  <TabPane :label="'当地玩乐'">当地玩乐</TabPane>
  <TabPane :label="'出行必备'">出行必备</TabPane>
</Tabs>
        `,
        type_descr: `
\`no_padding\` 不使用padding的标签\n
\`fix_width\`  平分宽度的标签\n
\`fix_width:String\`  固定宽度的标签
        `
      }
    }
  }
</script>
