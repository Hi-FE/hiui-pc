<template>
  <demo title="TabBar" class="tabBar-demo">
    <demo-item name="default" description="默认" :code="code" slot="left">
      <TabBar :data="arr" v-model="default_index" @change="(i) => default_index = i"></TabBar>
    </demo-item>

    <demo-item name="type" description="类型" :code="type_code" slot="right">
      <TabBar :data="arr" v-model="type_index" @change="(i) => type_index = i" type="no_padding"></TabBar>
      <TabBar :data="arr" v-model="type_index" @change="(i) => type_index = i" type="fix_width"></TabBar>
      <TabBar :data="arr" v-model="type_index" @change="(i) => type_index = i" type="fix_width:25%"></TabBar>
    </demo-item>

    <demo-item name="theme" description="主题" :code="theme_code" slot="left">
      <TabBar :data="arr" v-model="theme_index" @change="(i) => theme_index = i"></TabBar>
      <TabBar :data="arr" v-model="theme_index" @change="(i) => theme_index = i" theme="card"></TabBar>
      <TabBar :data="arr" v-model="theme_index" @change="(i) => theme_index = i" theme="ticket" type="fix_width"></TabBar>
    </demo-item>

    <demo-item name="trigger" description="触发类型" :code="trigger_code" slot="right">
      <TabBar :data="arr" v-model="trigger_index" @change="(i) => trigger_index = i" trigger="hover"></TabBar>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';
</style>

<script>
  export default {
    data () {
      return {
        arr: ['标签一', '标签二', '标签三'],
        default_index: 0,
        type_index: 0,
        theme_index: 0,
        trigger_index: 0,
        code: `
<TabBar :data="arr" v-model="default_index" @change="(i) => default_index = i"></TabBar>
        `,
        type_code: `
<TabBar :data="arr" v-model="type_index" @change="(i) => type_index = i" type="no_padding"></TabBar>
<TabBar :data="arr" v-model="type_index" @change="(i) => type_index = i" type="fix_width"></TabBar>
<TabBar :data="arr" v-model="type_index" @change="(i) => type_index = i" type="fix_width:25%"></TabBar>
        `,
        theme_code: `
<TabBar :data="arr" v-model="theme_index" @change="(i) => theme_index = i"></TabBar>
<TabBar :data="arr" v-model="theme_index" @change="(i) => theme_index = i" theme="card"></TabBar>
<TabBar :data="arr" v-model="theme_index" @change="(i) => theme_index = i" theme="ticket" type="fix_width"></TabBar>
        `,
        trigger_code: `
<TabBar :data="arr" v-model="trigger_index" @change="(i) => trigger_index = i" trigger="hover"></TabBar>
        `
      }
    }
  }
</script>
