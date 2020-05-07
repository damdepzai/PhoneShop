
<template>
    <div class="field has-addons">
        <div class="control">
            <button :class="['button','is-'+color]"
                    :disabled="min !== null && (redValue <= min)"
                    v-longpress:350,100="leftClick"
                    @click="leftClick">
                <span class="icon"><i class="icon-regular minus"></i> </span>
            </button>
        </div>
        <div class="control">
            <input :class="['input','is-'+color]" type="text" :placeholder="placeholder" v-model.number="redValue">
        </div>
        <div class="control">
            <button :class="['button','is-'+color]"
                    :disabled="max !== null && (redValue >= max)"
                    v-longpress:350,100="rightClick"
                    @click="rightClick">
                <span class="icon"><i class="icon-regular plus"></i> </span>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'number-input',
        model: {
            prop: 'value',
            event: 'input'
        },
        props: {
            value: {
                type: Number,
                default: null
            },
            max: {
                type: Number,
                default: null
            },
            min: {
                type: Number,
                default: null
            },
            color: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            step: {
                type: Number,
                default: 1
            }
        },
        data: () => ({
            redValue: null
        }),
        created() {
            this.redValue = this.value
        },
        watch: {
            redValue: function (val) {
                if (this.min != null && val < this.min)
                    this.redValue = this.min
                else if (this.max != null && val > this.max)
                    this.redValue = this.max

                this.$emit('input', parseInt(val))
            }
        },
        methods: {
            leftClick() {
                this.redValue -= this.step
            },
            rightClick() {
                this.redValue += this.step
            }
        }
    }
</script>

<style scoped>

</style>
