import AuthService from "../AuthService";

export default {
    methods: {
        userLogout() {
            // console.log(this.USER_info)
            AuthService.logout().then((res) => {
                localStorage.removeItem('web_token');
                sessionStorage.removeItem('web_token');
                this.$router.go('/login')
            }).catch((err) => {
                console.log(err)
            })
        },
    }
}
