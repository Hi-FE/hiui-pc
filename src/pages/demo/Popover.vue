<template>
  <demo title="Popover" class="popover-demo">
    <demo-item name="placement" description="位置" :code="code" slot="left">
      <div class="wrap">
        <div class="top">
          <Popover placement="top-left">
            <div class="test">
              Popover <br />
              This is a test txt.
            </div>
            <Btn slot="reference">上左</Btn>
          </Popover>
          <Popover placement="top">
            <div class="test">
              Popover <br />
              This is a test txt.
            </div>
            <Btn slot="reference">上中</Btn>
          </Popover>
          <Popover placement="top-right">
            <div class="test">
              Popover <br />
              This is a test txt.
            </div>
            <Btn slot="reference">上右</Btn>
          </Popover>
        </div>

        <div class="center">
          <div class="left">
            <Popover placement="left-top">
              <div class="test">
                Popover <br />
                This is a test txt.
              </div>
              <Btn slot="reference">左上</Btn>
            </Popover>
            <Popover placement="left">
              <div class="test">
                Popover <br />
                This is a test txt.
              </div>
              <Btn slot="reference">左中</Btn>
            </Popover>
            <Popover placement="left-bottom">
              <div class="test">
                Popover <br />
                This is a test txt.
              </div>
              <Btn slot="reference">左下</Btn>
            </Popover>
          </div>

          <div class="right">
            <Popover placement="right-top">
              <div class="test">
                Popover <br />
                This is a test txt.
              </div>
              <Btn slot="reference">右上</Btn>
            </Popover>
            <Popover placement="right">
              <div class="test">
                Popover <br />
                This is a test txt.
              </div>
              <Btn slot="reference">右中</Btn>
            </Popover>
            <Popover placement="right-bottom">
              <div class="test">
                Popover <br />
                This is a test txt.
              </div>
              <Btn slot="reference">右下</Btn>
            </Popover>
          </div>
        </div>

        <div class="bottom">
          <Popover placement="bottom-left">
            <div class="test">
              Popover <br />
              This is a test txt.
            </div>
            <Btn slot="reference">下左</Btn>
          </Popover>
          <Popover placement="bottom">
            <div class="test">
              Popover <br />
              This is a test txt.
            </div>
            <Btn slot="reference">下中</Btn>
          </Popover>
          <Popover placement="bottom-right">
            <div class="test">
              Popover <br />
              This is a test txt.
            </div>
            <Btn slot="reference">下右</Btn>
          </Popover>
        </div>
      </div>
    </demo-item>

    <demo-item name="trigger" description="触发类型" :code="code" slot="right">
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
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';

  .wrap {
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

  .test {
    padding: 10px;
    // box-shadow: 0 0 1px 1px rgba(0, 0, 0, .16);
    border-radius: 4px;
  }
</style>

<script>
  export default {
    data () {
      return {
        show: true,
        code: `
<Popover></Popover>
        `
      }
    }
  }
</script>
