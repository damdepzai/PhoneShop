

import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import './service-worker'
import Config from './config'
import {i18n} from './config/i18n-setup'
import Plugin from './plugins'
import Directive from './directive'
import AppComponent from './resources/components'
import AppMixin from './app/mixin'

window.moment = require('moment');

// directive init
Directive(Vue);

// plugin init
Plugin(Vue);

// global app component
AppComponent(Vue);

// add global mixin
AppMixin(Vue);

// init config vendor module
Config.i18nAutoLoad(Vue, {router: router});

// App init
Vue.config.performance = process.env.NODE_ENV !== 'production';
Vue.config.productionTip = false;
Vue.config.devtools=false;

const RootApp = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');

//hook css to head
const addLink = function(url){
    var link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    link.type = 'text/css'; // no need for HTML5
    let a = document.getElementsByTagName('head')[0].appendChild(link); // for IE6
};

setTimeout(()=>{
    addLink('/icons/icons.css');
});

export default RootApp
