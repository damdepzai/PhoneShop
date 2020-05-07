

<template>
    <div class="bg-custom">
        <div class="container">
            <div class="columns">
                <div class="column is-two-thirds"></div>
                <div class="column is-one-third is-full-mobile">
                    <div class="card-login-bg">
                        <div class="card card-login">
                            <header class="card-header">
                                <p class="card-header-title has-text-centered custom-text-card">
                                    {{$t('auth.login_title')}}</p>
                            </header>
                            <div class="card-content has-relative">
                                <div class="logo-box">
                                    <!--<router-link to="/" exact>
                                        <logo :color="['#38739f','#c7c360']" height="60px"></logo>
                                    </router-link>-->
                                </div>
                                <div class="content">
                                    <div class="field">
                                        <label class="label" for="in#email">{{$t('auth.login_email')}} : </label>
                                        <div class="control has-icons-left has-icons-right">
                                            <input class="input email" type="email" id="in#email"
                                                   :class="{'is-danger': hasError('email_required')}"
                                                   v-model="formData.email"
                                            >
                                            <span class="icon is-small is-left">
                                                <i class="icon-mail"></i>
                                            </span>
                                            <span class="icon is-small is-right" v-if="emailOk">
                                                <i class="icon-regular check has-text-success"></i>
                                            </span>
                                        </div>
                                        <p class="has-text-danger error" v-if="hasError('email_required')">{{getError('email_required')}}</p>
                                    </div>
                                    <div class="field">
                                        <label class="label" for="in#pwd">{{$t('auth.login_password')}} :</label>
                                        <div class="control has-icons-left has-icons-right">
                                            <input class="input password" type="password" id="in#pwd"
                                                   :class="{'is-danger': hasError('pwd_required')}"
                                                   v-model="formData.password">
                                            <span class="icon is-small is-left">
                                      <i class="icon-key"></i>
                                    </span>
                                            <span class="icon is-small is-right" v-if="pwdOk">
                                      <i class="icon-regular check has-text-success"></i>
                                    </span>
                                        </div>
                                        <p class="has-text-danger error" v-if="hasError('pwd_required')">{{getError('pwd_required')}}</p>

                                    </div>
                                    <div class="field">
                                        <div class="columns">
                                            <div class="column is-half" style="text-align: left">
                                                <label class="checkbox">
                                                    <input type="checkbox" v-model="formData.rememberMe" @click="checkRemember">
                                                    Nhớ mật khẩu
                                                </label>
                                            </div>
                                            <div class="column is-half" style="text-align: right">
                                                <router-link to="/reset-password" class="is-outlined is-success">
                                                    {{$t('auth.login_lost_pass_btn')}}
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer class="card-footer">
                                <div class="column is-full" style="text-align: center">
                                    <button type="button" @click="doLogin()"
                                            :class="{'button is-primary':true,'is-loading':isSubmit}" class="has-text-centered">
                                        {{$t('auth.login_btn')}}
                                    </button>
                                </div>

                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped type="text/css">
    @import "../style/auth.scss";
</style>

<script>
  import AuthService from "../AuthService";
  import {mapActions} from 'vuex'
  import validate from "../../../base/validate/Validate"

  export default {
    name: "login",
    data: () => ({
      formData: {
        email: '',
        password: '',
        rememberMe: false,
      },

      isSubmit: false,
      oldHtmlClass: ''
    }),
    mounted() {
      this.oldHtmlClass = document.documentElement.className.split(" ");
      document.documentElement.setAttribute('class', '')
    },
    computed: {
      emailOk() {
        return !validate.isNull(this.formData.email)
      },
      pwdOk() {
        return !validate.isNull(this.formData.password)
      },

    },
    methods: {
      checkRemember(){
        if(this.formData.rememberMe !== "") {
          this.formData.rememberMe = true
        }
        this.formData.rememberMe = false
      },
      validate() {
        this.resetError()
        if (!this.emailOk) {
          this.setError('email_required', 'Tên đăng nhập không được để trống')
        }
        if (!this.pwdOk) {
          this.setError('pwd_required', 'Mật khẩu không được để trống')
        }
      },
      ...mapActions('userSession', ['setUserInfo']),
      doLogin() {
        this.validate()
          this.isSubmit= false
        if (!this.isSubmit) {
          if (!this._isError()) {
            AuthService.login(this.formData)
              .then(res => {
                this.setUserInfo(res.data)
                this.$router.push('/user')
              })
              .catch(err => {
                this.isSubmit = false
                this.$addNotification({
                  color: 'danger',
                  content: err.message ? err.message : this.$t('auth.login_error')
                })
              })
          } else {
            setTimeout(() => {
              this.isSubmit = false
            }, 1000)

          }

        }

      }
    },
    beforeDestroy() {
      document.documentElement.classList.add(...this.oldHtmlClass)
    }
  }
</script>

<style scoped lang="scss">
    .custom-text-card {
        display: block;
        text-transform: uppercase;
        font-weight: bold;
    }

    .bg-custom {
        background-image: url("../../../../resources/assets/img/backgroud-login.png");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: contain;
        height: 100vh;
        width: 100%;

    }

    .card-login {
        margin-top: 30%;
        border-radius: 10px;
    }
    .custom-left {
        margin-left: 10px;
    }

    .custom-right {
        margin-right: 14px;
    }
</style>
