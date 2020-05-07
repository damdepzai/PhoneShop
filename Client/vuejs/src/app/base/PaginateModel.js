

import BaseModel from './BaseModel'

export default class Paginate extends BaseModel {
  constructor (props, modelData) {
    super(props)

    this.total = 0
    this.per_page = 30
    this.current_page = 1
    this.last_page = null
    this.first_page_url = null
    this.last_page_url = null
    this.next_page_url = null
    this.prev_page_url = null
    this.path = null
    this.from = 0
    this.to = 0
    this.data = []

    this.if(props && _.isObject(props))
    Object.keys(props).map(name => {
      if (name in this) {
        if (name === 'data' && Array.isArray(props[name]) && modelData) {
          props[name].map(val => {
            const model = new modelData()
            if ('syncProps' in model) {
              model.syncProps(val)
            }
            this[name].push(model)
          })
        } else {
          this[name] = props[name]
        }
      }
    })
  }

  rawData () {
    return this.data.map((val) => {
      if ('rawValue' in val) {
        return val.rawValue()
      } else {
        throw new Error('Can\'t find BaseModel or rawValue method')
      }
    })
  }

}
