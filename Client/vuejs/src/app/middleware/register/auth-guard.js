
import store from '../../../stores'

export default (to, from, next) => {
    store.dispatch('userSession/checkLogin').then(() => {
        let isLogin = store.getters['userSession/isLogin']

        if (isLogin)
            next()
        else
            next({path: '/login'})
    }).catch(() => {
        next({path: '/login'})
    })
}
