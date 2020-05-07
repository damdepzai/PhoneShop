<!--
  - Copyright (c) 2020.
  - Project: Source
  - LastModified: 2/14/20, 3:23 PM
  - Author: diengv < Giáp Văn Điện >
  - Email: diengv@ominext.com
  - File name: app-notification.vue
  - File path: D:/Projects/PMS/Source/Client/vuejs/src/plugins/dialog/app-notification.vue
  -->

<template>
    <transition name="noti" v-on:leave-cancelled="removeNoti">
        <div :class="['notification', 'is-'+color]" v-if="isShow">
            <button class="delete" @click.prevent="deleteNoti" v-if="time === -1"></button>
            <div class="is-flex">
                <div class="left-icon" v-if="showIcon">
                  <span class="icon is-large">
                    <i class="is-size-4 icon-regular check-circle" v-if="color === 'success'"></i>
                    <i class="is-size-4 icon-regular times-circle" v-else-if="color === 'danger'"></i>
                    <i class="is-size-4 icon-regular info-circle" v-else></i>
                  </span>
                </div>
                <div>
                    <p v-if="title"><strong>{{title}}</strong></p>
                    <div class="n-content" v-html="content"></div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "app-notification",
        props: {
            time: {
                type: Number,
                default: 1500
            },
            color: {
                type: String,
                default: ''
            },
            showIcon: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            }
        },
        data: () => ({
            isShow: false
        }),
        mounted() {
            setTimeout(() => {
                this.isShow = true
            })
            if (this.time !== -1) {
                setTimeout(() => {
                    (() => {
                        this.deleteNoti()
                    })()
                }, this.time)
            }
        },
        methods: {
            deleteNoti() {
                this.isShow = false
            },
            removeNoti() {
                this.$nextTick(() => {
                    this.$destroy();
                    this.$el.parentNode.removeChild(this.$el);
                })

            }
        }
    }
</script>

<style lang="scss">
    .app-notification {
        z-index: 999;
        position: fixed;
        top: 60px;
        right: 1px;
        background-color: transparent;
        max-width: 400px;

        .notification {
            overflow: auto;
            padding-left: 0;
            box-shadow: 1px 7px 14px -5px rgba(0, 0, 0, 0.2);
            -webkit-animation: blink .5s step-end infinite alternate;

            .n-content {
                /*color: #878787;*/
            }

            .left-icon {
                display: flex;
                align-self: center;
                text-align: center;
            }

            border-right: $radius solid darken($background, 10%);
            border-left: $radius solid darken($background, 10%);

            @each $name, $par in $colors {
                &.is-#{$name} {
                    border-right: $radius solid nth($par, 1);
                    border-left: $radius solid nth($par, 1);
                    background-color: white;
                    color: $text;

                    .left-icon {
                        color: darken(nth($par, 1), 5%);
                    }
                }
            }
        }

        .noti-enter-active, .noti-leave-active {
            transition: all 1s;
        }

        .noti-enter, .noti-leave-to {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
</style>
