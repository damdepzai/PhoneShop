

import store from '../../../stores'

export default (to, from, next) => {
    if (to.path && to.path === '/login') {
        store.dispatch('userSession/checkLogin').then(() => {
            if (store.getters['userSession/isLogin']) {
                next(store.getters['userSession/userInfo'].profile.defaultPage);
            }
            else next();
        })
    } else {
        next();
    }
};
