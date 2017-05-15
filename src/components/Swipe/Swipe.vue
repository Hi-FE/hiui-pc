<template>
  <div :class="component_class" @mouseenter="is_hover = true" @mouseleave="is_hover = false">

    <!-- Content -->
    <div class="swiper-wrapper">
      <slot></slot>
    </div>

    <!--  Arrows -->
    <template v-if="arrow">
      <transition name="fade">
        <div class="swiper-button swiper-button-next"
             ref="next_btn"
             v-show="arrow !== 'hover' || is_hover">
          <span class="arrow right">
            <Icon class="icon" name="arrowright" :size="16" color="#fff"></Icon>
          </span>
        </div>
      </transition>
      <transition name="fade">
        <div class="swiper-button swiper-button-prev"
             ref="pre_btn"
             v-show="arrow !== 'hover' || is_hover">
           <span class="arrow left">
             <Icon class="icon" name="arrowleft" :size="16" color="#fff"></Icon>
           </span>
        </div>
      </transition>
      <div class="swiper-style" v-html="`<style> .hiui-swipe.uid-${_uid} .swiper-button{ width:34px;height:34px;background-image: inherit;pointer-events: inherit; }</style>`"></div>
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
      trigger: { type: String, default: 'change' }, // 'progress'
      arrow: { type: [String, Boolean], default: 'hover' }, // true, false, 'hover'
      refresh_by: {} // 用于监听异步数据，便于更新swiper，也可用v-if代替
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
        const { $refs, preview, between, sliding_num, free, loop, autoplay, value } = this;
        const autoplay_speed = 5000
        // default config
        let config = {
          slidesPerView: preview,
          slidesPerGroup: sliding_num,
          spaceBetween: between,
          freeMode: free,
          loop: loop,
          initialSlide: value,
          nextButton: $refs.next_btn,
          prevButton: $refs.pre_btn,
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
      this.init();
    },
    watch: {
      value: function (index, old_index) {
        const { swiper, trigger, is_sliding } = this;
        if (!swiper || (trigger === 'progress' && is_sliding)) return;
        swiper.slideTo(this.getRealIndex(index))
      },
      refresh_by: function () {
        this.$nextTick(() => {
          this.update();
        })
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
        this.swiper && this.swiper.update();
        this.$emit('inited');
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
