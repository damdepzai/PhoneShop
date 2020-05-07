export default [

    {
        header: true,
        title: 'Quản lý hệ thống PhoneShop'
    },
    {
        href: '/dashboard',
        title: 'Bảng điều khiển',
        icon: 'icon-dice-five',
        permission : ["dashboard"]
    },
    {
        title: 'Quản lý danh mục',
        icon: 'icon-star',
        child: [
            {
                href: '/category',
                title: 'Danh sách danh mục',
                permission : 'category-view'
            },


        ],
        permission : ["category-view"]
    },




    {
        title: 'Quản lý người dùng',
        icon: 'icon-user-cog',
        child: [
            {
                href: '/user',
                title: 'Danh sách người dùng',
                permission : 'user-view'
            },
            {
                href: '/user-group',
                title: 'Nhóm người dùng',
                permission : 'userGroup-view'
            }

        ],
        permission : ["user-view", "userGroup-view"]
    },
    {
        title: 'Cài đặt',
        icon: 'icon-cog',
        permission : ["setting"]
    },
]
