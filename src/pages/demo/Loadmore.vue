<template>
  <demo title="Loadmore" class="loadmore-demo">
    <!-- Default -->
    <demo-item name="Default" description="默认" :code="code">
      <Btn @click="setShow('show')" class="show-btn">Show</Btn>
      <Loadmore v-if="show" :load-method="getNextPage" :done="cur >= total">
        <div v-for="item in list" class="block">
          List.{{ item }}
        </div>
      </Loadmore>
    </demo-item>

    <!-- Slot -->
    <demo-item name="Slot" description="自定义Slot内容" :code="slot_code">
      <Btn @click="setShow('slot_show')" class="show-btn">Show</Btn>
      <Loadmore v-if="slot_show" :interval="4" :offset="0" :load-method="getNextPage" :done="cur >= total">
        <div v-for="item in list" class="block">
          List.{{ item }}
        </div>
        <template slot="loading">
          <Icon name="heart" color="rgb(255, 66, 66)" class="float-icon"></Icon>
          Loading more...
        </template>
        <template slot="loadmore" scope="props">
          <Btn @click="props.loadmore" class="blue-btn">点击加载更多</Btn>
        </template>
        <template slot="error" scope="props">
          <Btn @click="props.loadmore" class="error-btn">出错啦，重新加载</Btn>
        </template>
      </Loadmore>
    </demo-item>
  </demo>
</template>

<style lang="stylus" scoped>
  @import '../../style/';

  .block {
    height: 200px;
    width: 100%;
    color: _white;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  _colors = _blue _red _green _yellow _blue_deep _red_deep _green_deep _yellow_deep;
  for color, i in _colors {
    .block:nth-child(8n + {i % 8}) {
      background-color: color;
    }
  }

  .show-btn {
    margin-bottom: 10px;
  }

  .blue-btn {
    width: 80%;
    height: 44px;
    color: _white;
    border-color: _blue;
    background-color: _blue;
  }

  .error-btn {
    width: 80%;
    height: 44px;
    color: _white;
    border-color: _red;
    background-color: _red;
  }

  .float-icon {
    margin-right: 10px;
    animation: float 2s infinite;
  }

  @keyframes float {
    0% {
      transform: translateY(2px);
    }
    50% {
      transform: translateY(-2px);
    }
    100% {
      transform: translateY(2px);
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        cur: 1,
        total: 10,
        show: false,
        slot_show: false,
        count: 5,
        list: [],
        code: `
<Loadmore v-if="show" :load-method="loadmore" :done="cur >= total">
  <div v-for="item in list" class="block">
    {{ item }}
  </div>
</Loadmore>
        `,
        slot_code: `
<Loadmore v-if="slot_show" :interval="4" :offset="0" :load-method="loadmore" :done="cur >= total">
  <div v-for="item in list" class="block">
    {{ item }}
  </div>
  <template slot="loading">
    <Icon name="heart" color="rgb(255, 66, 66)" class="float-icon"></Icon>
    Loading more...
  </template>
  <template slot="loadmore" scope="props">
    <Btn @click="props.loadmore" class="blue-btn">点击加载更多</Btn>
  </template>
  <template slot="error" scope="props">
    <Btn @click="props.loadmore" class="error-btn">出错啦，重新加载</Btn>
  </template>
</Loadmore>
        `
      }
    },
    methods: {
      setShow (name) {
        this.cur = 1
        this.list = []
        clearTimeout(this.timer)
        this.getList(0)
        this[name] = !this[name]
        this[name === 'show' ? 'slot_show' : 'show'] = false
      },
      getNextPage (next, err) {
        this.cur++

        this.getList(2000)
        .then(next)
        .catch((err_msg) => err(err_msg))
      },
      getList (time) {
        // 模拟请求加载列表数据
        return new Promise((resolve, reject) => {
          this.timer = setTimeout(() => {
            //  模拟百分之10的概率出现错误
            if (Math.random() < 0.1) {
              this.cur--
              return reject('未知错误')
            }
            let data = new Array(this.count).fill(this.cur)
            this.list = this.list.concat(data)

            resolve()
          }, time)
        })
      }
    }
  }
</script>
