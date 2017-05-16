<template>
  <Row :gutter="10">
    <template v-for="(type, i) in icons">
      <Col :xlg="3" :lg="4" :md="6" :sm="8">
        <div class="icon-item" @click="clickHandle(i)" v-clipboard:copy='`<Icon name="${type}"></Icon>`'>
          <Icon :size="26" :name="type" />
          <div class="icon-name" @click.stop="void 0">{{ type }}</div>
          <transition name="fade">
            <div v-if="index === i" class="copy_success">
              Copy Success!
            </div>
          </transition>
        </div>
      </Col>
    </template>
  </Row>
</template>

<style lang="stylus" scoped>
  @import '../../style/';

  .icon-item {
    position: relative;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px 0;
    padding: 20px;
    text-align: center;
    overflow: hidden;
    transition: all .2s;

    &:hover {
      color: _white;
      background-color: _blue;
    }
  }

  .icon-name {
    font-size: 12px;
    white-space: nowrap;
  }

  .copy_success {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: _white;
    background-color: _green;
    border-radius: 4px;
    z-index: 1;
  }

  .fade-enter-active, .fade-leave-active {
    opacity: 1;
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<script>
  export default {
    data () {
      return {
        timer: null,
        index: null,
        icons: ['pay-circle-o', 'pay-circle', 'tag-o', 'tag', 'check-square-o', 'check-square', 'calendar', 'unlock', 'lock', 'download', 'upload', 'loading', 'message', 'heart-o', 'heart', 'delete', 'dislike', 'like', 'scan', 'appstore', 'appstore-o', 'export', 'enviroment-o', 'enviroment', 'cloud-o', 'tags-o', 'tags', 'qrcode', 'phone', 'picture', 'setting', 'search', 'solution', 'team', 'totop', 'user', 'shoppingcart', 'file', 'filter', 'star-o', 'star', 'home', 'link', 'logout', 'question-circle-o', 'question-circle', 'ellipsis', 'swapright', 'swapleft', 'swap', 'clock-circle-o', 'clock-circle', 'bars', 'creditcard', 'close', 'check', 'check-circle-o', 'check-circle', 'close-circle-o', 'close-circle', 'exclamation-circle-o', 'exclamation-circle', 'info-circle-o', 'info-circle', 'plus', 'plus-circle', 'plus-circle-o', 'minus', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'doubleleft', 'doubleright', 'reload', 'retweet', 'rollback', 'down-circle', 'up-circle', 'left-circle', 'right-circle', 'caretup', 'caretdown', 'caretleft', 'caretright', 'right', 'left', 'down', 'up', 'mail', 'mail-circle', 'weixin', 'weixin-circle', 'sina', 'sina-circle', 'qq', 'qq-circle']
      }
    },
    methods: {
      clickHandle (num) {
        this.index = num
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.timer = null
          this.index = null
        }, 1000)
      }
    }
  }
</script>
