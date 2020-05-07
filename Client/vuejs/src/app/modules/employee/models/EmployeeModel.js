
import BaseModel from "../../../base/BaseModel";

export default class EmployeeModel extends BaseModel {
    constructor(props) {
        super(props)
        this._id = null
        this.name = ''
        this.email = ''
        this.user_id = ''
        this.department_id = ''
        this.employee_code = ''
        this.status = EmployeeModel.STATUS.inActive
        this.role = EmployeeModel.ROLE.user

        this.syncProps(props)
    }

    get nameEmployee() {
        return 'Mr. ' + `${this.name}`
    }

    syncProps(props) {
        return super.syncProps(props);
    }

    rawValue() {
        const val = super.rawValue();
        if (val.employee)
            val.employee = val.employee._id

        return val
    }
}

EmployeeModel.STATUS = {
    active: 'ACTIVE',
    inActive: 'INACTIVE',
    block: 'BLOCK'
}

EmployeeModel.ROLE = {
    root: 'NORMAL',
    admin: 'ADMIN',
    employee: 'EMPLOYEE',
    user: 'USER',
}
