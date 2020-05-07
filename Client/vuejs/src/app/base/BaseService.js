

export default class BaseService {
    constructor(props) {
        this.selectCustomer = (props && props.customer) ? props.customer : process.env.VUE_APP_CUSTOMER_ID
        this.appCustomer = process.env.VUE_APP_CUSTOMER_ID
    }

    setCustomer(customer) {
        this.selectCustomer = customer
    }

    makeUrl(url, params) {
        if (params) {
            Object.keys(params).map(param => {
                url = url.replace(':' + param, params[param])
            })
        }

        return url
    }
}
