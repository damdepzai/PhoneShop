/*
 * Copyright (c) 2020.
 * Project: Source
 * LastModified: 2/14/20, 3:23 PM
 * Author: diengv < Giáp Văn Điện >
 * Email: diengv@ominext.com
 * File name: module.js
 * File path: D:/Projects/PMS/Source/Client/vuejs/src/app/modules/module.js
 */

import * as Layout from '../../resources/layout'
import Store from '../../stores'

/**
 * @typedef {Object} moduleConfigObj
 * @property {boolean} isActive
 * @property {string} moduleName
 * @property {string} viewFolder
 * @property {string} serviceFolder
 */

export default class AppModule {
    constructor(moduleName) {
        this.isActive = true
        this.moduleName = moduleName
        this.viewFolder = 'views'
        this.serviceFolder = 'service'
        this._routers = []
        this._store = []
    }

    store(arr) {
        this._store = arr
        if (!Array.isArray(this._store) && _.isObject(this._store))
            this._store = [this._store]

        this._store.map(store => {
            store.namespaced = true
            Store.registerModule(_.camelCase(store.name), _.omit(store, 'name'))
        })

        return this
    }

    routers(arr) {
        this._routers = arr

        return this
    }

    /**
     *
     * @param {moduleConfigObj} [config]
     * @return {AppModule}
     */
    register(config = {}) {
        Object.assign(this, config)

        return this
    }
}

AppModule.layout = Layout
