<template>
  <div class="swipe-arrow">
    <div class="swipe-button"
         v-for="(direction, index) in ['left', 'right']"
         :class="[direction, { disabled: arrow_disabled_status[direction], outer: outer_arrow}]"
         :style="{ 'margin-top': -arrow_offset + 'px' }">

      <!-- outer arrow -->
      <span class="arrow outer" :class="direction" v-if="outer_arrow" @click="direction === 'left' ? swiper.slidePrev() : swiper.slideNext()">
        <Icon class="icon" :name="direction" :size="24" color="#767676"></Icon>
      </span>

      <!-- inner arrow -->
      <span class="arrow" :class="direction" v-else @click="direction === 'left' ? swiper.slidePrev() : swiper.slideNext()">
        <Icon class="icon" :name="`arrow${direction}`" :size="16" color="#fff"></Icon>
      </span>

      <div class="disabled-mask"></div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
  @import '../../../style/';
  .swipe-arrow { position:absolute;z-index:9;top:50%;transform: translateY(-50%);width:100%;height:0 }
  .swipe-button {
    width: _size_md; height: _size_md; position:absolute;z-index:9;top:50%;transform: translateY(-50%);margin:0;cursor:pointer;
    &.disabled {
      .disabled-mask { display:block }
      .arrow { opacity:.5 }
    }
    &.left {
      left: _gap_xsm - 2;
      &.outer { left: - + _gap_sm - 5 }
      .arrow.left{
        left: 0
        &:hover{ transform: translateX(-10%); }
      }
    }
    &.right{
      right: _gap_xsm;
      &.outer { right: - + _gap_sm - 5 }
      .arrow.right{
        right:0
        &:hover{ transform: translateX(10%); }
      }
    }
    &.outer { height:_size_o_md;width: _size_o_md*0.5 + 5;font-weight:bold }

    .arrow{
      transition: transform .3s, background-color .3s;position: absolute;width: _size_md;height: _size_md;display: block;border-radius: 100%;background-color: rgba(0, 0, 0, .2);
      &.outer { border-radius: 0;background-color:transparent;height:_size_o_md;width: _size_o_md*0.5 }
      .icon{
        position: absolute;left:50%;top:50%;transform: translate(-50%,-50%);
      }
    }
    .disabled-mask { position:absolute;z-index:9;left:0;top:0;width:100%;height:100%;display:none;background-color:transparent;cursor:not-allowed }
  }
</style>

<script>
  export default {
    name: 'swipeArrow',
    props: ['outer_arrow', 'arrow_offset', 'loop', 'preview', 'swiper', 'slides_len'],
    data: function () {
      return {}
    },
    computed: {
      arrow_disabled_status: function () {
        const { loop, preview, swiper, slides_len } = this;
        return {
          left: !loop && swiper.activeIndex === 0,
          right: !loop && swiper.activeIndex === slides_len - preview
        }
      }
    }
  }
</script>