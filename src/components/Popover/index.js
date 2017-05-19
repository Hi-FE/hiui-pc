import Popover from './Popover'
import { on, off } from '@/tools'

let map = new Map()

const install = (Vue) => {
  Vue.directive('popover', {
    bind (el, binding, vnode) {
      let trigger = Object.keys(binding.modifiers)
      if (trigger.length === 0) {
        trigger.push('click')
      }

      let open = createHandleFunc('open', el, binding, vnode)
      let close = createHandleFunc('close', el, binding, vnode)
      let toggle = createHandleFunc('toggle', el, binding, vnode)
      let handleDocumentClick = createHandleFunc('handleDocumentClick', el, binding, vnode)

      let unbindFunc = () => {
        off(el, 'mouseenter', open)
        off(el, 'mouseleave', close)
        off(el, 'click', toggle)
        off(document, 'click', handleDocumentClick)
        off(el, 'focus', open)
        off(el, 'blur', close)
      }

      map.set(el, unbindFunc)

      Array.from(trigger, (type) => {
        switch (type) {
          case 'hover': {
            on(el, 'mouseenter', open)
            on(el, 'mouseleave', close)
            break
          }
          case 'click': {
            on(el, 'click', toggle)
            on(document, 'click', handleDocumentClick)
            break
          }
          case 'focus': {
            on(el, 'focus', open)
            on(el, 'blur', close)
            break
          }
          default: {
            break
          }
        }
      })
    },
    unbind (el) {
      if (map.has(el)) {
        map.get(el)()
      }
    }
  })

  Vue.component(Popover.name, Popover)
}

function createHandleFunc (name, el, binding, vnode) {
  return function (e) {
    let $target = vnode.context.$refs[binding.arg]
    $target.$data.elem = el

    if (!$target) {
      return false
    }
    $target[name](e)
  }
}

export default {
  install,
  Popover
}