
import Vue from 'vue'
import Vuex from 'vuex'
import Modules from './modules'
import MutationType from './mutations-type'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {...Modules},
    strict: process.env.NODE_ENV !== 'production',
    state: {
        isOnline: true,
        prevRoute: '/user'
    },
    mutations: {
        [MutationType.updateOnlineFlag](state, flag) {
            state.isOnline = flag
        },
        [MutationType.updatePrevRouter](state, router) {
            state.prevRoute = router
        }
    },
    actions: {
        updateOnlineFlag({commit}, flag) {
            commit(MutationType.updateOnlineFlag, flag)
        },
        updatePrevRouter({commit}, router){
            commit(MutationType.updatePrevRouter, router)
        }
    }
})
