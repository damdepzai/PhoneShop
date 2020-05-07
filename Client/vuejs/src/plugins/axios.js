

import axios from 'axios'
import store from '../stores'

export default {
  install(Vue, options) {
      axios.interceptors.request.use(function (config) {
      if (!store.state.isOnline) {
        Vue.prototype.$addNotification({
          color: 'warning',
          title: 'Thông báo',
          content: 'Hệ thống đang offline'
        });

        return Promise.reject()
      }
      // Do something before request is sent
      return config
    }, function (error) {
      // Do something with request error
      Vue.prototype.$addNotification({
        color: 'warning',
        content: error.message
      });
      return Promise.reject(error)
    });

    // Add a response interceptor
      axios.interceptors.response.use(function (response) {
      // Do something with response data
      return response
    }, function (error) {
      if (!error.response) {
        Vue.prototype.$addNotification({
          color: 'danger',
          content: error.message
        })
      }

      return Promise.reject(error)
    });

    Vue.prototype.$axios = axios
  }
}
