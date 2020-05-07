

import {loadLanguageAsync} from './i18n-setup'

export default {
    i18nAutoLoad(Vue, option) {
        if (option && option.router && 'beforeEach' in option.router)
            option.router.beforeEach((to, from, next) => {
                if (to.params && to.params.lang) {
                    const lang = to.params.lang
                    loadLanguageAsync(lang).then(() => next())
                } else
                    next()
            })
    }
}
