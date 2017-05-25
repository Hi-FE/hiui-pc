<template>
  <demo title="Popover" class="popover-demo">
    <demo-item name="placement" description="位置" :code="code" slot="left">
      <div class="wrap">
        <div class="top">
          <Popover :placement="'top-left'">
            <div class="test">
              Popover <br />
              This is a test txt.
            </div>
            <Btn slot="reference">上左</Btn>
          </Popover>
          <Popover :placement="'top'">
            <div class="test">
              Popover <br />
              This is a test txt.
            </div>
            <Btn slot="reference">上中</Btn>
          </Popover>
          <Popover :placement="'top-right'">
            <div class="test">
              Popover <br />
              This is a test txt.
            </div>
            <Btn slot="reference">上右</Btn>
          </Popover>
        </div>

        <div class="center">
          <div class="left">
            <Popover :placement="'left-top'">
              <div class="test">
                Popover <br />
                This is a test txt.
              </div>
              <Btn slot="reference">左上</Btn>
            </Popover>
            <Popover :placement="'left'">
              <div class="test">
                Popover <br />
                This is a test txt.
              </div>
              <Btn slot="reference">左中</Btn>
            </Popover>
            <Popover :placement="'left-bottom'">
              <div class="test">
                Popover <br />
                This is a test txt.
              </div>
              <Btn slot="reference">左下</Btn>
            </Popover>
          </div>

          <div class="right">
            <Popover :placement="'right-top'">
              <div class="test">
                Popover <br />
                This is a test txt.
              </div>
              <Btn slot="reference">右上</Btn>
            </Popover>
            <Popover :placement="'right'">
              <div class="test">
                Popover <br />
                This is a test txt.
              </div>
              <Btn slot="reference">右中</Btn>
            </Popover>
            <Popover :placement="'right-bottom'">
              <div class="test">
                Popover <br />
                This is a test txt.
              </div>
              <Btn slot="reference">右下</Btn>
            </Popover>
          </div>
        </div>

        <div class="bottom">
          <Popover :placement="'bottom-left'">
            <div class="test">
              Popover <br />
              This is a test txt.
            </div>
            <Btn slot="reference">下左</Btn>
          </Popover>
          <Popover :placement="'bottom'">
            <div class="test">
              Popover <br />
              This is a test txt.
            </div>
            <Btn slot="reference">下中</Btn>
          </Popover>
          <Popover :placement="'bottom-right'">
            <div class="test">
              Popover <br />
              This is a test txt.
            </div>
            <Btn slot="reference">下右</Btn>
          </Popover>
        </div>
      </div>
    </demo-item>

    <demo-item name="trigger" description="触发类型" :code="trigger_code" slot="right">
      <Popover>
        <div class="test">
          Popover <br />
          This is a test txt.
        </div>
        <Btn slot="reference">Click</Btn>
      </Popover>
      <Popover trigger="hover">
        <div class="test">
          Popover <br />
          This is a test txt.
        </div>
        <Btn slot="reference">Hover</Btn>
      </Popover>
      <Popover trigger="focus">
        <div class="test">
          Popover <br />
          This is a test txt.
        </div>
        <Btn slot="reference">Focus</Btn>
      </Popover>
      <Popover trigger="manual" ref="manual_popover">
        <div class="test">
          Popover <br />
          This is a test txt.
        </div>
        <Btn slot="reference" @click="$refs.manual_popover.toggle()">Manual</Btn>
      </Popover>
    </demo-item>

    <demo-item name="directive" description="通过指令触发, `Popover` 必须在 触发元素之前" :code="directive_code" slot="right">
      <Popover ref="popover">
        <div class="test">
          Popover <br />
          This is a test txt.
        </div>
      </Popover>
      <Btn v-popover:popover>Click</Btn>
    </demo-item>

    <demo-item name="event" description="回调事件" :code="event_code" slot="right">
      <Popover ref="popover" @show="$toast('Show')" @hide="$toast('hide')">
        <div class="test">
          Popover <br />
          This is a test txt.
        </div>
        <Btn slot="reference">Click</Btn>
      </Popover>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';

  .wrap {
    width: 350px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .center {
      display: flex;
      justify-content: space-between;
    }

    .top, .bottom {
      display: flex;
      justify-content: center;
    }

    .left, .right {
      display: flex;
      flex-direction: column;
    }

    .hiui-btn {
      margin: 5px;
    }
  }

  .shadow-popover {
    padding: 10px;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, .36);
  }

  .test {
    padding: 10px;
  }
</style>

<script>
  export default {
    data () {
      return {
        show: true,
        val: '',
        code: `
<Popover :placement="'top-left'">
  <content></content>
  <Btn slot="reference">上左</Btn>
</Popover>

<Popover :placement="'top'">
  <content></content>
  <Btn slot="reference">上中</Btn>
</Popover>

<Popover :placement="'top-right'">
  <content></content>
  <Btn slot="reference">上右</Btn>
</Popover>

<Popover :placement="'left-top'">
  <content></content>
  <Btn slot="reference">左上</Btn>
</Popover>

<Popover :placement="'left'">
  <content></content>
  <Btn slot="reference">左中</Btn>
</Popover>

<Popover :placement="'left-bottom'">
  <content></content>
  <Btn slot="reference">左下</Btn>
</Popover>

<Popover :placement="'right-top'">
  <content></content>
  <Btn slot="reference">右上</Btn>
</Popover>

<Popover :placement="'right'">
  <content></content>
  <Btn slot="reference">右中</Btn>
</Popover>

<Popover :placement="'right-bottom'">
  <content></content>
  <Btn slot="reference">右下</Btn>
</Popover>

<Popover :placement="'bottom-left'">
  <content></content>
  <Btn slot="reference">下左</Btn>
</Popover>

<Popover :placement="'bottom'">
  <content></content>
  <Btn slot="reference">下中</Btn>
</Popover>

<Popover :placement="'bottom-right'">
  <content></content>
  <Btn slot="reference">下右</Btn>
</Popover>
        `,
        trigger_code: `
<Popover>
  <content></content>
  <Btn slot="reference">Click</Btn>
</Popover>

<Popover trigger="hover">
  <content></content>
  <Btn slot="reference">Hover</Btn>
</Popover>

<Popover trigger="focus">
  <content></content>
  <Btn slot="reference">Focus</Btn>
</Popover>

<Popover trigger="manual" ref="manual_popover">
  <content></content>
  <Btn slot="reference" @click="$refs.manual_popover.toggle()">Manual</Btn>
</Popover>

        `,
        directive_code: `
<Popover ref="popover">
  <content></content>
</Popover>
<Btn v-popover:popover>Click</Btn>
        `,
        event_code: `
<Popover ref="popover" @show="$toast('Show')" @hide="$toast('hide')">
  <content></content>
  <Btn slot="reference">Click</Btn>
</Popover>
        `
      }
    }
  }
</script>
