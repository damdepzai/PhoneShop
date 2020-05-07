<template>
    <div class="card">
        <header class="card-header">
            <b class="card-header-title">Quản lý nhân viên</b>
            <span class="card-header-icon" aria-label="more options">
                <pagination
                    :current="pagination.current"
                    :total="pagination.total"
                    :perPage="pagination.perPage"
                    @onChange="searchData"
                    :step="1">
                </pagination>
            </span>
            <span class="card-header-icon" aria-label="more options">
                <button class="button is-small is-rounded is-success" type="button"
                        @click="addEmployee()">
                     <span class="icon">
                        <i class="icon-plus" aria-hidden="true"></i>
                      </span>
                </button>
            </span>
            <span class="card-header-icon" aria-label="more options">
                <button class="button is-dark" type="button"
                        @click="changePassword()">
                     <span class="icon">
                        <i class="icon-user-secret" aria-hidden="true"></i>
                      </span>
                </button>
            </span>
            <span class="card-header-icon" aria-label="more options">
                <button class="button is-small is-rounded" type="button"
                        @click="reloadData()">
                     <span class="icon">
                        <i class="icon-filter" aria-hidden="true"></i>
                      </span>
                </button>
            </span>
        </header>
        <div class="card-content">
            <div class="field has-addons">
                <div class="control">
                    <input class="input"
                           type="text"
                           placeholder="Nhập nhân viên cần tìm ..."
                           @keyup.enter="doSearch()"
                           v-model="searchForm.keyword">
                </div>
                <div class="control">
                    <button class="input" type="button" @click="doSearch()"><span class="icon">
                        <i class="icon-search is-primary" aria-hidden="true"></i>
                      </span></button>
                </div>
            </div>
            <template v-if="">
                <table class="table is-fullwidth is-striped is-hoverable">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>{{$t('employee.employee_code')}}</th>
                        <th>{{$t('employee.name')}}</th>
                        <th>{{$t('employee.email')}}</th>
                        <th>{{$t('employee.department_id')}}</th>
                        <th>{{$t('employee.status')}}</th>
                        <th>{{$t('employee.role')}}</th>
                        <th>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(employee, index) in listEmployee" :key="index">
                        <th>{{index + 1}}</th>
                        <td>{{employee.employee_code}}</td>
                        <td>{{employee.name}}</td>
                        <td>{{employee.email}}</td>
                        <td>{{employee.department_id}}</td>
                        <td>
                            <div class="field">
                                <input :id="'status-' + index" type="checkbox" class="switch is-success" :checked="employee.status" @change="changeStatus(employee.id)">
                                <label :for="'status-' + index"></label>
                            </div>
                        </td>
                        <td>{{employee.role}}</td>
                        <td >
                            <button  class="button is-small is-success is-outlined" type="button"
                                     @click="updateEmployee(employee, index)">
                     <span>
                        <i class="icon-edit" aria-hidden="true"></i>
                      </span>
                            </button>
                            <button @click="deleteEmployee(employee, index)" class="button is-small is-danger is-outlined mg-left-sm"><i class="icon-trash"></i> </button>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </template>
        </div>
        <bulma-modal-card :active="showDialog" :title="selectEmployee.id ? $t('employee.edit'): $t('employee.add')"
                          @closeModal="onDialogClose()">
            <template slot="body">
                <div class="field">
                    <label class="label">{{$t('employee.status')}} <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <select class="input" type="text" v-model="detailEmployee.status" :placeholder="$t('employee.status')" :disabled="onlyView">

                            <option value="1">Active</option>
                            <option value="0">Block</option>


                        </select>
                    </div>
                </div>
                <div class="field">
                    <label class="label">{{$t('employee.name')}} <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <input class="input"
                               type="text"
                               :class="{'is-danger': hasError('name_required', detailEmployee)}"
                               v-model="detailEmployee.name"
                               :placeholder="$t('employee.name')"
                               :disabled="onlyView">
                        <span class="has-text-danger" v-if="hasError('name_required', detailEmployee)">{{ getError('name_required', detailEmployee) }}</span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">{{$t('employee.email')}} <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <input class="input"
                               type="email"
                               :class="{'is-danger': hasError('email_required', detailEmployee)}"
                               v-model="detailEmployee.email"
                               :placeholder="$t('employee.email')"
                               :disabled="onlyView">
                        <span class="has-text-danger" v-if="hasError('email_required', detailEmployee)">{{ getError('email_required', detailEmployee) }}</span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">{{$t('employee.department_id')}} <span class="has-text-danger"></span></label>
                    <div class="control">
                        <select class="input" type="text" v-model="detailEmployee.department_id" :placeholder="$t('employee.department_id')" :disabled="onlyView">

                            <option value="1">Bu1</option>
                            <option value="2">Bu2</option>
                            <option value="3">Bu3</option>
                            <option value="4">Bu4</option>

                        </select>
                    </div>
                </div>
                <div class="field">
                    <label class="label">{{$t('employee.employee_code')}} <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <input class="input" type="number"
                               :class="{'is-danger': hasError('employee_code_required', detailEmployee)}"
                               v-model="detailEmployee.employee_code":placeholder="$t('employee.employee_code')" :disabled="onlyView">
                        <span class="has-text-danger" v-if="hasError('employee_code_required', detailEmployee)">{{ getError('employee_code_required', detailEmployee) }}</span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">{{$t('employee.role')}} <span class="has-text-danger"></span></label>
                    <div class="control">
                        <input class="input" type="text" v-model="detailEmployee.role":placeholder="$t('employee.role')" :disabled="onlyView">
                    </div>
                </div>
            </template>
            <template slot="footer">
                <div class="column">
                    <div class="buttons is-right">
                        <button type="button" @click="submitEmployee()"
                                :disabled="onlyView"
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

        <bulma-modal-card :active="showDialogChangePass" :title="$t('Thay đổi mật khẩu')"
                          @closeModal="onDialogClose()">
            <template slot="body">
                <div class="field">
                    <label class="label">{{$t('employee.oldPassword')}} <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <input class="input"
                               type="password"
                               :class="{'is-danger': hasError('old_password_required', changePass)}"
                               :placeholder="$t('employee.oldPassword')"
                               :disabled="onlyView"
                               v-model="changePass.oldPassword">
                        <span class="has-text-danger" v-if="hasError('old_password_required', changePass)">{{ getError('old_password_required', changePass) }}</span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">{{$t('employee.newPassword')}} <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <input class="input"
                               type="password"
                               :class="{'is-danger': hasError('new_password_required', changePass) || hasError('new_old_eq', changePass)}"
                               v-model="changePass.newPassword"
                               :placeholder="$t('employee.newPassword')"
                               :disabled="onlyView">
                        <span class="has-text-danger" v-if="hasError('new_password_required', changePass)">{{ getError('new_password_required', changePass) }}</span>
                        <span class="has-text-danger" v-if="!hasError('new_password_required', changePass) && hasError('new_old_eq', changePass)">{{ getError('new_old_eq', changePass) }}</span>

                    </div>
                </div>
                <div class="field">
                    <label class="label">{{$t('employee.confirmPassword')}} <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <input class="input"
                               type="password"
                               v-model="changePass.confirmPassword"
                               :placeholder="$t('employee.confirmPassword')"
                               :disabled="onlyView">
                        <span class="has-text-danger" v-if="hasError('confirm_password_required', changePass)">{{ getError('confirm_password_required', changePass) }}</span>
                        <span class="has-text-danger" v-if="!hasError('confirm_password_required', changePass) && hasError('new_new_conf', changePass)">{{ getError('new_new_conf', changePass) }}</span>
                    </div>
                </div>

            </template>
            <template slot="footer">
                <div class="column">
                    <button type="button" @click="submitPass()"
                            :disabled="onlyView"
                            :class="{'button is-primary':true,'is-loading':isSubmit}">
                        Đổi mật khẩu
                    </button>
                </div>
            </template>
        </bulma-modal-card>

    </div>
</template>

<script>
    import Employee from "../script/employee";
    import Pagination from "../../../../plugins/bulma/component/Pagination";
    export default {
        name: "employee-list",
        mixins: [Employee],
        components:{
            Pagination
        }
    }
</script>

<style scoped>

</style>
