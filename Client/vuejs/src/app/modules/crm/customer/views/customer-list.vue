<template>
    <div class="card">
        <header class="card-header columns is-multiline is-mobile is-marginless">
            <div class="column is-one-fifth-fullhd is-full-mobile">
                <p class="card-header-title has-text-title"><b>{{$t('customer.title')}}</b></p>
            </div>
            <div class="column is-three-fifths-fullhd is-full-mobile">
                <span class="card-header-icon" aria-label="more options">
                    <pagination
                        :current="pagination.current"
                        :total="pagination.total"
                        :perPage="pagination.perPage"
                        @onChange="searchData"
                        :step="1">
                    </pagination>
                </span>
            </div>
            <div class="column is-one-fifth-fullhd is-full-mobile">
                <span class="card-header-icon buttons-control" aria-label="more options">
                    <button class="button" type="button"
                            @click="reloadData()">
                         <span class="icon">
                            <i class="icon-redo-alt" aria-hidden="true"></i>
                          </span>
                    </button>
                </span>
                <span class="card-header-icon buttons-control" aria-label="more options">
                    <button class="button" type="button"
                            @click="openFilter()">
                         <span class="icon">
                            <i class="icon-search" aria-hidden="true"></i>
                          </span>
                    </button>
                </span>
                <span class="card-header-icon buttons-control" aria-label="more options">
                    <button class="button is-success" type="button"
                            @click="showAddCustomer()" v-if="permissions.includes('customer-create')">
                         <span class="icon">
                            <i class="icon-plus" aria-hidden="true"></i>
                          </span>
                    </button>
                </span>
            </div>
        </header>
        <div class="card-content">
            <template>
                <div class="table-container">
                    <table class="table is-fullwidth is-striped is-hoverable table is-bordered has-font-table">
                        <thead>
                        <tr>
                            <th class="has-text-centered has-color-th">{{$t('customer.stt')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customer.name')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customer.holding_company')}}/
                                {{$t('customer.introduction_company')}}
                            </th>
                            <th class="has-text-centered has-color-th">{{$t('customer.contact_point')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customer.account_manager')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customer.time_cooperation')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customer.time_stop_cooperation')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customer.time_settlement')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customer.status')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customer.action')}}</th>
                        </tr>
                        </thead>
                        <tbody v-if="!isLoading">
                        <tr v-for="(item,index) in listCustomer">
                            <td class="has-text-centered">{{index+stt}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.holding_company}}</td>
                            <td>
                                <template v-for="(cp,index_cp) in item.contact_point">
                                    <span class="contact-point" v-if="permissions.includes('customer-contact')"
                                          @click="showEditContact(cp,item)">{{ cp.name }}</span>
                                    <span v-else>{{ cp.name }}</span>
                                    <br>
                                </template>
                            </td>
                            <td>{{item.users ? (item.users ? item.users.name : '') : ''}}</td>
                            <td class="has-text-inline">{{item.time_cooperation}}</td>
                            <td class="has-text-inline">{{item.time_stop_cooperation}}</td>
                            <td class="has-text-inline">{{item.time_settlement}}</td>
                            <td>{{item.status == 1 ? 'Đang là khách hàng' : 'Đã dừng'}}</td>
                            <td class="has-text-centered has-text-inline">
                                <button @click="showEditCustomer(item, index)"
                                        class="button is-small is-success is-outlined" type="button" v-if="permissions.includes('customer-edit')">
                                    <span class="icon"><i class="icon-edit"></i></span>
                                </button>
                                <button @click="deleteCustomer(item,index)"
                                        class="button is-small is-danger is-outlined mg-left-sm" type="button" v-if="permissions.includes('customer-delete')">
                                    <span class="icon"><i class="icon-trash"></i></span>
                                </button>
                            </td>
                            <td v-if="listCustomer.length == 0" colspan="9">{{$t('no_data')}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <loading v-if="isLoading"></loading>

        </div>

        <bulma-modal-card width="1040px" :active="showDialog"
                          :title="!cloneCustomer.id ? $t('customer.add') : $t('customer.edit')"
                          @closeModal="onDialogClose()">
            <template slot="body">
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customer.name')}} <span class="has-text-danger">*</span></label>
                            <div class="control">
                                <input class="input" maxlength="50"
                                       :class="{'is-danger': hasError('name_required',cloneCustomer)}" type="text"
                                       v-model="cloneCustomer.name" :placeholder="$t('customer.name')">
                                <span class="has-text-danger" v-if="hasError('name_required',cloneCustomer)">
                                {{getError('name_required',cloneCustomer)}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customer.holding_company')}}/
                                {{$t('customer.introduction_company')}}</label>
                            <div class="control">
                                <input class="input" maxlength="50" v-model="cloneCustomer.holding_company" type="text"
                                       :placeholder="$t('customer.holding_company') + '/ ' + $t('customer.introduction_company')">
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
                                             :placeholder="$t('customer.select_time_cooperation')"
                                             v-model="cloneCustomer.time_cooperation"></date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customer.time_stop_cooperation')}}</label>
                            <div class="control">
                                <date-picker :monthSelect="true" dateFormat="m-Y"
                                             :class="{'is-danger-date-picker': hasError('time_greater',cloneCustomer)}"
                                             :placeholder="$t('customer.select_time_stop_cooperation')"
                                             :locale="'vi'"
                                             :allowInput="false"
                                             v-model="cloneCustomer.time_stop_cooperation"></date-picker>
                            </div>
                            <p class="has-text-danger" v-if="hasError('time_greater',cloneCustomer)">
                                {{getError('time_greater',cloneCustomer)}}</p>

                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customer.time_settlement')}}</label>
                            <div class="control">
                                <date-picker :monthSelect="true" :dateFormat="'m-Y'" :allowInput="false" :locale="'vi'"
                                             v-model="cloneCustomer.time_settlement"
                                             :placeholder="$t('customer.select_time_settlement')"></date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customer.account_manager')}}</label>
                            <div class="control">
                                <multi-select
                                    :options="listUser"
                                    v-model="cloneCustomer.account_manager"
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
                        <div class="field" v-for="(cp,index) in cloneCustomer.contact_point">
                            <label class="label">{{$t('customer.contact_point')}} {{index+1}}</label>
                            <div class="control">
                                <input class="input input-contact" maxlength="50" type="text" v-model="cp.name"
                                       :placeholder="$t('customer.contact_point')">
                                <button v-if="index == 0" class="button is-primary is-right float-right"
                                        type="button" @click="addContact()">
                                    <span class="icon"><i class="icon-plus"></i></span>
                                </button>
                                <button v-else class="button is-danger is-right float-right" type="button"
                                        @click="removeContact(index)">
                                    <span class="icon"><i class="icon-minus"></i></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customer.status')}} </label>
                            <div class="select">
                                <select v-model="cloneCustomer.status">
                                    <option value="1">Đang là khách hàng</option>
                                    <option value="2">Đã dừng</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="footer">
                <div class="column">
                    <div class="buttons is-right">
                        <button type="button" @click="submitCustomer()"
                                :class="{'button is-primary':true,'is-loading':isSubmit}">
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
        <filterCustomer :active="showDialogFilter" :userSearch="userSearch" :search-form="searchForm"
                        @submitSearch="searchCustomer" @closeFilter="closeFilter"/>
        <ContactPointDialog :active="showDialogCp" :contact-point-detail="detailCp" @submitCp="submitCp"
                            @closeFilter="closeEditContact"/>

    </div>
</template>

<script>
    import Customer from "../script/customer";
    import filterCustomer from "../component/filter";
    import ContactPointDialog from "../component/ContactPointDialog";
    import Pagination from "../../../../../plugins/bulma/component/Pagination";

    export default {
        name: "customer-list",
        mixins: [Customer],
        components: {
            filterCustomer, ContactPointDialog, Pagination
        }
    }
</script>

<style scoped>
    .select, .select select {
        width: 100%;
    }

    .input-contact {
        width: 90%;
    }

    .field-has {
        margin-bottom: 25px;
    }

    .error {
        position: absolute;
    }

    .float-right {
        float: right;
    }

    .color-placeholder {
        color: #b0adb8;
    }

    .select select option {
        color: black;
    }

</style>
<style>
    .modal-card-body[data-v-1470ad6c] {
        padding: 25px;
    }

    .modal-card-head[data-v-1470ad6c] {
        padding: 25px;
    }

    .input-date-picker[data-v-32531eac], .input-date-picker[data-v-32531eac] p {
        width: 100%;
    }
</style>

