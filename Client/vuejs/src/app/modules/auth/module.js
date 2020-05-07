

import AppModule from '../module'
import UserSession from './store/user-session'
import Guards from '../../middleware/guards'
import {web} from '../../middleware/register'

export default new AppModule('auth')
    .store([UserSession])
    .routers([
        {
            path: '',
            component: AppModule.layout.DefaultLayout,
            beforeEnter: Guards([web]),
            children: [
                {
                    path: 'login',
                    name: 'auth.login',
                    component: () => import('./views/login'),
                    meta: {bodyClass: 'body-login', title: 'Ominext Customer Relationship Management'},
                },
                {
                    path: 'reset-password',
                    name: 'auth.rePassword',
                    component: () => import('./views/re-password'),
                    meta: {bodyClass: 'body-rePassword', title: 'Quên mật khẩu'}
                },
                {
                    path: 'change-password',
                    name: 'auth.change.password',
                    component: () => import('./views/change-password'),
                    meta: {bodyClass: 'body-change-password', title: 'Mật khẩu mới'}
                }
            ]
        }
    ])
    .register()
