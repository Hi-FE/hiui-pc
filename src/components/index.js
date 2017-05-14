/* base */
import Loading from './Loading'
import { Row, Col } from './Grid'
import Spinner from './Spinner'
import Btn from './Btn'
import Icon from './Icon'
import Bar from './Bar'

/* data-in */
import Radio from './Radio'
import Input from './Input'
import {Select, SelectItem} from './Select'
import CheckBox from './CheckBox'
import Switch from './Switch'
import Calendar from './Calendar'

/* data-out */
import { Swipe, SwipeSlide } from './Swipe'
import TabBar from './TabBar'
import Price from './Price'
import Loadmore from './Loadmore'
import { Tabs, TabPane } from './Tabs'
import Toast from './Toast'

import 'purecss/build/base-min.css';
import 'purecss/build/grids-min.css';

const install = (Vue) => {
  /* component */
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeSlide.name, SwipeSlide)
  Vue.component(TabBar.name, TabBar)
  Vue.component(Price.name, Price)
  Vue.component(Radio.name, Radio)
  Vue.component(Input.name, Input)
  Vue.component(Loadmore.name, Loadmore)
  Vue.component(Select.name, Select)
  Vue.component(SelectItem.name, SelectItem)
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
  Swipe,
  TabBar,
  Price,
  Radio,
  Input,
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
