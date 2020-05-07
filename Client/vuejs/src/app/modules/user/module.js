

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
                    path: 'user',
                    name: 'user.manager',
                    component: () => import('./views/user-manager'),
                    meta:{
                        title:'Danh sách người dùng',
                        permission: 'user-view'
                    }
                }
            ]
        },
        {
            path:'/',
            component: AppModule.layout.MasterLayout,
            beforeEnter: Guards([web,auth]),
            children:[
                {
                    path:'/user-group',
                    name:'user.group.list',
                    component:() => import('./views/user-group'),
                    meta:{ title:'Nhóm người dùng',
                        permission: 'userGroup-view'
                    }
                },
                {
                    path:'/user-group/:id',
                    name:'user.group.role',
                    component:() => import('./views/user-group-role'),
                    meta:{
                        title:'Danh sách người dùng của nhóm',
                        permission: 'user-view'
                    }
                }
            ]
        },
    ])
    .register()
