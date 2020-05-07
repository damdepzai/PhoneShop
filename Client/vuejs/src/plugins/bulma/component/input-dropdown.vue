
<template>
    <div :class="{'dropdown':true, 'is-active':isActive, 'is-up': isUp}">
        <div class="dropdown-trigger" @click="activeDropdown">
            <div class="field">
                <input :style="{ maxWidth: maxWidth + 'rem !important', minWidth: maxWidth + 'rem !important' }" type="text" :value="value" class="input" v-numeric-only="{ isNumeric }"
                       @change="updateInput"
                       @input="updateInputWidth($event.target.value)" :placeholder="placeholder" :readonly="readonly">
            </div>
        </div>
        <div class="dropdown-menu is-up" role="menu">
            <div class="dropdown-content is-up" :style="{ maxWidth: maxWidthDrop + 'rem' }">
                <a :class="{'dropdown-item':true,'is-active': item.value? (item.value == value): item == value}"
                   v-for="item in list"
                   @click="onSelectItem(item.value?item.value:item)">{{item.text?item.text: item}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {fromEvent} from "rxjs";

    export default {
        name: "input-dropdown",
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: {
                type: [String, Number],
                default: null
            },
            isUp: {
                type: Boolean,
                default: false
            },
            maxWidth: {
                type: [String, Number],
                default: null
            },
            maxWidthDrop: {
                type: [String, Number],
                default: null
            },
            placeholder: {
                type: [String, Number],
                default: null
            },
            readonly: {
                type: Boolean,
                default: null
            },
            list: {
                type: [Array, Object],
                default: []
            },
            isNumeric: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.updateInputWidth(this.value)
            })
        },
        watch: {
            isActive: function (val) {
                if (val) {
                    this.dom2ClickEv = fromEvent(document.body, 'click').subscribe(ev => {
                        if (!this.$el.contains(ev.target)) {
                            this.isActive = false
                        }
                    })
                } else {
                    if (this.dom2ClickEv)
                        this.dom2ClickEv.unsubscribe()
                }
            }
        },
        data: () => ({
            isActive: false,
            dom2ClickEv: null
        }),
        methods: {
            activeDropdown() {
                this.isActive = true
            },
            onSelectItem(val) {
                this.updateInputWidth(val)
                this.$emit('change', val)
                this.isActive = false
            },
            updateInput($event) {
                this.$emit('change', $event.target.value)
            },
            measureText(string, fontSize = 10) {
                if (typeof fontSize === 'string')
                    fontSize = parseInt(fontSize)
                const widths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0.2796875, 0.2765625, 0.3546875, 0.5546875, 0.5546875, 0.8890625, 0.665625,
                    0.190625, 0.3328125, 0.3328125, 0.3890625, 0.5828125, 0.2765625, 0.3328125, 0.2765625,
                    0.3015625, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875,
                    0.5546875, 0.5546875, 0.5546875, 0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375,
                    0.5546875, 1.0140625, 0.665625, 0.665625, 0.721875, 0.721875, 0.665625, 0.609375,
                    0.7765625, 0.721875, 0.2765625, 0.5, 0.665625, 0.5546875, 0.8328125, 0.721875,
                    0.7765625, 0.665625, 0.7765625, 0.721875, 0.665625, 0.609375, 0.721875, 0.665625,
                    0.94375, 0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625, 0.4765625,
                    0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5, 0.5546875, 0.5546875, 0.2765625,
                    0.5546875, 0.5546875, 0.221875, 0.240625, 0.5, 0.221875, 0.8328125, 0.5546875,
                    0.5546875, 0.5546875, 0.5546875, 0.3328125, 0.5, 0.2765625, 0.5546875, 0.5, 0.721875,
                    0.5, 0.5, 0.5, 0.3546875, 0.259375, 0.353125, 0.5890625]
                const avg = 0.5279276315789471
                return string
                    .split('')
                    .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
                    .reduce((cur, acc) => acc + cur) * fontSize
            },
            updateInputWidth(val) {
                if ((val + '').length) {
                    const inputEl = this.$el.querySelector('.input')
                    const style = window.getComputedStyle(inputEl, null)
                    const padding = parseInt(style.getPropertyValue('padding-left')) +
                        parseInt(style.getPropertyValue('padding-right'))
                    const fontSize = parseInt(style.getPropertyValue('font-size'))

                    inputEl.style.width = this.measureText(val + '', fontSize) + padding + fontSize + 'px'
                }
            }
        }
    }
</script>

<style scoped>

</style>
