import {API_URL} from "./enum"
import BaseService from "../../../base/BaseService";
import webApiService from "../../../base/WebApiService";

export class AppointService extends BaseService{
    constructor(props){
        super(props)
    }

    appointList(key){
        return webApiService.get(this.makeUrl(API_URL["appoint.all"]), {params: key})
    }
    updateAppoint(id, data) {
        return webApiService.put(this.makeUrl(API_URL["appoint.edit"],  {id}), data)
    }

    addAppoint(appoint_data){
        return webApiService.post(this.makeUrl(API_URL["appoint.store"]), appoint_data)
    }

    confirmAppoint(appoint_data){
        return webApiService.post(this.makeUrl(API_URL["appoint.confirmAppoint"]), appoint_data)
    }

    confirmUpdate(id, data) {
        console.log(id)
        return webApiService.put(this.makeUrl(API_URL["appoint.confirmCustomer"],  {id}), data)
    }

}
const appointService = new AppointService()

export default appointService

