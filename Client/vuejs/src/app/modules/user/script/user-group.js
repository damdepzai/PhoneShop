import Validate from "../../../base/validate/Validate"
import RoleModel from "../models/RoleModel";
import UserModel from "../models/UserModel";
import UserService from "../UserService";
import {mapGetters} from "vuex";

export default {
    data: () => ({
        RoleModel: RoleModel,
        selectRole: new RoleModel(),
        detailRole: new RoleModel(),
        listRole: [],
        listPermission: [],
        listPermissionDb: [],
        users: [],
        customer_count: 0,
        person_in_charge_appoint_count: 0,
        pre_sale_count: 0,
        sales_person_appoint_count: 0,
        searchForm: {
            keyword: '',
            perPage: 50,
            current: 1,
            total: 0,
            status: '',
            type: ''
        },
        pagination: {
            perPage: 50,
            current: 1,
            total: 0,
        },
        showDialog: false,
        showSearch: false,
        isLoading: false,
        isSubmit: false,
        indexEdit: '',
        permissions: [],
        stt: '',
        isNameGroup: false,
        array_role:[],
        array_am_presale:[],
        array_am_customers:[],
        array_appoint:[],
    }),
    mounted() {
        this.initData()
    },
    watch: {
        listPermission: {
            handler(val) {
                for (let [key, module] of Object.entries(val)) {
                    let check = false
                    //check cac quyen khac dc tich hay ko
                    module.map(permission => {
                        if (permission.text.search('view') === -1 && permission.flag == true) {
                            check = true
                        }
                    })
                    let item = _.find(module, {'text': (key + '-view')})
                    if (check) {
                        item.flag = true
                        item.disabled = true
                        // module = [...module]
                    } else {
                        item.disabled = false
                    }
                }
            },
            deep: true
        }
    },
    computed: {
        nameOk() {
            return Validate.isNull(this.detailRole.name)
        },
        ...mapGetters({
            userInfo: 'userSession/userInfo'
        })
    },
    methods: {
        countSTT(perPage, currentPage) {
            return perPage * (currentPage - 1) + 1;
        },
        validate() {
            if (this.nameOk)
                this.setError('name_required', this.$t('user.role.name_required'), this.detailRole);
        },
        initData() {
            this.userInfo.roles.map(item => {
                this.permissions = [this.permissions, ...item.permissions]
            })
            this.isLoading = true
            UserService.allRole(this.searchForm)
                .then(response => {
                    this.isLoading = false
                    if (response.data) {
                        this.stt = this.countSTT(response.data.data.role.per_page, response.data.data.role.current_page);
                        this.array_role = response.data.data.array_role;
                        this.array_am_presale = response.data.data.array_am_presale;
                        this.array_am_customers = response.data.data.array_am_customers;
                        this.array_appoint = response.data.data.array_appoint;
                        response.data.data.role.data.map((e) => {
                            let listPers = {}
                            e.permissions.map((item) => {
                                let key = item.split('-')[0]
                                if (!listPers[key]) {
                                    listPers[key] = []
                                }
                                this.$nextTick(() => {
                                    if (item.includes(key)) {
                                        listPers[key].push(item)
                                    }
                                })
                            })
                            e.permissionsGroups = listPers
                        })
                        this.listRole = response.data.data.role.data;
                        // this.listRole= _.sortBy(this.listRole, [function(o) { return o.name.toLowerCase()}]);
                        this.pagination.total = response.data.data.role.total
                    }
                })
                .catch(err => {
                    // this.isLoading = false
                    this.$addNotification({
                        color: 'warning',
                        content: err.message
                    })
                })
        },
        openFilter() {
            this.showSearch = true
        },
        closeFilter() {
            this.showSearch = false
        },
        doSearch() {
            this.showSearch = false,
                this.initData()
        },
        getPermission() {
            UserService.allPermission()
                .then(response => {
                    this.isLoading = false
                    if (response.data) {
                        this.listPermission = response.data.data

                    }
                })
                .catch(err => {
                    // this.isLoading = false
                    this.$addNotification({
                        color: 'warning',
                        content: err.message
                    })
                })
        },
        showAddUserGroup() {
            this.detailRole = new RoleModel()
            this.showDialog = true
            this.isLoading = true
            this.getPermission();

        },
        showEditRole(role) {
            this.detailRole = _.clone(role)
            this.selectRole = role
            this.showDialog = true
            this.isLoading = true
            UserService.allPermission()
                .then(response => {
                    this.isLoading = false
                    if (response.data) {
                        this.listPermission = response.data.data
                        _.toArray(this.listPermission).map((e) => {
                            e.map((item) => {
                                role.permissions.map((el) => {
                                    if (item.text === el) {
                                        item.flag = true
                                    }
                                })
                            })
                        })
                    }
                })
                .catch(err => {
                    // this.isLoading = false
                    this.$addNotification({
                        color: 'warning',
                        content: err.message
                    })
                })

        },
        checkRole(id) {
            let flag = false;
            let id_user=null;
            this.array_role.map(item => {
                    if (item.role_id == id)
                    {
                        id_user =item.id;
                        this.array_am_presale.map(item =>{
                            if (item.account_manager_id == id_user){
                                flag=true
                            }

                        })
                        this.array_am_customers.map(item =>{
                           if (item.account_manager==id_user) {
                               flag=true
                           }

                        })
                        this.array_appoint.map(item =>{
                          if(item.person_in_charge ==id_user ||item.salesperson == id_user){
                              flag=true
                          }
                        })
                    }
            })
            return flag
        },
        deleteRole(role) {
            let alert = '';
            if (this.checkRole(role.id))
                alert = this.$t('user.role.del_role_title');
            else
                alert = this.$t('user.role.conf_del_role_title');

            this.$openDialog(
                alert,
                '',
                {
                    iconClass: 'icon-trash',
                    okText: this.$t('user.delete'),
                    cancelText: this.$t('user.cancel'),
                },
                {
                    onOk: (dialog) => {
                        UserService.removeRole(role.id).then(res => {
                            this.$addNotification({
                                color: 'success',
                                content: 'Xóa nhóm người dùng thành công'
                            })
                            this.initData()
                            dialog.cancelClick()
                        }).catch(err => {
                            this.$addNotification({
                                color: 'warning',
                                content: err.message
                            })
                            dialog.cancelClick()
                        })
                    }
                }
            )
        },
        reloadData() {
            this.searchForm = {
                name: ''
            }
            this.pagination = {
                perPage: null,
                current: 1,
                total: 0,
            }
            this.initData()
        },
        searchData(val) {
            this.searchForm.page = val.page
            this.searchForm.limit = val.perPage
            this.pagination.current = val.page
            this.pagination.perPage = val.perPage
            this.initData()
        },
        onDialogClose() {
            this.showDialog = false;
            this.selectUser = null
        },
        dialogClose() {
            this.resetError()
            this.showDialog = false;
            this.isNameGroup = false;
        },
        submitUserGroup() {
            this.resetError();
            this.validate();
            if (!this.isSubmit) {
                if (!this._isError(this.detailRole)) {
                    // edit
                    this.isSubmit = true
                    this.isLoading = false
                    if (this.detailRole.id) {
                        let arrPers = []
                        _.toArray(this.listPermission).map((e) => {
                            e.map((item) => {
                                if (item.flag) {
                                    arrPers.push(item.text)
                                }
                            })
                        })
                        let data = {
                            name: this.detailRole.name,
                            permissions: arrPers
                        }
                        UserService.updateRole(this.detailRole.id, data)
                            .then(res => {
                                this.initData()
                                this.isLoading = false
                                this.isSubmit = false
                                this.dialogClose()
                                this.$addNotification({
                                    color: 'success',
                                    content: 'Chỉnh sửa nhóm người dùng thành công'
                                })

                            })
                            .catch(err => {
                                this.isNameGroup = true
                                this.isLoading = false
                                this.isSubmit = false
                                // this.$addNotification({
                                //     color: 'warning',
                                //     content: err.message
                                // })
                            })
                    } else { // insert
                        this.getPermission();
                        let arrPers = []
                        _.toArray(this.listPermission).map((e) => {
                            e.map((item) => {
                                if (item.flag) {
                                    arrPers.push(item.text)
                                }
                            })
                        })
                        let data = {
                            name: this.detailRole.name,
                            permissions: arrPers
                        }
                        this.isSubmit = true
                        UserService.addRole(data)
                            .then(res => {
                                this.pagination.total += 1
                                this.isSubmit = false
                                this.isLoading = true
                                this.dialogClose()
                                this.$addNotification({
                                    color: 'success',
                                    content: 'Thêm mới nhóm người dùng thành công'
                                })
                                this.initData()
                            })
                            .catch(err => {
                                this.isSubmit = false
                                // this.isLoading = true
                                this.isNameGroup = true
                                // this.$addNotification({
                                //     color: 'warning',
                                //     content: err.message
                                // });
                                // this.getPermission();
                                // this.$nextTick(() => {
                                //     this.resetError()
                                // })
                            })
                    }
                }

            }
        }
    }
}
