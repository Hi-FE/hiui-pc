import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    component: require('@/pages/layout'),
    children: [{
      path: '/',
      name: 'Overview',
      component: require('@/pages/views/index.md')
    }, {
      path: '/Standard',
      name: 'Standard',
      component: require('@/pages/views/standard.md')
    }, {
      path: '/Components',
      name: 'Components',
      component: require('@/pages/views/components.md')
    }, {
      path: '/Components/Btn',
      name: 'Btn',
      component: require('@/components/Btn/index.md')
    }, {
      path: '/Components/Icon',
      name: 'Icon',
      component: require('@/components/Icon/index.md')
    }, {
      path: '/Components/Bar',
      name: 'Bar',
      component: require('@/components/Bar/index.md')
    }, {
      path: '/Components/Toast',
      name: 'Toast',
      component: require('@/components/Toast/index.md')
    }, {
      path: '/Components/Switch',
      name: 'Switch',
      component: require('@/components/Switch/index.md')
    }, {
      path: '/Components/Spinner',
      name: 'Spinner',
      component: require('@/components/Spinner/index.md')
    }, {
      path: '/Components/Grid',
      name: 'Grid',
      meta: {
        preview: './#/Grid'
      },
      component: require('@/components/Grid/index.md')
    }/* router */]
  }]
})
