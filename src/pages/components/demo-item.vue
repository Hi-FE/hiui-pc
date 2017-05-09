<template>
  <div class="demo-item">
    <div class="demo-item-container">
      <slot></slot>
    </div>
    <span class="demo-item-title" :data-title="name"></span>
    <div class="demo-description">
      <span ref="description" v-html="descr"></span>
      <Icon :class="['show-code-btn', { open: show_code }]" name="caretdown" @click.native="show_code = !show_code"></Icon>
    </div>
    <transition name="slide">
      <v-code v-show="show_code" :lang="lang" :code="code"></v-code>
    </transition>
  </div>
</template>

<style lang="stylus" scope>
  @import '../../style/index.styl';

  _demo_gap = 20px;

  .demo-item {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    vertical-align: top;
    background-color: _white;
    border-radius: 4px;
    box-shadow: 0 0 1px 0px rgba(0, 0, 0, .36);
  }

  .demo-item-container {
    padding: _demo_gap;
  }

  .demo-description {
    position: relative;
    font-size: 14px;
    color: #666;
    padding: 10px;

    .hljs p {
      margin-bottom: 5px;
    }
  }

  .demo-item-title {
    position: relative;
    font-size: 14px;
    color: #666;
    height: 20px;
    line-height: 20px;
    padding-left: 30px;
    background-color: _white;

    &::before {
      content: attr(data-title);
      position: absolute;
      left 30px;
      top: 0;
      height: 100%;
      padding: 0 10px;
      font-size: 16px;
      font-weight: 500;
      background-color: _white;
      z-index: 2;
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #efefef;
      z-index: 1;
    }
  }

  .show-code-btn {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: inline-block;
    font-size: 14px;
    padding: 0;
    cursor: pointer;
    transition: all .2s;

    &.open {
      transform: rotate(180deg);
      color: _blue;
    }
  }

  .slide-enter-active, .slide-leave-active {
    max-height: 300px;
    overflow: hidden;
    transition: all .3s ease;
  }
  .slide-enter, .slide-leave-to {
    max-height: 0;
  }
</style>

<script>
  import hljs from 'highlight.js'
  import MarkdownIt from 'markdown-it'

  export default {
    name: 'demo-item',
    components: {
      vCode: require('./v-code')
    },
    props: {
      lang: {
        default: 'html',
        type: String
      },
      name: String,
      description: String,
      code: String
    },
    data () {
      return {
        show_code: false
      }
    },
    computed: {
      descr () {
        let md = new MarkdownIt()
        return md.render(this.description)
      }
    },
    mounted () {
      hljs.highlightBlock(this.$refs.description)
    }
  }
</script>
