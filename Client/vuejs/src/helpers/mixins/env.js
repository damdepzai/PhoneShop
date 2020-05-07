

export default {
    register(h) {
        const env = (keyName, default_value = null) => {
            const value = process.env['VUE_APP_' + h.toUpper(h.snakeCase(keyName))]
            return value ? value : default_value
        }

        return {env: env}
    }
}
