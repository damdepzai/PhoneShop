import CustomerVisitHistoryModel from "../models/CustomerVisitHistoryModel";
import customerVisitHistoryService from "../CustomerVisitHistoryService";
import Validate from "../../../../base/validate/Validate"
import IngredientModel from "../../customer_visit_history/models/IngredientModel";
import {mapGetters} from "vuex";

export default {
    data: () => ({
        CustomerVisitHistoryModel: CustomerVisitHistoryModel,
        listCustomerVisitHistory: [],
        selectCustomerVisitHistory: new CustomerVisitHistoryModel(),
        detailCustomerVisitHistory: new CustomerVisitHistoryModel(),
        cloneCustomerVisitHistory: new CustomerVisitHistoryModel(),
        searchForm: {
            year: 'Tất cả',
            name: '',
            start_date: '',
            name_ingredient: '',
            position_ingredient: '',
            page: 0,
            limit: 0,
        },
        showDialogCv: false,
        detailCv: new IngredientModel(),
        selectCv: new IngredientModel(),
        showDialog: false,
        showIngredient: false,
        showSearch: false,
        showDialogFilter: false,
        listCustomer: [],
        listYear: [],
        amount: '',
        isLoading: false,
        isSubmit: false,
        pagination: {
            perPage: 50,
            current: 1,
            total: 0,
        },
        dropdownActive: false,
        permissions: [],
        stt:''
    }),
    watch: {
        'searchForm.year': function (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.initData()
                this.initAmount()
            }
        }
    },
    mounted() {
        this.initData()
        this.initAmount()
    },
    computed: {
        customer_name() {
            return Validate.required(this.cloneCustomerVisitHistory.name)
        },
        startDateFail() {
            return Validate.required(this.cloneCustomerVisitHistory.start_date)
        },
        endDateFail() {
            return Validate.compareDate(this.cloneCustomerVisitHistory.timeStartDate, this.cloneCustomerVisitHistory.timeFinishDate)
        },
        emailFail() {
            return Validate.isEmail(this.cloneCustomerVisitHistory.email)
        },
        ...mapGetters({
            userInfo: 'userSession/userInfo'
        })
    },
    methods: {
        validate() {
            if (this.customer_name) {
                this.setError('customer_name_required', this.$t('customerVisitHistory.customer_name_required'), this.cloneCustomerVisitHistory)
            }
            if (this.startDateFail) {
                this.setError('start_date_required', this.$t('customerVisitHistory.start_date_required'), this.cloneCustomerVisitHistory)
            }
            if (this.endDateFail) {
                this.setError('end_date_greater', this.$t('customerVisitHistory.end_date_greater'), this.cloneCustomerVisitHistory)
            }
            if (this.emailFail) {
                this.setError('email', this.$t('customerVisitHistory.email'), this.detailCustomerVisitHistory)
            }
        },
        countSTT(perPage,currentPage){
            return perPage * (currentPage -1) +1;
        },
        initData() {
            this.userInfo.roles.map(item => {
                this.permissions = [this.permissions, ...item.permissions]
            })
            this.isLoading = true
            customerVisitHistoryService.CustomerVisitHistoryList(this.searchForm)
                .then(response => {
                    this.isLoading = false
                    if (response.data) {
                        if (response.data.data.customers)
                            this.stt = this.countSTT(response.data.data.customerVisitHistories.per_page,response.data.data.customerVisitHistories.current_page)
                            this.listCustomer = response.data.data.customers.map(item => new CustomerVisitHistoryModel(item))
                            this.listCustomerVisitHistory = response.data.data.customerVisitHistories.data.map(item => {
                            const customerVisitHistory = new CustomerVisitHistoryModel(item)
                            customerVisitHistory.convertValue()
                            return customerVisitHistory
                        })
                        this.pagination.total = response.data.data.customerVisitHistories.total
                    }
                })
                .catch(err => {
                    this.$addNotification({
                        color: 'warning',
                        content: err.message,
                    })
                })
        },

        initAmount() {
            customerVisitHistoryService.CustomerVisitHistoryListAmount(this.searchForm)
                .then(response => {
                    if (response.data) {
                        this.listYear = response.data.data.year.map((e) => {
                            return {
                                text: e.year,
                                value: e.year
                            }
                        })
                        this.listYear.unshift({
                            text: 'Tất cả',
                            value: 'Tất cả'
                        })
                        this.amount = response.data.data.amount
                    }
                })
                .catch(err => {
                    this.$addNotification({
                        color: 'warning',
                        content: err.message,
                    })
                })
        },

        showAddCustomerVisitHistory() {
            this.resetError()
            this.cloneCustomerVisitHistory = new CustomerVisitHistoryModel()
            this.cloneCustomerVisitHistory.addIngredient()
            this.showDialog = true
        },

        updateCustomerVisitHistory(customerVisitHistory) {
            this.resetError(this.cloneCustomerVisitHistory)
            this.selectCustomerVisitHistory = customerVisitHistory
            this.cloneCustomerVisitHistory = _.cloneDeep(customerVisitHistory)
            this.cloneCustomerVisitHistory.customer_id = _.find(this.listCustomer, {"id": this.cloneCustomerVisitHistory.customer_id})
            this.showDialog = true
        },

        deleteCustomerVisitHistory(customerVisitHistory, index) {
            this.$openDialog(
                this.$t('customerVisitHistory.deleteAll'),
                '',
                {
                    iconClass: 'icon-trash',
                    okText: this.$t('customerVisitHistory.delete'),
                    cancelText: this.$t('customerVisitHistory.cancel'),
                },
                {
                    onOk: (dialog) => {
                        customerVisitHistoryService.CustomerVisitHistoryDelete(customerVisitHistory.id)
                            .then(response => {
                                this.isLoading = false
                                if (response.data) {
                                    this.listCustomerVisitHistory.splice(index, 1)
                                }
                                this.pagination.total -= 1
                                this.$addNotification({
                                    color: 'success',
                                    content: this.$t('customerVisitHistory.delete_success'),
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
                    }
                }
            )
        },

        reloadData() {
            this.searchForm = {
                year: 'Tất cả',
            }
            this.pagination = {
                perPage: null,
                current: 1,
                total: 0,
            }
            this.initAmount()
            this.initData()
        },


        doSearch() {
            this.initData()
            this.showSearch = false
        },

        onDialogClose() {
            this.showDialog = false
            this.selectCustomerVisitHistory = null
        },
        closeEditContact() {
            this.showDialogCv = false
            this.selectCustomerVisitHistory = null
        },

        searchData(val) {
            this.searchForm.name = val.name
            this.searchForm.start_date = val.start_date
            this.searchForm.name_ingredient = val.name_ingredient
            this.searchForm.position_ingredient = val.position_ingredient
            this.searchForm.page = val.page
            this.searchForm.limit = val.perPage
            this.pagination.current = val.page
            this.pagination.perPage = val.perPage
            this.initData()
        },

        dialogClose(isEdit = false) {
            this.cloneCustomerVisitHistory = []
            this.showDialog = false
            if (!isEdit)
                this.selectCustomerVisitHistory.syncProps(this.cloneCustomerVisitHistory)
        },

        addIngredient() {
            this.cloneCustomerVisitHistory.addIngredient()
        },

        removeIngredient(index) {
            this.cloneCustomerVisitHistory.removeIngredient(index)
        },
        showEditCv(cv, customervisthistory) {
            this.resetError()
            this.detailCustomerVisitHistory = _.clone(customervisthistory)
            this.selectCustomerVisitHistory = customervisthistory
            this.detailCv = _.clone(cv)
            this.selectCv = cv
            this.showDialogCv = true
        },

        submitCustomerVisitHistory() {
            this.detailCustomerVisitHistory = _.cloneDeep(this.cloneCustomerVisitHistory)
            this.resetError()
            this.validate()
            if (!this.isSubmit) {
                if (!this._isError(this.detailCustomerVisitHistory)) {
                    this.isSubmit = true
                    if (this.detailCustomerVisitHistory.id) {
                        customerVisitHistoryService.CustomerVisitHistoryUpdate(this.detailCustomerVisitHistory.id, this.detailCustomerVisitHistory.rawValue())
                            .then(res => {
                                this.isSubmit = false
                                this.isLoading = true
                                let customerVisitHistory = new CustomerVisitHistoryModel(res.data.data)
                                customerVisitHistory.convertValue()
                                this.selectCustomerVisitHistory.syncProps(customerVisitHistory)
                                this.initAmount()
                                this.dialogClose(true)
                                this.$nextTick(() => {
                                    this.isLoading = false
                                })
                                this.$addNotification({
                                    color: 'success',
                                    content: this.$t('customerVisitHistory.update_success'),
                                })
                            })
                            .catch(err => {
                                this.isSubmit = false
                                this.$addNotification({
                                    color: 'warning',
                                    content: err.message,
                                })
                            })
                    }
                    //insert
                    else {
                        customerVisitHistoryService.CustomerVisitHistoryAdd(this.detailCustomerVisitHistory.rawValue())
                            .then(res => {
                                this.pagination.total += 1
                                this.isSubmit = false
                                this.isLoading = true
                                let customerVisitHistory = new CustomerVisitHistoryModel(res.data.data)
                                customerVisitHistory.convertValue()
                                this.listCustomerVisitHistory.unshift(customerVisitHistory)
                                this.initAmount()
                                this.dialogClose()
                                this.$nextTick(() => {
                                    this.isLoading = false
                                })
                                this.$addNotification({
                                    color: 'success',
                                    content: this.$t('customerVisitHistory.create_success'),
                                })
                            })
                            .catch(err => {
                                this.isSubmit = false
                                this.$addNotification({
                                    color: 'warning',
                                    content: err.message,
                                })
                            })
                    }
                }
            }
        },
        submitIngredientCustomerVisitHistory() {

            this.selectCv.syncProps(this.detailCv)

            customerVisitHistoryService.ingredientCustomerVisitHistoryUpdate(this.detailCustomerVisitHistory.id, this.detailCustomerVisitHistory.rawValue())
                .then(res => {
                    this.isSubmit = false
                    let customer = new CustomerVisitHistoryModel(res.data.data)
                    customer.convertValue()

                    this.selectCustomerVisitHistory.syncProps(customer)
                    this.closeEditContact()
                    this.$addNotification({
                        color: 'success',
                        content: this.$t('customerVisitHistory.edit_success'),
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
        openFilter() {
            this.showSearch = true
            this.resetError()
            this.onlyView = false
        },
        closeFilter() {
            this.showSearch = false
        }
    }
}
