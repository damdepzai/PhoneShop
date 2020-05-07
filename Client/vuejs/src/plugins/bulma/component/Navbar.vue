
<template>
    <nav :class="['navbar', {'is-transparent':transparent},'is-fixed-'+fix,`is-${color}`]"
         :style="{'height': navHeight}">
        <div class="navbar-brand">
            <slot name="brand"></slot>
            <div :class="{'navbar-burger burger':true,'is-active':burger_active}" @click="burgerToggle()">
                <span></span> <span></span> <span></span>
            </div>
        </div>
        <div :class="{'navbar-menu':true,'is-active':burger_active}">
            <div class="navbar-start">
                <slot name="start"></slot>
            </div>
            <div class="navbar-end">
                <slot name="end"></slot>
            </div>
        </div>
    </nav>
</template>

<script>
    import Logo from '../../../resources/components/Logo'
    import {fromEvent, merge, Subscriber} from 'rxjs'

    export default {
        name: 'Navbar',
        components: {Logo},
        props: {
            transparent: false,
            fix: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: 'default'
            },
            navHeight: {
                type: String,
                default: null
            }
        },
        data: () => ({
            burger_active: false,
            clickOut: new Subscriber()
        }),
        mounted() {
            if (this.fix !== '') {
                document.querySelector('html').classList.add('has-navbar-fixed-' + this.fix)
            }
        },
        watch: {
            burger_active: function (val) {
                if (val) {
                    const clickEv = fromEvent(document, 'click')
                    const keyEv = fromEvent(document, 'keyup')
                    this.clickOut = merge(clickEv, keyEv).subscribe(ev => {
                        if ((ev instanceof KeyboardEvent && ev.code === 'Escape') ||
                            (ev instanceof MouseEvent && !this.$el.contains(ev.target))) {
                            this.burger_active = false
                        }
                    })
                } else {
                    if (!this.clickOut.closed) {
                        this.clickOut.unsubscribe()
                    }
                }
            }
        },
        methods: {
            burgerToggle() {
                this.burger_active = !this.burger_active
            }
        },
        destroyed() {
            this.clickOut.unsubscribe()
        }
    }
</script>

<style scoped>

</style>
