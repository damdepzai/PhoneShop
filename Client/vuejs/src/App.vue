

<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'App',
        data: () => ({
            onLine: navigator.onLine,
            checkOnline: null
        }),
        mounted() {

        },
        computed: {
            layout() {
                return this.$route.meta.layout || 'default-layout'
            }
        },
        watch: {
            onLine(v) {
                this.$store.dispatch('updateOnlineFlag', v).then(() => {
                    if (v) {
                        this.$addNotification({
                            title: 'Thông báo',
                            content: 'Hệ thống đã online trở lại'
                        })
                    } else {
                        this.$addNotification({
                            title: 'Mất kết nối',
                            color: 'warning',
                            content: 'Không có kết nối mạng, hệ thống đang ở chế độ ngoại tuyến.'
                        })
                    }
                })
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss">
    @import "resources/assets/scss/main";

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
