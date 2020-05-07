import AppModule from "../../module";
import Guards from '../../../middleware/guards'
import {auth, web,checkPermission} from '../../../middleware/register'

export default new AppModule('customer-visit-history')
    .routers([
        {
            path: '/customer-visit-history',
            component: AppModule.layout.MasterLayout,
            beforeEnter: Guards([web,auth,checkPermission]),
            children: [
                {
                    path: '/',
                    name: 'customer-visit-history.list',
                    component: () => import('./views/customer-visit-history-list'),
                    meta: {
                        title: 'Lịch sử sang thăm công ty',
                        permission: 'customerVisitHistory-view'
                    }
                }
            ],
        }
    ])
    .register()
