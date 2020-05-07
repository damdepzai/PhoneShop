import {API_URL} from "./enum"
import BaseService from "../../base/BaseService"
import webApiService from '../../base/WebApiService'

export class EmployeeService extends BaseService {
    constructor(props) {
        super(props)
    }

    employeeList(key) {
        return webApiService.get(this.makeUrl(API_URL["employee.all"]), {params: key})
    }

    /**
     * add new employee
     * @param employee_data instance CustomerModel.raw
     * @returns {AxiosPromise<CustomerModel>|Promise<AxiosResponse<CustomerModel>>}
     */
    addEmployee(employee_data) {
        // if (!this.selectEmployee) return Promise.reject('No employee')

        return webApiService.post(API_URL["employee.create"],employee_data)
    }

    // blockEmployee(employee_id) {
    //     if (!employee_id || !this.selectEmployee) return Promise.reject('No employee or employee')
    //
    //     return webApiService.post(this.makeUrl(API_URL["employee.block"], {
    //         employee_id: employee_id
    //     }))
    // }

    deleteEmployee(id) {
        return webApiService.delete(this.makeUrl(API_URL["employee.delete"], {id}))
    }

    changeStatus(id) {
        return webApiService.post(this.makeUrl(API_URL["employee.change"], {id}))
    }
    changePassword(data) {
        return webApiService.post(this.makeUrl(API_URL["employee.editPass"]), data)
    }


    /**
     * update employee data
     * @returns {AxiosPromise<EmployeeModel>|Promise<AxiosResponse<EmployeeModel>>}
     * @param id
     * @param data
     */
    updateEmployee(id, data) {
        return webApiService.put(this.makeUrl(API_URL["employee.edit"],  {id}), data)
    }


    /**
     * get all employee by employee
     * @param config <{page: number, limit: number, keyword?: string, status?: string, type?: string}>
     * @returns {AxiosPromise<{EmployeeModel[]>|Promise<AxiosResponse<EmployeeModel[]>>}
     */
    // allEmployee(config) {
    //     if (!this.selectEmployee) return Promise.reject({message: 'No employee'})
    //
    //     const defaultConfig = {
    //         current: 1,
    //         perPage: 50
    //     }
    //
    //     // return webApiService.get(API_URL["customer.all"], {params: {...defaultConfig, ...config}})
    // }
}

const employeeService = new EmployeeService()

export default employeeService
