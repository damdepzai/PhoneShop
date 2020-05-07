

<template>
    <div class="bg-custom">
        <div class="container">
            <div class="columns">
                <div class="column is-two-thirds"></div>
                <div class="column is-one-third is-full-mobile">
                    <div class="card card-login">
                        <header class="card-header">
                            <p class="card-header-title has-text-centered custom-text-card">
                                {{$t('auth.change_password_title')}}</p>
                        </header>
                        <div class="card-content has-relative">
                            <div class="content">
                                <div class="field custom-simple-text">
                                    <div class="notification is-link">
                                        {{$t('auth.simple_change_pass')}}
                                    </div>
                                </div>
                                <div class="field">
                                    <input class="input" type="hidden" v-model="formData.token">
                                    <input class="input" type="hidden" v-model="formData.email">
                                    <label class="label" for="in#pwd">Mật khẩu mới</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <input class="input" type="password" id="in#pwd" v-model="formData.password"
                                               :class="{'is-danger': hasError('password')}">
                                        <span class="icon is-small is-left">
                                      <i class="icon-key"></i>
                                    </span>
                                    </div>
                                    <p class="has-text-danger error" v-if="hasError('password')">
                                        {{getError('password')}}</p>
                                </div>
                                <div class="field">
                                    <label class="label" for="in#pwd2">Xác nhận lại mật khẩu</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <input class="input" type="password" id="in#pwd2"
                                               :disabled="!this.pwRegex"
                                               v-model="formData.password_confirmation"
                                               :class="{'is-danger': hasError('re_password')}">
                                        <span class="icon is-small is-left">
                                      <i class="icon-key"></i>
                                    </span>
                                    </div>
                                </div>
                                <p class="has-text-danger error" v-if="hasError('re_password')">
                                    {{getError('re_password')}}</p>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <div class="column has-text-centered">
                                <button type="button" @click="doChangePassword()"
                                        :class="{'button is-primary':true,'is-loading':isSubmit}">
                                    {{$t('auth.change_pass_success')}}
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import AuthService from "../AuthService";
  import validate from "../../../base/validate/Validate"

  export default {
    name: "change-password",
    data: () => ({
      formData: {
        email: '',
        password: '',
        password_confirmation: '',
        token: ''
      },
      isSubmit: false,
      is_success: false
    }),
    mounted() {
      this.oldHtmlClass = document.documentElement.className.split(" ");
      document.documentElement.setAttribute('class', '')
    },
    computed: {

        pwdEq() {
        return validate.isEq(this.formData.password, this.formData.password_confirmation) && !validate.isNull(this.formData.password)
        },
        pwdOk(){
            return !validate.isNull(this.formData.password)
        },
        pwLength() {
            return validate.isPassword(this.formData.password)
        },
        pwRegex() {
        return validate.isPassword(this.formData.password)
        },
        pwdCfOk() {
        return !validate.isNull(this.formData.password_confirmation)
        },
    },
    methods: {
      validate() {
        this.resetError()
        if (!this.pwdOk) {
          this.setError('password', 'Mật khẩu không được để trống')
        } else if (!this.pwLength) {
          this.setError('password', 'Mật khẩu mới phải dài 8-15 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt')
        } else if (!this.pwdCfOk) {
          this.setError('re_password', 'Xác nhận lại mật khẩu không được để trống')
        } else if (!this.pwdEq) {
          this.setError('re_password', 'Xác nhận lại mật khẩu mới không đúng')
        }
      },
      getSearchParams(k) {
        var p = {};
        location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, k, v) {
          p[k] = v
        })
        return k ? p[k] : p;
      },
      doChangePassword() {
        this.validate()
          this.isSubmit = false
        if (!this.isSubmit) {
          if (!this._isError()) {
            this.isSubmit = true
            this.formData.token = this.getSearchParams('token')
            if (this.getSearchParams('email')) {
              this.formData.email = this.getSearchParams('email').replace("%40", "@")
            }
            AuthService.changePassword(this.formData)
              .then(res => {
                this.isSubmit = false
                this.is_success = true
                this.$addNotification({
                  color: 'success',
                  content: res.data
                })
                this.$router.push('/login')
              })
              .catch(err => {
                this.isSubmit = false
                this.$addNotification({
                  color: 'warning',
                  content: err.message
                })
                  this.$router.push('/login')
              })
          } else {
            setTimeout(() => {
              this.isSubmit = false
            }, 500)
          }
        }
      },

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

</style>
