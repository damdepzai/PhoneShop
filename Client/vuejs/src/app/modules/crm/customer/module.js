import AppModule from "../../module";
import Guards from '../../../middleware/guards'
import {auth, web, checkPermission} from '../../../middleware/register'

export default new AppModule('customer')
    .routers([
        {
            path: '/customer',
            component: AppModule.layout.MasterLayout,
            beforeEnter: Guards([web,auth,checkPermission]),
            children: [
                {
                    path: '/',
                    name: 'customer.list',
                    component: () => import('./views/customer-list'),
                    meta: {
                        title: 'Danh sách khách hàng',
                        permission: 'customer-view'
                    }
                }
            ]
        }
    ])
    .register()
