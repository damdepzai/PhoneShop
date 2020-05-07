/*
 * Copyright (c) 2020.
 * Project: Source
 * LastModified: 2/14/20, 3:23 PM
 * Author: diengv < Giáp Văn Điện >
 * Email: diengv@ominext.com
 * File name: index.js
 * File path: D:/Projects/PMS/Source/Client/vuejs/src/plugins/index.js
 */

// import Notification from './notification'
import Bulma from './bulma'
import Axios from './axios'
import Draggable from './draggable'
import ContentLoading from './mock-content'
import Dialog from './dialog'
import Datepicker from './date-picker'
import MultiSelect from './multi-select'

export default (Vue) => {
    Vue.use(Bulma)
    // Vue.use(Notification)
    // Vue.use(Axios)
    // Vue.use(Draggable)
    // Vue.use(ContentLoading)
    Vue.use(Dialog)
    Vue.use(Datepicker)
    Vue.use(MultiSelect)
}


