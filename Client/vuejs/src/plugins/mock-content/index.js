/*
 * Copyright (c) 2020.
 * Project: Source
 * LastModified: 2/14/20, 3:23 PM
 * Author: diengv < Giáp Văn Điện >
 * Email: diengv@ominext.com
 * File name: index.js
 * File path: D:/Projects/PMS/Source/Client/vuejs/src/plugins/mock-content/index.js
 */

import * as MockComponents from './core/components';
import ColorSwitch from './components/ColorSwitch.vue';

export default {
    install(Vue, options) {
        Object.keys(MockComponents).forEach(c => Vue.component(c, MockComponents[c]));

        Vue.component('ColorSwitch', ColorSwitch);
    }
}
