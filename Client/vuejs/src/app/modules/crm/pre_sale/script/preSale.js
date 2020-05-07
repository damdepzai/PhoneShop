import PreSaleModel from "../models/PreSaleModel";
import preSaleService from "../PreSaleService";
import Validate from "../../../../base/validate/Validate"
import {mapGetters} from "vuex";

export default {
    data: () => ({
        listPreSale: [],
        PreSaleModel: PreSaleModel,
        selectPreSale: new PreSaleModel(),
        detailPreSale: new PreSaleModel(),
        clonePreSale: new PreSaleModel(),
        listUser: [],
        userSearch: [],
        searchForm: {
            department_id: null,
            account_manager_id: null,
            status: null,
            company: '',
            project: '',
            contract_type: null,
            language: '',
            project_manager: '',
            keyword: '',
            page: 0,
            limit: 0,
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
        stt: ''
    }),
    mounted() {
        this.initData()
    },
    computed: {
        companyFail() {
            return Validate.isNull(this.detailPreSale.company)
        },
        statusFail() {
            return Validate.isNull(this.detailPreSale.status)
        },
        sizeFail() {
            return Validate.formatManMonth(this.detailPreSale.size)
        },
        timeFail() {
            return Validate.compareDate(this.detailPreSale.timeStartDate, this.detailPreSale.timeEndDate)
        },
        projectManagerOk() {
            return !Validate.isEmailJP(this.detailPreSale.project_manager + '@ominext.com')
        },
        ...mapGetters({
            userInfo: 'userSession/userInfo'
        })
    },
    methods: {
        getSize(value) {
            this.detailPreSale.size = value
        },
        validate() {
            if (this.companyFail)
                this.setError('company_required', this.$t('preSale.company_required'), this.detailPreSale)
            if (this.statusFail)
                this.setError('status_required', this.$t('preSale.status_required'), this.detailPreSale)
            if (this.detailPreSale.start_date && this.detailPreSale.end_date && this.timeFail) {
                this.setError('time_greater', this.$t('preSale.time_greater'), this.detailPreSale)
            }
            if (this.detailPreSale.size && !this.sizeFail) {
                this.setError('size_number', this.$t('preSale.size_number'), this.detailPreSale)
            }
            if (this.detailPreSale.project_manager && this.projectManagerOk) {
                this.setError('project_manager_email', this.$t('preSale.project_manager_email'), this.detailPreSale)
            }
        },
        countSTT(perPage, currentPage) {
            return perPage * (currentPage - 1) + 1;
        },
        initData() {
            this.userInfo.roles.map(item => {
                this.permissions = [this.permissions, ...item.permissions]
            })
            this.isLoading = true
            preSaleService.PreSaleList(this.searchForm)
                .then(response => {
                    this.isLoading = false
                    if (response.data) {
                        this.stt = this.countSTT(response.data.data.preSales.per_page, response.data.data.preSales.current_page)
                        this.userSearch = response.data.data.userSearch.map(item => new PreSaleModel(item))
                        this.listUser = response.data.data.users.map(item => new PreSaleModel(item))
                        this.listPreSale = response.data.data.preSales.data.map(item => {
                            const preSale = new PreSaleModel(item)
                            preSale.convertValue()
                            return preSale
                        })
                        this.pagination.total = response.data.data.preSales.total
                    }
                    if (this.searchForm.account_manager_id)
                        this.searchForm.account_manager_id = _.find(this.userSearch, {"id": this.searchForm.account_manager_id})
                })
                .catch(err => {
                    // this.isLoading = false
                    this.$addNotification({
                        color: 'warning',
                        content: err.message,
                    })
                })
        },

        reloadData() {
            this.searchForm = {
                contract_type: null,
                department_id: null,
                account_manager_id: null,
                status: null
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
            if (this.searchForm.account_manager_id)
                this.searchForm.account_manager_id = _.find(this.userSearch, {"id": this.searchForm.account_manager_id})
            this.initData()
        },

        showAddPreSale() {
            this.resetError()
            this.detailPreSale = new PreSaleModel()
            this.showDialog = true
        },

        updatePreSale(preSale, index) {
            this.indexEdit = index
            this.onlyView = false
            this.resetError(this.detailPreSale)
            this.detailPreSale = _.cloneDeep(preSale)
            this.detailPreSale.account_manager_id = _.find(this.listUser, {"id": this.detailPreSale.account_manager_id})
            this.selectPreSale = preSale
            this.showDialog = true
        },
        onDialogClose() {
            this.showDialog = false
            this.selectPreSale = null
        },
        dialogClose() {
            this.showDialog = false
        },

        submitPreSale() {
            this.resetError()
            this.validate()
            if (!this.isSubmit) {
                // edit
                if (!this._isError(this.detailPreSale)) {
                    this.isSubmit = true
                    if (this.detailPreSale.id) {
                        preSaleService.PreSaleUpdate(this.detailPreSale.id, this.detailPreSale.rawValue())
                            .then(res => {
                                this.isSubmit = false
                                this.isLoading = true
                                this.dialogClose(true)
                                let preSale = new PreSaleModel(res.data.data)
                                preSale.convertValue()
                                this.selectPreSale.syncProps(preSale)
                                this.listPreSale.splice(this.indexEdit, 1)
                                this.listPreSale.unshift(this.selectPreSale)
                                this.$nextTick(() => {
                                    this.isLoading = false
                                })
                                this.$addNotification({
                                    color: 'success',
                                    content: this.$t('preSale.update_success'),
                                })
                            })
                            .catch(err => {
                                this.isSubmit = false
                                this.$addNotification({
                                    color: 'warning',
                                    content: err.message,
                                })
                            })
                    } else { // insert
                        preSaleService.PreSaleAdd(this.detailPreSale.rawValue())
                            .then(res => {
                                this.isLoading = true
                                this.pagination.total += 1
                                let preSale = new PreSaleModel(res.data.data)
                                preSale.convertValue()
                                this.listPreSale.unshift(preSale)
                                this.isSubmit = false
                                this.dialogClose()
                                this.$nextTick(() => {
                                    this.isLoading = false
                                })
                                this.$addNotification({
                                    color: 'success',
                                    content: this.$t('preSale.create_success'),
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
        openFilter() {
            this.showSearch = true
            this.resetError()

        },
        closeFilter() {
            this.showSearch = false
        },
        doSearch(status) {
            if (this.searchForm.account_manager_id)
                this.searchForm.account_manager_id = this.searchForm.account_manager_id.id;
            this.initData()
            this.showSearch = false

        },
        searchPreSale() {
            this.initData()
            this.showDialogFilter = false
        },
        deletePreSale(preSale, index) {
            this.$openDialog(
                this.$t('preSale.deleteAll'),
                '',
                {
                    iconClass: 'icon-trash',
                    okText: this.$t('preSale.delete'),
                    cancelText: this.$t('preSale.cancel'),
                },
                {
                    onOk: (dialog) => {
                        preSaleService.PreSaleDelete(preSale.id)
                            .then(response => {
                                this.isLoading = false
                                if (response.data) {
                                    this.listPreSale.splice(index, 1)
                                }
                                this.pagination.total -= 1
                                this.$addNotification({
                                    color: 'success',
                                    content: this.$t('preSale.delete_success'),
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
        openDetail(id) {
            this.$router.push({name: 'pre-sale.detail', params: {id: id}})
        }
    }
}
