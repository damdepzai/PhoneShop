import BaseModel from "../../../../base/BaseModel";

export default class AppointModel extends BaseModel {
    constructor(props) {
        super(props)
        this._id = null,
            this.company = '',
            this.domain = null,
            this.capital = '',
            this.employee_count = '',
            this.sale_date = this.dateNow,
            this.person_in_charge = null,
            this.salesperson = null,
            this.business = '',
            this.cooperation_trend = '',
            this.status = AppointModel.STATUS.potential,
            this.reping = AppointModel.REPING.empty,
            this.date_reping = '',
            this.omi_act = '',
            this.status_ping= '',
            this.syncProps(props)
    }
    get changeCount() {
        return this.employee_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    get timeCooperation() {
        return moment(String(this.sale_date)).format('DD-MM-YYYY')
    }

    get timeRepPing() {
        return moment(this.date_reping, 'DD-MM-YYYY').format('YYYY-MM-DD')
    }

    get timeSaleDate() {
        return moment(this.sale_date, 'DD-MM-YYYY').format('YYYY-MM-DD')
    }

    get timeReping() {
        return moment(this.date_reping, 'DD-MM-YYYY').format('YYYY-MM-DD')
    }

    get compareDate() {
        return moment().format('MM-DD-YYYY');
    }

    get dateNow() {
        return moment().format('DD-MM-YYYY');
    }

    get date(){
        let date = new Date(this.timeSaleDate)

        return date.getTime()
    }

    get dateReping(){
        let date = new Date(this.timeReping)

        return date.getTime()
    }

    get formatDateNow(){
        let dateNow = new Date(this.compareDate)
        return dateNow.getTime()
    }

    get getBusiness() {
        if(this.business && this.business.length > 50) {
            return _.truncate(this.business, {
                'length': 47,
                'separator': '...'
            });
        }
        return this.business
    }

    get getCooperationTrend() {
        if(this.cooperation_trend && this.cooperation_trend.length > 50) {
            return _.truncate(this.cooperation_trend, {
                'length': 47,
                'separator': '...'
            });
        }
        return this.cooperation_trend
    }

    get getOmiAct() {
        if(this.omi_act && this.omi_act.length > 50) {
            return _.truncate(this.omi_act, {
                'length': 47,
                'separator': '...'
            });
        }
        return this.omi_act
    }
    get getStatusPing() {
        if(this.status_ping && this.status_ping.length > 50) {
            return _.truncate(this.status_ping, {
                'length': 47,
                'separator': '...'
            });
        }
        return this.status_ping
    }

    syncProps(props) {
        return super.syncProps(props);
    }

    rawValue() {
        const val = super.rawValue();
        if (val.person_in_charge)
        {
            val.person_in_charge = val.person_in_charge.id
        }
        if (val.salesperson)
        {
            val.salesperson = val.salesperson.id
        }
        if (val.sale_date)
            val.sale_date = this.timeSaleDate
        if (val.date_reping)
            val.date_reping = this.timeRepPing
        return val
    }

    convertValue() {
        if (this.sale_date)
            this.sale_date = moment(this.sale_date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        if (this.date_reping)
            this.date_reping = moment(this.date_reping, 'YYYY-MM-DD').format('DD-MM-YYYY')
    }
}
AppointModel.STATUS = {
    potential: 1,
    notPotential: 2,
    customer: 3
}
AppointModel.REPING = {
    empty: 1,
    datePing: 2,
    notPing: 3
}
