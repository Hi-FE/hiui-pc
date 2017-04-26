# hiui-pc

> UI components for wantu.cn

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for components with minification
npm run package

# Add Component
node add ComponentName --cn 组件中文名 --type [base, data-in, data-out]

# Add Method Component (e.g: Toast Message)
node add ComponentName method --cn 组件中文名 --type [base, data-in, data-out]

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
