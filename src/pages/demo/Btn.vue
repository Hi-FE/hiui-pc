<template>
  <demo title="Btn">
    <demo-item name="size" description="按钮大小" :code="size_code" slot="left">
      <div class="btn-group">
        <Btn :size="'sm'">小尺寸</Btn>
        <Btn :size="'md'">中尺寸</Btn>
        <Btn :size="'lg'">大尺寸</Btn>
      </div>
    </demo-item>

    <demo-item name="icon" description="前后置图标" :code="icon_code" slot="right">
      <div class="btn-group">
        <Btn :prefix="'arrowleft'">Left</Btn>
        <Btn :prefix="'arrowright'">Right</Btn>
        <Btn :suffix="'arrowup'">Up</Btn>
        <Btn :suffix="'arrowdown'">Down</Btn>
      </div>
    </demo-item>

    <demo-item name="status" description="按钮状态" :code="status_code" slot="left">
      <div class="btn-group">
        <Btn :disabled="true">Disabled</Btn>
        <Btn :is_loading="true" loading_text="Loading..">Btn</Btn>
      </div>
    </demo-item>

    <demo-item name="style" description="自定义样式" :code="style_code" slot="right">
      <div class="btn-group">
        <Btn :class="'solid-btn'" :prefix="'rollback'">Back</Btn>
        <Btn :class="'star-btn'" :prefix="'star'">Star</Btn>
        <Btn :class="'cir-btn'" :prefix="'search'"></Btn>
        <Btn :class="'fixed-width-btn'" :suffix="'shoppingcart'" :size="'lg'">购买</Btn>
      </div>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';

  .btn-group > button {
    margin: 2px 2px 2px 0;
    vertical-align: bottom;
  }

  .btn-group {
    .solid-btn {
      border: none;
      border-radius: 0;
      color: _white;
      background-color: _blue;

      &:hover {
        background-color: lighten(_blue, 10%);
      }

      &:active {
        background-color: darken(_blue, 10%);
      }
    }
    .star-btn {
      &:hover {
        color: _yellow;
        border-color: _yellow;
      }

      &:active {
        box-shadow: none;
        color: darken(_yellow, 20%);
        border-color: darken(_yellow, 20%);
      }
    }
    .cir-btn {
      border-radius: 50%;
      padding: 0;
      width: _size_md;
    }

    .fixed-width-btn {
      width: 150px;
      color: _white;
      border: none;
      background-color: _red;
      border-radius: 0;

      &:hover {
        background-color: lighten(_red, 10%);
      }

      &:active {
        background-color: darken(_red, 10%);
      }
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        size_code: `
<Btn :size="'sm'">Btn sm</Btn>
<Btn :size="'md'">Btn md</Btn>
<Btn :size="'lg'">Btn lg</Btn>
        `,
        status_code: `
<Btn :disabled="true">Disabled</Btn>
<Btn :is_loading="true" loading_text="Loading..">Btn</Btn>
        `,
        icon_code: `
<Btn :prefix="'arrowleft'">Left</Btn>
<Btn :prefix="'arrowright'">Right</Btn>
<Btn :suffix="'arrowup'">Up</Btn>
<Btn :suffix="'arrowdown'">Down</Btn>
        `,
        style_code: `
<Btn :class="'solid-btn'" :prefix="'rollback'">Back</Btn>
<Btn :class="'star-btn'" :prefix="'star'">Star</Btn>
<Btn :class="'cir-btn'" :prefix="'search'"></Btn>
<Btn :class="'fixed-width-btn'" :suffix="'shoppingcart'" :size="'lg'">购买</Btn>

<style lang="stylus">
.solid-btn {
  border: none;
  border-radius: 0;
  color: _white;
  background-color: _blue;
}
.solid-btn:hover {
  background-color: lighten(_blue, 10%);
}
.solid-btn:active {
  background-color: darken(_blue, 10%);
}

.star-btn:hover {
  color: _yellow;
  border-color: _yellow;
}
.star-btn:active {
  box-shadow: none;
  color: darken(_yellow, 20%);
  border-color: darken(_yellow, 20%);
}

.cir-btn {
  border-radius: 50%;
  padding: 0;
  width: _size_md;
}

.fixed-width-btn {
  width: 150px;
  color: _white;
  border: none;
  background-color: _red;
  border-radius: 0;
}
.fixed-width-btn:hover {
  background-color: lighten(_red, 10%);
}
.fixed-width-btn:active {
  background-color: darken(_red, 10%);
}
</style>
        `
      }
    }
  }
</script>
