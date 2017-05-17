<template>
  <demo title="Modal" class="modal-demo">
    <demo-item name="type" description="类型" :code="code" slot="left">
      <Btn @click="show = true">Center Modal</Btn>
      <Modal classname="test-modal" v-model="show">
        <h1>Title</h1>
        <p>This is a test txt.</p>
      </Modal>

      <Btn @click="top_show = true">Top Modal</Btn>
      <Modal type="top" classname="test-modal" v-model="top_show">
        <h1>Title</h1>
        <p>This is a test txt.</p>
      </Modal>

      <Btn @click="bottom_show = true">Bottom Modal</Btn>
      <Modal type="bottom" classname="test-modal" v-model="bottom_show">
        <h1>Title</h1>
        <p>This is a test txt.</p>
      </Modal>

      <Btn @click="left_show = true">Left Modal</Btn>
      <Modal type="left" classname="test-modal" v-model="left_show">
        <h1>Title</h1>
        <p>This is a test txt.</p>
      </Modal>

      <Btn @click="right_show = true">Right Modal</Btn>
      <Modal type="right" classname="test-modal" v-model="right_show">
        <h1>Title</h1>
        <p>This is a test txt.</p>
      </Modal>
    </demo-item>

    <demo-item name="mask_close" description="点击遮罩层不关闭" :code="mask_close_code" slot="right">
      <Btn @click="mask_cloe_show = true">Modal</Btn>
      <Modal classname="test-modal" :mask_close="false" v-model="mask_cloe_show">
        <h1>Title</h1>
        <p>This is a test txt.</p>
      </Modal>
    </demo-item>

    <demo-item name="mask_close" description="不显示遮罩层" :code="mask_show_code" slot="right">
      <Btn @click="mask_show = true">Modal</Btn>
      <Modal classname="blue-modal" :use_mask="false" v-model="mask_show">
        <h1>Title</h1>
        <p>This is a test txt.</p>
      </Modal>
    </demo-item>

    <demo-item name="prevent_scroll" description="不禁止滚动" :code="prevent_code" slot="left">
      <Btn @click="prevent_show = true">Modal</Btn>
      <Modal classname="center-modal" :prevent_scroll="false" v-model="prevent_show">
        <h1>Title</h1>
        <p>This is a test txt.</p>
      </Modal>
    </demo-item>
  </demo>
</template>

<style lang="stylus">
  @import '../../style/';

  .modal-demo {
    .hiui-modal-body {
      min-width: 350px;
      padding: 20px;
    }

    .blue-modal {
      width: 300px;
      background-color: _blue;
      color: _white;
      border-radius: 8px;
    }

    .center-modal {
      max-height: 60vh;
    }

    .hiui-btn {
      margin: 5px;
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        show: false,
        top_show: false,
        bottom_show: false,
        left_show: false,
        right_show: false,
        mask_cloe_show: false,
        mask_show: false,
        prevent_show: false,
        code: `
<Modal classname="test-modal" v-model="show">
  <h1>Title</h1>
  <p>This is a test txt.</p>
</Modal>

<Modal type="top" classname="test-modal" v-model="top_show">
  <h1>Title</h1>
  <p>This is a test txt.</p>
</Modal>

<Modal type="bottom" classname="test-modal" v-model="bottom_show">
  <h1>Title</h1>
  <p>This is a test txt.</p>
</Modal>

<Modal type="left" classname="test-modal" v-model="left_show">
  <h1>Title</h1>
  <p>This is a test txt.</p>
</Modal>

<Modal type="right" classname="test-modal" v-model="right_show">
  <h1>Title</h1>
  <p>This is a test txt.</p>
</Modal>
        `,
        mask_close_code: `
<Modal classname="test-modal" :mask_close="false" v-model="mask_cloe_show">
  <h1>Title</h1>
  <p>This is a test txt.</p>
</Modal>
        `,
        mask_show_code: `
<Modal classname="blue-modal" :use_mask="false" v-model="mask_show">
  <h1>Title</h1>
  <p>This is a test txt.</p>
</Modal>
        `,
        prevent_code: `
<Modal classname="center-modal" :prevent_scroll="false" v-model="prevent_show">
  <h1>Title</h1>
  <p>This is a test txt.</p>
</Modal>
        `
      }
    }
  }
</script>
