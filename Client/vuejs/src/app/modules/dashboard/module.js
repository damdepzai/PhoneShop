import AppModule from "../module";
import Guards from '../../middleware/guards'
import {auth, web, checkPermission} from '../../middleware/register'

export default new AppModule('user')
    .routers([
        {
            path: '/',
            component: AppModule.layout.MasterLayout,
            beforeEnter: Guards([web, auth, checkPermission]),
            children: [
                {
                    path: 'dashboard',
                    name: 'user.dashboard',
                    component: () => import('./views/dashboard'),
                    meta:{
                        title:'Biểu đồ thống kê',
                        permission: 'dashboard'
                    }
                }
            ]
        },
        ]) .register()
