<template>
    <div class="card">
        <header class="card-header columns is-multiline is-mobile is-marginless">
            <div class="column is-one-fifth-fullhd is-full-mobile">
                <p class="card-header-title has-text-title"><b>{{$t('customerVisitHistory.title')}}</b></p>
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
                            @click="showAddCustomerVisitHistory()"  v-if="permissions.includes('customerVisitHistory-create')">
                         <span class="icon">
                            <i class="icon-plus" aria-hidden="true"></i>
                          </span>
                    </button>
                </span>
            </div>
        </header>
        <header class="columns is-multiline is-mobile is-right header-amount">
            <div class="column is-full-mobile is-right float-right">
                <span class="card-header-title is-right float-right">{{$t('customerVisitHistory.title_amount')}}&nbsp;
                    <input-dropdown :maxWidthDrop="6.2" :readonly="true" :max-width="6.2"  :list="listYear" v-model="searchForm.year"></input-dropdown>
                    &nbsp;:&nbsp;<b>{{amount}}</b>&nbsp;{{$t('customerVisitHistory.bout')}}
                </span>
            </div>
        </header>
        <div class="card-content">
            <template v-if="!isLoading">
                <div class="table-container">
                    <table class="table is-fullwidth is-striped is-hoverable table is-bordered has-font-table">
                        <thead>
                        <tr>
                            <th class="has-text-centered has-color-th">{{$t('customerVisitHistory.stt')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customerVisitHistory.customer_name')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customerVisitHistory.start_date')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customerVisitHistory.finish_date')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customerVisitHistory.name')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customerVisitHistory.position')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customerVisitHistory.hotel')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customerVisitHistory.restaurant')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customerVisitHistory.gift')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('customerVisitHistory.action')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,key) in listCustomerVisitHistory" :key="key">
                            <td class="has-text-centered">{{key+stt}}</td>
                            <td>{{item.name}}</td>
                            <td class="has-text-inline">{{item.start_date}}</td>
                            <td class="has-text-inline">{{item.finish_date}}</td>
                            <td>
                                <template v-for="(cv) in item.ingredient" v-if="item.ingredient ">
                                    <span class="contact-point" @click="showEditCv(cv, item)" v-if="permissions.includes('customerVisitHistory-visitor')">{{ cv.name }}</span>
                                    <span v-else>{{ cv.name }}</span>
                                    <br>
                                </template>
                            </td>
                            <td>
                                <template v-for="position in item.ingredient">
                                    <span class="contact-point">{{position.position}}</span><br>
                                </template>
                            </td>
                            <td>{{item.hotel}}</td>
                            <td class="has-width-td">
                                <span v-tooltip="item.restaurant" v-if="item.restaurant && item.restaurant.length >= 70" class="has-short-text">{{item.restaurant}}</span>
                                <span v-else class="has-short-text">{{item.restaurant}}</span>
                            </td>
                            <td>{{item.gift}}</td>
                            <td class="has-text-centered min-win-action">
                                <button class="button is-small is-success is-outlined" v-if="permissions.includes('customerVisitHistory-edit')"
                                        @click="updateCustomerVisitHistory(item, key)"><span class="icon"><i
                                    class="icon-edit"></i></span>
                                </button>
                                <button type="button" class="button is-small is-danger is-outlined mg-left-sm" v-if="permissions.includes('customerVisitHistory-delete')"
                                        @click="deleteCustomerVisitHistory(item, key)"><span class="icon"><i
                                    class="icon-trash"></i></span>
                                </button>
                            </td>
                            <td v-if="listCustomerVisitHistory.length == 0" colspan="9">{{$t('no_data')}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <loading v-else></loading>
        </div>
        <bulma-modal-card width="1020px" :active="showDialog"
                          :title="!cloneCustomerVisitHistory.id ? $t('customerVisitHistory.add') : $t('customerVisitHistory.edit')"
                          @closeModal="onDialogClose()">
            <template slot="body">
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customerVisitHistory.customer_name')}} <span
                                class="has-text-danger">*</span></label>
                            <div class="control">
                                <input class="input" type="text"
                                       v-model="cloneCustomerVisitHistory.name"
                                       :class="{'is-danger': hasError('customer_name_required',cloneCustomerVisitHistory)}"
                                       maxlength="50"
                                       :placeholder="$t('customerVisitHistory.customer_name')">
                                <span class="has-text-danger error"
                                      v-if="hasError('customer_name_required',cloneCustomerVisitHistory)">{{getError('customer_name_required',cloneCustomerVisitHistory)}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customerVisitHistory.url')}}</label>
                            <div class="control">
                                <input class="input" type="text" maxlength="50"
                                       v-model="cloneCustomerVisitHistory.url"
                                       :placeholder="$t('customerVisitHistory.url')">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns" id="dynamic_field" v-for="(cvh,index) in cloneCustomerVisitHistory.ingredient"
                     v-if="">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customerVisitHistory.guest_name')}} {{index+1}}</label>
                            <div class="control">
                                <input class="input" type="text" v-model="cvh.name" maxlength="50"
                                       :placeholder="$t('customerVisitHistory.guest_name')">
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customerVisitHistory.position')}}</label>
                            <div class="control">
                                <input class="input has-input-ingredient" type="text" v-model="cvh.position"
                                       maxlength="50"
                                       :placeholder="$t('customerVisitHistory.position')">

                                <button v-if="index > 0" class="button is-danger is-right float-right" type="button"
                                        @click="removeIngredient(index)">
                                    <span class="icon"> <i class="icon-minus" aria-hidden="true"></i></span>
                                </button>
                                <button v-else class="button is-primary is-right float-right" type="button"
                                        @click="addIngredient()">
                                    <span class="icon"><i class="icon-plus"></i></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customerVisitHistory.start_date')}} <span
                                class="has-text-danger">*</span></label>
                            <div class="control">
                                <date-picker dateFormat="d-m-Y"
                                             :class="{'is-danger-date-picker': hasError('start_date_required',cloneCustomerVisitHistory)}"
                                             :locale="'vi'"
                                             :placeholder="$t('customerVisitHistory.start_date_placeholder')"
                                             :allowInput="false"
                                             v-model="cloneCustomerVisitHistory.start_date"></date-picker>
                                <span class="has-text-danger"
                                      v-if="hasError('start_date_required', cloneCustomerVisitHistory)">{{ getError('start_date_required', cloneCustomerVisitHistory) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customerVisitHistory.finish_date')}}</label>
                            <div class="control">
                                <date-picker dateFormat="d-m-Y"
                                             :class="{'is-danger-date-picker': hasError('end_date_greater',cloneCustomerVisitHistory)}"
                                             :locale="'vi'"
                                             :placeholder="$t('customerVisitHistory.finish_date_placeholder')"
                                             :allowInput="false"
                                             v-model="cloneCustomerVisitHistory.finish_date"></date-picker>
                            </div>
                            <span class="has-text-danger"
                                  v-if="hasError('end_date_greater', cloneCustomerVisitHistory)">{{ getError('end_date_greater', cloneCustomerVisitHistory) }}</span>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customerVisitHistory.hotel')}}</label>
                            <div class="control">
                                <input class="input" type="text" v-model="cloneCustomerVisitHistory.hotel"
                                       maxlength="50"
                                       :placeholder="$t('customerVisitHistory.hotel')">
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customerVisitHistory.gift')}}</label>
                            <div class="control">
                                <input class="input" type="text" v-model="cloneCustomerVisitHistory.gift"
                                       maxlength="50"
                                       :placeholder="$t('customerVisitHistory.gift')">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customerVisitHistory.restaurant')}}</label>
                            <div class="control">
                                <textarea class="input has-textarea" maxlength="500"
                                          v-model="cloneCustomerVisitHistory.restaurant" :placeholder="$t('customerVisitHistory.restaurant')"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                    </div>
                </div>
            </template>
            <template slot="footer">
                <div class="column">
                    <div class="buttons is-right">
                        <button type="button" @click="submitCustomerVisitHistory()"
                                :class="{'button is-primary':true,'is-loading':isSubmit}">
                            {{$t('customerVisitHistory.submit')}}
                        </button>
                    </div>
                </div>
                <div class="column">
                    <div class="buttons">
                        <button class="button is-outlined" type="button"
                                @click="dialogClose()">
                            {{$t('customerVisitHistory.close')}}
                        </button>
                    </div>
                </div>
            </template>
        </bulma-modal-card>
        <bulma-modal-card :active="showSearch"
                          :title="$t('customerVisitHistory.search')"
                          @closeModal="closeFilter()" width="900px">
            <template slot="body">
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customerVisitHistory.customer_name')}}</label>
                            <div class="control">
                                <input type="text" class="input" v-model="searchForm.name" @keyup.enter="doSearch()"
                                       :placeholder="$t('customerVisitHistory.customer_name')">
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customerVisitHistory.start_date')}}</label>
                            <div class="control">
                                <date-picker dateFormat="d-m-Y"
                                             :placeholder="$t('customerVisitHistory.start_date_placeholder')"
                                             :locale="'vi'"
                                             :allowInput="false"
                                             v-model="searchForm.start_date" @keyup.enter="doSearch()"></date-picker>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customerVisitHistory.guest_name')}}</label>
                            <div class="control">
                                <input type="text" class="input" v-model="searchForm.name_ingredient"
                                       @keyup.enter="doSearch()"
                                       :placeholder="$t('customerVisitHistory.guest_name')">
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('customerVisitHistory.position')}}</label>
                            <div class="control">
                                <input type="text" class="input" v-model="searchForm.position_ingredient"
                                       @keyup.enter="doSearch()"
                                       :placeholder="$t('customerVisitHistory.position')">
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="footer">
                <div class="column">
                    <div class="buttons is-right">
                        <button type="button" @click="doSearch()"
                                :class="{'button is-primary':true,'is-loading':isSubmit}">
                            Xác nhận
                        </button>
                    </div>
                </div>
                <div class="column">
                    <div class="buttons">
                        <button class="button is-outlined" type="button"
                                @click="closeFilter()">Đóng lại
                        </button>
                    </div>
                </div>
            </template>
        </bulma-modal-card>
        <IngredientDialog :active="showDialogCv" :contact-point-detail="detailCv" @closeFilter="closeEditContact"
                          @submit="submitIngredientCustomerVisitHistory()"/>
    </div>
</template>

<script>
    import customerVisitHistory from "../script/customerVisitHistory";
    import IngredientDialog from "../component/IngredientDialog";
    import Pagination from "../../../../../plugins/bulma/component/Pagination";
    import InputDropdown from "../../../../../plugins/bulma/component/input-dropdown";

    export default {
        name: "customer-visit-history-list",
        mixins: [customerVisitHistory],
        components: {
            InputDropdown,
            Pagination, IngredientDialog,
        }
    }
</script>

<style lang="scss" scoped>
    @import "../style/customer-visit-history-list";
</style>
