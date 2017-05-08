<template>
  <div>
    <h3>{{ data[type].name }}</h3>
    <Row :gutter="20" :class="`${type}-group color-group`">
      <Col v-for="(name, key, i) in data[type].colors" :key="i" :span="24 / data[type].colors.length" class="color-item-wrap">
        <div class="color-item">
          <div class="color-name">{{ name }}</div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<style lang="stylus" scope>
  @import '../../style/';

  .color-group {
    margin-bottom: 20px;
  }

  .color-item {
    color: _white;
    height: 80px;
    font-size: 14px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;

    .color-name {
      font-size: 16px;
      text-shadow: 0 0 1px rgba(0, 0, 0, .8);
    }
  }


  _blue_group = _blue _blue_light _blue_deep;
  _red_group = _red _red_light _red_deep;
  _green_group = _green _green_light _green_deep;
  _yellow_group = _yellow _yellow_light _yellow_deep;
  _neutrals_group = _grey _grey_light _grey_lighter _grey_deep _grey_deeper _black;
  _vi_group = _vi_red _vi_yellow _vi_cyan;

  createGroup(type, _colors) {
    .{type}-group {
      for color, i in _colors {
        .color-item-wrap:nth-child({i + 1}) .color-item {
          background-color: color;

          &::after {
            content: '' + color;
            text-shadow: 0 0 1px rgba(0, 0, 0, .8);
          }
        }
      }
    }
  }

  createGroup('blue', _blue_group);
  createGroup('red', _red_group);
  createGroup('green', _green_group);
  createGroup('yellow', _yellow_group);
  createGroup('neutrals', _neutrals_group);
  createGroup('vi', _vi_group);
</style>

<script>
  export default {
    props: {
      type: {
        default: 'blue',
        type: String
      }
    },
    data () {
      return {
        data: {
          blue: {
            name: '蓝色',
            colors: ['_blue', '_blue_light', '_blue_deep']
          },
          red: {
            name: '红色',
            colors: ['_red', '_red_light', '_red_deep']
          },
          green: {
            name: '绿色',
            colors: ['_green', '_green_light', '_green_deep']
          },
          yellow: {
            name: '黄色',
            colors: ['_yellow', '_yellow_light', '_yellow_deep']
          },
          neutrals: {
            name: '中性色',
            colors: ['_grey', '_grey_light', '_grey_lighter', '_grey_deep', '_grey_deeper', '_black']
          },
          vi: {
            name: 'Vi',
            colors: ['_vi_red', '_vi_yellow', '_vi_cyan']
          }
        }
      }
    }
  }
</script>
