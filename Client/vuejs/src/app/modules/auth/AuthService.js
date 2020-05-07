

import BaseService from "../../base/BaseService"
import webApi from "../../base/WebApiService"
import {AUTH_URL} from "./enum"
import {i18n} from "../../../config/i18n-setup"

export class AuthService extends BaseService {
    constructor(props) {
        super(props)
    }

    register(user_data) {
        if (!user_data || !user_data.email || !user_data.password)
            return Promise.reject({message: i18n.t('auth.register_error')})

        return webApi.post(AUTH_URL.register)
    }

    login(cer) {
        if (!cer || !cer.email || !cer.password) return Promise.reject('no user data')

        cer.customerId = this.appCustomer

        return webApi.post(AUTH_URL.login, cer)
    }

    rePassword(cer){
        if (!cer || !cer.email) return Promise.reject('no user data')
        return webApi.post(AUTH_URL.re_password, cer)
    }

    logout() {
        return webApi.post(AUTH_URL.logout)
    }

    changePassword(cer){
        if (!cer) return Promise.reject('no user data')
        return webApi.post(AUTH_URL.change_password, cer)
    }
}

const authService = new AuthService()

export default authService
