<template>
  <label :class="component_class">

    <div class="wrapper">

      <InputLabel :label="label"></InputLabel>

      <InputField :type="type"
                  :placeholder="placeholder"
                  :disabled="disabled"
                  :readonly="readonly"
                  :format="format"
                  :reg="reg"
                  :verify="verify"
                  :value="value"
                  @focus="focusHandler"
                  @blur="blurHandler(is_edited)"
                  @enter="enterHandler"
                  @input="inputHandler"
                  @verify="verifyHandler"></InputField>

      <InputTip v-if="!no_verify"
                :tip="tip"
                :verify="verify"
                :is_error="is_error"
                :is_correct="is_correct"></InputTip>
    </div>

  </label>
</template>

<style lang="stylus">
  @import './style/';
  .wrapper { position: relative;width: 100%;height:100% }
</style>

<script>
  const prefixCls = 'hiui-input'

  export default {
    name: 'Input',
    props: {
      value: {},
      size: { type: String, default: 'md' },
      label: [String, Number],
      placeholder: [String, Number],
      type: { type: String, default: 'text' },
      verify: [String, Array],
      reg: [RegExp, String],
      tip: String,
      with_border: { type: Boolean, default: true },
      format: Boolean,
      disabled: Boolean,
      readonly: Boolean
    },
    components: {
      InputLabel: require('./components/InputLabel.vue'),
      InputField: require('./components/InputField.vue'),
      InputTip: require('./components/InputTip.vue')
    },
    data () {
      return {
        is_focus: false,
        is_error: false,
        is_correct: false,
        is_edited: false,
        verify_result: false
      }
    },
    computed: {
      component_class () {
        const { is_error, is_focus, disabled, is_animated, size, with_border } = this;
        return [
          prefixCls,
          `${prefixCls}-${size}`,
          { error: is_error, focus: is_focus, disabled, animated: is_animated, 'with-border': with_border }
        ]
      },
      // 标题浮动动画开关
      is_animated: function () {
        return this.label && !!(this.is_focus || this.value || this.value === 0);
      },
      // 无验证需求
      no_verify: function () {
        return (!this.verify || (this.verify && !this.verify.length)) && !this.reg
      }
    },
    watch: {
      value: function () {
        this.is_edited = true;
      }
    },
    created: function () {
      this.registerEvents();
    },
    methods: {
      verifyHandler: function (verify_result) {
        const { is_edited, no_verify } = this;
        this.verify_result = verify_result;
        if (verify_result && is_edited) {
          this.is_error = !no_verify && !verify_result;
          this.is_correct = !no_verify && verify_result;
        } else {
          this.is_error = false
          this.is_correct = false;
        }
        this.$emit('verify', no_verify || verify_result)
      },
      focusHandler: function () {
        this.is_focus = true
        this.is_error = false
      },
      blurHandler: function (is_edited) {
        this.is_focus = false
        if (is_edited) {
          this.is_error = !this.no_verify && !this.verify_result;
          this.is_correct = !this.no_verify && this.verify_result;
        }
      },
      enterHandler: function () {
        this.$emit('enter');
      },
      inputHandler: function (val) {
        this.is_edited = true;
        this.is_correct = false
        this.$emit('input', val);
      },
      registerEvents: function () {
        const handler = () => {
          this.verifyHandler(this.verify_result);
          this.blurHandler(true);
        }
        this.$root.$on('form-verify', handler)
        this.$on('form-verify', handler)
      }
    }
  }
</script>
