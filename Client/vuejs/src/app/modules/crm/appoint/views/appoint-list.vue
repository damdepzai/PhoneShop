<template>
    <div class="card">
        <header class="card-header columns is-multiline is-mobile is-marginless">
            <div class="column is-one-fifth-fullhd is-full-mobile">
                <p class="card-header-title has-text-title"><b>{{$t('appoint.title')}}</b></p>
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
                            @click="showAddAppoint()" v-if="permissions.includes('appoint-create')">
                         <span class="icon">
                            <i class="icon-plus" aria-hidden="true"></i>
                          </span>
                    </button>
                </span>
            </div>
        </header>
        <div class="card-content">
            <template v-if="!isLoading">
                <div class="table-container">
                    <table class="table is-fullwidth is-striped is-hoverable is-bordered has-font-table">
                        <thead>
                        <tr class="appoint">
                            <th class="has-text-centered has-color-th">{{$t('appoint.stt')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.company')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.domain')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.capital')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.employee_count')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.sale_date')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.person_in_charge')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.salesperson')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.business')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.cooperation_trend')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.omi_act')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.reping')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.status_ping')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.status')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('appoint.action')}}</th>
                        </tr>
                        </thead>
                        <tbody v-if="!isLoading">
                        <tr v-for="(appoint, index) in listAppoint" :key="index">
                            <td class="has-text-centered w-1">{{index + stt }}</td>
                            <td class=" has-text-inline has-width-person">{{appoint.company}}</td>
                            <td class="w-1">{{appoint.domain == 1 ? 'Y tế' : (appoint.domain == 2 ? 'AI/IOT' : 'Web/Mobile/SI')}}</td>
                            <td class="has-text-centered w-1 ">{{appoint.capital}}</td>
                            <td class="has-text-centered w-1">{{appoint.employee_count ? appoint.changeCount : ''}}</td>
                            <td v-if="appoint.date >= appoint.formatDateNow"class="has-text-date has-sale has-with-date">{{appoint.sale_date}}</td>
                            <td class="has-text-date has-with-date" v-else>{{appoint.sale_date}}</td>
                            <td class="has-text-inline has-width-person">{{appoint.person_in_charge ? (appoint.person_in_charges ? appoint.person_in_charges.name : '') : ''}}</td>
                            <td class="has-text-inline has-width-person">{{appoint.salesperson ? (appoint.sales_persons ? appoint.sales_persons.name : '') : ''}}</td>
                            <td class="has-width-tooltip">
                                <span class="has-short-text" v-tooltip.right ="appoint.business"
                                      v-if="appoint.business && appoint.business.length >= 70 && index < listAppoint.length-2">{{appoint.business}}</span>
                                <span class="has-short-text" v-tooltip ="appoint.business"
                                      v-else-if="appoint.business && appoint.business.length >= 70 && index >= listAppoint.length-2">{{appoint.business}}</span>
                                <span v-else>{{appoint.business}}</span>
                            </td>
                            <td class="has-width-tooltip">
                                <span class="has-short-text" v-tooltip.right ="appoint.cooperation_trend"
                                      v-if="appoint.cooperation_trend && appoint.cooperation_trend.length >= 70 && index < listAppoint.length-2">{{appoint.cooperation_trend}}</span>
                                <span class="has-short-text" v-tooltip ="appoint.cooperation_trend"
                                      v-else-if="appoint.cooperation_trend && appoint.cooperation_trend.length >= 70 && index >= listAppoint.length-2">{{appoint.cooperation_trend}}</span>
                                <span v-else>{{appoint.cooperation_trend}}</span>
                            </td>
                            <td class="has-width-tooltip">
                                <span class="has-short-text" v-tooltip.right ="appoint.omi_act"
                                      v-if="appoint.omi_act && appoint.omi_act.length >= 70 && index < listAppoint.length-2">{{appoint.omi_act}}</span>
                                <span class="has-short-text" v-tooltip ="appoint.omi_act"
                                      v-else-if="appoint.omi_act && appoint.omi_act.length >= 70 && index >= listAppoint.length-2">{{appoint.omi_act}}</span>
                                <span v-else>{{appoint.omi_act}}</span>
                            </td>
                            <td class="has-text-date has-sale has-with-date" v-if="appoint.dateReping >= appoint.formatDateNow">{{appoint.reping == 2 ? appoint.date_reping : (appoint.reping == 1 ? '' : 'Không cần ping') }}
                            </td>
                            <td v-else class="has-text-date has-sale-date has-with-date">{{appoint.reping == 2 ? appoint.date_reping : (appoint.reping == 1 ? '' : 'Không cần ping') }}</td>
                            <td class="has-width-tooltip">
                                <span class="has-short-text" v-tooltip.left ="appoint.status_ping"
                                      v-if="appoint.status_ping && appoint.status_ping.length >= 70 && index < listAppoint.length-2">{{appoint.status_ping}}</span>
                                <span class="has-short-text" v-tooltip ="appoint.status_ping"
                                      v-else-if="appoint.status_ping && appoint.status_ping.length >= 70 && index >= listAppoint.length-2">{{appoint.status_ping}}</span>
                                <span v-else>{{appoint.status_ping}}</span>
                            </td>
                            <td v-if="appoint.status == 1"></td>
                            <td v-if="appoint.status == 2" class="has-text-centered w-1"><span class="icon"><i class="icon-times"></i></span></td>
                            <td v-if="appoint.status == 3" class="has-text-centered w-1"><span class="icon"><i class="icon-star"></i></span></td>
                            <td v-if="appoint.status == 4" class="has-text-centered w-1"><span class="icon"><i class="icon-user"></i></span></td>


                            <td class="has-text-centered min-win-action w-1">
                                <button v-if="permissions.includes('appoint-edit')" class="button is-small is-success is-outlined"
                                        @click="updateAppoint(appoint, index)"><span class="icon"><i
                                    class="icon-edit"></i></span>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <loading v-else></loading>
        </div>
        <bulma-modal-card width="1020px" :active="showDialog" :title="!detailAppoint.id ? $t('appoint.add') : $t('appoint.update')"
                          @closeModal="onDialogClose()">
            <template slot="body">
                <div class="columns">
                    <div class="column">
                        <div class="field ">
                            <label class="label">{{$t('appoint.company')}} <span
                                class="has-text-danger">*</span></label>
                            <div class="control">
                                <input class="input " :class="{'is-danger': hasError('name_required',detailAppoint)}"
                                       maxlength="50"
                                       type="text" v-model="detailAppoint.company"
                                       :placeholder="$t('appoint.company')">

                            </div>
                            <span class="has-text-danger " v-if="hasError('name_required',detailAppoint)">
                                    {{getError('name_required',detailAppoint)}}</span>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field ">
                            <label class="label">{{$t('appoint.capital')}}</label>
                            <div class="control">
                                <input class="input" maxlength="13"
                                       type="text" v-model="detailAppoint.capital"
                                       :placeholder="$t('appoint.capital')">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field  ">
                            <label class="label">{{$t('appoint.domain')}} <span
                                class="has-text-danger">*</span></label>
                            <div class="select control">
                                <select  :class="{'is-danger': hasError('domain_required',detailAppoint), 'color-placeholder': detailAppoint.domain == null}"
                                         v-model="detailAppoint.domain">
                                    <option :value="null" selected>Chọn Lĩnh vực</option>
                                    <option value="1">Y tế</option>
                                    <option value="2">AI/IoT</option>
                                    <option value="3">Web/Mobile/SI</option>
                                </select>

                            </div>
                            <p class="has-text-danger " v-if="hasError('domain_required',detailAppoint)">
                                {{getError('domain_required',detailAppoint)}}</p>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field ">
                            <label class="label">{{$t('appoint.employee_count')}}</label>
                            <div class="control">
                                <input-count-employee v-model="detailAppoint.employee_count" decimal="." :precision="0" suffix="" thousands="," :masked="false" @input="getEmployeeCount" />
                            </div>
                        </div>

                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field  ">
                            <label class="label">{{$t('appoint.sale_date')}} <span
                                class="has-text-danger">*</span></label>
                            <div class="control">
                                <date-picker :locale="'vi'"
                                             dateFormat="d-m-Y"
                                             :placeholder="$t('appoint.sale_date_place')"
                                             v-model="detailAppoint.sale_date"
                                             :allowInput="false"
                                             :class="{'is-danger-date-picker': hasError('dateSale_required',detailAppoint)}"></date-picker>
                            </div>
                            <p class="has-text-danger " v-if="hasError('dateSale_required',detailAppoint)">
                                {{getError('dateSale_required',detailAppoint)}}</p>

                        </div>

                    </div>
                    <div class="column">
                        <div class="field  ">
                            <label class="label">{{$t('appoint.status')}}</label>
                            <div class="control select">
                                <select :disabled="selectAppoint.status == 4 && detailAppoint.id" type="text" v-model="detailAppoint.status"
                                        :class="{'color-placeholder': detailAppoint.status == null}">
                                    <option value="1"></option>
                                    <option value="2">Không có triển vọng</option>
                                    <option value="3">Có triển vọng</option>
                                    <option value="4">Khách hàng</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field  ">
                            <label class="label">{{$t('appoint.person_in_charge')}} <span
                                class="has-text-danger">*</span></label>
                            <div class="control">
                                <multi-select
                                    :options="listUser"
                                    v-model="detailAppoint.person_in_charge"
                                :multiple="false"
                                :placeholder="$t('Chọn người phụ trách')"
                                label="name"
                                track-by="id"
                                :error="hasError('person_in_charge_required', detailAppoint)">

                                </multi-select>
                            </div>
