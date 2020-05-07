/*
 * Copyright (c) 2020.
 * Project: Source
 * LastModified: 2/14/20, 3:23 PM
 * Author: diengv < Giáp Văn Điện >
 * Email: diengv@ominext.com
 * File name: manager.js
 * File path: D:/Projects/PMS/Source/Client/vuejs/src/app/modules/user/script/manager.js
 */

import UserModel from "../models/UserModel";
import UserService from "../UserService";
import Validate from "../../../base/validate/Validate"
import PaginateModel from "../../../base/PaginateModel";
import {mapGetters} from "vuex";


export default {
    data: () => ({
        UserModel: UserModel,
        listUser: [],
        listRole: {},
        listRoleAll:[],
        selectUser: new UserModel(),
        detailUser: new UserModel(),
        checkEmail:false,
        customer_count: 0,
        person_in_charge_appoint_count: 0,
        pre_sale_count: 0,
        sales_person_appoint_count: 0,
        role_id:'',
        searchForm: {
            role_id: null,
            name: '',
            email: '',
            status: null,
            keyword: '',
            perPage: 0,
            limit: 0,
        },
        pagination: {
            perPage: 50,
            current: 1,
            total: 0,
        },
        showDialog: false,
        isLoading: false,
        isSubmit: false,
        showSearch: false,
        permissions: [],
        stt:''
    }),
    mounted() {
        this.initData()
    },
    computed: {
        nameOk() {
            return Validate.isNull(this.detailUser.name)
        },
        emailOk() {
            return Validate.isNull(this.detailUser.email)
        },
        emailFormat() {
            return !Validate.isEmailPm(this.detailUser.email)
        },
        passwordOk(){
            return Validate.isNull(this.detailUser.password)
        },
        passwordLength() {
            return Validate.isPassword(this.detailUser.password)
        },
        groupOk(){
            return Validate.isNull(this.detailUser.role_id)
        },
        statusOk(){
            return Validate.isNull(this.detailUser.status)
        },
        ...mapGetters({
            userInfo: 'userSession/userInfo'
        })
    },
    methods: {
        validate() {
            if (this.nameOk)
                this.setError('username_required', this.$t('user.username_required'), this.detailUser);
            if (this.emailOk)
                this.setError('email_required', this.$t('user.email_required'), this.detailUser);
            if (this.emailFormat && !this.emailOk)
                this.setError('email_format', this.$t('user.email_format'), this.detailUser);
            if (!this.passwordLength && !this.passwordOk)
                this.setError('password_length', this.$t('user.password_length'), this.detailUser);
            if (this.groupOk)
                this.setError('group_required', this.$t('user.group_required'), this.detailUser);
            if (this.passwordOk && !this.detailUser.id)
                this.setError('password_required', this.$t('user.password_required'), this.detailUser);
            if (!this.passwordLength && !this.detailUser.id && !this.passwordOk)
                this.setError('password_new', this.$t('user.password_new'), this.detailUser);
            if (this.statusOk)
                this.setError('status_required', this.$t('user.status_required'), this.detailUser);
        },
        countSTT(perPage,currentPage){
            return perPage * (currentPage -1) +1;
        },
        async initData() {
            this.userInfo.roles.map(item => {
                this.permissions = [this.permissions, ...item.permissions]
            })
            this.role_id=this.$route.params.id;
            this.isLoading = true
            await UserService.allUserGroupRole(this.role_id,this.searchForm)
                .then(response => {
                    this.isLoading = false
                    if (response.data) {
                        this.listRole = response.data.data.role;
                        this.stt=this.stt = this.countSTT(response.data.data.user.per_page,response.data.data.user.current_page )
                        this.listRoleAll = response.data.data.roleAll;
                        this.listUser = response.data.data.user.data.map((e) => {
                            return new UserModel(e)
                        })
                        this.pagination.total = response.data.data.user.total
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
            this.initData()
            this.showSearch = false
        },
        showAddUser() {
            this.resetError();
            this.detailUser = new UserModel();
            this.showDialog = true
        },
        showEditUser(user) {
            this.resetError();
            this.detailUser = _.clone(user)
            this.selectUser = user
            this.showDialog = true
        },
        deleteUser(user) {
            let alert = '';
            if (user.customer_count + user.person_in_charge_appoint_count + user.pre_sale_count + user.sales_person_appoint_count > 0){
                alert = this.$t('user.manager.del_user_title')
            }
            else {
                alert = this.$t('user.manager.conf_del_user_title')

            }
            this.$openDialog(
                alert,
                '',
                {

                    iconClass: 'icon-trash',
                    okText: this.$t('preSale.delete'),
                    cancelText: this.$t('preSale.cancel'),
                },
                {
                    onOk: (dialog) => {
                        UserService.removeUser(user.id).then(res => {
                            this.pagination.total -= 1
                            this.$addNotification({
                                color: 'success',
                                content: 'Xóa người dùng thành công'
                            })
                            this.initData()
                            dialog.cancelClick()
                        })
                    }
                }
            )
        },
        reloadData() {
            this.searchForm = {
                role_id: null,
                status: null,
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
            this.showDialog = false
            this.selectUser = null
        },
        dialogClose() {
            this.checkEmail=false;
            this.showDialog = false
        },
        submitUserGroupRole() {
            this.detailUser.role_id = this.role_id;
            this.resetError()
            this.validate()
            if (!this.isSubmit) {
                if (!this._isError(this.detailUser)) {
                    if (this.detailUser.id) {
                        // edit
                        UserService.updateUser(this.detailUser.id, this.detailUser.rawValueUserGroupRole())
                            .then(res => {
                                this.isSubmit = false;
                                this.selectUser.syncProps(res.data.data)
                                this.dialogClose(true)
                                this.$addNotification({
                                    color: 'success',
                                    content: 'Chỉnh sửa người dùng thành công'
                                })
                            })
                            .catch(err => {
                                this.checkEmail = true;
                                this.isSubmit = false
                                // this.$addNotification({
                                //     color: 'warning',
                                //     content: err.message
                                // })
                            })
                    } else {
                        //create
                        this.isSubmit = true;
                        UserService.addUser(this.detailUser.rawValueUserGroupRole())
                            .then(res => {
                                this.initData();
                                this.pagination.total += 1;
                                this.listUser.unshift(res.data.data);
                                this.isSubmit = false;
                                this.dialogClose();
                                this.$addNotification({
                                    color: 'success',
                                    content: 'Thêm mới người dùng thành công',
                                })
                            })
                            .catch(err => {
                                this.checkEmail = true;
                                this.isSubmit = false
                                // this.$addNotification({
                                //     color: 'warning',
                                //     content: err.message,
                                // })
                            })
                    }
                }

            }
        }
    }
}
