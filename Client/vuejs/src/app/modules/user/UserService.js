

import {API_URL} from "./enum"
import BaseService from "../../base/BaseService"
import webApiService from '../../base/WebApiService'

export class UserService extends BaseService {
    constructor(props) {
        super(props)
    }

    userInfo(user_id) {
        if (!user_id) return Promise.reject('No user')

        return webApiService.get(this.makeUrl(API_URL["customer.user.info"], {
            ser_id: user_id
        }))
    }

    /**
     * add new user
     * @param user_data instance UserModel.raw
     * @returns {AxiosPromise<UserModel>|Promise<AxiosResponse<UserModel>>}
     */
    addUser(user_data) {
        return webApiService.post(API_URL["user.store"],user_data)
    }

    blockUser(user_id) {
        if (!user_id || !this.selectCustomer) return Promise.reject('No customer or user')

        return webApiService.post(this.makeUrl(API_URL["user.block"], {
            user_id: user_id
        }))
    }
    removeUser(user_id) {
        if (!user_id) return Promise.reject('No customer or user')

        return webApiService.delete(this.makeUrl(API_URL["user.delete"], {
            id: user_id
        }))
    }

    removeRole(role_id) {
        if (!role_id) return Promise.reject('No customer or role')

        return webApiService.delete(this.makeUrl(API_URL["auth.role.delete"], {
            id: role_id
        }))
    }

    /**
     * update user data
     * @param id
     * @param user_data
     * @returns {AxiosPromise<UserModel>|Promise<AxiosResponse<UserModel>>}
     */
    updateUser(id, user_data) {
        return webApiService.put(this.makeUrl(API_URL["user.update"], {id}), user_data)
    }

    /**
     * get all user by customer
     * @param config <{page: number, limit: number, keyword?: string, status?: string, type?: string}>
     * @returns {AxiosPromise<{UserModel[]>|Promise<AxiosResponse<UserModel[]>>}
     */
    allUser(config) {
        const defaultConfig = {
            current: 1,
            perPage: 50
        }

        return webApiService.get(API_URL["user.all"], {params: {...defaultConfig, ...config}})
    }

    allRole(config) {
        const defaultConfig = {
            current: 1,
            perPage: 50
        }

        return webApiService.get(API_URL["auth.role.all"], {params: {...defaultConfig, ...config}})
    }

    allPermission() {
        return webApiService.get(API_URL["auth.permission"])
    }

    addRole(role_data) {
        return webApiService.post(API_URL["auth.role.store"],role_data)
    }

    updateRole(id, role_data) {
        return webApiService.put(this.makeUrl(API_URL["auth.role.update"], {id}), role_data)
    }
    allUserGroupRole(id,data){
        return webApiService.get(this.makeUrl(API_URL["user.group.role"], {id}),{params: data})
    }

}

const userService = new UserService()

export default userService