<!--                            <div class="control select">-->
<!--                                <select :class="{'is-danger': hasError('person_in_charge_required',detailAppoint),'color-placeholder': detailAppoint.person_in_charge == null }"-->
<!--                                        v-model="detailAppoint.person_in_charge">-->
<!--                                    <option :value="null" selected>Chọn Người phụ trách</option>-->
<!--                                    <option v-for="(item, index) in listUser" :value="item.id" :key="index">-->
<!--                                        {{item.name}}-->
<!--                                    </option>-->
<!--                                </select>-->
<!--                            </div>-->
                            <p class="has-text-danger "
                               v-if="hasError('person_in_charge_required',detailAppoint)">
                                {{getError('person_in_charge_required',detailAppoint)}}</p>

                        </div>

                    </div>
                    <div class="column">
                        <div class="field ">
                            <label class="label">{{$t('appoint.salesperson')}} <span
                                class="has-text-danger">*</span></label>
                            <div class="control">
                                <multi-select
                                    :options="listUserSale"
                                    v-model="detailAppoint.salesperson"
                                    :multiple="false"
                                    :placeholder="$t('Chọn người sales')"
                                    label="name"
                                    track-by="id"
                                    :error="hasError('salesPerson_required', detailAppoint)">

                                </multi-select>
                            </div>
                            <p class="has-text-danger " v-if="hasError('salesPerson_required',detailAppoint)">
                                {{getError('salesPerson_required',detailAppoint)}}</p>
                        </div>

                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field ">
                            <label class="label">{{$t('appoint.business')}}</label>
                            <div class="control">
                                <textarea class="has-textarea input" style="width: 100%" maxlength="500" rows="3" :placeholder="$t('appoint.business')" v-model="detailAppoint.business"></textarea>
                            </div>
                        </div>

                    </div>
                    <div class="column">
                        <div class="field ">
                            <label class="label">{{$t('appoint.cooperation_trend')}}</label>
                            <div class="control">
                                <textarea class="has-textarea input" maxlength="500" rows="3" :placeholder="$t('appoint.cooperation_trend')" v-model="detailAppoint.cooperation_trend"></textarea>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field ">
                            <label class="label">{{$t('appoint.omi_act')}}</label>
                            <div class="control">
                                <textarea class="has-textarea input" rows="3" maxlength="500" :placeholder="$t('appoint.omi_act')" v-model="detailAppoint.omi_act" autofocusu></textarea>
                            </div>
                        </div>

                    </div>
                    <div class="column">
                        <div class="field ">
                            <label class="label">{{$t('appoint.reping')}}</label>
                            <div class="control select">
                                <select @change="onChange($event)" class="input" type="text"
                                        v-model="detailAppoint.reping">
                                    <option value="1"></option>
                                    <option value="2">Ngày ping lại</option>
                                    <option value="3">Không cần ping</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="columns">
                    <div class="column">
                            <div class="field " v-if="detailAppoint.reping == 2">
                                <label class="label">{{$t('appoint.date_reping')}}</label>
                                <div class="control">
                                    <date-picker :locale="'vi'"
                                                 dateFormat="d-m-Y"
                                                 :placeholder="$t('appoint.date_reping')"
                                                 v-model="detailAppoint.date_reping"
                                                 :allowInput="false"
                                                ></date-picker>
                                </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field " v-if="detailAppoint.id">
                            <label class="label">{{$t('appoint.status_ping')}}</label>
                            <div class="control">
                                <textarea class="has-textarea input" maxlength="500" rows="3" :placeholder="$t('appoint.status_ping')" v-model="detailAppoint.status_ping"></textarea>
                            </div>
                    </div>
                    </div>
                </div>
            </template>
            <template slot="footer">
                <div class="column">
                    <div class="buttons is-right">
                        <button type="button" @click="submitAppoint()"
                                :class="{'button is-primary':true,'is-loading':isSubmit}">
                            {{$t('appoint.submit')}}
                        </button>
                    </div>
                </div>
                <div class="column">
                    <div class="buttons">
                        <button class="button is-outlined" type="button"
                                @click="dialogClose()">
                            {{$t('appoint.close')}}
                        </button>
                    </div>
                </div>
            </template>
        </bulma-modal-card>
        <bulma-modal-card :active="showSearch"
                          :title="$t('appoint.search')"
                          width="1020px"
                          @closeModal="closeFilter()">
            <template slot="body">
                <div class="field">
                    <label class="label">{{$t('appoint.company')}}</label>
                    <div class="control">
                        <input type="text" class="input" v-model="search.company" @keyup.enter="doSearch()"
                               :placeholder="$t('appoint.company')">
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('appoint.start_date')}}</label>
                            <div class="control">
                                <div class="control">
                                    <date-picker dateFormat="d-m-Y"
                                                 :locale="'vi'"
                                                 :placeholder="$t('appoint.filter_start_date')"
                                                 :allowInput="false"
                                                 v-model="search.start_date" @keyup.enter="doSearch()"></date-picker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('appoint.end_date')}}</label>
                            <div class="control">
                                <date-picker dateFormat="d-m-Y"
                                             :locale="'vi'"
                                             :placeholder="$t('appoint.filter_end_date')"
                                             :allowInput="false"
                                             v-model="search.end_date" @keyup.enter="doSearch()"></date-picker>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('appoint.work')}}</label>
                            <div class="control">
                                <div class="control select">
                                    <select v-model="search.action">
                                        <option value="created_at">{{$t('appoint.created_at_appoint')}}</option>
                                        <option value="sale_date">{{$t('appoint.sale_date_appoint')}}</option>
                                        <option value="date_reping">{{$t('appoint.date_reping_appoint')}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column"> </div>
                </div>
            </template>
            <template slot="footer">
                <div class="column">
                    <div class="buttons is-right">
                        <button type="button" @click="doSearch()"
                                :class="{'button is-primary':true,'is-loading':isSubmit}">
                            {{$t('appoint.submit')}}
                        </button>
                    </div>
                </div>
                <div class="column">
                    <div class="buttons">
                        <button class="button is-outlined" type="button"
                                @click="closeFilter()">
                            {{$t('appoint.close')}}
                        </button>
                    </div>
                </div>
            </template>
        </bulma-modal-card>
    </div>
</template>

<script>
    import appoint from "../script/appoint";
    import Pagination from "../../../../../plugins/bulma/component/Pagination";
    import InputCurrency from "../components/input-curency";
    import InputCountEmployee from "../components/input-count-employee";

    export default {
        name: "appoint-list",
        mixins: [appoint],
        components: {
            InputCurrency,
            Pagination,
            InputCountEmployee
        }
    }
</script>

<style scoped lang="scss">
    .error {
        position: absolute;
    }
    .input-money {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-right: 0px;
        width: 30px;
    }
    .input-number {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        width: 266px;
    }
    .appoint th{
        text-align: center;
    }
    .select,.select select{
        width: 100%;
        option {
            color: black;
        }
    }
    .color-placeholder{
        color: #adadad;
        font-weight: 400 !important;
    }
    .has-sale-date{
         background: #ffffff;
     }
    .has-sale{
        background: #ffb3b3;
    }
    .has-textarea{
        width: 100% !important;
        max-width:486px;
        min-width:486px;
        font-size: 1rem !important;
        max-height: 83px;
        min-height: 83px;
    }
    .has-text-date{
        text-align: center;
        word-break: keep-all;
        white-space: nowrap;
    }
    .has-width-tooltip{
        width: 150px;
    }
    .has-with-date{
        width: 115px;
    }
    .has-width-person{
        width: 100px;
        white-space: pre-line;
    }

</style>

