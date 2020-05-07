<template>
    <div class="card">

        <header class="card-header columns is-multiline is-mobile is-marginless">
            <div class="column is-one-fifth-fullhd is-full-mobile">
                <p class="card-header-title has-text-title"><b>{{$t('category.title')}}</b></p>
            </div>
            <div class="column is-three-fifths-fullhd is-full-mobile">
                <span class="card-header-icon" aria-label="more options">
<!--                    <pagination-->
<!--                        :current="pagination.current"-->
<!--                        :total="pagination.total"-->
<!--                        :perPage="pagination.perPage"-->
<!--                        @onChange="searchData"-->
<!--                        :step="1">-->
<!--                    </pagination>-->
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
                    <button class="button is-success" type="button"
                            @click="showAddCategory()">
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
                            <th class="has-text-centered has-color-th">{{$t('category.stt')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('category.name')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('category.description')}}</th>
                            <th class="has-text-centered has-color-th">{{$t('category.action')}}</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr >
                            <td class="has-text-centered w-1" ></td>
                            <td class="w-20"></td>
                            <td class="w-20"></td>
                            <td class="has-text-centered min-win-action  w-1" >
                                <button
                                        class="button is-small is-success is-outlined" type="button">
                                 <span>
                             <i class="icon icon-edit" aria-hidden="true"></i>
                                 </span>
                                </button>
                                <button @click="deleteUser()"
                                        class="button is-small is-danger is-outlined mg-left-sm"><i
                                    class="icon icon-trash"></i></button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </template>
        </div>
        <bulma-modal-card :active="showDialog"

                          @closeModal="onDialogClose()">
            <template slot="body">
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('category.name')}} <span class="has-text-danger">*</span></label>
                            <div class="control">
                                <input class="input" type="text"

                                       :placeholder="$t('category.name_placeholder')" maxlength="50">
                            </div>
<!--                            <p class="has-text-danger error" v-if="hasError('category.name_required',detailUser)">-->
<!--                                {{getError('category_required',detailUser)}}</p>-->
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label">{{$t('category.description')}} <span class="has-text-danger">*</span></label>
                            <div class="control">
                                <textarea class="has-textarea input" maxlength="500" rows="3" :placeholder="$t('category.description_placeholder')" ></textarea>
                            </div>

                        </div>
                    </div>
                </div>


            </template>
            <template slot="footer">
                <div class="column">
                    <div class="buttons is-right">
                        <button type="button" @click="submitUser()"
                                :class="{'button is-primary':true,'is-loading':isSubmit}">
                            {{$t('category.oke')}}
                        </button>
                    </div>
                </div>
                <div class="column">
                    <div class="buttons">
                        <button class="button is-outlined" type="button"
                                @click="dialogClose()">{{$t('category.cancel')}}
                        </button>
                    </div>
                </div>
            </template>
        </bulma-modal-card>
        <loading v-if="isLoading"></loading>

    </div>
</template>

<script>
    import Pagination from "../../../../plugins/bulma/component/Pagination";
    import ListCategory from "../script/list-category"
    export default {
        name: "list-category",
        mixins:[ListCategory],
        components:{Pagination}
    }
</script>

<style scoped lang="scss">
    @import "../styles/list-category";
</style>
