import AppModule from "../../module";
import Guards from '../../../middleware/guards'
import {auth, web, checkPermission} from '../../../middleware/register'

export default new AppModule('appoint')
    .routers([
        {
            path: '/appoint',
            component: AppModule.layout.MasterLayout,
            beforeEnter: Guards([web, auth, checkPermission]),
            children: [
                {
                    path: '/',
                    name: 'appoint.list',
                    component: () => import('./views/appoint-list'),
                    meta: {
                        title: 'Danh sách Appoint',
                        permission: 'appoint-view'
                    }
                }
            ]
        }
    ])
    .register()
