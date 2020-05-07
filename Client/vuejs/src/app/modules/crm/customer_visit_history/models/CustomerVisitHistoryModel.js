import BaseModel from "../../../../base/BaseModel";
import IngredientModel from "./IngredientModel";
import Util from "../../../../../helpers/Util";

export default class CustomerVisitHistoryModel extends BaseModel {
    constructor(props) {
        super(props),
        this.id = null,
        this.name = null,
        this.url = '',
        this.start_date = this.dateNow,
        this.finish_date = this.dateNow,
        this.ingredient = [],
        this.hotel = '',
        this.restaurant = '',
        this.gift = '',

        this.syncProps(props)
    }

    addIngredient(ingredient = new IngredientModel()) {
        this.ingredient.push(ingredient)
    }

    addIngredients(arr) {
        if (Array.isArray(arr)) {
            arr.map(item => {
                this.addIngredient(new IngredientModel(item))
            })
        }
    }

    removeIngredient(index) {
        this.ingredient.splice(index, 1)
    }

    syncProps(props) {
        return super.syncProps(props);
    }

    get timeStartDate() {
        return moment(this.start_date, 'DD-MM-YYYY').format('YYYY-MM-DD')
    }

    get timeFinishDate() {
        return moment(this.finish_date, 'DD-MM-YYYY').format('YYYY-MM-DD')
    }

    get dateNow() {
        return moment().format('DD-MM-YYYY');
    }

    get getRestaurant() {
        if(this.restaurant && this.restaurant.length > 50) {
            return _.truncate(this.restaurant, {
                'length': 47,
                'separator': '...'
            });
        }
        return this.description
    }

    rawValue() {
        const val = super.rawValue();
        if (val.customer_id) {
            val.customer_id = val.customer_id.id
        }
        if (val.ingredient) {
            val.ingredient = val.ingredient.map(item => {
                if (item.name || item.position){
                    return item
                }

            })
            if (_.compact(val.ingredient).length == 0) {
                val.ingredient = JSON.stringify([
                    {
                        name: '',
                        position: '',
                        email: '',
                        interest: '',
                        birthday: '',
                    }
                ])
            } else {
                val.ingredient = JSON.stringify(_.compact(val.ingredient))
            }
        }
        if (val.start_date)
            val.start_date = this.timeStartDate
        if (val.finish_date)
            val.finish_date = this.timeFinishDate
        return val
    }

    convertValue() {
        if (this.ingredient) {
            const cv = JSON.parse(this.ingredient)
            this.ingredient = []
            this.addIngredients(cv)
        }
        if (this.start_date)
            this.start_date = moment(this.start_date, 'YYYY-MM-DD').format('DD-MM-YYYY')
        if (this.finish_date)
            this.finish_date = moment(this.finish_date, 'YYYY-MM-DD').format('DD-MM-YYYY')
    }
}
