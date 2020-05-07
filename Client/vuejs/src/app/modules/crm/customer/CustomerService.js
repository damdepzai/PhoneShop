import {API_URL} from "./enum"
import BaseService from "../../../base/BaseService"
import webApiService from '../../../base/WebApiService'

export class CustomerService extends BaseService {
    constructor(props) {
        super(props)
    }

    customerList(customer_data) {
        return webApiService.get(this.makeUrl(API_URL["customer.all"]), {params: customer_data})
    }

    addCustomer(customer_data) {
        // if (!this.selectCustomer) return Promise.reject('No customer')

        return webApiService.post(API_URL["customer.store"], customer_data)
    }

    blockCustomer(customer_id) {
        if (!customer_id || !this.selectCustomer) return Promise.reject('No customer or customer')

        return webApiService.post(this.makeUrl(API_URL["customer.block"], {
            customer_id: customer_id
        }))
    }

    removeCustomer(customer_id) {
        // if (!customer_id || !this.selectCustomer) return Promise.reject('No customer or customer')

        return webApiService.post(this.makeUrl(API_URL["customer.delete"], {
            customer_id: customer_id
        }))
    }

    updateCustomer(customer_id, customer_data) {
        // if (!customer_id || !this.selectCustomer) return Promise.reject('No customer or customer')

        return webApiService.put(this.makeUrl(API_URL["customer.update"], {
            customer_id: customer_id
        }), customer_data)
    }

    allCustomer(config) {
        if (!this.selectCustomer) return Promise.reject({message: 'No customer'})

        const defaultConfig = {
            current: 1,
            perPage: 50
        }

        return webApiService.get(API_URL["customer.all"], {params: {...defaultConfig, ...config}})
    }

    confirmCustomerCreate(customer_data) {
        return webApiService.post(API_URL["customer.confirmCustomerCreate"], customer_data)
    }

    confirmCustomerUpdate(customer_id, customer_data) {
        return webApiService.put(this.makeUrl(API_URL["customer.confirmCustomerUpdate"], {
            customer_id: customer_id
        }), customer_data)
    }

    updateContact(customer_id, customer_data) {
        return webApiService.put(this.makeUrl(API_URL["customer.updateContact"], {
            customer_id: customer_id
        }), customer_data)
    }
}

const customerService = new CustomerService()

export default customerService
