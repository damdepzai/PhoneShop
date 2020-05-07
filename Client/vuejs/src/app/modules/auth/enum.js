

export const AUTH_URL = {
    login: _.env('API_USER_LOGIN', '/auth/login'),
    register: _.env('API_USER_REGISTER', '/auth/register'),
    logout: _.env('API_USER_LOGOUT', '/auth/logout'),
    me: _.env('API_USER_INFO', '/auth/me'),
    re_password: _.env('API_USER_REPASSWORD', '/auth/re-password'),
    change_password: _.env('API_USER_CHANGE_PASSWORD', '/auth/change-password'),
}

export const MUTATION_TYPE = {
    unsubscribeToken: 'UNSUBSCRIBE_TOKEN',
    updateUserInfo: 'UPDATE_USER_INFO',
    updateLoginStatus: 'UPDATE_LOGIN_STATUS',
    updateToken: 'UPDATE_TOKEN'
}
