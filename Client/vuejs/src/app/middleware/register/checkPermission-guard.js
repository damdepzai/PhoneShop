import store from '../../../stores'

export default (to, from, next) => {
    store.dispatch('userSession/checkLogin').then(() => {
        let isLogin = store.getters['userSession/isLogin']

        if (isLogin) {
            const userInfo = store.getters['userSession/userInfo'];
            if (userInfo && userInfo.email === 'suadmin@phoneshop.com')
                next();
            else if (userInfo && userInfo.roles) {
                let check = false;
                userInfo.roles.every(item => {
                    if (item.permissions.includes(to.meta.permission)) {
                        check = true;
                    }

                    return !check;
                });

                if (check) {
                    next();
                } else {
                    next({path: '/403'})
                }
            }
        } else
            next({path: '/login'})
    }).catch(() => {
        next({path: '/login'})
    })
}
