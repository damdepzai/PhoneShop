

import BaseModel from "../../../base/BaseModel";


export default class RoleModel extends BaseModel {
    constructor(props) {
        super(props)
        this.id = null
        this.name = ''
        this.name_slug = ''
        this.permissions = []
        this.permissionsGroups = {}

        this.syncProps(props)
    }
    syncProps(props) {
        return super.syncProps(props);
    }

    rawValue() {
        const val = super.rawValue();
        if (val.customer)
            val.customer = val.customer._id

        return val
    }
}

