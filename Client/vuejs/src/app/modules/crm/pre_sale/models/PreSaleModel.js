import BaseModel from "../../../../base/BaseModel";
import LogHistoryModel from "./LogHistoryModel";

export default class PreSaleModel extends BaseModel {
    constructor(props) {
        super(props)
        this.company = ''
        this.project = ''
        this.contract_type = null
        this.size = ''
        this.status = null
        this.language = ''
        this.start_date = ''
        this.end_date = ''
        this.department_id = null
        this.project_manager = ''
        this.account_manager_id = null
        this.description = ''
        this.checkbox = null

        this.syncProps(props)
    }

    get timeStartDate() {
        return moment(this.start_date, 'MM-YYYY').format('YYYY-MM-DD')
    }

    get timeEndDate() {
        return moment(this.end_date, 'MM-YYYY').format('YYYY-MM-DD')
    }

    get FormatTimeStartDate() {
        return moment(this.start_date, 'YYYY-MM-DD').format('MM-YYYY')
    }

    get FormatTimeEndDate() {
        return moment(this.end_date, 'YYYY-MM-DD').format('MM-YYYY')
    }

    get formatNumber() {
        return this.size.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    get getDescription() {
        if(this.description && this.description.length > 30) {
            return _.truncate(this.description, {
                'length': 33,
                'separator': '...'
            });
        }
        return this.description
    }

    rawValue() {
        const val = super.rawValue();
        if(val.account_manager_id)
            val.account_manager_id = val.account_manager_id.id
        if (val.preSale)
            val.preSale = val.preSale._id
        if (val.start_date)
            val.start_date = this.timeStartDate
        if (val.end_date)
            val.end_date = this.timeEndDate
        return val
    }

    convertValue() {
        if (this.size > 0)
            this.size = this.formatNumber
        // if (this.description)
        //     this.descriptionSlice = _.truncate(this.description, {
        //         'length': 38,
        //         'separator': '...'
        //     });
        if (this.start_date)
            this.start_date = moment(this.start_date, 'YYYY-MM-DD').format('MM-YYYY')
        if (this.end_date)
            this.end_date = moment(this.end_date, 'YYYY-MM-DD').format('MM-YYYY')
    }
}

PreSaleModel.STATUS = {
    '1': 'Potential',
    '2': 'Pending',
    '3': 'Running'
}

PreSaleModel.CONTRACT_TYPE = {
    '1': 'Project based',
    '2': 'Labor',

}

PreSaleModel.DEPARTMENT = {
    '1': 'BU1',
    '2': 'BU2',
    '3': 'BU3',
    '4': 'BU4',
    '5': 'BU5',
}
PreSaleModel.ACCOUNT_MANAGER_ID = {
    '1': 'Nguyễn Văn A',
    '2': 'Nguyễn Văn B',
    '3': 'Nguyễn Văn C',

}

