

import * as _ from 'lodash'

const requireModule = require.context('.', true, /\.init.js$/)
requireModule.keys().map(fileName => {
    const module = requireModule(fileName).default
    Object.keys(module).map(name => {
        if (_.has(module[name], 'register')) {
            const mixin = module[name].register(_)
            if (_.isObject(mixin))
                _.mixin(mixin, {'chain': true});
            else
                throw new Error(`Helpers[${name}]: 'register' function must return an object`);
        } else {
            throw new Error(`Helpers[${name}]: Function 'register' not found`);
        }

    })
})


export default _
