


export default class Util {
    static hasErrorPage(error) {
        if (error.response && error.response.status) {
            error = error.response.status
        }

        return [400, 401, 500].indexOf(error) !== -1
    }

    static camelCaseToDash(str) {
        return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
    }

    static snakeCaseToCamelCase(str) {
        if (typeof str !== 'string') {
            console.warn(`the ${str} is not String`)
        }

        return str.replace(/_(\w)/g, (m => m[1].toUpperCase()))
    }

    static isObject(value) {
        const type = typeof value
        return value != null && (type === 'object' || type === 'function');
    }


    static replaceUrlParam(url, params) {
        if (params && _.isObject(params)) {
            Object.keys(params).map(key => {
                url = url.replace(`:${key}`, params[key])
            })
        }

        return url
    }
}
