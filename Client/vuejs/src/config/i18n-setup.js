

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vn from '@/resources/lang/vi'
import webApi from '../app/base/WebApiService'

Vue.use(VueI18n)

const findLang = () => {
    return window.navigator.language ? window.navigator.language : 'vi'
}

const locale = _.env('LOCALE', findLang())

export const i18n = new VueI18n({
    locale: locale, // set locale
    fallbackLocale: 'vi',
    messages: {vi: vn}
})

const setI18nLanguage = (lang) => {
    i18n.locale = lang
    webApi.setAcceptLanguage(lang)
    document.querySelector('html').setAttribute('lang', lang)
    return lang
}

export const loadLanguageAsync = (lang) => {
    if (i18n.locale !== lang) {

        const loadedLanguages = ['vi']
        if (loadedLanguages.indexOf(lang) === -1) {
            return import(
                /* webpackInclude: /\.json$/ */
                /* webpackExclude: /\.noimport\.json$/ */
                /* webpackChunkName: "locale-" */
                /* webpackMode: "lazy" */
                /* webpackPrefetch: true */
                /* webpackPreload: true */
                `@/resources/lang/${lang}`).then(msgs => {
                i18n.setLocaleMessage(lang, msgs.default)
                loadedLanguages.push(lang)
                return setI18nLanguage(lang)
            })
        }
        return Promise.resolve(setI18nLanguage(lang))
    } else {
        setI18nLanguage(lang)
    }
    return Promise.resolve(lang)
}

loadLanguageAsync(locale)
