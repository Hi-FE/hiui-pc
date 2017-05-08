# Components

> 组件

## Step.1 添加组件

添加组件

```base
node add ComponentName --cn 组件中文名 --type [base, data-in, data-out]

//  例如添加 Input 组件
node add Input --cn 输入栏 --type data-in
```

添加方法组件

```base
node add ComponentName method --cn 组件中文名 --type [base, data-in, data-out]

//  例如添加 Toast 组件
node add Toast method --cn 提示 --type data-out
```

## Step.2 修改组件

在`/src/components/`目录下找到生成的组件文件夹

```
Component
  | - style/          样式
  | - components/     子组件（未生成）
  | - index.md        组件markdown文档
  | - Component.vue   Vue文件
  | - index.js        入口文件
```

## Step.3 修改组件预览（Demo）

在`/pages/demo/`目录下找到生成的component.vue文件

该文件为组件文档的代码示例



