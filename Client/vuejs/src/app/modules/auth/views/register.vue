

<template>
    <div class="columns is-vcentered is-centered" style="height: 100vh;">
        <div class="column is-half-tablet is-two-fifths-desktop">
            <div class="card-login-bg">
                <div class="card card-login">
                    <header class="card-header">
                        <p class="card-header-title">Đăng ký tài khoản</p>
                        <router-link to="/support" class="card-header-icon" aria-label="Hỗ trợ">
                         <span class="icon">
                        <i class="icon-regular question-circle has-text-grey-light" aria-hidden="true"></i>
                      </span>
                        </router-link>
                    </header>
                    <div class="card-content has-relative">
                        <div class="logo-box">
                            <router-link to="/" exact>
                                <logo :color="['#38739f','#c7c360']" height="60px"></logo>
                            </router-link>
                        </div>
                        <div class="content">
                            <div class="field">
                                <label class="label" for="in#email">Email</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="email" id="in#email" v-model="formData.email"
                                           placeholder="Email input">
                                    <span class="icon is-small is-left">
                                      <i class="icon-regular envelope"></i>
                                    </span>
                                    <span class="icon is-small is-right" v-if="emailOk">
                                      <i class="icon-regular check has-text-success"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label" for="in#pwd">Password</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="password" id="in#pwd" v-model="formData.password">
                                    <span class="icon is-small is-left">
                                      <i class="icon-regular key"></i>
                                    </span>
                                    <span class="icon is-small is-right" v-if="pwdOk">
                                      <i class="icon-regular check has-text-success"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label" for="in#pwd2">Nhập lại mật khẩu của bạn</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="password" id="in#pwd2"
                                           :disabled="!formData.password.length"
                                           v-model="formData.passwordRep">
                                    <span class="icon is-small is-left">
                                      <i class="icon-regular key"></i>
                                    </span>
                                    <span class="icon is-small is-right" v-if="pwdEq">
                                      <i class="icon-regular check has-text-success"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <div class="column">
                            <button type="button" @click="doRegister()"
                                    :class="{'button is-primary':true,'is-loading':isSubmit}">
                                Xác nhận
                            </button>
                        </div>
                        <div class="column">
                            <div class="buttons is-right">
                                <router-link to="/login" class="button is-outlined is-success">Đăng nhập
                                </router-link>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AuthService from "../AuthService";
    import validate from "../../../base/validate/Validate"

    export default {
        name: "register",
        data: () => ({
            formData: {
                email: '',
                password: '',
                passwordRep: ''
            },
            isSubmit: false
        }),
        computed: {
            isValid() {
                return this.pwdOk && this.pwdEq && this.emailOk
            },
            emailOk() {
                return !validate.isNull(this.formData.email) && validate.isEmail(this.formData.email)
            },
            pwdEq() {
                return validate.isEq(this.formData.password, this.formData.passwordRep) && !validate.isNull(this.formData.password)
            },
            pwdOk() {
                return !validate.isMin(this.formData.password, 6) && !validate.isNull(this.formData.password)
            }
        },
        methods: {
            doRegister() {
                if (!this.isSubmit) {
                    if (this.isValid) {
                        this.isSubmit = true
                        AuthService.register(_.pick(this.formData, ['email', 'password']))
                            .then(res => {
                                this.isSubmit = false
                            })
                            .catch(err => {
                                this.isSubmit = false
                                this.$addNotification({
                                    color: 'warning',
                                    content: err.message
                                })
                            })
                    } else {
                        this.$addNotification({
                            color: 'warning',
                            content: 'Vui lòng điền đủ thông tin được yêu cầu'
                        })
                    }
                }
            },

        }
    }
</script>

<style scoped></style>
