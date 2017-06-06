/* base */
import BackTop from './BackTop'
import SmoothScroll from './SmoothScroll'
import Loading from './Loading'
import Spinner from './Spinner'
import Btn from './Btn'
import Icon from './Icon'

/* data-in */
// import vCalendar from './vCalendar'
import Calendar from './Calendar'
import Radio from './Radio'
import Input from './Input'
import {Select, SelectItem} from './Select'
import CheckBox from './CheckBox'
import Switch from './Switch'

/* data-out */
import Popover from './Popover'
import Modal from './Modal'
import { Swipe, SwipeSlide } from './Swipe'
import Tab from './Tab'
import Price from './Price'
import Loadmore from './Loadmore'
import Toast from './Toast'

const install = (Vue) => {
  /* component */
  // Vue.component(vCalendar.name, vCalendar)
  Vue.component(Calendar.name, Calendar)
  Vue.component(BackTop.name, BackTop)
  Vue.component(Modal.name, Modal)
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeSlide.name, SwipeSlide)
  Vue.component(Tab.name, Tab)
  Vue.component(Price.name, Price)
  Vue.component(Radio.name, Radio)
  Vue.component(Input.name, Input)
  Vue.component(Loadmore.name, Loadmore)
  Vue.component(Select.name, Select)
  Vue.component(SelectItem.name, SelectItem)
  Vue.component(CheckBox.name, CheckBox)
  Vue.component(Spinner.name, Spinner)
  Vue.component(Btn.name, Btn)
  Vue.component(Icon.name, Icon)
  Vue.component(Switch.name, Switch)

  /* method */
  // Vue.use(vCalendar)
  Vue.use(Popover)
  Vue.use(SmoothScroll)
  Vue.use(Loading)
  Vue.use(Toast)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  /* export */
  // vCalendar,
  Calendar,
  Popover,
  BackTop,
  SmoothScroll,
  Modal,
  Swipe,
  Tab,
  Price,
  Radio,
  Input,
  Loadmore,
  Select,
  CheckBox,
  Loading,
  Spinner,
  Btn,
  Icon,
  Toast,
  Switch,
  install
}
