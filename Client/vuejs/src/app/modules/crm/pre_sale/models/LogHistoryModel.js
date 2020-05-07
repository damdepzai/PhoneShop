import BaseModel from "../../../../base/BaseModel";
import PreSaleModel from "./PreSaleModel";

export default class LogHistoryModel extends BaseModel {

    constructor(props) {
        super(props);
        this.user_id = '';
        this.content = '';
        this.user_tags = '';
        this.pre_sale_id = '';
        this.created_at = this.dateNow;

        this.syncProps(props)
    }

    get dateNow() {
        return moment().format('YYYY-MM-DD hh:mm:ss');
    }

    rawValue() {
        const val = super.rawValue();

        return val
    }

    get timeCreateAt() {
        this.day = moment(this.created_at, 'YYYY-MM-DD hh:mm:ss').day();
        return LogHistoryModel.DAY[this.day] + 'ngày ' + moment(this.created_at, 'YYYY-MM-DD hh:mm:ss').format('DD-MM-YYYY hh:mm')
    }

    convertValue() {
        if (this.created_at)
           this.created_at = this.timeCreateAt
    }


}
LogHistoryModel.DAY = {
    '0': 'Chủ nhật, ',
    '1': 'Thứ 2, ',
    '2': 'Thứ 3, ',
    '3': 'Thứ 4, ',
    '4': 'Thứ 5, ',
    '5': 'Thứ 6, ',
    '6': 'Thứ 7, ',
}

