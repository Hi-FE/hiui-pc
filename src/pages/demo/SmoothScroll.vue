<template>
  <demo title="Icon" class="icon-demo">
    <demo-item name="default" description="滚动到具体位置" :code="code">
      <Btn @click.native="$smoothScroll(300)">滚动到距离顶部300的位置</Btn>
    </demo-item>
    <demo-item name="default" description="滚动到目标元素" :code="ele_code">
      <div ref="target"># Target</div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Btn @click.native="$smoothScroll($refs.target)">滚动到目标元素</Btn>
      <Btn @click.native="$smoothScroll($refs.target, 1000, -100)">偏移100px</Btn>
    </demo-item>
    <demo-item name="default" description="滚动到顶部" :code="top_code">
      <Btn @click.native="$smoothScroll()">滚动顶部</Btn>
      <Btn @click.native="$smoothScroll(0, 200)">200ms滚到顶部</Btn>
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
        code: `
<Btn @click.native="$smoothScroll(300)">滚动到距离顶部300的位置</Btn>
        `,
        ele_code: `
<Btn @click.native="$smoothScroll($refs.target)">滚动到目标元素</Btn>
<Btn @click.native="$smoothScroll($refs.target, 1000, -100)">偏移100px</Btn>
        `,
        top_code: `
<Btn @click.native="$smoothScroll()">滚动顶部</Btn>
<Btn @click.native="$smoothScroll(0, 200)">200ms滚到顶部</Btn>
        `
      }
    }
  }
</script>
