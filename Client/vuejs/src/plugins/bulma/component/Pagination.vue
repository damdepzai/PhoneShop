
<template>
    <div class="columns">
        <div class="column is-narrow">
            <div class="field has-addons">
                <p class="control">
                    <input-dropdown :list="paginateList" :is-numeric="true" v-model.number="itemPerPage" :is-up="isUp"></input-dropdown>
                </p>
                <p class="control">
                    <span class="button is-static">/ {{total}}</span>
                </p>
            </div>
        </div>
        <div class="column">
            <nav :class="['pagination', 'is-'+themeStyle,'is-'+themeSize]" role="navigation" aria-label="pagination">
                <a class="pagination-previous" v-if="current > 1" @click="changePage(current - 1)">
                    <span class="icon"><i class="icon-arrow-alt-left"></i> </span>
                </a>
                <a class="pagination-next" v-if="size > 1 && current < size" @click="changePage(current + 1)">
                    <span class="icon"><i class="icon-arrow-alt-right"></i> </span>
                </a>
                <ul class="pagination-list">
                    <template v-for="element in elements">
                        <li v-if="element.type=== elType.break"><span class="pagination-ellipsis">&hellip;</span></li>
                        <li v-else>
                            <a :class="{'pagination-link':true,'is-current':element.page === current}"
                               @click="changePage(element.page)"
                               :aria-label="`Goto page ${element.page}`">{{element.page}}</a>
                        </li>
                    </template>
                </ul>
            </nav>
        </div>
    </div>

</template>

<script>
    import InputDropdown from "./input-dropdown";
    import {DATA_PAGINATE} from "../../../app/enum";

    export default {
        name: 'pagination',
        components: {InputDropdown},
        props: {
            current: {
                type: Number
            },
            isUp: {
                type: Boolean,
                default: false
            },
            total: {
                type: Number,
                default: 0
            },
            perPage: {
                type: Number
            },
            step: {
                type: Number,
                default: 3
            },
            themeSize: {
                type: String,
                default: '' // small, medium, large
            },
            themeStyle: {
                type: String,
                default: 'rounded'
            }
        },
        data() {
            return {
                elements: [],
                size: 0,
                elType: {
                    break: 'break',
                    page: 'page'
                },
                itemPerPage: this.perPage
            }
        },
        mounted() {
            // this.itemPerPage = this.perPage
            this.paginate()
        },
        watch: {
            current: function (val) {
                this.paginate()
            },
            perPage(val) {
                this.itemPerPage = val || 50
            },
            total: function (val) {
                this.paginate()
            },
            itemPerPage: function (val, old) {
                if(val){
                    this.paginate()
                    if (val !== old)
                        this.$emit('onChange', {page: 1, perPage: val})
                }
            },
        },
        computed: {
            paginateList() {
                return DATA_PAGINATE
            }
        },
        methods: {
            add(s, f) {
                for (let i = s; i < f; i++) {
                    this.elements.push(
                        {type: this.elType.page, page: i}
                    )
                }
            },
            first() {
                // Add first page with separator
                this.elements.push(
                    {type: this.elType.page, page: 1},
                    {type: this.elType.break}
                )
            },
            last() {
                // Add last page with separator
                this.elements.push(
                    {type: this.elType.break},
                    {type: this.elType.page, page: this.size},
                )
            },
            paginate() {
                if (this.itemPerPage) {
                    this.elements = []
                    this.size = Math.ceil(this.total / this.itemPerPage)

                    if (this.size < this.step * 2 + 6) {
                        // Case without any ellipse breaks
                        this.add(1, this.size + 1);
                    } else if (this.current < this.step * 2 + 1) {
                        // Case with ellipse breaks at end
                        this.add(1, this.step * 2 + 4);
                        this.last();
                    } else if (this.current > this.size - this.step * 2) {
                        // Case with ellipse breaks at beginning
                        this.first();
                        this.add(this.size - this.step * 2 - 2, this.size + 1);
                    } else {
                        // Case with ellipse breaks at beginning and end
                        this.first();
                        this.add(this.current - this.step, this.current + this.step + 1);
                        this.last();
                    }
                }

            },
            changePage(page) {
                this.$emit('onChange', {page: page, perPage: this.itemPerPage})
            }
        }
    }
</script>
<style scoped lang="scss">
    .icon-arrow-alt-left {
        margin-top: 20%;
    }
    .icon-arrow-alt-right{
        margin-top: 20%;
    }
</style>
