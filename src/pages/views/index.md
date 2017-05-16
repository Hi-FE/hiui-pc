# Hiui-PC

> 移动端组件库

## 开发环境

```bash
$ npm run dev
```

## 生产环境（demo）

```bash
$ npm run build
```

## 生产环境（library）

```bash
$ npm run package
```

## 使用

```bash
$ npm install hiui-pc --save
```

### 全部引入

```js
import hiuipc from 'hiui-pc'
import 'hiui-pc/dist/hiuipc.css'

Vue.use(hiuipc)
```

### 单个组件引入

> 需要安装 stylus-loader / stylus 依赖

```html
<template>
  <Btn size="lg">Hiui-PC</Btn>
</template>

<script>
  import Btn from 'hiui-pc/src/components/Btn'

  export default {
    components: {
      Btn
    }
  }
</script>
```

#### 使用 `webpack` 配置模块别名 `alias` 单个引入

```js
module.exports = {
  // ...
  resolve: {
    alias: {
      'hiui': 'hiui-pc/src/components'
    }
  }
}
```

使用

```js
import Btn from 'hiui/Btn'
```