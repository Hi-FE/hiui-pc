/* base */
import Loading from './Loading'
import { Row, Col } from './Grid'
import Spinner from './Spinner'
import Btn from './Btn'
import Icon from './Icon'
import Bar from './Bar'

/* data-in */
import Select from './Select'
import CheckBox from './CheckBox'
import Switch from './Switch'
import Calendar from './Calendar'

/* data-out */
import Loadmore from './Loadmore'
import { Tabs, TabPane } from './Tabs'
import Toast from './Toast'

const install = (Vue) => {
  /* component */
  Vue.component(Loadmore.name, Loadmore)
  Vue.component(Select.name, Select)
  Vue.component(CheckBox.name, CheckBox)
  Vue.component(Tabs.name, Tabs)
  Vue.component(TabPane.name, TabPane)
  Vue.component(Col.name, Col)
  Vue.component(Row.name, Row)
  Vue.component(Spinner.name, Spinner)
  Vue.component(Btn.name, Btn)
  Vue.component(Icon.name, Icon)
  Vue.component(Bar.name, Bar)
  Vue.component(Switch.name, Switch)
  Vue.component(Calendar.name, Calendar)

  /* method */
  Vue.use(Calendar)
  Vue.use(Loading)
  Vue.use(Toast)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  /* export */
  Loadmore,
  Select,
  CheckBox,
  Calendar,
  TabPane,
  Tabs,
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
