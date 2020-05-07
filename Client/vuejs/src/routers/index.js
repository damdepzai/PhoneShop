
import Vue from 'vue'
import Router from 'vue-router'

import {LoadView} from './ulti'
import BodyClass from "./body-class"
import store from '../stores'

Vue.use(Router);

const requireModule = require.context('@/app/modules', true, /module.js$/);
const moduleRouter = [];
requireModule.keys().map(fileName => {
    if (fileName !== './module.js') {
        const module = {...requireModule(fileName).default};
        if (module.isActive) {
            if (Array.isArray(module._routers))
                moduleRouter.push(...module._routers);
            else
                moduleRouter.push(module._routers)
        }
    }
});
// console.log(moduleRouter)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'is-active',
    // exact: false,
    routes: [
        {
            path: "*",
            component: LoadView('Home')
        },
        /*{
            path: "*",
            component: LoadView('errors/page-not-found')
        },*/
        ...moduleRouter
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? to.meta.title : document.title
    const skip = ['/login'];
    if (skip.indexOf(from.path) === -1) store.dispatch('updatePrevRouter', from);

    next()
});

new BodyClass(router);

export default router
