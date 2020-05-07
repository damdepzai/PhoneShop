
<template>
    <bulma-nav fix="top" color="primary" nav-height="55px">
        <template slot="brand">

            <router-link to="/" exact>
                <logo :color="['#10679E','#dedaa1']" height="50px"></logo>
            </router-link>
        </template>
        <template slot="start">
            <router-link class="navbar-item" to="/master">Master</router-link>
        </template>
        <template slot="end">
            <a href="/features" class="navbar-item">
                Features
            </a> <a href="/pricing" class="navbar-item">
            Pricing
        </a> <a href="/blog/" class="navbar-item">
            Blog
        </a>
            <div class="navbar-item">
                <div class="field is-grouped">
                    <p class="control" v-if="isLogin">
                        <button class="button is-warning is-outlined" type="button" @click="doLogout()">
                            <span class="icon>"><i class="icon-solid sign-out"></i></span>
                        </button>
                    </p>
                    <!--<p class="control">
                        <a href="/login" class="button is-primary is-outlined">Login</a>
                    </p>
                    <p class="control">
                        <a href="/pricing" class="button is-success is-outlined">Signup</a>
                    </p>-->
                </div>
            </div>
            <div class="navbar-item" v-if="!$store.state.isOnline">
                <span class="icon has-text-warning has-tooltip is-tooltip-left" data-tooltip="Không có kết nối mạng">
                  <i class="icon-regular engine-warning flashit"></i>
                </span>
            </div>
        </template>
    </bulma-nav>
</template>

<script>
    import Logo from './Logo'

    export default {
        name: 'app-nav',
        components: {Logo},
        data: () => ({
            isSubmit: false
        }),
        computed: {
            isLogin() {
                return this.$store.getters['userSession/isLogin']
            }
        },
        methods: {
            doLogout() {
                if (!this.isSubmit) {
                    this.isSubmit = true
                    this.$store.dispatch('userSession/logOut').then(() => {
                        this.isSubmit = false
                        this.$router.push({path: '/login'})
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
