<template :active="showDialog">
    <div>
        <div class="card">
            <div class="card-content">
                <p class="card-header-title has-text-title"><b>{{$t('logHistory.title')}}</b></p>
                <div class="ticket__properties">
                    <div class="ticket__properties-item -priority">
                        <div class="ticket__properties-label">{{$t('preSale.company')}}</div>
                        <div class="ticket__properties-value">
                            <span class="_week-trigger-text">{{ detailPreSale.company }}</span>
                        </div>
                    </div>
                    <div class="ticket__properties-item -assigner">
                        <div class="ticket__properties-label has-margin-text">{{$t('preSale.contract_type')}}
                        </div>
                        <div class="ticket__properties-value">
                            <span class="_week-trigger-text">{{ PreSaleModel.CONTRACT_TYPE[detailPreSale.contract_type] }}</span>
                        </div>
                    </div>
                    <div class="ticket__properties-item -priority">
                        <div class="ticket__properties-label">{{$t('preSale.project')}}
                        </div>
                        <div class="ticket__properties-value">
                            <span class="_week-trigger-text">{{ detailPreSale.project }}</span>
                        </div>
                    </div>
                    <div class="ticket__properties-item -assigner">
                        <div class="ticket__properties-label has-margin-text">{{$t('preSale.size')}}
                        </div>
                        <div class="ticket__properties-value">
                            <span class="_week-trigger-text">{{ detailPreSale.size == 0 ? '' : detailPreSale.size }}</span>
                        </div>
                    </div>
                    <div class="ticket__properties-item -priority">
                        <div class="ticket__properties-label">{{$t('preSale.status')}}
                        </div>
                        <div class="ticket__properties-value">
                            <span class="_week-trigger-text">{{ PreSaleModel.STATUS[detailPreSale.status] }}</span>
                        </div>
                    </div>
                    <div class="ticket__properties-item -assigner">
                        <div class="ticket__properties-label has-margin-text">{{$t('preSale.language')}}
                        </div>
                        <div class="ticket__properties-value">
                            <span class="_week-trigger-text">{{ detailPreSale.language }}</span>
                        </div>
                    </div>
                    <div class="ticket__properties-item -priority">
                        <div class="ticket__properties-label">{{$t('logHistory.start_date')}}
                        </div>
                        <div class="ticket__properties-value">
                            <span class="_week-trigger-text">{{ detailPreSale.start_date ? detailPreSale.FormatTimeStartDate : ''}}</span>
                        </div>
                    </div>
                    <div class="ticket__properties-item -assigner">
                        <div class="ticket__properties-label has-margin-text">{{$t('logHistory.end_date')}}
                        </div>
                        <div class="ticket__properties-value">
                            <span class="_week-trigger-text">{{ detailPreSale.end_date ? detailPreSale.FormatTimeEndDate : ''  }}</span>
                        </div>
                    </div>
                    <div class="ticket__properties-item -priority">
                        <div class="ticket__properties-label">{{$t('preSale.department_id')}}</div>
                        <div class="ticket__properties-value">
                            <span
                                class="_week-trigger-text">{{ PreSaleModel.DEPARTMENT[detailPreSale.department_id] }}</span>
                        </div>
                    </div>
                    <div class="ticket__properties-item -assigner">
                        <div class="ticket__properties-label has-margin-text">{{$t('preSale.project_manager')}}</div>
                        <div class="ticket__properties-value">
                            <span class="_week-trigger-text">{{ detailPreSale.project_manager }}</span>
                        </div>
                    </div>
                    <div class="ticket__properties-item -priority">
                        <div class="ticket__properties-label">{{$t('preSale.account_manager_id')}}</div>
                        <div class="ticket__properties-value">
                            <span class="_week-trigger-text">{{ detailPreSale.account_manager_id ? (detailPreSale.users ? detailPreSale.users.name : '') : '' }}</span>
                        </div>
                    </div>
                    <div class="ticket__properties-item -assigner">
                        <div class="ticket__properties-label has-margin-text">{{$t('preSale.description')}}</div>
                        <div class="ticket__properties-value">
                            <span class="_week-trigger-text has-margin-description">{{ detailPreSale.description }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-content card-margin">
                <div class="log-history-head">
                    <div class="level">
                        <p class="card-header-title has-text-card-title"><b>{{$t('logHistory.log_history')}}</b></p>
                        <div class="level-right">
                            <button class="button" :class="{'is-primary': activeShowAll}" @click="reloadTypeNull()">
                                {{$t('logHistory.show_all')}}
                            </button>
                            <button class="button mg-left-md" :class="{'is-primary': activeCommentOnly}"
                                    @click="reloadType()">{{$t('logHistory.comments_only')}}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="log-history" v-for="(item, index) in listHistory">
                    <div class="level">
                        <div class="level-left has-text-level">
                            <img class="level-item" src="https://d1zqp7au6yhc2p.cloudfront.net/default-icons/account/45DCCC/128x128.png" alt="">
                            <span>
                             <b>{{item.users.name}}</b>
                            </span>
                        </div>
                        <div class="level-right">
                            <div class="level-item">
                                <span>{{item.created_at}}</span>
                            </div>
                        </div>
                    </div>
                    <br>
                    <p class="has-text-content"><span v-if="item.type == 1">{{item.content}}</span>
                        <i v-if="item.type == 0">{{'" ' + item.content + ' "'}}</i></p>
                    <br>
                    <div class=" has-text-right has-bottom-text"><span v-for="(ut, index) in item.user_tags"
                                                                       v-if="item.user_tags">{{ut.name}}{{(item.user_tags.length > 1 && index <= item.user_tags.length - 2) ? ', ' : ''}}</span>
                    </div>

                </div>
                <div class="level" v-if="readLoad == true">
                    <div class="has-icon-center">
                        <span class="buttons-control" aria-label="more options">
                            <button class="button is-success is-outlined" type="button" @click="reloadData()">
                                <span class="icon">
                                    <i class="icon-angle-double-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-content">
                <div>
                    <div>
                        <multi-select
                            :options="listUser"
                            v-model="detailHistory.user_id"
                            :multiple="true"
                            :placeholder="$t('logHistory.to')"
                            label="name"
                            track-by="id"
                            class="mg-bottom-md"
                        ></multi-select>
                    </div>
                    <p v-model="detailHistory.pre_sale_id = detailPreSale.id" hidden>{{ detailPreSale.id }}</p>
                    <textarea :class="{'is-danger': hasError('content_required',detailHistory)}"
                              v-model="detailHistory.content" class="textarea has-textarea-font"
                              :placeholder="$t('logHistory.content')"
                              cols="30" maxlength="500"
                              rows="3"></textarea>
                    <span class="has-text-danger" v-if="hasError('content_required', detailHistory)">{{ getError('content_required',detailHistory) }}</span>
                </div>
                <div class="has-text-centered button-icon">
                    <!--                    <button @click="close()" class="button is-danger is-outlined mg-left-sm">-->
                    <!--                        {{$t('logHistory.close')}}-->
                    <!--                    </button>-->
                    <!--                    <button class="button is-success is-outlined mg-left-sm">{{$t('logHistory.preview')}}</button>-->
                    <button @click="submitLogHistory()" class="button is-primary mg-left-sm"  :class="{'is-loading':isSubmit}">
                        {{$t('logHistory.submit')}}
                    </button>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import preSaleDetail from "../script/preSaleDetail";

    export default {
        name: "pre-sale-detail",
        mixins: [preSaleDetail]
    }
</script>

<style scoped lang="scss">
    @import "../style/pre-sale";
</style>
