import Loading from './Loading'

//  单例模式
let vm

const install = (Vue) => {
  let Component = Vue.extend(Loading)

  Vue.prototype.$loading = {
    start () {
      if (vm) {
        vm.$destroy(true)
        vm = null
      }

      let instance = new Component({
        data: {
          process: 0,
          status: 'loading'
        }
      })

      vm = instance.$mount()
      vm.start()
    },
    success () {
      vm.process = 100
      vm.status = 'success'
    },
    error () {
      vm.process = 100
      vm.status = 'error'
    }
  }
}

export default {
  install,
  Loading
}