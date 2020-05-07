
import BaseModel from "../../../base/BaseModel";

export default class MasterDataModel extends BaseModel {
    constructor(props) {
        super(props)
        this.id = null
        this.name = ''
        this.parent_id=''
        this.type = ''
        this.description = ''

        this.syncProps(props)
    }


    syncProps(props) {
        return super.syncProps(props);
    }

    rawValue() {
        const val = super.rawValue();
        if (val.masterData)
            val.masterData = val.masterData._id

        return val
    }
}

