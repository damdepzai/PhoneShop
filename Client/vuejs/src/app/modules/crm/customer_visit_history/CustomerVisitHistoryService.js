



import {API_URL} from "./enum"
import BaseService from "../../../base/BaseService"
import webApiService from '../../../base/WebApiService'

export class CustomerVisitHistoryService extends BaseService {
    constructor(props) {
        super(props)
    }

    CustomerVisitHistoryList(data) {
        return webApiService.get(this.makeUrl(API_URL["customer-visit-history.all"]), {params: data})
    }

    CustomerVisitHistoryListAmount(data) {
        return webApiService.get(this.makeUrl(API_URL["customer-visit-history.amount"]), {params: data})
    }

    CustomerVisitHistoryAdd(customer_visit_history_data) {
        return webApiService.post(API_URL["customer-visit-history.store"], customer_visit_history_data)
    }

    CustomerVisitHistoryUpdate(id, customer_visit_history_data) {
      return webApiService.put(this.makeUrl(API_URL["customer-visit-history.update"], {id}), customer_visit_history_data)
    }

    ingredientCustomerVisitHistoryUpdate(id, data) {
      return webApiService.patch(this.makeUrl(API_URL["customer-visit-history.update-ingredient"],  {id}), data)
    }

    CustomerVisitHistoryDelete(id) {
        return webApiService.delete(this.makeUrl(API_URL["customer-visit-history.delete"], {id}))
    }
}

const customerVisitHistoryService = new CustomerVisitHistoryService()

export default customerVisitHistoryService
