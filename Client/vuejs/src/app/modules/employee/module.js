import AppModule from "../module";
import Guards from '../../middleware/guards'
import {auth, web} from '../../middleware/register'

export default new AppModule('employee')
    .routers([
        {
            path: '/employee',
            component: AppModule.layout.MasterLayout,
            beforeEnter: Guards([web, auth]),
            children: [
                {
                    path: '/',
                    name: 'employee.list',
                    component: () => import('./views/employee-list'),
                }
            ]
        }
    ])
    .register()
