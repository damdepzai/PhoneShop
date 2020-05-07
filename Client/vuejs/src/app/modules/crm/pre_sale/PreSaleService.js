import {API_URL} from "./enum"
import BaseService from "../../../base/BaseService"
import webApiService from '../../../base/WebApiService'

export class PreSaleService extends BaseService {
    constructor(props) {
        super(props)
    }
    PreSaleList(key) {
        return webApiService.get(this.makeUrl(API_URL["pre-sale.all"]), {params: key})
    }
    PreSaleAdd(pre_sale_data) {
        return webApiService.post(API_URL["pre-sale.store"], pre_sale_data)
    }
    addLogHistory(history) {
        return webApiService.post(API_URL["pre-log-history.store"], history)
    }

    PreSaleUpdate(id, pre_sale_data) {
      return webApiService.put(this.makeUrl(API_URL["pre-sale.update"], {id}), pre_sale_data)
    }


    getPreSale(id, key) {
      return webApiService.get(this.makeUrl(API_URL["pre-sale.detail"],{id}), {params: key})
    }

    PreSaleDelete(id) {
        return webApiService.delete(this.makeUrl(API_URL["pre-sale.delete"], {id}))
    }

}

const preSaleService = new PreSaleService()

export default preSaleService
