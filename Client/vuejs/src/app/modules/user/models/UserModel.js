/*
 * Copyright (c) 2020.
 * Project: Source
 * LastModified: 2/14/20, 3:23 PM
 * Author: diengv < Giáp Văn Điện >
 * Email: diengv@ominext.com
 * File name: UserModel.js
 * File path: D:/Projects/PMS/Source/Client/vuejs/src/app/modules/user/models/UserModel.js
 */

import BaseModel from "../../../base/BaseModel";
import UserProfileModel from "./UserProfileModel";

export default class UserModel extends BaseModel {
    constructor(props) {
        super(props)
        this.id = null
        this.name = ''
        this.email = ''
        this.email_verified_at = ''
        this.created_at = ''
        this.password = ''
        this.updated_at = null
        this.role_id = null
        this.profile = {
            defaultPage: '/dashboard'
        }
        this.status = null
        this.type = UserModel.TYPE.user

        this.syncProps(props)
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }

    syncProps(props) {
        if (props && _.isObject(props) && ('profile' in props) && props.profile.length) {
            props.profile.map(item => new UserProfileModel(item))
        }

        return super.syncProps(props);
    }

    rawValue() {
        const val = super.rawValue();
        if (val.role_id) {
            val.role_id = val.role_id.id
        }
        if (val.customer)
            val.customer = val.customer._id

        return val
    }
    rawValueUserGroupRole() {
        const val = super.rawValue();
        if (val.customer)
            val.customer = val.customer._id

        return val
    }
}

UserModel.STATUS = {
    active: 'active',
    inActive: 'inactive',
}
UserModel.TYPE = {
    root: 'ROOT',
    admin: 'ADMIN',
    customer: 'CUSTOMER',
    user: 'USER',
}
