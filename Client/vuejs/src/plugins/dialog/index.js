/*
 * Copyright (c) 2020.
 * Project: Source
 * LastModified: 2/14/20, 3:23 PM
 * Author: diengv < Giáp Văn Điện >
 * Email: diengv@ominext.com
 * File name: index.js
 * File path: D:/Projects/PMS/Source/Client/vuejs/src/plugins/dialog/index.js
 */

import DialogComponent from '../dialog/app-dialog'
import NotifiComponent from '../dialog/app-notification'

export default {
    install(Vue) {
        // Create generic method
        Vue.prototype.$openDialog = (title, content, options, callback) => {
            const defaultOption = {
                iconClass: 'icon-solid check',
                customIcon: '',
                okText: 'OK',
                cancelText: 'Cancel',
                closeTime: -1
            }

            const defaultCallBack = {
                onOk: () => {
                },
                onCancel: () => {
                }
            }

            if (options)
                Object.assign(defaultOption, options)
            if (callback)
                Object.assign(defaultCallBack, callback)

            const propsData = {
                title: title, content: content, ...defaultOption, ...defaultCallBack
            }

            const Dialog = Vue.extend(DialogComponent)
            const dialogCom = new Dialog({propsData})

            // Mount it
            let vm = dialogCom.$mount()
            // Add it to the Vue application
            document.querySelector('body').appendChild(vm.$el)
        }

        Vue.prototype.$addNotification = (propsData = {
            title: '',
            content: '',
            color: '',
            time: 1500,
            showIcon: true
        }) => {
            const Noti = Vue.extend(NotifiComponent)
            const NotiCom = new Noti({propsData})

            let notiGroup = document.querySelector('.app-notification')
            if (!notiGroup) {
                notiGroup = document.createElement('div')
                notiGroup.classList.add('app-notification')
                document.querySelector('body').appendChild(notiGroup)
            }

            let vm = NotiCom.$mount()
            notiGroup.appendChild(vm.$el)
        }
    }
}
