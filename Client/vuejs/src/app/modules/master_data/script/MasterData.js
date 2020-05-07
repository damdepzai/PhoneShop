import MasterDataModel from "../models/MasterDataModel";
import MasterDataService from "../MasterDataService";
import Validate from "../../../base/validate/Validate"

export default {
    data: () => ({
        MasterDataModel: MasterDataModel,
        listMasterData: [],
        selectMasterData: new MasterDataModel(),
        detailMasterData: new MasterDataModel(),
        searchForm: {
            parent: null,
            name: '',
            // page: 0,
            // limit: 0,
        },
        listParents: [],
        showDialog: false,
        isLoading: false,
        isSubmit: false,
        // pagination: {
        //     perPage: 10,
        //     current: 1,
        //     total: 0,
        // }
    }),
    mounted() {
        this.initData()
    },
    computed: {
        nameFail() {
            return Validate.isNull(this.detailMasterData.name)
        },
        nameMaxFail() {
            return Validate.isMax(this.detailMasterData.name, 50)
        },
    },
    methods: {
        validate() {
            if (this.nameFail) {
                this.setError('name_required',   this.$t('masterData.master_data_id_required'), this.detailMasterData)
            }
            if (this.nameMaxFail) {
                this.setError('name_required', this.$t('masterData.url_max') , this.detailMasterData)
            }
        },
        initData() {
            this.isLoading = true
            MasterDataService.masterDataList(this.searchForm)
                .then(response => {
                    this.isLoading = false
                    if (response.data) {
                        this.listParents = response.data.data.parents.map(item => new MasterDataModel(item))
                        this.listMasterData = response.data.data.categories.map(item => new MasterDataModel(item))
                        this.searchForm.total = response.data.count
                        // this.pagination.total = response.data.data.total
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
        doSearch() {
            this.initData(this.searchForm.parent, this.searchForm.name)
        },
        showAddMasterData() {
            this.detailMasterData = new MasterDataModel()
            this.showDialog = true
        },
        showEditMasterData(masterData, index) {

            this.onlyView = false
            this.detailMasterData = _.clone(masterData)
            this.selectMasterData = masterData
            this.showDialog = true
        },
        deleteMasterData(masterData, index) {
            console.log(masterData.id)
            this.$openDialog(
                this.$t('masterData.del_title'),
                this.$t('masterData.del_content'),
                {
                    okText: this.$t('masterData.okText'),
                    cancelText: this.$t('masterData.cancelText')
                },
                {
                    onOk: (dialog) => {
                        MasterDataService.removeMasterData(masterData.id)
                            .then(response => {
                                this.isLoading = false
                                if (response.data) {
                                    this.listMasterData.splice(index, 1)
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
        reloadData() {
            this.initData()
        },
        searchData(val) {
            this.searchForm.current = val.page
            this.searchForm.perPage = val.perPage
            this.searchForm.page = val.page
            this.searchForm.limit = val.perPage
            this.pagination.name = val.page
            this.pagination.parent = val.perPage
            this.initData()
        },
        onDialogClose() {
            this.showDialog = false
            this.selectMasterData = null
        },
        dialogClose() {
            this.showDialog = false
        },
        submitMasterData() {
            this.resetError()
            this.validate()
            if (!this.isSubmit) {
                // edit
                if (!this._isError(this.detailMasterData)) {
                    this.isSubmit = true
                    if (this.detailMasterData.id) {
                        MasterDataService.updateMasterData(this.detailMasterData.id, this.detailMasterData.rawValue())
                            .then(res => {
                                this.isSubmit = false
                                this.initData()
                                this.selectMasterData.syncProps(res.data)
                                this.dialogClose()
                                this.$addNotification({
                                    color: 'success',
                                    content: this.$t('masterData.update_masterData_success')
                                })
                            })
                            .catch(err => {
                                this.isSubmit = false
                                this.$addNotification({
                                    color: 'warning',
                                    content: err.message
                                })
                            })
                    } else { // insert
                        MasterDataService.addMasterData(this.detailMasterData.rawValue())
                            .then(res => {
                                this.isSubmit = false
                                this.initData()
                                this.listMasterData.push(new MasterDataModel(res.data))
                                this.dialogClose()
                                this.$addNotification({
                                    color: 'success',
                                    content: this.$t('masterData.update_masterData_success')
                                })
                            })
                            .catch(err => {
                                this.isSubmit = false
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
}
