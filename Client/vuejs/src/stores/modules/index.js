
const requireModule = require.context('.', true, /\.js$/)
const modules = {}
const accessFile = ['actions.js', 'getters.js', 'mutations.js', 'state.js']

requireModule.keys().map(fileName => {
    if (fileName === 'module.js.js') return

    const moduleDefault = {
        namespaced: true
    }
    // get all module
    const namePath = fileName.split('/')
    const folderName = _.nth(namePath, 1)

    if (accessFile.indexOf(_.last(namePath)) === -1) return

    if (folderName) {
        let moduleName = null
        if (!_.endsWith(folderName, '.js')) {
            moduleName = _.camelCase(
                folderName.replace(/(\.\/|\.js)/g, '')
            )

            if (!(moduleName in modules))
                modules[moduleName] = moduleDefault
        }

        if (moduleName in modules) {
            const storeObjName = _.last(namePath).replace(/(\.\/|\.js)/g, '')
            const obj = {}
            obj[storeObjName] = {...requireModule(fileName).default}
            _.assignIn(modules[moduleName], obj)
        }
    }
})

export default modules
