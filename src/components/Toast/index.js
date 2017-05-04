import Toast from './Toast'

//  单例模式
let vm

const install = (Vue) => {
  let Component = Vue.extend(Toast)

  Vue.prototype.$toast = (content, time = 2000, callback) => {
    if (vm) {
      vm.$destroy(true)
      vm = null
    }
    let instance = new Component({
      data: {
        content,
        time,
        callback
      }
    })

    vm = instance.$mount()
    vm.show = true
  }
}

export default {
  install,
  Toast
}