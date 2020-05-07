import AppModule from "../module";
import Guards from '../../middleware/guards'
import {auth, web} from '../../middleware/register'

export default new AppModule('master-data')
    .routers([
        {
            path: '/master-data',
            component: AppModule.layout.MasterLayout,
            beforeEnter: Guards([web, auth]),
            children: [
                {
                    path: '/',
                    name: 'master-data.list',
                    component: () => import('./views/master-data'),
                }
            ]
        }
    ])
    .register()
