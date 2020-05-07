
import BaseModel from "../../../../base/BaseModel";

export default class ContactPointModel extends BaseModel {
    constructor(props) {
        super(props)

        this.name = ''
        this.position = ''
        this.email = ''
        this.interest = ''
        this.birthday = ''

        this.syncProps(props)
    }

    syncProps(props) {
        return super.syncProps(props);
    }
}
