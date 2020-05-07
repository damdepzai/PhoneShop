

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
                                    {{$t('auth.repassword_title')}}</p>
                            </header>
                            <div class="card-content has-relative">
                                <div class="logo-box">
                                    <!--<router-link to="/" exact>
                                        <logo :color="['#38739f','#c7c360']" height="60px"></logo>
                                    </router-link>-->
                                </div>
                                <div class="content">
                                    <div class="field custom-simple-text">
                                        <div class="notification is-link">
                                            {{$t('auth.simple_re_pass')}}
                                        </div>
                                    </div>
                                    <div class="field" v-if="isSendMail === false">
                                        <label class="label" for="in#email">{{$t('auth.re_email')}} : </label>
                                        <div class="control has-icons-left has-icons-right">
                                            <input class="input email" type="email" id="in#email"
                                                   v-model="formData.email"
                                                   :class="{'is-danger': hasError('email')}"
                                            >
                                            <span class="icon is-small is-left">
                                      <i class="icon-mail"></i>
                                    </span>
                                            <span class="icon is-small is-right" v-if="emailOk">
                                      <i class="icon-regular check has-text-success"></i>
                                    </span>
                                        </div>
                                        <p class="has-text-danger error" v-if="hasError('email')">
                                            {{getError('email')}}</p>

                                    </div>
                                    <div class="field" v-if="isSendMail === true">
                                        <div class="notification is-success">
                                            {{this.mesMail}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer class="card-footer">
                                <div class="column">
                                    <div class="field">
                                        <router-link to="/login" class="is-outlined is-success custom-left">
                                            Trở về
                                        </router-link>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="buttons is-right custom-right" v-if="isSendMail === false">
                                        <button type="button" @click="doRePassword()" v-if="isSendMail === false"
                                                :class="{'button is-primary':true,'is-loading':isSubmit}"
                                                class="">
                                            {{$t('auth.login_submit')}}
                                        </button>
                                    </div>
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
    name: "re-password",
    data: () => ({
      formData: {
        email: '',
      },
      isSubmit: false,
      isSendMail: false,
      mesMail: ''
    }),
    mounted() {
      this.oldHtmlClass = document.documentElement.className.split(" ");
      document.documentElement.setAttribute('class', '')
    },
    computed: {

      emailOk() {
        return !validate.isNull(this.formData.email)
      },
      isEmailRegex() {
        return validate.isEmailPm(this.formData.email)
      }
    },
    methods: {
      ...mapActions('userSession', ['setUserInfo']),
      validate() {
        this.resetError()
        if (!this.emailOk) {
          this.setError('email', 'Địa chỉ email không được để trống')
        } else if (!this.isEmailRegex) {
          this.setError('email', 'Địa chỉ email không đúng định dạng')
        }
      },
      doRePassword() {
        this.validate()
          this.isSubmit = false
        if (!this.isSubmit) {
          if (!this._isError()) {
            AuthService.rePassword(this.formData)
              .then(res => {
                this.isSubmit = false
                this.isSendMail = true
                this.mesMail = res.data
                this.$addNotification({
                  color: 'success',
                  content: res.data
                })
              })
              .catch(err => {
                this.isSubmit = false
                this.$addNotification({
                  color: 'danger',
                  content: err.message ? err.message : this.$t('auth.login_re_password')
                })
              })
          } else {
            setTimeout(() => {
              this.isSubmit = false
            }, 500)

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
        margin-right: 8px;
    }

</style>
