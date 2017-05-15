<template>
  <demo title="Input" class="input-demo">
    <demo-item name="size" description="大小" :code="code" slot="left">
      <Input size="sm" v-model="size_test"></Input>
      <Input size="md" v-model="size_test"></Input>
      <Input size="lg" v-model="size_test"></Input>
    </demo-item>
    <demo-item name="labelFloat" description="标题浮动" :code="label_code" slot="right">
      <Input size="md" label="我是浮动标题" v-model="label_test"></Input>
      <Input size="md" placeholder="我是提示" v-model="label_test"></Input>
    </demo-item>
    <demo-item name="status" description="状态" :code="disabled_code" slot="left">
      <Input size="md" placeholder="正常使用" v-model="status_test"></Input>
      <Input size="md" placeholder="我被禁用了" :disabled="true"></Input>
    </demo-item>
    <demo-item name="color" description="颜色" :code="color_code" slot="right">
      <Input size="md" placeholder="默认" v-model="color_test"></Input>
      <Input size="md" placeholder="绿色" color="#4fae9B" v-model="color_test"></Input>
      <Input size="md" placeholder="蓝色" color="rgb(0, 160, 233)" v-model="color_test"></Input>
    </demo-item>
    <demo-item name="verify" description="验证" :code="verify_code" slot="left">
      <Input size="md" placeholder="正常使用"></Input>
      <Input size="md" placeholder="验证手机号(数字7~14位)" verify="phone" @verify="verify_result = arguments[0]" v-model="verify_test"></Input>
      <p class="verify-result">手机号验证结果: {{ verify_result }}</p>
    </demo-item>
    <demo-item name="textarea" description="文本域" :code="textarea_code" slot="right">
      <Input size="md" v-model="textarea_test"></Input>
      <Input size="md" v-model="textarea_test" placeholder="默认3行高" type="textarea"></Input>
      <Input size="md" v-model="textarea_test" type="textarea" placeholder="内容撑开高度" :autosize="true"></Input>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';
  .hiui-input{ margin-bottom:5px }
  .verify-result { margin-top:5px;margin-bottom:5px }
</style>

<script>
  export default {
    data () {
      return {
        size_test: '',
        label_test: '',
        status_test: '',
        verify_test: '',
        color_test: '',
        textarea_test: '',
        verify_result: false,
        code: `
<Input size="sm" v-model="test"></Input>
<Input size="md" v-model="test"></Input>
<Input size="lg" v-model="test"></Input>
        `,
        label_code: `
// 只要存在label，都会默认使用浮动动画。
<Input size="md" label="我是浮动标题" v-model="label_test"></Input>
<Input size="md" placeholder="我是提示" v-model="label_test"></Input>
        `,
        color_code: `
<Input size="md" placeholder="默认" v-model="status_test"></Input>
<Input size="md" placeholder="绿色" color="#4fae9B" v-model="color_test"></Input>
<Input size="md" placeholder="蓝色" color="rgb(0, 160, 233)" v-model="color_test"></Input>
        `,
        disabled_code: `
<Input size="md" placeholder="正常使用" v-model="status_test"></Input>
<Input size="md" placeholder="我被禁用了" :disabled="true" v-model="status_test"></Input>
        `,
        verify_code: `
// 更多验证细节，参照API
<Input size="md" placeholder="正常使用"></Input>
<Input size="md" placeholder="验证手机号(数字7~14位)" verify="phone" @verify="verify_result = arguments[0]" v-model="verify_test"></Input>
<p class="verify-result">手机号验证结果: {{ verify_result }}</p>
        `,
        textarea_code: `
<Input size="md" v-model="textarea_test"></Input>
<Input size="md" v-model="textarea_test" placeholder="默认3行高" type="textarea"></Input>
<Input size="md" v-model="textarea_test" type="textarea" placeholder="内容撑开高度" :autosize="true"></Input>
        `
      }
    }
  }
</script>
