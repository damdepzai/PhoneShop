<template>
    <div :class="['dropdown', {'is-active':isActive}]">
        <div class="dropdown-trigger">
            <button class="button" @click="toggleDrop()" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>{{ selectedItem || placeholderButton }}</span>
                <span class="icon is-small">
        <i class="icon icon-angle-down"></i>
      </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <div class="field dropdown-item">
                    <div class="control has-icons-left">
                        <input type="text" :placeholder="placeholderSearch" class="input is-transparent" v-model="keyword">
                        <span class="icon is-left">
            <i class="icon icon-search"></i>
          </span>
                    </div>
                </div>
                <hr class="dropdown-divider">
                <a class="dropdown-item" @click.prevent="selectItem(item)" v-for="(item, index) in listDropdown" :key="index">
                    {{ item[text] }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "dropdown-client-search",
        props: {
            listData: {
                type: Array,
                default: () => []
            },
            text: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            placeholderButton: {
                type: String,
                default: ''
            },
            placeholderSearch: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                isActive: false,
                selectedItem: null,
                keyword: '',
                listDropdown: []
            }
        },
        watch: {
            isActive(val) {
                if(val) {
                    document.body.addEventListener('click', this.bodyClickEv)
                    document.body.addEventListener('keyup', this.bodyKeyEv)
                }
                else {
                    this.removeBodyEvent()
                }
            },
            keyword: _.debounce(function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.doSearch()
                }
            }, 200)
        },
        methods: {
            toggleDrop() {
                this.isActive = !this.isActive
                if(this.isActive) {
                    this.keyword = ''
                    this.doSearch()
                }
            },
            selectItem(item) {
                this.isActive = false
                this.selectedItem = item[this.text]
                this.$emit('selected-item', item[this.value])
            },
            doSearch() {
                this.listDropdown = []
                this.listData.map((e) => {
                    if(_.toUpper(e[this.text]).search(_.toUpper(this.keyword)) > -1 || _.toUpper(e[this.value]).search(_.toUpper(this.keyword)) > -1) {
                        this.listDropdown.push(e)
                    }
                })
            },
            bodyClickEv($ev) {
                if (!this.$el.contains($ev.target)) {
                    this.isActive = false
                }
            },
            bodyKeyEv($ev) {
                if ($ev.key === 'Escape') {
                    this.isActive = false
                }
            },
            removeBodyEvent() {
                document.body.removeEventListener('click', this.bodyClickEv)
                document.body.removeEventListener('keyup', this.bodyKeyEv)
            }
        },
        mounted() {
            this.listDropdown = [...this.listData] || []
        },
        beforeDestroy() {
            this.removeBodyEvent()
        }
    }
</script>

<style lang="scss" scoped>
    .field.dropdown-item {
        padding: 0;
        margin-bottom: 0;
    }

    .field.dropdown-item input {
        border: none;
        border-radius: 0;
        box-shadow: none;
        margin-bottom: 0;
    }
</style>
