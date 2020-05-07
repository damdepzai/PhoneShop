

import BulmaNav from './component/Navbar'
import ModalCard from './component/modal-card'
import Slide from './component/slider'
import NumberInput from './component/number-input'
import FieldInput from './component/field-input'
import InputDropdown from './component/input-dropdown'

export default {
  install (Vue, options) {
    Vue.component('bulma-nav', BulmaNav)
    Vue.component('bulma-modal-card', ModalCard)
    Vue.component('bulma-slide', Slide)
    Vue.component('bulma-number-input', NumberInput)
    Vue.component('bulma-field-input', FieldInput)
    Vue.component('bulma-input-dropdown', InputDropdown)
  }
}
