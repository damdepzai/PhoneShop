import AppModule from "../../module";
import Guards from '../../../middleware/guards'
import {auth, web, checkPermission} from '../../../middleware/register'

export default new AppModule('pre-sale')
    .routers([
        {
            path: '/pre-sale',
            component: AppModule.layout.MasterLayout,
            beforeEnter: Guards([web, auth, checkPermission]),
            children: [
                {
                    path: '/',
                    name: 'pre-sale.list',
                    component: () => import('./views/pre-sale-list'),
                    meta: {
                        title: 'Danh sách Presales',
                        permission: 'preSales-view'
                    }
                },
                {
                    path: '/pre-sale/detail/:id',
                    name: 'pre-sale.detail',
                    component: () => import('./views/pre-sale-detail'),
                    meta: {
                        title: 'Thông tin chi tiết presales',
                        permission: 'preSales-detail'
                    }
                }
            ]
        }
    ])
    .register()
