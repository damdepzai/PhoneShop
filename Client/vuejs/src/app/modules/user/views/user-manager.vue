

<template>
    <div class="card">
        <header class="card-header columns is-multiline is-mobile is-marginless">
            <div class="column is-one-fifth-fullhd is-full-mobile">
                <p class="card-header-title has-text-title"><b>{{$t('user.manager.title')}}</b></p>
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
                    <button class="button is-success" type="button" v-if="permissions.includes('user-create')"
                            @click="showAddUser()">
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
                            <th class="has-text-centered has-color-th">{{$t('user.stt')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('user.name')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('user.email')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('user.group')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('user.active')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('user.action')}}</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr v-for="(user,index) in listUser" :key="user._autoKey">
                            <td class="has-text-centered w-1" >
                                {{index+stt}}
                            </td>
                            <td class="w-20">{{user.name}}</td>
                            <td class="w-20">{{user.email}}</td>
                            <td class="w-15">
                                <span v-if="user.roles" v-for="(item) in user.roles">{{item.name}}</span>
                            </td>
                            <td  class="w-10 is-left"><span v-if="user.status == 'active'">{{$t('user.status_active')}}</span><span
                                v-if="user.status == 'inactive'">{{$t('user.status_unactive')}}</span></td>
                            <td class="has-text-centered min-win-action  w-1" >
                                <button @click="showEditUser(user)" v-if="permissions.includes('user-edit')"
                                        class="button is-small is-success is-outlined" type="button">
                                 <span>
                             <i class="icon icon-edit" aria-hidden="true"></i>
                                 </span>
                                </button>
                                <button @click="deleteUser(user)" v-if="permissions.includes('user-delete')"
                                        class="button is-small is-danger is-outlined mg-left-sm"><i
                                    class="icon icon-trash"></i></button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </template>
        </div>
        <bulma-modal-card width="1020px" :active="showDialog"
                          :title="!detailUser.id ? $t('user.add') : $t('user.edit')"
                          @closeModal="onDialogClose()">
            <template slot="body">
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('user.username')}} <span class="has-text-danger">*</span></label>
                            <div class="control">
                                <input class="input" type="text"
                                       :class="{'is-danger': hasError('username_required',detailUser)}"
                                       v-model="detailUser.name"
                                       :placeholder="$t('user.username_placeholder')" maxlength="50">
                            </div>
                            <p class="has-text-danger error" v-if="hasError('username_required',detailUser)">
                                {{getError('username_required',detailUser)}}</p>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('user.group')}} <span class="has-text-danger">*</span></label>
                            <div class="control">
                                <multi-select
                                    :options="listRole"
                                    v-model="detailUser.role_id"
                                    :multiple="false"
                                    :placeholder="$t('user.manager.select_role')"
                                    label="name"
                                    track-by="id"
                                    :error="hasError('group_required',detailUser)"
                                ></multi-select>
                                <span class="has-text-danger"
                                      v-if="hasError('group_required', detailUser)">{{ getError('group_required', detailUser) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('user.email')}} <span class="has-text-danger">*</span></label>
                            <div class="control">
                                <input class="input" type="email"
                                       :class="{'is-danger': hasError('email_required',detailUser) || hasError('email_format',detailUser) || checkEmail}"
                                       v-model="detailUser.email"
                                       :placeholder="$t('user.email_placeholder')" maxlength="256">
                            </div>
                            <p class="has-text-danger error" v-if="hasError('email_required',detailUser)">
                                {{getError('email_required',detailUser)}}</p>
                            <p class="has-text-danger error" v-if="hasError('email_format',detailUser)">
                                {{getError('email_format',detailUser)}}</p>
                            <p class="has-text-danger error" v-if="checkEmail &&!hasError('email_required',detailUser) &&!hasError('email_format',detailUser) ">
                                {{$t('user.email_already_exists')}}</p>

                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('user.status')}} <span class="has-text-danger">*</span></label>
                            <div class="control select has-max-width-select">
                                <select class="input" v-model="detailUser.status"
                                        :class="{'is-danger': hasError('status_required',detailUser) && hasError('status_required',detailUser), 'color-placeholder': detailUser.status === null}">
                                    <option :value="null" selected>{{$t('user.status_placeholder')}}
                                    </option>
                                    <option value="active">{{$t('user.status_active')}}</option>
                                    <option value="inactive">{{$t('user.status_unactive')}}</option>
                                </select>
                            </div>
                            <span class="has-text-danger"
                                  v-if="hasError('status_required', detailUser)">{{ getError('status_required', detailUser) }}</span>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field" v-if="detailUser.id">
                            <label class="label">{{$t('user.password')}}</label>
                            <div class="control">
                                <input class="input" type="password"
                                       :class="{'is-danger': hasError('password_length',detailUser )}"
                                       v-model="detailUser.password"
                                       :placeholder="$t('user.password_placeholder')" maxlength="50"
                                >
                            </div>
                            <p class="has-text-danger error" v-if="hasError('password_length',detailUser)">
                                {{getError('password_length',detailUser)}}</p>
                        </div>
                        <div class="field" v-else>
                            <label class="label">{{$t('user.password')}} <span class="has-text-danger">*</span></label>
                            <div class="control">
                                <input class="input" type="password"
                                       :class="{'is-danger': hasError('password_required',detailUser) || hasError('password_length',detailUser )}"
                                       v-model="detailUser.password"
                                       :placeholder="$t('user.password_placeholder')" maxlength="50"
                                >
                            </div>
                            <p class="has-text-danger error" v-if="hasError('password_new',detailUser)">
                                {{getError('password_new',detailUser)}}</p>
                            <p class="has-text-danger error" v-if="hasError('password_required',detailUser)">
                                {{getError('password_required',detailUser)}}</p>
                        </div>
                    </div>
                    <div class="column"></div>
                </div>

            </template>
            <template slot="footer">
                <div class="column">
                    <div class="buttons is-right">
                        <button type="button" @click="submitUser()"
                                :class="{'button is-primary':true,'is-loading':isSubmit}">
                            {{$t('user.delete')}}
                        </button>
                    </div>
                </div>
                <div class="column">
                    <div class="buttons">
                        <button class="button is-outlined" type="button"
                                @click="dialogClose()">{{$t('user.cancel')}}
                        </button>
                    </div>
                </div>
            </template>
        </bulma-modal-card>
        <bulma-modal-card width="1020px" :active="showSearch"
                          :title="$t('user.search')"
                          @closeModal="closeFilter()">
            <template slot="body">
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('user.username')}}</label>
                            <div class="control">
                                <input type="text" class="input" v-model="searchForm.name"
                                       :placeholder="$t('user.username')">
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <label class="label">{{$t('user.role.name_group')}}</label>
                        <div class="field">

                            <div class="control">
                                <multi-select
                                    :options="listRole"
                                    v-model="searchForm.role_id"
                                    :multiple="false"
                                    :placeholder="$t('user.manager.select_role')"
                                    label="name"
                                    track-by="id"
                                    :error="hasError('group_required',detailUser)"
                                ></multi-select>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('user.email')}}</label>
                            <div class="control">
                                <input type="text" class="input" v-model="searchForm.email"
                                       :placeholder="$t('user.email')">
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('user.status')}}</label>
                            <div class="control select has-max-width-select">
                                <select class="input" v-model="searchForm.status"
                                        :class="{'color-placeholder': searchForm.status === null}">
                                    <option :value="null" selected>{{$t('user.status_placeholder')}}
                                    </option>
                                    <option value="active">{{$t('user.status_active')}}</option>
                                    <option value="inactive">{{$t('user.status_unactive')}}</option>
                                </select>
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
                            {{$t('user.delete')}}
                        </button>
                    </div>
                </div>
                <div class="column">
                    <div class="buttons">
                        <button class="button is-outlined" type="button"
                                @click="closeFilter()">
                            {{$t('user.cancel')}}
                        </button>
                    </div>
                </div>
            </template>
        </bulma-modal-card>
        <loading v-if="isLoading"></loading>

    </div>
</template>

<script>
    import UserManager from "../script/manager";
    import Pagination from "../../../../plugins/bulma/component/Pagination";
    import DropdownClientSearch from "../../../../resources/components/dropdown-client-search";

    export default {
        name: "user-manager",
        components: {DropdownClientSearch, Pagination},
        mixins: [UserManager]
    }
</script>

<style scoped>
    @import "../styles/user-manager.scss";
</style>
