<template>
  <div :class="component_class" @mouseenter="is_hover = true" @mouseleave="is_hover = false">

      <!-- Content -->
      <div class="swiper-wrapper">
        <slot></slot>
      </div>

      <!-- Index -->
      <div class="indexs" v-if="index">
        <span class="index"
              v-for="(item, i) in slides_len"
              :class="{ active: i === swiper.realIndex }"
              @click="index_trigger === 'click' && slideTo(i, swiper.activeIndex)"
              @mouseenter="index_trigger === 'hover' && slideTo(i, swiper.activeIndex)"></span>
      </div>

      <!--  Arrow -->
      <template v-if="arrow && swiper">
        <transition name="fade">
          <div class="swipe-button next"
               v-show="arrow !== 'hover' || is_hover"
               :class="{ disabled: arrow_disabled_status.next}">
            <span class="arrow right" @click="swiper.slideNext()">
              <Icon class="icon" name="arrowright" :size="16" :color="arrow_disabled_status.next ? 'rgba(221, 221, 221, .4)' : '#fff'"></Icon>
            </span>
            <div class="disabled-mask"></div>
          </div>
        </transition>
        <transition name="fade">
          <div class="swipe-button prev"
               v-show="arrow !== 'hover' || is_hover"
               :class="{ disabled: arrow_disabled_status.prev }">
             <span class="arrow left" @click="swiper.slidePrev()">
               <Icon class="icon" name="arrowleft" :size="16" :color="arrow_disabled_status.prev ? 'rgba(221, 221, 221, .4)' : '#fff'"></Icon>
             </span>
             <div class="disabled-mask"></div>
          </div>
        </transition>
      </template>

  </div>
</template>

<style lang="stylus">
  @import './style/';
</style>

<script>
  import Swiper from 'swiper'
  import Icon from '../Icon'

  import 'swiper/dist/css/swiper.min.css'
  const prefixCls = 'hiui-swipe'

  export default {
    name: 'Swipe',
    props: {
      value: {},
      preview: { type: [Number, String], default: 1 },
      between: { type: Number, default: 0 },
      sliding_num: { type: Number, default: 1 },
      free: Boolean,
      coverflow: Boolean,
      loop: { type: Boolean, default: true },
      autoplay: Boolean,
      index: Boolean,
      index_trigger: { type: [String, Boolean], default: 'click' },
      trigger: { type: String, default: 'change' },
      arrow: { type: [String, Boolean], default: 'hover' },
      update_by: {}
    },
    data () {
      return {
        swiper: null,
        inited: false,
        is_hover: false,
        is_sliding: false
      }
    },
    components: {
      Icon,
      SwipeSlide: require('./SwipeSlide.vue')
    },
    computed: {
      component_class () {
        return [
          prefixCls,
          `uid-${this._uid}`,
          'swiper-container'
        ]
      },
      config: function () {
        const { preview, between, sliding_num, free, loop, autoplay, value } = this;
        const autoplay_speed = 5000
        // default config
        let config = {
          slidesPerView: preview,
          slidesPerGroup: sliding_num,
          spaceBetween: between,
          freeMode: free,
          loop: loop,
          initialSlide: value,
          autoplay: autoplay ? autoplay_speed : undefined,
          slideToClickedSlide: true,
          onInit: () => {
            this.$emit('inited');
          },
          onTransitionEnd: (swiper) => {
            const { inited, trigger } = this;
            if (!inited) return;
            if (trigger === 'progress') this.is_sliding = false;
            this.$emit('input', swiper.realIndex)
          }
        }
        // coverflow config
        const coverflow = this.coverflow ? {
          centeredSlides: true,
          effect: 'coverflow',
          coverflow: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3,
            slideShadows: false
          }
        } : {};
        // progress config (emit index when swiper is sliding)
        const progress = this.trigger === 'progress' ? {
          watchSlidesProgress: true,
          onProgress: (swiper, progress) => {
            this.is_sliding = true;
            if (swiper.realIndex != null && swiper.realIndex !== this.value) {
              this.$emit('input', swiper.realIndex);
            }
          }
        } : {}
        config = { ...config, ...coverflow, ...progress }
        return config
      },
      slides_len: function () {
        if (!this.swiper) return 0;
        const len = this.swiper.slides.length;
        return this.loop ? len - this.preview * 2 : len
      },
      arrow_disabled_status: function () {
        const { loop, preview, swiper, slides_len } = this;
        return {
          prev: !loop && swiper.activeIndex === 0,
          next: !loop && swiper.activeIndex === slides_len - preview
        }
      },
      reset: function () {
        let { preview, between, free, coverflow, loop, sliding_num, autoplay } = this;
        return {
          preview,
          between,
          free,
          coverflow,
          loop,
          sliding_num,
          autoplay
        }
      }
    },
    mounted: function () {
      this.$nextTick(() => this.init())
    },
    watch: {
      value: function (index, old_index) {
        const { swiper, trigger, is_sliding } = this;
        if (!swiper || (trigger === 'progress' && is_sliding)) return;
        swiper.slideTo(this.getRealIndex(index))
      },
      update_by: {
        deep: true,
        handler: function () {
          this.$nextTick(() => {
            this.update();
          })
        }
      },
      reset: function () {
        this.swiper.destroy(true, true);
        this.init();
      }
    },
    methods: {
      init: function () {
        this.swiper = new Swiper(this.$el, this.config);
        this.inited = true;
      },
      update: function () {
        this.swiper && this.swiper.update(true);
        this.$emit('inited');
      },
      slideTo: function (target, active) {
        let { loop, preview, slides_len, swiper } = this;
        let len = swiper.slides.length
        let speed = swiper.params.speed
        if (loop) {
          let is_first = active === len - preview && target === 0;
          let is_last = active === preview - 1 && target === slides_len - 1
          if (is_first || is_last) speed = 0;
        }
        this.swiper.slideTo(target + preview, speed)
      },
      getRealIndex: function (index) {
        const { swiper, loop } = this;
        if (loop) {
          index = index === swiper.realIndex ? swiper.activeIndex : index;
        }
        return index;
      }
    }
  }
</script>
