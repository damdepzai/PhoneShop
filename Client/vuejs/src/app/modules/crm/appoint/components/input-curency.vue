<template>
    <div>
        <input type="tel"
               :value="formattedValue"
               @change="change"
               v-price-converter="{precision, decimal, thousands, prefix, suffix}"
               class="input"
               maxlength="17"/>
    </div>
</template>

<script>
    import defaults from '../../../../../directive/price-converter/options'
    import {format, unformat} from '../../../../../directive/price-converter/utils'

    export default {
        name: "input-currency",
        props: {
            value: {
                type: [Number, String],
                default: 0
            },
            masked: {
                type: Boolean,
                default: false
            },
            precision: {
                type: Number,
                default: () => defaults.precision
            },
            decimal: {
                type: String,
                default: () => defaults.decimal
            },
            thousands: {
                type: String,
                default: () => defaults.thousands
            },
            prefix: {
                type: String,
                default: () => defaults.prefix
            },
            suffix: {
                type: String,
                default: () => defaults.suffix
            }
        },
        data() {
            return {
                formattedValue: ''
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(newValue, oldValue) {
                    let formatted = format(newValue, this.$props)
                    if (formatted !== this.formattedValue) {
                        this.formattedValue = formatted
                    }
                }
            }
        },
        methods: {
            change(evt) {
                this.$emit('input', this.masked ? evt.target.value : unformat(evt.target.value, this.precision))
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
