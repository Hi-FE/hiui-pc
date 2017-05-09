export default {
  name: 'Hiui-PC',
  version: 'v1.0.0',
  links: {
    github: 'https://github.com/Hi-FE/hiui-pc'
  },
  nav: [{
    name: 'Overview',
    cn_name: '概述',
    path: '/'
  }, {
    name: 'Standard',
    cn_name: '规范',
    path: '/Standard'
  }, {
    name: 'Color',
    cn_name: '色彩',
    path: '/Color'
  }, {
    name: 'Components',
    cn_name: '组件',
    path: '/Components',
    child: [{
      title: 'Base',
      components: [{
        name: 'Btn',
        cn_name: '按钮',
        path: '/Btn'
      }, {
        name: 'Icon',
        cn_name: '图标',
        path: '/Icon'
      }, {
      //   name: 'Bar',
      //   cn_name: '栏',
      //   path: '/Bar'
      // }, {
        name: 'Spinner',
        cn_name: '加载动画',
        path: '/Spinner'
      }, {
      //   name: 'Grid',
      //   cn_name: '栅格',
      //   path: '/Grid'
      // }, {
        name: 'Loading',
        cn_name: '加载条',
        path: '/Loading'
      }, {
        name: 'Calendar',
        cn_name: '日历',
        path: '/Calendar'
      }/* base */]
    }, {
      title: 'Data in',
      components: [{
        name: 'Switch',
        cn_name: '开关',
        path: '/Switch'
      }/* data-in */]
    }, {
      title: 'Data out',
      components: [{
        name: 'Toast',
        cn_name: '提示',
        path: '/Toast'
      }, {
        name: 'Tabs',
        cn_name: '标签页',
        path: '/Tabs'
      }/* data-out */]
    }]
  }]
}
