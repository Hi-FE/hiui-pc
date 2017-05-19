import { scrollToElem, scrollTo } from './SmoothScroll.js'

const install = (Vue) => {
  Vue.prototype.$smoothScroll = (target, ...arg) => {
    if (target && target.nodeType === 1) {
      scrollToElem(target, ...arg)
    } else {
      scrollTo(target || 0, ...arg)
    }
  }
}

export default {
  install
}