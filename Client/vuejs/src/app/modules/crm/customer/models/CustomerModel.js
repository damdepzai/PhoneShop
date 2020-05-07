import BaseModel from "../../../../base/BaseModel";
import ContactPointModel from "./ContactPointModel";
import {DATE_FORMAT_Y_M, DATE_FORMAT_Y_M_D} from "../../../../../config/app";

export default class CustomModel extends BaseModel {
    constructor(props) {
        super(props)
        this.id = null
        this.name = ''
        this.holding_company = ''
        this.contact_point = []
        this.account_manager = null
        this.time_cooperation = ''
        this.time_stop_cooperation = ''
        this.time_settlement = ''
        this.status = CustomModel.STATUS.active

        this.syncProps(props)

    }

    addContact(contactPoint = new ContactPointModel()) {
        this.contact_point.push(contactPoint)
    }

    addContacts(arr) {
        if (Array.isArray(arr)) {
            arr.map(item => {
                this.addContact(new ContactPointModel(item))
            })
        }
    }

    removeContact(index){
        this.contact_point.splice(index, 1)
    }

    get timeCooperation() {
        return moment(this.time_cooperation, DATE_FORMAT_Y_M).format(DATE_FORMAT_Y_M_D)
    }

    get timeSettlement() {
        return moment(this.time_settlement, DATE_FORMAT_Y_M).format(DATE_FORMAT_Y_M_D)
    }

    get timeStopCooperation() {
        return moment(this.time_stop_cooperation, DATE_FORMAT_Y_M).format(DATE_FORMAT_Y_M_D)
    }

    syncProps(props) {
        return super.syncProps(props);
    }

    rawValue() {
        const val = super.rawValue();
        if (val.contact_point){
            val.contact_point = val.contact_point.map(item => {
                if(item.name){
                    return item
                }
            })
            if(_.compact(val.contact_point).length == 0){
                val.contact_point = JSON.stringify([
                    {
                        name : '',
                        position : '',
                        email : '',
                        interest : '',
                        birthday : '',
                    }
                ])
            }else {
                val.contact_point = JSON.stringify(_.compact(val.contact_point))
            }
        }

        if (val.time_cooperation)
            val.time_cooperation = this.timeCooperation
        if (val.time_stop_cooperation)
            val.time_stop_cooperation = this.timeStopCooperation
        if (val.time_settlement)
            val.time_settlement = this.timeSettlement
        if(val.account_manager){
            val.account_manager = val.account_manager.id
        }
        return val
    }

    convertValue() {
        if (this.contact_point){
            const cp = JSON.parse(this.contact_point)
            this.contact_point = []
            this.addContacts(cp)
        }
        if (this.time_cooperation)
            this.time_cooperation = moment(this.time_cooperation, DATE_FORMAT_Y_M_D).format(DATE_FORMAT_Y_M)
        if (this.time_stop_cooperation)
            this.time_stop_cooperation = moment(this.time_stop_cooperation, DATE_FORMAT_Y_M_D).format(DATE_FORMAT_Y_M)
        if (this.time_settlement)
            this.time_settlement = moment(this.time_settlement, DATE_FORMAT_Y_M_D).format(DATE_FORMAT_Y_M)
    }

}

CustomModel.STATUS = {
    active: 1,
    inActive: 2,
}
