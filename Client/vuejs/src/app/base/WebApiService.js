

import axios from 'axios'

const webApi = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 600000,
    withCredentials: true,

    /*    httpAgent: new http.Agent({keepAlive: true}),
		httpsAgent: new https.Agent({keepAlive: true})*/
});
axios.defaults.withCredentials = true;
/*axios.get('/sanctum/csrf-cookie').then(response => {
/!*    console.log(response.headers)*!/
});*/

webApi.defaults.headers.common['Accept-Customer'] = process.env.VUE_APP_CUSTOMER_ID;


    webApi.setToken = (token) => {
        webApi.defaults.headers.common['Authorization'] = 'Bearer ' + token
    };

let token = localStorage.getItem('web_token');
if(!token)
    token = sessionStorage.getItem('web_token')
webApi.setToken(token);

webApi.setAcceptLanguage = (lang) => {
    webApi.defaults.headers.common['Accept-Language'] = lang
};

webApi.interceptors.request.use(function (config) {
    // hook
    if (!navigator.onLine)
        return Promise.reject({message: 'You are offline'});

    return config
}, function (error) {
    // hook

    return Promise.reject(error)
});

// Add a response interceptor
webApi.interceptors.response.use(function (response) {
    // hook
    return response
}, function (error) {
    // hook
    if (error.response)
        if (error.response.data && _.isObject(error.response.data) && error.response.data.message)
            error.message = error.response.data.message;
        else if (error.response.data && typeof error.response.data === 'string')
            error.message = error.response.data;

    return Promise.reject(error)
});

export default webApi

