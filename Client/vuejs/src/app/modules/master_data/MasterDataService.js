import {API_URL} from "./enum"
import BaseService from "../../base/BaseService"
import webApiService from '../../base/WebApiService'

export class MasterDataService extends BaseService {
    constructor(props) {
        super(props)
    }

    masterDataList(data) {
        return webApiService.get(this.makeUrl(API_URL["masterData.all"]), {params: data})
    }

    /**
     * add new masterData
     * @param masterData_data instance MasterDataModel.raw
     * @returns {AxiosPromise<MasterDataModel>|Promise<AxiosResponse<MasterDataModel>>}
     */
    addMasterData(masterData_data) {

        return webApiService.post(API_URL["masterData.store"], masterData_data)
    }

    removeMasterData(id) {

        return webApiService.delete(this.makeUrl(API_URL["masterData.delete"], {id}))
    }

    /**
     * update masterData data
     * @param masterData_id MasterDataModel._id
     * @param masterData_data
     * @returns {AxiosPromise<MasterDataModel>|Promise<AxiosResponse<MasterDataModel>>}
     */
    updateMasterData(id, masterData_data) {

        return webApiService.put(this.makeUrl(API_URL["masterData.update"], {id}), masterData_data)
    }

    /**
     * get all masterData by masterData
     * @param config <{page: number, limit: number, keyword?: string, status?: string, type?: string}>
     * @returns {AxiosPromise<{MasterDataModel[]>|Promise<AxiosResponse<MasterDataModel[]>>} */

}

const masterDataService = new MasterDataService()

export default masterDataService
