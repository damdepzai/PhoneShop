import Multiselect from './Multiselect'
import multiselectMixin from './multiselectMixin'
import pointerMixin from './pointerMixin'

export {Multiselect, multiselectMixin, pointerMixin}


export default {
    install(Vue) {
        Vue.component('multi-select', Multiselect)
    }
}
