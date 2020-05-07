/*
 * Copyright (c) 2020.
 * Project: Source
 * LastModified: 2/14/20, 3:23 PM
 * Author: diengv < Giáp Văn Điện >
 * Email: diengv@ominext.com
 * File name: index.js
 * File path: D:/Projects/PMS/Source/Client/vuejs/src/plugins/draggable/index.js
 */

import VueDraggable from './vuedraggable'

export default {
  install(Vue, options) {
    Vue.component('draggable', VueDraggable)
  }
}
