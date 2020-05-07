

import LongPress from './longpress'
import NumberOnly from './numberOnly'
import PriceConverter from './price-converter'
import Tooltip from './tooltip-v2'

export default (Vue) => {
    Vue.directive('longpress', LongPress)
    Vue.directive('numericOnly', NumberOnly)
    Vue.directive('price-converter', PriceConverter)
    Vue.directive('tooltip', Tooltip)
}

