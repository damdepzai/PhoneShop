/*
 * Copyright (c) 2020.
 * Project: Source
 * LastModified: 2/14/20, 3:23 PM
 * Author: diengv < Giáp Văn Điện >
 * Email: diengv@ominext.com
 * File name: UserProfileModel.js
 * File path: D:/Projects/PMS/Source/Client/vuejs/src/app/modules/user/models/UserProfileModel.js
 */

import BaseModel from "../../../base/BaseModel";

export default class UserProfileModel extends BaseModel {
    constructor(props) {
        super(props)
        // this._id = null
        // this.use_id = null
        this.keyName = ''
        this.keyValue = ''
        this.keyType = UserProfileModel.KEY_TYPE.text

        this.syncProps(props)
    }
}

UserProfileModel.KEY_TYPE = {
    text: 'Text',
    textArea: 'Long text',
    html: 'Html',
    image: 'Image'
}
