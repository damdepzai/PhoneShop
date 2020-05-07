import AppointModel from "../models/AppointModel";
import AppointService from "../AppointService";
import Validate from "../../../../base/validate/Validate";
import {mapGetters} from "vuex";

export default {
    data: () => ({
        AppointModel: AppointModel,
        listAppoint: [],
        selectAppoint: new AppointModel(),
        detailAppoint: new AppointModel(),
        keyword: '',
        showDialog: false,
        isLoading: false,
        isSubmit: false,
        onlyView: false,
        search: {
            company: '',
            action: 'created_at',
            start_date: '',
            end_date: '',
            page: 0,
            limit: 0
        },
        capital: '',
        showSearch: false,
        keyVal: '',
        listUser: [],
        pagination: {
            perPage: 50,
            current: 1,
            total: 0,
        },
        employee_count: '',
        permissions: [],
        listUserSale: [],
        stt:''

    }),
    created() {
        this.initData()
    },

    computed: {
        nameOk() {
            return !Validate.isNull(this.detailAppoint.company)
        },
        domainOk() {
            return !Validate.isNull(this.detailAppoint.domain)
        },
        dateSaleOk() {
            return !Validate.isNull(this.detailAppoint.sale_date)
        },
        person_in_chargeOk() {
            return !Validate.isNull(this.detailAppoint.person_in_charge)
        },
        salesPersonOk() {
            return !Validate.isNull(this.detailAppoint.salesperson)
        },
        ...mapGetters({
            userInfo: 'userSession/userInfo'
        })
    },

    methods: {
        getCapital(value) {
            this.detailAppoint.capital = value
        },
        getEmployeeCount(value) {
            this.detailAppoint.employee_count = value
        },
        validate() {
            if (!this.nameOk) {
                this.setError('name_required', this.$t('appoint.require_company'), this.detailAppoint)
            }
            if (!this.domainOk) {
                this.setError('domain_required', this.$t('appoint.require_domain'), this.detailAppoint)
            }
            if (!this.dateSaleOk) {
                this.setError('dateSale_required', this.$t('appoint.require_sale_date'), this.detailAppoint)
            }
            if (!this.person_in_chargeOk) {
                this.setError('person_in_charge_required', this.$t('appoint.require_person_in_charge'), this.detailAppoint)
            }
            if (!this.salesPersonOk) {
                this.setError('salesPerson_required', this.$t('appoint.require_salesperson'), this.detailAppoint)
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
            AppointService.appointList(this.search)
                .then(response => {
                    this.isLoading = false
                    if (response.data) {
                        this.stt = this.countSTT(response.data.data.customerCrm.per_page,response.data.data.customerCrm.current_page )
                        this.listUser = response.data.data.users.map(item => new AppointModel(item))
                        this.listUserSale = response.data.data.userSale.map(item => new AppointModel(item))
                        this.listAppoint = response.data.data.customerCrm.data.map(item => {
                            const appoint = new AppointModel(item)
                            appoint.convertValue()
                            return appoint
                        })
                        this.pagination.total = response.data.data.customerCrm.total
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
        showAddAppoint() {
            this.resetError()
            this.detailAppoint = new AppointModel()
            this.showDialog = true
        }
        ,
        onChange(event) {
            this.keyVal = event.target.value
        }
        ,

        deleteAppoint(appoint, index) {
            this.$openDialog(
                this.$t('appoint.deleteAll'),
                '',
                {
                    closeTime: 30,
                    iconClass: 'icon-trash',
                    okText: this.$t('appoint.delete'),
                    cancelText: this.$t('appoint.cancel'),
                },
                {
                    onOk: (dialog) => {
                        AppointService.deleteAppoint(appoint.id)
                            .then(response => {
                                this.isLoading = false
                                if (response.data) {
                                    this.listAppoint.splice(index, 1)
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
                    }
                }
            )
        }
        ,
        addAppoint() {
            this.resetError()
            this.detailAppoint = new AppointModel()
            this.showDialog = true
        }
        ,

        updateAppoint(appoint) {
            this.resetError()
            this.detailAppoint = _.cloneDeep(appoint)
            this.capital = this.detailAppoint.capital
            this.detailAppoint.person_in_charge = _.find(this.listUser, {"id": this.detailAppoint.person_in_charge})
            this.detailAppoint.salesperson = _.find(this.listUser, {"id": this.detailAppoint.salesperson})
            this.selectAppoint = appoint
            this.showDialog = true
        }
        ,
        doSearch() {
            this.showSearch = false
            this.initData()
        }
        ,
        searchData(val) {
            this.search.company = val.company
            this.search.action = 'created_at'
            this.search.start_date = val.start_date
            this.search.end_date = val.end_date
            this.search.page = val.page
            this.search.limit = val.perPage
            this.pagination.current = val.page
            this.pagination.perPage = val.perPage
            this.initData()
        }
        ,
        reloadData() {
            this.pagination = {
                perPage: null,
                current: 1,
                total: 0,
            },
                this.search = {
                    action: 'created_at'
                },
                this.initData()
        }
        ,

        openFilter() {
            this.showSearch = true
            this.resetError()
        }
        ,
        closeFilter() {
            this.showSearch = false
        }
        ,


        onDialogClose() {
            this.showDialog = false
            this.selectAppoint = null
        }
        ,
        dialogClose() {
            this.showDialog = false
        }
        ,
        submitAppoint() {
            this.resetError()
            this.validate()
            if (!this.isSubmit) {
                // edit
                if (!this._isError(this.detailAppoint)) {
                    this.isSubmit = true
                    if (this.detailAppoint.id) {
                        AppointService.updateAppoint(this.detailAppoint.id, this.detailAppoint.rawValue())
                            .then(res => {
                                this.isSubmit = false
                                this.isLoading = true
                                let appoint = new AppointModel(res.data.data)
                                appoint.convertValue()
                                this.selectAppoint.syncProps(appoint)
                                this.dialogClose()
                                this.$nextTick(() => {
                                    this.isLoading = false
                                })
                                this.$addNotification({
                                    color: 'success',
                                    content: this.$t('appoint.update_success'),
                                    time: 3000
                                })
                            })
                            .catch(err => {
                                this.isLoading = false
                                this.$addNotification({
                                    color: 'warning',
                                    content: err.message,
                                    time: 3000
                                })
                            })
                        // }
                    } else {
                        // insert
                        AppointService.addAppoint(this.detailAppoint.rawValue())
                            .then(res => {
                                this.isSubmit = false
                                this.isLoading = true
                                let appoint = new AppointModel(res.data.data)
                                appoint.convertValue()
                                this.listAppoint.unshift(appoint)
                                this.dialogClose()
                                this.$nextTick(() => {
                                    this.isLoading = false
                                })
                                this.$addNotification({
                                    color: 'success',
                                    content: this.$t('appoint.create_success'),
                                    time: 3000
                                })
                            })
                            .catch(err => {
                                this.isLoading = false
                                this.$addNotification({
                                    color: 'warning',
                                    content: err.message,
                                    time: 3000
                                })
                            })
                    }

                }
            }
        }
    }
}
