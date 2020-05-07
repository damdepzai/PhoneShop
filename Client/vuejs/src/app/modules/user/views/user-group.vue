<template>
    <div class="card">
        <header class="card-header columns is-multiline is-mobile is-marginless">
            <div class="column is-one-fifth-fullhd is-full-mobile">
                <p class="card-header-title has-text-title"><b>{{$t('user.role.role_title')}}</b></p>
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
                    <button class="button is-success" type="button" v-if="permissions.includes('userGroup-create')"
                            @click="showAddUserGroup()">
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
                            <th class="has-text-centered has-color-th">{{$t('user.role.name_group')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('user.role.permission')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('user.action')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(role, index) in listRole" :key="index">
                            <td class="has-text-centered w-1">
                                {{index + stt}}
                            </td>
                            <td class="w-15">
                                <span v-if="permissions.includes('userGroup-detail')">
                                    <router-link class="has-text-color" :to="{name:'user.group.role',params:{id:role.id}}">{{role.name}}</router-link>
                                </span>
                                <span v-else>{{role.name}}</span>
                            </td>
                            <td class="w-20">
                                <div  v-for="(p,p_text) in role.permissionsGroups">
                                    <div >
                                        <div class="role-title">{{$t('screen.'+ p_text)}}</div>
                                        <div>
                                            <template v-for="(pr) in p">
                                                <span class="tag is-link custom-tags lable-info" v-if="pr.search('create') != -1"  >{{$t('user.role.create')}}</span>
                                                <span class="tag is-link custom-tags lable-success" v-if="pr.search('edit') != -1"  >{{$t('user.role.update')}}</span>
                                                <span class="tag is-link custom-tags lable-primary" v-if="pr.search('view') != -1"  >{{$t('user.role.view')}}</span>
                                                <span class="tag is-link custom-tags lable-danger" v-if="pr.search('delete') != -1"  >{{$t('user.role.delete')}}</span>
                                                <span class="tag is-link custom-tags lable-blue" v-if="pr.search('detail') != -1"  >{{$t('user.role.detail')}}</span>
                                                <span class="tag is-link custom-tags lable-primary" v-if="pr.search('dashboard') != -1"  >{{$t('user.role.dashboard')}}</span>
                                                <span class="tag is-link custom-tags lable-primary" v-if="pr.search('setting') != -1"  >{{$t('user.role.setting')}}</span>
                                            </template>
                                        </div>
                                    </div>

                                  </div>
                            </td>
                            <td class="has-text-centered min-win-action w-1">
                                <button @click="showEditRole(role)"  v-if="permissions.includes('userGroup-edit')"
                                        class="button is-small is-success is-outlined" type="button">
                                 <span>
                             <i class="icon icon-edit" aria-hidden="true"></i>
                                 </span>
                                </button>
                                <button @click="deleteRole(role)"  v-if="permissions.includes('userGroup-delete')"
                                        class="button is-small is-danger is-outlined mg-left-sm"><i
                                    class="icon icon-trash"></i></button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </template>
        </div>
        <loading v-if="isLoading"></loading>
        <bulma-modal-card :active="showDialog" width="780px"
                          :title="!detailRole.id ? $t('user.role.add') : $t('user.role.edit')"
                          @closeModal="onDialogClose()">
            <template slot="body">
                <label class="label">{{$t('user.role.name_group')}} <span class="has-text-danger">*</span></label>
                <div class="field">


                    <div class="control">
                        <input class="input" type="text"
                               :disabled="(detailRole.name == 'Account Manager') && detailRole.id "
                               v-model="detailRole.name"
                               :class="{'is-danger': hasError('name_required',detailRole) || isNameGroup }"
                               :placeholder="$t('user.role.name_group')" maxlength="50">
                    </div>
                    <p class="has-text-danger error" v-if="hasError('name_required',detailRole)">
                        {{getError('name_required',detailRole)}}</p>
                    <p  class="has-text-danger error" v-if="isNameGroup && !hasError('name_required',detailRole)">{{$t('user.role.name_already_exist')}}</p>
                </div>
                <div class="field" v-if="!isLoading">
                        <div style="padding-bottom: 17px" v-for="(permission, key) in listPermission">
                            <div >
                                <div class="column is-full role-title" style="padding-left: 0px">
                                    {{$t('screen.'+ key)}}
                                </div>
                            </div>
                            <div class="columns">
                                <div v-for="(per, index) in permission"  :key="index"
                                     v-if="permission.length">
                                    <label  class="checkbox p-10 p-20" >
                                        <input type="checkbox" :value="per.flag" :disabled="per.disabled"
                                               v-model="listPermission[key][index].flag">
<!--                                        {{per.text}}-->
                                        <span class="p-10"  v-if="per.text.search('view') != -1" >{{$t('user.role.view')}} </span>
                                        <span class="p-10"  v-if="per.text.search('create') != -1">{{$t('user.role.create')}}</span>
                                        <span class="p-10"  v-if="per.text.search('edit') != -1" >{{$t('user.role.update')}}</span>
                                        <span class="p-10"  v-if="per.text.search('delete') != -1" >{{$t('user.role.delete')}}</span>
                                        <span class="p-10"  v-if="per.text.search('detail') != -1" >{{$t('user.role.detail')}}</span>
                                        <span class="p-10"  v-if="per.text.search('dashboard') != -1" >{{$t('user.role.dashboard')}}</span>
                                        <span class="p-10"  v-if="per.text.search('setting') != -1" >{{$t('user.role.setting')}}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                </div>
            </template>
            <template slot="footer">
                <div class="column">
                    <div class="buttons is-right">
                        <button type="button" @click="submitUserGroup()"
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
        <bulma-modal-card :active="showSearch"
                          :title="$t('user.search')"
                          @closeModal="closeFilter()">
            <template slot="body">
                <div class="field">
                    <label class="label">{{$t('user.role.name_group')}}</label>
                    <div class="control">
                        <input type="text" class="input" v-model="searchForm.name"
                               :placeholder="$t('user.role.name_group')">
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
    </div>
</template>

<script>
  import Pagination from "../../../../plugins/bulma/component/Pagination";
  import UserGroup from '../script/user-group'

  export default {
    name: "user-group",
    mixins: [UserGroup],
    components: {Pagination}
  }
</script>

<style scoped lang="scss">
    .custom-tags {
        margin-right: 5px;
        margin-bottom: 5px;
    }
    .custom-message{
        .message-header{
            background: #fff !important;
            color: #0a0a0a;
        }
    }
    .lable-primary{
        background-color: #457ab2 !important;
        margin-bottom: 10px;
    }
    .lable-info{
        background-color: #74b567 !important;
        margin-bottom: 10px;
    }
    .lable-success{
        background-color: #74bedb !important;
        margin-bottom: 10px;
    }
    .lable-danger{
        background-color: #ca5c55 !important;
        margin-bottom: 10px;
    }
    .lable-blue{
        background-color: #3b898a !important;
        margin-bottom: 10px;
    }
    .has-text-color:hover{
        color: blue !important;
    }
    .p-10{
        padding-left: 10px !important;
    }
    .p-20{
        padding-right: 20px!important;
    }
    .role-title{
        font-weight: bold !important;
        margin-bottom: 5px !important;

    }
</style>
