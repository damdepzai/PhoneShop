import preSaleService from "../PreSaleService";
import PreSaleModel from "../models/PreSaleModel";
import LogHistoryModel from "../models/LogHistoryModel";
import Validate from "../../../../base/validate/Validate";

export default {
    data: () => ({
        PreSaleModel: PreSaleModel,
        id: '',
        detailPreSale: new PreSaleModel(),
        selectPreSale: new PreSaleModel(),
        detailHistory: new LogHistoryModel(),
        selectHistory: new LogHistoryModel(),
        listUser: [],
        showDialog: false,
        showDialogLog: false,
        activeShowAll: true,
        activeCommentOnly: false,
        readLoad: true,
        data: {
            type: '',
            limit: '',
        },
        listHistory: [],
        value: '',
        isSubmit: false,
    }),
    mounted() {
        this.initData()
    },
    computed: {
        contentOk() {
            return Validate.required(this.detailHistory.content)
        }
    },
    methods: {
        formatNumber(val) {
            return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        validate() {
            if (this.contentOk) {
                this.setError('content_required', this.$t('preSale.content_required'), this.detailHistory)
            }
        },
        checkPermission(value){
            value.map(item =>{
              item.roles.map(item1 =>{
                  item1.permissions.map(item2 =>{
                     if(  item2 == 'preSales-create' || item2 =='preSales-edit' || item2 =='preSales-delete' || item2 =='preSales-view'|| item2 =='preSales-detail'){
                         this.listUser.push({...item})
                     }
                  })
              })
            })
            this.listUser =_.uniqBy(this.listUser,'id')
        },
        initData() {
            this.isLoading = true
            this.id = this.$route.params.id
            preSaleService.getPreSale(this.id, this.data)
                .then(response => {
                    this.isLoading = false
                    if (response.data) {
                        if (response.data.data.count <= 3 || this.data.limit) this.readLoad = false

                        this.listHistory = response.data.data.logHistories.map(item => {
                            const logHistory = new LogHistoryModel(item)
                            logHistory.convertValue()
                            return logHistory
                        })
                        this.detailPreSale = new PreSaleModel(response.data.data.preSales)
                        this.detailPreSale.size = this.formatNumber(this.detailPreSale.size)
                        // this.listUser = response.data.data.users
                        this.checkPermission(response.data.data.users)
                    }
                })
                .catch(err => {
                    // this.isLoading = false
                    this.$addNotification({
                        color: 'warning',
                        content: err.message,
                    })
                })
        },
        close() {
            this.detailHistory = new LogHistoryModel()
        },
        reloadData() {
            this.data = {
                type: this.data.type,
                limit: 'all',
            }
            this.readLoad = false
            this.initData()
        },

        reloadType() {
            this.data = {
                type: 1,
                limit: this.data.limit
            }
            this.readLoad = true
            this.activeShowAll = false
            this.activeCommentOnly = true
            this.initData()
        },
        reloadTypeNull() {
            this.readLoad = true
            this.activeShowAll = true
            this.activeCommentOnly = false
            this.data = {
                type: 0,
                limit: this.data.limit
            }
            this.initData()
        },

        submitLogHistory() {
            this.resetError(this.detailHistory)
            this.validate()
            if (!this._isError(this.detailHistory)) {
                this.isSubmit = true
                preSaleService.addLogHistory(this.detailHistory.rawValue())
                    .then(res => {
                        this.isSubmit = false
                        let history = new LogHistoryModel(res.data.data)
                        history.convertValue()
                        this.listHistory.unshift(history)
                        this.detailHistory = new LogHistoryModel()

                        this.$addNotification({
                            color: 'success',
                            content: this.$t('preSale.comment_success'),
                        })
                        this.close()
                    })
                    .catch(err => {
                        this.isSubmit = false
                        this.$addNotification({
                            color: 'warning',
                            content: err.message,
                        })
                    })
            }
        },
    }
}
