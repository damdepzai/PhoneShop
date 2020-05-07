

import UserModel from "../../user/models/UserModel";
import {MUTATION_TYPE, AUTH_URL} from "../enum";
import webApi from "../../../base/WebApiService";

export default {
    name: 'userSession',
    state: () => ({
        userInfo: new UserModel(),
        isLogin: false,
        token: '',
    }),
    mutations: {
        [MUTATION_TYPE.updateUserInfo](state, data) {
            if (state.userInfo instanceof UserModel)
                state.userInfo.syncProps(data)
            else
                state.userInfo = new UserModel(data)
        },
        [MUTATION_TYPE.updateLoginStatus](state, flag = false) {
            state.isLogin = flag
        },
        [MUTATION_TYPE.updateToken](state, data) {
            state.token = data.token
            webApi.setToken(data.token)
            if(data.remember) {
                localStorage.setItem('web_token', data.token)
            }
            sessionStorage.setItem('web_token', data.token)
        }
    },
    actions: {
        setUserInfo({dispatch, commit}, data) {
            // console.log(4444,data)
            if (data.user)
                commit(MUTATION_TYPE.updateUserInfo, data.user)
            dispatch('setLoginStatus')
            if (data.token)
                dispatch('setToken', {token: data.token, remember: data.user.remember_me})
        },
        setLoginStatus({commit, state}) {
            commit(MUTATION_TYPE.updateLoginStatus, state.userInfo ? (!!state.userInfo.id) : false)
        },
        setToken({commit, state, dispatch}, data) {
            commit(MUTATION_TYPE.updateToken, data)
            // commit(MUTATION_TYPE.unsubscribeToken)
            if (data.token) {
                setTimeout(() => {
                    (() => {
                        dispatch('whoIam')
                    })()
                })
            }

        },
        async checkLogin({dispatch, commit, state}) {
            let token = state.token
            if (!token)
                token = localStorage.getItem('web_token')
            if (!token)
                token = sessionStorage.getItem('web_token')
            if (!state.isLogin) {
                webApi.setToken(token)
                await webApi.post(AUTH_URL.me, null).then((res) => {
                    dispatch('setUserInfo', res.data)
                }).catch((err) => {
                    console.warn('You not login')
                })
            }
        },
        async whoIam({dispatch, commit, state}) {
            let token = state.token
            // console.log(33333,token)
            if (!token)
                token = localStorage.getItem('web_token')
            if (!token)
                token = sessionStorage.getItem('web_token')

            webApi.setToken(token)
            await webApi.post(AUTH_URL.me, null)
                .catch((err) => {
                    console.warn('Don\'t know who you are')
                })
                .then((res) => {
                    dispatch('setUserInfo', res.data)
                })
        },
        async logOut({commit, state}) {
            await webApi.post(AUTH_URL.logout, null)
                .catch((err) => {
                    console.log('logout error')
                })
                .then((res) => {
                    if (res.data.status === 'OK') {
                        commit(MUTATION_TYPE.updateToken, '')
                        commit(MUTATION_TYPE.updateUserInfo, new UserModel())
                        commit(MUTATION_TYPE.updateLoginStatus, false)
                    }
                })
        },
    },
    getters: {
        userInfo: state => {
            return state.userInfo
        },
        isLogin: state => {
            return state.isLogin
        },
        token: state => {
            if (state.token)
                return state.token

            return localStorage.getItem('web_token')
        }
    }
}
