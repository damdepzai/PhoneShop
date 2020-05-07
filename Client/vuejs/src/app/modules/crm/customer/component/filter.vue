<template>
    <bulma-modal-card :active="active" :title="$t('customer.search')" width="1020px"
                      @closeModal="dialogClose()">
        <template slot="body">
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">{{$t('customer.name')}} </label>
                        <div class="control">
                            <input class="input" type="text" v-model="searchForm.name"
                                   :placeholder="$t('customer.name')">
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">{{$t('customer.holding_company')}}/
                            {{$t('customer.introduction_company')}}</label>
                        <div class="control">
                            <input class="input" v-model="searchForm.holding_company" type="text"
                                   :placeholder="$t('customer.holding_company') + '/ ' + $t('customer.introduction_company')">
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">{{$t('customer.contact_point')}}</label>
                        <div class="control">
                            <input class="input" type="text" v-model="searchForm.contact_point"
                                   :placeholder="$t('customer.contact_point')">
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">Account Manager </label>
                        <div class="control">
                            <multi-select
                                :options="userSearch"
                                v-model="searchForm.account_manager"
                                :multiple="false"
                                :placeholder="$t('customer.select_acc')"
                                label="name"
                                track-by="id">
                            </multi-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">{{$t('customer.time_cooperation')}}</label>
                        <div class="control">
                            <date-picker :monthSelect="true" :dateFormat="'m-Y'" :locale="'vi'" :allowInput="false"
                                         :placeholder="$t('customer.time_cooperation')"
                                         v-model="searchForm.time_cooperation"></date-picker>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">{{$t('customer.time_stop_cooperation')}}</label>
                        <div class="control">
                            <date-picker :monthSelect="true" dateFormat="m-Y" :allowInput="false"
                                         :locale="'vi'"
                                         :placeholder="$t('customer.time_stop_cooperation')"
                                         v-model="searchForm.time_stop_cooperation"></date-picker>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">{{$t('customer.status')}} </label>
                        <div class="select">
                            <select v-model="searchForm.status" :class="{'color-placeholder': searchForm.status == null}">
                                <option :value="null" selected>{{$t('customer.select_status')}}</option>
                                <option value="1">Đang là khách hàng</option>
                                <option value="2">Đã dừng</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">{{$t('customer.time_settlement')}}</label>
                        <div class="control">
                            <date-picker :monthSelect="true" :dateFormat="'m-Y'" :locale="'vi'" :allowInput="false"
                                         :placeholder="$t('customer.time_settlement')"
                                         v-model="searchForm.time_settlement"></date-picker>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template slot="footer">
            <div class="column">
                <div class="buttons is-right">
                    <button type="button" @click="submitCustomer()"
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
    export default {
        name: "filterCustomer",
        data: () => ({
            isSubmitSearch: false
        }),
        props: {
            active: {
                type: Boolean,
                default: false
            },
            searchForm: {
                type: Object,
                default: false
            },
            userSearch: {
                type: Array,
                default: []
            }
        },

        methods: {
            submitCustomer() {
                this.$emit('submitSearch')
            },
            dialogClose() {
                this.$emit('closeFilter')
            }
        }
    }
</script>

<style>
    .input-date-picker[data-v-7d954948], .input-date-picker[data-v-7d954948] p {
        width: 100%;
    }
</style>
<style scoped>
    .select, .select select {
        width: 100%;
    }

    .input-contact {
        width: 85%;
    }
    .color-placeholder {
        color: #d8d8d8 !important;
    }
    .select select option{
        color: #000000 !important;
    }

</style>

