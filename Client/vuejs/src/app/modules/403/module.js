
import AppModule from "../module";
import Guards from "../../middleware/guards";
import {auth, web} from "../../middleware/register";

export default new AppModule('error-403')
    .routers([
        {
            path: '/403',
            name: 'error-403',
            beforeEnter: Guards([web,auth]),
            component: AppModule.layout.MasterLayout,
            children: [
                {
                    path: '/',
                    component: () => import('./views/403'),
                    meta:{
                        title:'403',
                    }
                }
            ]
        },
    ])
    .register()
