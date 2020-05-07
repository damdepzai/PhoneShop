import CustomerModel from "../models/CustomerModel";
import ContactPointModel from "../models/ContactPointModel";
import CustomerService from "../CustomerService";
import Validate from "../../../../base/validate/Validate"
import {mapGetters} from "vuex";

export default {
    data: () => ({
        CustomerModel: CustomerModel,
        ContactPointModel: ContactPointModel,
        listCustomer: [],
        selectCustomer: new CustomerModel(),
        detailCustomer: new CustomerModel(),
        cloneCustomer: new CustomerModel(),
        searchForm: {
            name: '',
            holding_company: '',
            contact_point: '',
            account_manager: null,
            time_cooperation: '',
            time_stop_cooperation: '',
            status: null,
            time_settlement: '',
            page: 0,
            limit: 0,
        },
        listUser: [],
        userSearch: [],
        showDialog: false,
        showDialogFilter: false,
        showDialogdelete: false,
        isLoading: false,
        isSubmit: false,
        showDialogCp: false,
        detailCp: new ContactPointModel(),
        cloneCp: {},
        selectCp: new ContactPointModel(),
        pagination: {
            perPage: 50,
            current: 1,
            total: 0,
        },
        permissions: [],
        stt:''
    }),
    mounted() {
        this.initData()
    },
    computed: {
        nameOk() {
            return !Validate.isNull(this.detailCustomer.name)
        },
        timeOk() {
            if (this.detailCustomer.time_cooperation && this.detailCustomer.time_stop_cooperation) {
                return Validate.isGreaterDate(this.detailCustomer.timeStopCooperation, this.detailCustomer.timeCooperation)
            } else {
                return true
            }
        },
        ...mapGetters({
            userInfo: 'userSession/userInfo'
        })
    },
    methods: {
        validate() {
            if (!this.nameOk) {
                this.setError('name_required', this.$t('customer.name_required'), this.detailCustomer)
            }
            if (!this.timeOk) {
                this.setError('time_greater', this.$t('customer.time_greater'), this.detailCustomer)
            }
        },
        countSTT(perPage,currentPage){
            return perPage * (currentPage -1) +1;
        },
        async initData() {
            this.userInfo.roles.map(item => {
                this.permissions = [this.permissions, ...item.permissions]
            })
            this.isLoading = true
            await CustomerService.customerList(this.searchForm)
                .then(response => {
                    this.isLoading = false
                    if (response.data) {
                        this.stt = this.countSTT(response.data.data.customers.per_page,response.data.data.customers.current_page )
                        this.userSearch = response.data.data.userSearch.map(item => new CustomerModel(item))
                        this.listUser = response.data.data.users.map(item => new CustomerModel(item))
                        this.listCustomer = response.data.data.customers.data.map((item) => {
                            let customer = new CustomerModel(item)
                            customer.convertValue()
                            return customer
                        })
                        this.pagination.total = response.data.data.customers.total
                    }
                    if (this.searchForm.account_manager)
                        this.searchForm.account_manager = _.find(this.userSearch, {"id": this.searchForm.account_manager})
                })
                .catch(err => {
                    // this.isLoading = false
                    this.$addNotification({
                        color: 'warning',
                        content: err.message,
                    })
                })
        },
        showAddCustomer() {
            this.resetError()
            this.cloneCustomer = new CustomerModel()
            this.cloneCustomer.addContact()
            this.showDialog = true
        },
        showEditCustomer(customer) {
            this.resetError()
            this.selectCustomer = customer
            this.cloneCustomer = _.cloneDeep(customer)
            this.cloneCustomer.account_manager = _.find(this.listUser, {"id": this.cloneCustomer.account_manager})
            this.showDialog = true
        },
        reloadData() {
            this.searchForm = {
                account_manager: null,
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
            this.searchForm.account_manager = val.account_manager
            this.initData()
        },
        onDialogClose() {
            this.showDialog = false
            this.selectCustomer = null
        },
        dialogClose(isEdit = false) {
            this.cloneCustomer = []
            this.showDialog = false
            if (!isEdit) {
                this.selectCustomer.syncProps(this.cloneCustomer)
            }
        },

        submitCustomer() {
            this.detailCustomer = _.cloneDeep(this.cloneCustomer)
            this.resetError()
            this.validate()
            if (!this.isSubmit) {
                // edit
                if (!this._isError(this.detailCustomer)) {
                    this.isSubmit = true
                    if (this.detailCustomer.id) {
                        CustomerService.updateCustomer(this.detailCustomer.id, this.detailCustomer.rawValue())
                            .then(res => {
                                this.isSubmit = false
                                let customer = new CustomerModel(res.data.data)
                                customer.convertValue()
                                this.selectCustomer.syncProps(customer)
                                this.dialogClose(true)

                                this.$addNotification({
                                    color: 'success',
                                    content: this.$t('customer.update_success'),
                                })
                            })
                            .catch(err => {
                                this.$openDialog(
                                    this.$t('customer.confirm_update'),
                                    '',
                                    {
                                        iconClass: 'icon-info-circle',
                                        okText: this.$t('customer.delete'),
                                        cancelText: this.$t('customer.cancel'),
                                    },
                                    {
                                        onOk: (dialog) => {
                                            CustomerService.confirmCustomerUpdate(this.detailCustomer.id, this.detailCustomer.rawValue())
                                                .then(res => {
                                                    this.isSubmit = false
                                                    let customer = new CustomerModel(res.data.data)
                                                    customer.convertValue()
                                                    this.selectCustomer.syncProps(customer)
                                                    this.dialogClose(true)

                                                    this.$addNotification({
                                                        color: 'success',
                                                        content: this.$t('customer.update_success')
                                                    })
                                                })
                                                .catch(err => {
                                                    this.isLoading = false
                                                    this.$addNotification({
                                                        color: 'warning',
                                                        content: err.message,
                                                    })
                                                })
                                            dialog.cancelClick()
                                        },
                                        onCancel: () => {
                                            this.isSubmit = false
                                        }
                                    }
                                )
                            })
                    } else { // insert
                        CustomerService.addCustomer(this.detailCustomer.rawValue())
                            .then(res => {
                                this.pagination.total += 1
                                this.isSubmit = false
                                let customer = new CustomerModel(res.data.data)
                                customer.convertValue()
                                this.listCustomer.unshift(customer)

                                this.dialogClose()
                                this.$addNotification({
                                    color: 'success',
                                    content: this.$t('customer.add_success'),
                                })
                            })
                            .catch(err => {
                                this.$openDialog(
                                    this.$t('customer.confirm_create'),
                                    '',
                                    {
                                        iconClass: 'icon-info-circle',
                                        okText: this.$t('customer.delete'),
                                        cancelText: this.$t('customer.cancel'),
                                    },
                                    {
                                        onOk: (dialog) => {
                                            CustomerService.confirmCustomerCreate(this.detailCustomer.rawValue())
                                                .then(res => {
                                                    this.isSubmit = false
                                                    let customer = new CustomerModel(res.data.data)
                                                    customer.convertValue()
                                                    this.listCustomer.unshift(customer)
                                                    this.dialogClose()
                                                    this.$addNotification({
                                                        color: 'success',
                                                        content: this.$t('customer.add_success')
                                                    })
                                                })
                                                .catch(err => {
                                                    this.isLoading = false
                                                    this.$addNotification({
                                                        color: 'warning',
                                                        content: err.message,
                                                    })
                                                })
                                            dialog.cancelClick()
                                        },
                                        onCancel: () => {
                                            this.isSubmit = false
                                        }
                                    }
                                )
                            })
                    }
                }

            }
        },
        openFilter() {
            this.showDialogFilter = true
        },
        closeFilter() {
            this.showDialogFilter = false
        },
        deleteCustomer(customer, index) {
            if (customer.id) {
                this.$openDialog(
                    this.$t('customer.conf_del_customer_title'),
                    '',
                    {
                        iconClass: 'icon-trash',
                        okText: this.$t('customer.delete'),
                        cancelText: this.$t('customer.cancel'),
                    },
                    {
                        onOk: (dialog) => {
                            CustomerService.removeCustomer(customer.id).then(res => {
                                this.listCustomer.splice(index, 1)
                                this.pagination.total -= 1
                                this.$addNotification({
                                    color: 'success',
                                    content: this.$t('customer.del_customer_success'),
                                })
                            }).catch(err => {
                                this.$addNotification({
                                    color: 'warning',
                                    content: err.message,
                                })
                            })
                            dialog.cancelClick()
                        },
                        onCancel: () => {
                        }
                    }
                )
            }
        },

        addContact() {
            this.cloneCustomer.addContact()
        },
        removeContact(index) {
            this.cloneCustomer.removeContact(index)
        },

        searchCustomer() {
            if ( this.searchForm.account_manager)
                this.searchForm.account_manager=this.searchForm.account_manager.id;
            this.initData()
            this.showDialogFilter = false
        },
        showEditContact(cp, customer) {
            this.resetError()
            this.detailCustomer = _.clone(customer)
            this.selectCustomer = customer
            this.detailCp = _.clone(cp)
            this.selectCp = cp
            this.showDialogCp = true
        },
        closeEditContact() {
            this.showDialogCp = false
            this.selectCustomer = null
        },
        submitCp() {
            this.selectCp.syncProps(this.detailCp)
            CustomerService.updateContact(this.detailCustomer.id, this.detailCustomer.rawValue())
                .then(res => {
                    this.isSubmit = false
                    let customer = new CustomerModel(res.data.data)
                    customer.convertValue()
                    this.selectCustomer.syncProps()
                    this.closeEditContact()
                    this.$addNotification({
                        color: 'success',
                        content: this.$t('contact_point.edit_success'),
                    })
                })
                .catch(err => {
                    this.isSubmit = false
                    this.isLoading = false
                    this.$addNotification({
                        color: 'warning',
                        content: err.message,
                    })
                })
        },
    }
}
