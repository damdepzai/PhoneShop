<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">Quản lý dữ liệu master</p>
<!--            <span class="card-header-icon" aria-label="more options">-->
<!--                <pagination-->
<!--                    :current="pagination.current"-->
<!--                    :total="pagination.total"-->
<!--                    :perPage="pagination.perPage"-->
<!--                    @onChange="searchData"-->
<!--                    :step="1">-->
<!--                </pagination>-->
<!--            </span>-->
            <span class="card-header-icon" aria-label="more options">
                <button class="button is-success" type="button"
                        @click="showAddMasterData()">
                     <span class="icon">
                        <i class="icon-plus" aria-hidden="true"></i>
                      </span>
                </button>
            </span>
            <span class="card-header-icon" aria-label="more options">
                <button class="button" type="button"
                        @click="openFilter()">
                     <span class="icon">
                        <i class="icon-search" aria-hidden="true"></i>
                      </span>
                </button>
            </span>
            <span class="card-header-icon" aria-label="more options">
                <button class="button" type="button"
                        @click="reloadData()">
                     <span class="icon">
                        <i class="icon-redo-alt" aria-hidden="true"></i>
                      </span>
                </button>
            </span>
        </header>
        <div class="card-content">
    <div class="columns">
        <div class="column is-one-fifth">
            <div class="notification">
                <div class="bd-snippet-preview">
                    <article class="panel is-link">
                        <div class="select ">
                            <select class="input" v-model="searchForm.parent" @keyup.enter="doSearch()">
                                <option :value="null" class="has-text-centered">---Danh mục---</option>
                                <option v-for="item in listParents" v-bind:value="item.id" @keyup.enter="doSearch()">
                                    {{item.name}}
                                </option>
                            </select>
                        </div>
                    </article>
                    <article class="panel is-link">
                        <p class="control has-icons-left">
                            <input class="input is-link" type="text" v-model="searchForm.name" @keyup.enter="doSearch()" placeholder="Search">
                        </p>
                    </article>
                    <div class="control">
                        <button class="button is-info" @click="doSearch()">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="column card-content">
            <template v-if="!isLoading">
                <table class="table is-fullwidth is-striped is-hoverable">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, key) in listMasterData" :key="key">
                        <td>{{key+1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.description}}</td>
                        <td>
                            <button @click="showEditMasterData(item, key)"
                                    class="button is-small is-success is-outlined" type="button">
                                <span class="icon"><i class="icon-edit"></i></span>
                            </button>
                            <button @click="deleteMasterData(item, key)"
                                    class="button is-small is-danger is-outlined mg-left-sm" type="button">
                                <span class="icon"><i class="icon-trash"></i></span>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </template>
            <loading v-if="isLoading"></loading>
        </div>
        <bulma-modal-card :active="showDialog"
                          :title="!detailMasterData.id ? $t('masterData.add') : $t('masterData.edit')"
                          @closeModal="onDialogClose()">
            <template slot="body">
                <div class="field">
                    <label class="label">{{$t('masterData.name')}} <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <input class="input" type="text" v-model="detailMasterData.name"
                               :placeholder="$t('masterData.name')">
                    </div>
                    <p class="has-text-danger error" v-if="hasError('name_required',detailMasterData)">{{getError('name_required',detailMasterData)}}</p>
                </div>
                <div class="field">
                    <label class="label">{{$t('masterData.description')}} <span
                        class="has-text-danger">*</span></label>
                    <div class="control">
                        <input class="input" type="text" v-model="detailMasterData.description"
                               :placeholder="$t('masterData.description')">
                    </div>
                </div>
                <div class="field">
                    <label class="label">{{$t('masterData.parent')}} <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <select name="parent_id" class="input" v-model="detailMasterData.parent_id">
                            <option value="">--Chọn thể loại--</option>
                            <option v-for="(item, index) in listParents" :value="item.id" :key="index">
                                {{item.name}}
                            </option>
                        </select>
                    </div>
                </div>
            </template>
            <template slot="footer">
                <div class="column">
                    <button type="button" @click="submitMasterData()"
                            :class="{'button is-primary':true,'is-loading':isSubmit}">
                        Xác nhận
                    </button>
                </div>
                <div class="column">
                    <div class="buttons is-right">
                        <button class="button is-outlined" type="button"
                                @click="dialogClose()">Đóng lại
                        </button>
                    </div>
                </div>
            </template>
        </bulma-modal-card>
    </div>
    </div>
    </div>
</template>

<script>
    import MasterData from "../script/MasterData";
    import Pagination from "../../../../plugins/bulma/component/Pagination";
    export default {
        name: "master-data",
        mixins: [MasterData],
        components: {
            Pagination
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/master-data";
</style>
