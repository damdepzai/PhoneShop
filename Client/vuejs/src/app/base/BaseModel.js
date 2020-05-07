

import Validate from './validate/Validate'
import Util from '../../helpers/Util'
import {DATA_PAGINATE} from "../enum";

export default class BaseModel {
    constructor(props) {
        this.__model__ = {
            default_value: {}
        };
        // this.__errors__ = {}
        this._autoKey = _.uuid()
    }

    syncProps(props) {
        if (props) {
            Object.assign(this, props)
        }

        return this
    }

    rawValue() {
        const jsonObj = Object.assign({}, this);
        const proto = Object.getPrototypeOf(this);
        for (const key of Object.getOwnPropertyNames(proto)) {
            const desc = Object.getOwnPropertyDescriptor(proto, key);
            const hasGetter = desc && typeof desc.get === 'function';
            if (hasGetter) {
                jsonObj[key] = this[key];
                delete jsonObj['_' + key]
            }
        }

        // delete jsonObj.__errors__
        delete jsonObj.__model__;
        delete jsonObj._autoKey;

        return jsonObj
    }

    /*delErr(name, type = null) {
		if (type && _.has(this.__errors__, name)) {
		  delete this.__errors__[name][type]
		} else if (_.has(this.__errors__, name)) {
		  delete this.__errors__[name]
		}
	  }

	  hasErr(field, type = null) {
		if (type) {
		  return _.has(this.__errors__, [field, type])
		}
		return _.has(this.__errors__, field)
	  }

	  setErr(field, msg, type = null) {
		console.log(`>>set errors ${field}: ${msg}`)
		if (type) {
		  _.setWith(this.__errors__, [field, type], msg)
		} else {
		  _.setWith(this.__errors__, field, msg)
		}

		return this
	  }

	  getErr(field, type = null) {
		console.log(`>>get errors ${field}`)
		return type ? _.get(this.__errors__, [field, type]) : _.get(this.__errors__, field)
	  }

	  resetErr() {
		this.__errors__ = {}

		return this
	  }*/

    makeValid(roles, message) {
        return new Promise((resolve, reject) => {
            const valid = new Validate();
            const errors = {};
            // this.__errors__.resetErr()
            if (roles && Util.isObject(roles)) {
                Object.keys(roles).map(field => {
                    const role_name = roles[field].split('|'); // required|max:10 => [required, max:10]
                    role_name.map(role => {
                        const role_param = role.split(':'); // [required], [max, 10]
                        if (role_param[0] in valid) {
                            const msg = message[`${field}.${role_param[0]}`];
                            const param = role_param.splice(1);
                            if (valid[role_param[0]](this[field], ...param)) {
                                errors[field] = msg ? msg : `${field}.${role_param[0]}, ${role_param[0]}`
                            } else {
                                if (role_param[0] && errors[field] && errors[field][role_param[0]])
                                    delete errors[field][role_param[0]]
                            }
                        } else {

                        }

                    })
                })
            }

            if (Object.keys(errors).length > 0) {
                reject(errors)
            } else {
                resolve(true)
            }
        })

    }

    setDefault(props) {
        Object.keys(this).map(name => {
            const val = _.get(this.__model__.default_value, name);
            if (['__model__'].indexOf(name) === -1) {
                switch (typeof this[name]) {
                    case 'number':
                    case 'object':
                        this[name] = props[name] ? props[name] : (val ? val : null);
                        break;
                    default:
                        this[name] = val ? val : '';
                        break
                }
            }
        })
    }
}

BaseModel.DATA_PAGINATE = DATA_PAGINATE;


