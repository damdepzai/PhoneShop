<template>
    <bulma-modal-card width="610px" :active="active" :title="$t('contact_point.title')"
                      @closeModal="dialogClose()">
        <template slot="body">
                <div class="field">
                    <label class="label">{{$t('contact_point.name')}} <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <input :class="{'is-danger': hasError('name_format',contactPointDetail)}" maxlength="50" class="input" type="text" v-model="contactPointDetail.name"
                               :placeholder="$t('contact_point.name')">
                        <p class="has-text-danger error" v-if="hasError('name_format',contactPointDetail)">{{getError('name_format',contactPointDetail)}}</p>
                    </div>
                </div>
                <div class="field">
                    <label class="label">{{$t('contact_point.position')}} </label>
                    <div class="control">
                        <input maxlength="50" class="input" type="text" v-model="contactPointDetail.position"
                               :placeholder="$t('contact_point.position')">
                    </div>
                </div>
                <div class="field">
                    <label class="label">{{$t('contact_point.email')}} </label>
                    <div class="control">
                        <input maxlength="256" :class="{'is-danger': hasError('email_format',contactPointDetail)}" class="input" type="text" v-model="contactPointDetail.email"
                               :placeholder="$t('contact_point.email')">
                        <p class="has-text-danger error" v-if="hasError('email_format',contactPointDetail)">{{getError('email_format',contactPointDetail)}}</p>

                    </div>
                </div>
                <div class="field">
                    <label class="label">{{$t('contact_point.interest')}} </label>
                    <div class="control">
                        <textarea maxlength="500" class="textarea" type="text" v-model="contactPointDetail.interest"
                                  :placeholder="$t('contact_point.interest')" rows="2"></textarea>
                    </div>
                </div>

                <div class="field">
                    <label class="label">{{$t('contact_point.birthday')}}</label>
                    <div class="control">
                        <date-picker dateFormat="d-m-Y" :locale="'vi'" :allowInput="false"
                                     :placeholder="$t('contact_point.birthday')"
                                     v-model="contactPointDetail.birthday"></date-picker>
                    </div>
                </div>

        </template>
        <template slot="footer">
            <div class="column">
                <div class="buttons is-right">
                    <button type="button" @click="submit()"
                            :class="{'button is-primary':true}">
                        Xác nhận
                    </button>
                </div>
            </div>
            <div class="column">
                <div class="buttons">
                    <button class="button is-outlined" type="button"
                            @click="dialogClose()">Đóng lại
                    </button>
                </div>
            </div>
        </template>
    </bulma-modal-card>
</template>

<script>
    import Validate from "../../../../base/validate/Validate"

    export default {
        name: "ContactPointDialog",
        data: () => ({
            isSubmitSearch: false
        }),
        props: {
            active: {
                type: Boolean,
                default: false
            },
            contactPointDetail: {
                type: Object,
                default: false
            },
        },
        computed:{
            emailOk() {
                if(this.contactPointDetail.email){
                    return Validate.isEmailPm(this.contactPointDetail.email)
                }else {
                    return true
                }

            },

            nameOk() {
                if(this.contactPointDetail.name){
                    return Validate.required(this.contactPointDetail.name)
                }else {
                    return true
                }

            },
        },
        watch:{
            active(val){
                if(val){
                    this.resetError()
                }
            }
        },
        methods: {
            validate() {
                if (!this.emailOk) {
                    this.setError('email_format', 'Email không đúng định dạng', this.contactPointDetail)
                }
                if (this.nameOk) {
                    this.setError('name_format', 'Tên người liên lạc không được để trống', this.contactPointDetail)
                }
            },
            submit() {
                this.resetError()
                this.validate()
                if(!this._isError(this.contactPointDetail)){
                    this.$emit('submitCp')
                }
            },
            dialogClose(){
                this.$emit('closeFilter')
            }
        }
    }
</script>

<style>
    .input-date-picker[data-v-7ec38cbc], .input-date-picker[data-v-7ec38cbc] p{
        width: 100% !important;
    }
</style>
<style scoped>
    .modal-card {
        width: 450px !important;
    }
</style>
