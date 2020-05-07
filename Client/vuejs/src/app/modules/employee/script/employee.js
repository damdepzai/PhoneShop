import EmployeeModel from "../models/EmployeeModel";
import EmployeeService from "../EmployeeService";
import Validate from "../../../base/validate/Validate"

export default {
    data: () => ({
        EmployeeModel: EmployeeModel,
        listEmployee: [],
        selectEmployee: new EmployeeModel(),
        detailEmployee: new EmployeeModel(),
        searchForm:{
            keyword: '',
            page: 0,
            limit: 0,
        },
        id:'',
        changePass: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        pagination: {
            perPage: 10,
            current: 1,
            total: 0,
        },
        showDialog: false,
        showDialogChangePass: false,
        isLoading: false,
        isSubmit: false,
        onlyView: false,
    }),
    computed: {
        nameOk() {
            return !Validate.required(this.detailEmployee.name)
        },
        emailOk() {
            return Validate.isEmail(this.detailEmployee.email)
        },
        employee_codeOk() {
            return !Validate.isEmail(this.detailEmployee.employee_code)
        },
        newPasswordOk() {
            return !Validate.required(this.changePass.newPassword)
        },
        oldPasswordOk() {
            return !Validate.required(this.changePass.oldPassword)
        },
        confirmPasswordOk() {
            return !Validate.required(this.changePass.confirmPassword)
        },

        eqOldNew() {
            return !Validate.isEq(this.changePass.newPassword,this.changePass.oldPassword)
        },

        eqNewConf() {
            return Validate.isEq(this.changePass.newPassword,this.changePass.confirmPassword)
        },

    },
    created() {
        this.initData()
        this.id = this.$store.state.userSession.userInfo.id
    },
    methods: {
        validate() {
            if (!this.nameOk) {
                this.setError('name_required', this.$t('employee.required_name'), this.detailEmployee)
            }
            if (!this.emailOk) {
                this.setError('email_required', this.$t('employee.required_email'), this.detailEmployee)
            }
            if (!this.employee_codeOk) {
                this.setError('employee_code_required', this.$t('employee.required_employee_code'), this.detailEmployee)
            }
        },

        validatePassword() {
            if (!this.newPasswordOk) {
                this.setError('new_password_required', this.$t('employee.password_required'), this.changePass)
            }
            if (!this.oldPasswordOk) {
                this.setError('old_password_required', this.$t('employee.old_password_required'), this.changePass)
            }
            if (!this.confirmPasswordOk) {
                this.setError('confirm_password_required', this.$t('employee.confirm_password_require'), this.changePass)
            }

            if (!this.eqOldNew) {
                this.setError('new_old_eq', this.$t('employee.new_old_require'), this.changePass)
            }

            if (!this.eqNewConf) {
                this.setError('new_new_conf',this.$t('employee.new_new_conf'), this.changePass)
            }
        },
        initData() {
            this.isLoading = true
            EmployeeService.employeeList(this.searchForm)
                .then(response => {
                    this.isLoading = false
                    if (response.data) {
                        this.listEmployee = response.data.data.data.map(item => new EmployeeModel(item))
                        this.pagination.total = response.data.data.total
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
        addEmployee() {
            this.onlyView = false
            this.selectEmployee = new EmployeeModel()
            this.detailEmployee = new EmployeeModel()
            this.showDialog = true
        },
        updateEmployee(employee, index) {
            this.resetError(this.detailEmployee)
            this.onlyView = false
            this.detailEmployee = _.clone(employee)
            this.selectEmployee = employee
            this.showDialog = true
        },
        changeStatus(id) {
            this.isLoading = true
            EmployeeService.changeStatus(id)
                .then(response => {
                    this.isLoading = false
                    this.$addNotification({
                        color: 'success',
                        // content: response.data.message
                        content: this.$t('employee.change')
                    })

                })
                .catch(err => {
                    this.isLoading = false
                    this.$addNotification({
                        color: 'warning',
                        content: err.message
                    })
                })
        },
        changePassword() {
            this.onlyView = false
            this.selectEmployee = new EmployeeModel()
            this.detailEmployee = new EmployeeModel()
            this.showDialogChangePass = true
        },
        deleteEmployee(employee, index) {
            this.$openDialog(
                'Xóa nhân viên',
                'Bạn có muốn xóa nhân viên này không ?',
                {
                    okText: 'Xóa',
                    cancelText: 'Hủy'
                },
                {
                    onOk: (dialog) => {
                        EmployeeService.deleteEmployee(employee.id)
                            .then(response => {
                                this.isLoading = false
                                if (response.data) {
                                    this.listEmployee.splice(index, 1)
                                }
                            })
                            .catch(err => {
                                this.isLoading = false
                                this.$addNotification({
                                    color: 'warning',
                                    content: err.message
                                })
                            })
                        dialog.cancelClick()
                    },
                    onCancel: (dialog) => {
                        dialog.cancelClick()
                    }
                }
            )
        },
        showEmployee(employee, index) {
            this.resetError(this.detailEmployee)
            this.detailEmployee = _.clone(employee)
            this.selectEmployee = employee
            this.showDialog = true
            this.onlyView = true

        },
        reloadData() {
            this.initData()
        },
        Confirm(flag) {
            this.isDelete = flag
            this.showDialogChangePass = false
            if (flag) {
                this.deleteEmployee(this.itemDelete)
            }

        },
        doSearch() {
            this.initData()
        },
        searchData(val) {
            console.log(val)
            this.searchForm.page = val.page
            this.searchForm.limit = val.perPage
            this.pagination.current = val.page
            this.pagination.perPage = val.perPage
            this.initData()
        },
        onDialogClose() {
            this.showDialog = false
            this.selectCustomer = null
            this.showDialogChangePass = false
        },
        dialogClose() {
            this.showDialog = false
        },
        submitPass() {
            this.resetError(this.changePass)
            this.validatePassword()
            console.log(this.eqOldNew)
            if (!this._isError(this.changePass)) {
                EmployeeService.changePassword(this.changePass)
                    .then(res => {
                        this.isSubmit = false
                        this.showDialogChangePass = false,
                            this.$addNotification({
                                color: 'success',
                                content: this.$t('employee.update_password_success')
                            })
                    })
                    .catch(err => {

                        this.$addNotification({
                            color: 'warning',
                            content: err.message
                        })
                    })

            }},

        submitEmployee() {
            this.resetError(this.detailEmployee)
            this.validate()
            if (!this._isError(this.detailEmployee)) {
                if (this.detailEmployee.id) {
                    EmployeeService.updateEmployee(this.detailEmployee.id, this.detailEmployee.rawValue())
                        .then(res => {
                            this.isSubmit = false
                            let employee = new EmployeeModel(res.data.data)
                            this.selectEmployee.syncProps(employee)
                            this.$addNotification({
                                color: 'success',
                                content:this.$t('employee.update_employee_success')
                            })
                            this.dialogClose()
                        })
                        .catch(err => {
                            this.isSubmit = false
                            this.$addNotification({
                                color: 'warning',
                                content: err.message
                            })
                        })
                } else {
                    EmployeeService.addEmployee(this.detailEmployee.rawValue())
                        .then(res => {
                            this.isSubmit = false
                            let employee = new EmployeeModel(res.data.data)
                            this.listEmployee.push(employee)
                            this.dialogClose()

                            this.$addNotification({
                                color: 'success',
                                content: this.$t('employee.add_user_success')
                            })
                        })
                        .catch(err => {
                            // this.isSubmit = false
                            this.$addNotification({
                                color: 'warning',
                                content: err.message
                            })
                        })
                }
            }
        }
    }
}
