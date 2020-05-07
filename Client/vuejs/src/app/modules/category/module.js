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
                    path: 'category',
                    name: 'category',
                    component: () => import('./views/list-category'),
                    meta:{
                        title:'Danh sách danh mục',
                        permission: 'category-view'
                    }
                }
            ]
        },
    ]).register();
