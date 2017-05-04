/* base */
import Loading from './Loading'
import { Row, Col } from './Grid'
import Spinner from './Spinner'
import Btn from './Btn'
import Icon from './Icon'
import Bar from './Bar'

/* data-in */
import Switch from './Switch'

/* data-out */
import Toast from './Toast'

const install = (Vue) => {
  /* component */
  Vue.component(Col.name, Col)
  Vue.component(Row.name, Row)
  Vue.component(Spinner.name, Spinner)
  Vue.component(Btn.name, Btn)
  Vue.component(Icon.name, Icon)
  Vue.component(Bar.name, Bar)
  Vue.component(Switch.name, Switch)

  /* method */
  Vue.use(Loading)
  Vue.use(Toast)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  /* export */
  Loading,
  Row,
  Col,
  Spinner,
  Btn,
  Icon,
  Bar,
  Toast,
  Switch,
  install
}
