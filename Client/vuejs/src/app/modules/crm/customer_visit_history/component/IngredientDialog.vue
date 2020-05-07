<template>
    <bulma-modal-card :active="active" :title="$t('customerVisitHistory.update_ingredient')" width="610px"
                      @closeModal="dialogClose()">
        <template slot="body">
            <div class="field">
                <label class="label">{{$t('customerVisitHistory.guest_name')}} <span class="has-text-danger">*</span></label>
                <div class="control">
                    <input :class="{'is-danger': hasError('name_require',contactPointDetail)}" class="input" type="text" v-model="contactPointDetail.name"
                           maxlength="50"
                           :placeholder="$t('customerVisitHistory.guest_name')">
                    <p class="has-text-danger error" v-if="hasError('name_require',contactPointDetail)">{{getError('name_require',contactPointDetail)}}</p>
                </div>
            </div>
            <div class="field">
                <label class="label">{{$t('customerVisitHistory.position')}} </label>
                <div class="control">
                    <input class="input" type="text" v-model="contactPointDetail.position"
                           maxlength="50"
                           :placeholder="$t('contact_point.position')">
                </div>
            </div>
            <div class="field">
                <label class="label">{{$t('customerVisitHistory.email')}} </label>
                <div class="control">
                    <input :class="{'is-danger': hasError('email_format',contactPointDetail)}" class="input" type="text" v-model="contactPointDetail.email"
                           maxlength="100"
                           :placeholder="$t('contact_point.email')">
                    <p class="has-text-danger error" v-if="hasError('email_format',contactPointDetail)">{{getError('email_format',contactPointDetail)}}</p>

                </div>
            </div>
            <div class="field">
                <label class="label">{{$t('customerVisitHistory.interest')}} </label>
                <div class="control">
                        <textarea class="textarea" type="text" v-model="contactPointDetail.interest"
                                  maxlength="500"
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

    import customerVisitHistory from "../script/customerVisitHistory";

    import IngredientDialog from "../component/IngredientDialog";
    import Pagination from "../../../../../plugins/bulma/component/Pagination";


    export default {
        name: "IngredientDialog",
        mixins: [customerVisitHistory],
        // components: {
        //     Pagination,IngredientDialog,customerVisitHistory
        // },
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
            nameOk(){
                if(this.contactPointDetail.name){
                    return Validate.required(this.contactPointDetail.name)
                }else {
                    return true
                }
            }
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
                    this.setError('email_format', this.$t('ingredient.require_mail'), this.contactPointDetail)
                }

                if (this.nameOk){
                    this.setError('name_require', this.$t('ingredient.require_name'), this.contactPointDetail)
                }
            },

            submit() {
                this.resetError()
                this.validate()
                if(!this._isError(this.contactPointDetail)){
                    this.$emit('submit')
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
