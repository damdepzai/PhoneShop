<template>
    <div class="card">
        <header class="card-header columns is-multiline is-mobile is-marginless">
            <div class="column is-one-fifth-fullhd is-full-mobile">
                <p class="card-header-title has-text-title"><b>{{$t('preSale.title')}}</b></p>
            </div>
        </header>
        <div class="card-content">
            <div class="columns">
                <div class="column">
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label has-margin-width-label">{{$t('preSale.status')}}</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded select">
                                    <select class="input" v-model="searchForm.status"
                                            :class="{'color-placeholder': searchForm.status == null}">
                                        <option :value="null" selected>{{$t('preSale.select_status')}}</option>
                                        <option value="1">{{$t('preSale.potential')}}</option>
                                        <option value="2">{{$t('preSale.pending')}}</option>
                                        <option value="3">{{$t('preSale.running')}}</option>
                                    </select>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label has-margin-width-label">{{$t('preSale.contract_type')}}</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded select">
                                    <select class="input" v-model="searchForm.contract_type"
                                            :class="{'color-placeholder': searchForm.contract_type == null}">
                                        <option :value="null" selected>{{$t('preSale.select_contract_type')}}
                                        </option>
                                        <option value="1">{{$t('preSale.project_based')}}</option>
                                        <option value="2">{{$t('preSale.labor')}}</option>
                                    </select>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label has-margin-label1">{{$t('preSale.department_id')}}</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded select">
                                    <select class="input" v-model="searchForm.department_id"
                                            :class="{'color-placeholder': searchForm.department_id == null}">
                                        <option :value="null" selected>{{$t('preSale.select_department_id')}}
                                        </option>
                                        <option value="1">{{$t('preSale.bu1')}}</option>
                                        <option value="2">{{$t('preSale.bu2')}}</option>
                                        <option value="3">{{$t('preSale.bu3')}}</option>
                                        <option value="4">{{$t('preSale.bu4')}}</option>
                                        <option value="5">{{$t('preSale.bu5')}}</option>
                                    </select>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label has-margin-label1">{{$t('preSale.keyword')}}</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <input type="text" class="input" :placeholder="$t('preSale.keyword')" v-model="searchForm.keyword">
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">{{$t('preSale.account_manager_id')}}</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded">
                                    <multi-select
                                        :options="userSearch"
                                        v-model="searchForm.account_manager_id"
                                        :multiple="false"
                                        :placeholder="$t('preSale.select_account_manager_id')"
                                        label="name"
                                        track-by="id">
                                    </multi-select>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="buttons has-margin-button is-right">
                        <button type="button" @click="doSearch()"
                                :class="{'button is-primary':true}">
                            {{$t('preSale.search')}}
                        </button>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="has-margin-button">
                     <span class="card-header-icon buttons-control" aria-label="more options">
                    <button class="button" type="button"
                            @click="reloadData()">
                         <span class="icon">
                            <i class="icon-redo-alt" aria-hidden="true"></i>
                          </span>
                    </button>
                </span>
                    <span class="card-header-icon buttons-control" aria-label="more options">
                    <button class="button is-success" type="button" v-if="permissions.includes('preSales-create')"
                            @click="showAddPreSale()">
                         <span class="icon">
                            <i class="icon-plus" aria-hidden="true"></i>
                          </span>
                    </button>
                </span>
                </div>
            </div>
        </div>
        <div class="card-content" style="margin-top: -20px">
            <template v-if="!isLoading">
                <div class="table-container">
                    <table class="table is-fullwidth is-striped is-hoverable table is-bordered has-font-table">
                        <thead>
                        <tr>
                            <th class="has-text-centered has-color-th">{{$t('preSale.stt')}}</th>
                            <th class="has-text-centered has-color-th has-margin-company">{{$t('preSale.company')}}</th>
                            <th class="has-text-centered has-color-th has-margin-project">{{$t('preSale.project')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('preSale.contract_type')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('preSale.size')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('preSale.status')}}</th>
                            <th class="has-text-centered has-color-th has-margin-language">{{$t('preSale.language')}}
                            </th>
                            <th class="has-text-centered has-color-th has-margin-date">{{$t('preSale.start_date')}}</th>
                            <th class="has-text-centered has-color-th has-margin-date">{{$t('preSale.end_date')}}</th>
                            <th class="has-text-centered has-color-th has-margin-bu">{{$t('preSale.department_id')}}
                            </th>
                            <th class="has-text-centered has-color-th has-margin-pm-am">
                                {{$t('preSale.project_manager')}}
                            </th>
                            <th class="has-text-centered has-color-th has-margin-pm-am">
                                {{$t('preSale.account_manager_id')}}
                            </th>
                            <th class="has-text-centered has-color-th has-width-des">{{$t('preSale.description')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('preSale.action')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(preSale, index) in listPreSale" :key="index">
                            <td class="has-text-centered">{{index + stt}}</td>
                            <td class="has-margin-company">{{preSale.company}}</td>
                            <td class="has-margin-project">{{preSale.project}}</td>
                            <td class="">{{ PreSaleModel.CONTRACT_TYPE[preSale.contract_type] }}</td>
                            <td class="has-text-centered">{{preSale.size == 0 ? '' : preSale.size}}</td>
                            <td>{{ PreSaleModel.STATUS[preSale.status] }}</td>
                            <td class="has-margin-language">{{preSale.language}}</td>
                            <td class="has-text-inline has-margin-date">{{preSale.start_date}}</td>
                            <td class="has-text-inline has-margin-date">{{preSale.end_date}}</td>
                            <td class="has-margin-bu">{{ PreSaleModel.DEPARTMENT[preSale.department_id] }}</td>
                            <td class="has-margin-pm-am">{{preSale.project_manager}}</td>
                            <td class="has-margin-pm-am">{{preSale.account_manager_id ? (preSale.users ? preSale.users.name : '') : '' }}</td>
                            <td class="has-width-td">
                                <span v-tooltip="preSale.description" v-if="preSale.description && preSale.description.length >= 70" class="has-short-text">{{preSale.description}}</span>
                                <span v-else class="has-short-text">{{preSale.description}}</span>
                            </td>
                            <td class="has-text-centered min-win-action w-140" >
                                <button @click="openDetail(preSale.id)" v-if="permissions.includes('preSales-detail')"
                                        class="button is-small is-primary is-outlined mg-right-sm" type="button">
                                 <span>
                                 <i class="icon icon-eye" aria-hidden="true"></i>
                                 </span>
                                </button>
                                <button @click="updatePreSale(preSale, index)" v-if="permissions.includes('preSales-edit')"
                                        class="button is-small is-success is-outlined" type="button">
                                 <span>
                             <i class="icon icon-edit" aria-hidden="true"></i>
                                 </span>
                                </button>
                                <button @click="deletePreSale(preSale, index)" v-if="permissions.includes('preSales-delete')"
                                        class="button is-small is-danger is-outlined mg-left-sm"><i
                                    class="icon icon-trash"></i></button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <loading v-else></loading>
            <div class="columns">
                <div class="column">
                <span class="card-header-icon" aria-label="more options">
                    <pagination
                        :isUp = true
                        :current="pagination.current"
                        :total="pagination.total"
                        :perPage="pagination.perPage"
                        @onChange="searchData"
                        :step="1">
                    </pagination>
                </span>
                </div>
            </div>
        </div>
        <bulma-modal-card :active="showDialog"
                          width="1020px"
                          :title="detailPreSale.id ? $t('preSale.edit') : $t('preSale.add')"
                          @closeModal="onDialogClose()">
            <template slot="body">
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('preSale.company')}} <span
                                class="has-text-danger">*</span></label>
                            <div class="control">
                                <input class="input has-input" type="text" maxlength="50"
                                       v-model="detailPreSale.company"
                                       :class="{'is-danger': hasError('company_required',detailPreSale)}"
                                       :placeholder="$t('preSale.company')">
                            </div>
                            <p class="has-text-danger error" v-if="hasError('company_required',detailPreSale)">
                                {{getError('company_required',detailPreSale)}}</p>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('preSale.contract_type')}}</label>
                            <div class="control select">
                                <select class="input" v-model="detailPreSale.contract_type"
                                        :class="{'color-placeholder': detailPreSale.contract_type == null}">
                                    <option :value="null" selected>{{$t('preSale.select_contract_type')}}
                                    </option>
                                    <option value="1">{{$t('preSale.project_based')}}</option>
                                    <option value="2">{{$t('preSale.labor')}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('preSale.project')}}</label>
                            <div class="control">
                                <input class="input" type="text" maxlength="50" v-model="detailPreSale.project"
                                       :placeholder="$t('preSale.project')">
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('preSale.size')}}</label>
                            <div class="control">
                                <input-count-size v-model="detailPreSale.size" decimal="." :precision="0" suffix=""
                                                  thousands="," :masked="false" @input="getSize"/>
                            </div>
                            <p class="has-text-danger error" v-if="hasError('size_number',detailPreSale)">
                                {{getError('size_number',detailPreSale)}}</p>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('preSale.status')}} <span
                                class="has-text-danger">*</span></label>
                            <div class="control select">
                                <select class="input" v-model="detailPreSale.status"
                                        :class="{'is-danger': hasError('status_required',detailPreSale), 'color-placeholder': detailPreSale.status == null}">
                                    <option :value="null" selected>{{$t('preSale.select_status')}}</option>
                                    <option value="1">{{$t('preSale.potential')}}</option>
                                    <option value="2">{{$t('preSale.pending')}}</option>
                                    <option value="3">{{$t('preSale.running')}}</option>
                                </select>
                            </div>
                            <p class="has-text-danger error" v-if="hasError('status_required',detailPreSale)">
                                {{getError('status_required',detailPreSale)}}</p>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('preSale.language')}}</label>
                            <div class="control">
                                <input class="input" maxlength="50" type="text" v-model="detailPreSale.language"
                                       :placeholder="$t('preSale.language')">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('preSale.start_date')}}</label>
                            <div class="control">
                                <date-picker dateFormat="m-Y"
                                             :placeholder="$t('preSale.select_start_date')"
                                             :monthSelect="true"
                                             :allowInput="false"
                                             :locale="'vi'"
                                             v-model="detailPreSale.start_date"></date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('preSale.end_date')}}</label>
                            <div class="control">
                                <date-picker dateFormat="m-Y"
                                             :placeholder="$t('preSale.select_end_date')"
                                             :monthSelect="true"
                                             :class="{'is-danger-date-picker': hasError('time_greater',detailPreSale)}"
                                             :allowInput="false"
                                             :locale="'vi'"
                                             v-model="detailPreSale.end_date"></date-picker>
                            </div>
                            <p class="has-text-danger error" v-if="hasError('time_greater',detailPreSale)">
                                {{getError('time_greater',detailPreSale)}}</p>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('preSale.department_id')}}</label>
                            <div class="control select">
                                <select class="input" v-model="detailPreSale.department_id"
                                        :class="{'color-placeholder': detailPreSale.department_id == null}">
                                    <option :value="null" selected>{{$t('preSale.select_department_id')}}
                                    </option>
                                    <option value="1">{{$t('preSale.bu1')}}</option>
                                    <option value="2">{{$t('preSale.bu2')}}</option>
                                    <option value="3">{{$t('preSale.bu3')}}</option>
                                    <option value="4">{{$t('preSale.bu4')}}</option>
                                    <option value="5">{{$t('preSale.bu5')}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('preSale.project_manager')}}</label>
                            <div class="control">
                                <input class="input has-input-left" type="text" maxlength="50"
                                       v-model="detailPreSale.project_manager"
                                       :placeholder="$t('preSale.project_manager')"
                                       :class="{'is-danger': hasError('project_manager_email',detailPreSale)}">
                                <input class="input has-input-right" type="text" value="@ominext.com" readonly
                                       :class="{'is-danger': hasError('project_manager_email',detailPreSale)}">
                                <span class="has-text-danger"
                                      v-if="hasError('project_manager_email', detailPreSale)">{{ getError('project_manager_email', detailPreSale) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('preSale.account_manager_id')}}</label>
                            <div class="control">
                                <multi-select
                                    :options="listUser"
                                    v-model="detailPreSale.account_manager_id"
                                    :multiple="false"
                                    :placeholder="$t('preSale.select_account_manager_id')"
                                    label="name"
                                    track-by="id">
                                </multi-select>
                                <span class="has-text-danger"
                                      v-if="hasError('account_manager_id', detailPreSale)">{{ getError('account_manager_id', detailPreSale) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('preSale.description')}}</label>
                            <div class="control">
                                <textarea class="input has-textarea" maxlength="500"
                                          v-model="detailPreSale.description"
                                          :placeholder="$t('preSale.description')"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns" v-if="detailPreSale.id != null">
                    <div class="field has-text-center">
                        <label class="checkbox">
                            <input type="checkbox" class="mg-left-sm" v-model="detailPreSale.checkbox">
                            {{$t('preSale.title_checkbox')}}
                        </label>
                    </div>
                </div>
            </template>
            <template slot="footer">
                <div class="column">
                    <div class="buttons is-right">
                        <button type="button" @click="submitPreSale()"
                                :class="{'button is-primary':true,'is-loading':isSubmit}">
                            {{$t('preSale.submit')}}
                        </button>
                    </div>
                </div>
                <div class="column">
                    <div class="buttons">
                        <button class="button is-outlined" type="button"
                                @click="dialogClose()">{{$t('preSale.close')}}
                        </button>
                    </div>
                </div>
            </template>
        </bulma-modal-card>
    </div>
</template>

<script>
    import PreSale from "../script/preSale";
    import Pagination from "../../../../../plugins/bulma/component/Pagination";
    import InputCountSize from "../components/input-count-size";

    export default {
        name: "pre-sale-list",
        mixins: [PreSale],
        components: {
            Pagination,
            InputCountSize
        }
    }
</script>

<style scoped type="text/css">
    @import "../style/pre-sale.scss";
</style>
