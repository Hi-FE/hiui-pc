<template>
  <demo title="Select" class="select-demo">
    <demo-item name="Size" description="大小" :code="code" slot="left">
      <Select :data="[2,3,4]" v-model="test" size="sm"></Select>
      <Select :data="[2,3,4]" v-model="test" size="md"></Select>
      <Select :data="[2,3,4]" v-model="test" size="lg"></Select>
    </demo-item>
    <demo-item name="LabelFloat" description="标题浮动" :code="float_code" slot="right">
      <Select :data="[2,3,4]" :float="true" label="我是标题" v-model="float_test"></Select>
      <Select :data="[2,3,4]" :float="true" v-model="float_test"></Select>
      <Select :data="[2,3,4]" v-model="float_test"></Select>
    </demo-item>
    <demo-item name="Status" description="状态" :code="disabled_code" slot="left">
      <Select :data="[2,3,4]" :disabled="true"></Select>
      <Select :data="[2,3,4]" v-model="disabled_test"></Select>
    </demo-item>
    <demo-item name="Color" description="颜色" :code="color_code" slot="right">
      <Select :data="[2,3,4]" v-model="color_test"></Select>
      <Select :data="[2,3,4]" color="#4fae9B" v-model="color_test"></Select>
      <Select :data="[2,3,4]" color="rgb(0, 160, 233)" v-model="color_test"></Select>
    </demo-item>
    <demo-item name="Custom" description="自定义行为" :code="custom_code" slot="left">
      <p class="tip">选择器1 无触发close事件</p>
      <Select v-model="custom_test">
        <p class="custom-option" v-for="n in 4" @click="custom_test = `自定义选项${n}`">自定义选项 {{ n }}</p>
      </Select>
      <p class="tip">选择器2 触发close事件</p>
      <Select :ref="'select'" v-model="custom_test">
        <p class="custom-option" v-for="n in 4" @click="custom_test = `自定义选项${n}`, $refs.select.$emit('close')">自定义选项 {{ n }}</p>
      </Select>
      <br>
      <Btn @click.native="$refs.select.$emit('form-verify')">验证选择器1</Btn>
      <Btn @click.native="$root.$emit('form-verify')">验证所有选择器</Btn>

    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';
  .select-demo .hiui-select + .hiui-select{ margin-top: 5px }
  .select-demo .close-select-btn { margin-bottom:10px }
  .select-demo .hiui-select .custom-option { padding: 10px;margin-bottom:0; }
  .select-demo .hiui-select .custom-option:nth-child(n):hover{ background-color:_red_light;color:#fff }
  .select-demo .hiui-select .custom-option:nth-child(2n):hover{ background-color:_blue_light;color:#fff }
  .select-demo p.tip { margin-top:10px;margin-bottom:5px }
</style>

<script>
  export default {
    data () {
      return {
        test: '',
        float_test: '',
        color_test: '',
        disabled_test: '',
        custom_test: '',
        code: `
<Select :data="[2,3,4]" v-model="test" size="sm"></Select>
<Select :data="[2,3,4]" v-model="test" size="md"></Select>
<Select :data="[2,3,4]" v-model="test" size="lg"></Select>
        `,
        float_code: `
<Select :data="[2,3,4]" :float="true" label="我是标题" v-model="float_test"></Select>
<Select :data="[2,3,4]" v-model="float_test"></Select>
        `,
        disabled_code: `
<Select :data="[2,3,4]" :disabled="true"></Select>
<Select :data="[2,3,4]" v-model="disabled_test"></Select>
        `,
        color_code: `
<Select :data="[2,3,4]" v-model="color_test"></Select>
<Select :data="[2,3,4]" color="#4fae9B" v-model="color_test"></Select>
<Select :data="[2,3,4]" color="rgb(0, 160, 233)" v-model="color_test"></Select>
        `,
        custom_code: `
// 选择器1 无触发close事件
<Select v-model="custom_test">
  <p class="custom-option" v-for="n in 4" @click="custom_test = '自定义选项' + n">自定义选项 {{ n }}</p>
</Select>

// 选择器2 触发close事件
<Select :ref="'select'" v-model="custom_test">
  <p class="custom-option" v-for="n in 4" @click="custom_test = '自定义选项' + n, $refs.select.$emit('close')">自定义选项 {{ n }}</p>
</Select>

<Btn @click.native="$refs.select.$emit('form-verify')">验证选择器1</Btn>
<Btn @click.native="$root.$emit('form-verify')">验证所有选择器</Btn>
         `
      }
    }
  }
</script>
