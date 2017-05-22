import config from '../package.json'

export default {
  name: config.name,
  version: `v${config.version}`,
  links: {
    github: config.homepage
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
        name: 'SmoothScroll',
        cn_name: '平滑滚动',
        path: '/SmoothScroll'
      }, {
        name: 'BackTop',
        cn_name: '回到顶部',
        path: '/BackTop'
      }/* base */]
    }, {
      title: 'Data in',
      components: [{
        name: 'Switch',
        cn_name: '开关',
        path: '/Switch'
      }, {
        name: 'CheckBox',
        cn_name: '多选框',
        path: '/CheckBox'
      }, {
        name: 'Select',
        cn_name: '选择器',
        path: '/Select'
      }, {
        name: 'Input',
        cn_name: '输入栏',
        path: '/Input'
      }, {
        name: 'Radio',
        cn_name: '单选框',
        path: '/Radio'
      }, {
        name: 'Calendar',
        cn_name: '日历',
        path: '/Calendar'
      }/* data-in */]
    }, {
      title: 'Data out',
      components: [{
        name: 'Toast',
        cn_name: '提示',
        path: '/Toast'
      }, {
      //   name: 'Tabs',
      //   cn_name: '标签页',
      //   path: '/Tabs'
      // }, {
        name: 'Tab',
        cn_name: '标签栏',
        path: '/Tab'
      }, {
        name: 'Loadmore',
        cn_name: '加载更多',
        path: '/Loadmore'
      }, {
        name: 'Price',
        cn_name: '价格',
        path: '/Price'
      }, {
        name: 'Swipe',
        cn_name: '走马灯',
        path: '/Swipe'
      }, {
        name: 'Modal',
        cn_name: '弹出层',
        path: '/Modal'
      }, {
        name: 'Popover',
        cn_name: '弹出框',
        path: '/Popover'
      }/* data-out */]
    }]
  }]
}
