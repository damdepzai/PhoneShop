<!--
  - Copyright (c) 2020.
  - Project: Source
  - LastModified: 2/14/20, 3:23 PM
  - Author: diengv < Giáp Văn Điện >
  - Email: diengv@ominext.com
  - File name: app-dialog.vue
  - File path: D:/Projects/PMS/Source/Client/vuejs/src/plugins/dialog/app-dialog.vue
  -->

<template>
    <div class="modal modal-fx-fadeInScale index-modal">
        <div class="modal-background"></div>
        <div class="modal-content" :style="{width: width}">
            <div :class="`box is-${type}`">
                <h3 class="box-title" v-if="title">{{title}}</h3>
                <div class="box-icon is-custom" v-html="customIcon" v-if="customIcon"></div>
                <div class="box-icon" v-else-if="iconClass">
                    <span class="has-icon-circle">
                        <span class="icon"><i :class="iconClass"></i> </span>
                    </span>
                </div>
                <div class="has-text-centered" v-html="content"></div>
                <div class="buttons is-centered dialog-btn">
                    <button type="button" class="button is-primary"
                            @click="okClick"
                            v-if="okText">
                        {{okText}}
                    </button>
                    <button type="button" class="button"
                            @click="cancelClick()"
                            v-if="cancelText">
                        {{cancelText}}
                    </button>
                </div>
                <div class="field is-grouped is-grouped-right has-text-grey-light"
                     style="height:32px"
                     v-if="closeTime !== -1">
                    <div class="control is-marginless">
                        <svg width="32px" height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                             preserveAspectRatio="xMidYMid" class="lds-lds-clock"
                             style="background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%;">
                            <g transform="translate(50 50)">
                                <g transform="scale(0.8)">
                                    <g transform="translate(-50 -50)">
                                        <path
                                            d="M50,14c19.85,0,36,16.15,36,36S69.85,86,50,86S14,69.85,14,50S30.15,14,50,14 M50,10c-22.091,0-40,17.909-40,40 s17.909,40,40,40s40-17.909,40-40S72.091,10,50,10L50,10z"
                                            fill="#bebebe" stroke="#bebebe" stroke-width="1"></path>
                                        <path
                                            d="M52.78,42.506c-0.247-0.092-0.415-0.329-0.428-0.603L52.269,40l-0.931-21.225C51.304,18.06,50.716,17.5,50,17.5 s-1.303,0.56-1.338,1.277L47.731,40l-0.083,1.901c-0.013,0.276-0.181,0.513-0.428,0.604c-0.075,0.028-0.146,0.063-0.22,0.093V44h6 v-1.392C52.925,42.577,52.857,42.535,52.78,42.506z"
                                            fill="#bbcedd">
                                            <animateTransform attributeName="transform" type="rotate" calcMode="linear"
                                                              values="0 50 50;360 50 50" keyTimes="0;1" dur="1s"
                                                              begin="0s" repeatCount="indefinite"></animateTransform>
                                        </path>
                                        <path
                                            d="M58.001,48.362c-0.634-3.244-3.251-5.812-6.514-6.391c-3.846-0.681-7.565,1.35-9.034,4.941 c-0.176,0.432-0.564,0.717-1.013,0.744l-15.149,0.97c-0.72,0.043-1.285,0.642-1.285,1.383c0,0.722,0.564,1.321,1.283,1.363 l15.153,0.971c0.447,0.027,0.834,0.312,1.011,0.744c1.261,3.081,4.223,5.073,7.547,5.073c2.447,0,4.744-1.084,6.301-2.975 C57.858,53.296,58.478,50.808,58.001,48.362z M50,53.06c-1.688,0-3.06-1.373-3.06-3.06s1.373-3.06,3.06-3.06s3.06,1.373,3.06,3.06 S51.688,53.06,50,53.06z"
                                            fill="#85a2b6">
                                            <animateTransform attributeName="transform" type="rotate" calcMode="linear"
                                                              values="0 50 50;360 50 50" keyTimes="0;1"
                                                              :dur="closeTime+'s'" begin="0s"
                                                              repeatCount="indefinite"></animateTransform>
                                        </path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="control"><span style="line-height: 32px">{{timeShow}}s</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {interval} from "rxjs";

    export default {
        name: 'app-dialog',
        props: {
            type: {
                type: String,
                default: 'success'
            },
            size: {
                type: String,
                default: 'sm'
            },
            title: {
                type: String,
                default: ''
            },
            iconClass: {
                type: String,
                default: ''
            },
            customIcon: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            },
            width: {
                type: String,
                default: ''
            },
            okText: {
                type: String,
                default: 'OK'
            },
            cancelText: {
                type: String,
                default: 'Cancel'
            },
            onOk: {
                type: Function,
                default: () => {
                }
            },
            onCancel: {
                type: Function,
                default: () => {
                }
            },
            closeTime: {
                type: Number,
                default: -1
            }
        },
        data: () => ({
            timeShow: null
        }),
        mounted() {
            if (this.closeTime > 0) {
                this.timeShow = this.closeTime
                const timer = interval(1000).subscribe(() => {
                    --this.timeShow
                    if (this.timeShow <= 0) {
                        timer.unsubscribe()
                        this.cancelClick()
                    }
                })
            }

            this.$nextTick(() => {
                setTimeout(() => {
                    this.$el.classList.add('is-active')
                    this.freeze()
                }, 60)
            })
        },
        methods: {
            cancelClick() {
                this.onCancel(this)
                this.$el.classList.remove('is-active')
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$destroy();
                        this.unFreeze()
                        this.$el.parentNode.removeChild(this.$el);
                    }, 350)
                })
            },
            okClick() {
                this.onOk(this)
            },
            freeze() {
                document.getElementsByTagName('html')[0].style.overflow = "hidden"
                document.getElementsByTagName('body')[0].style.overflowY = "scroll";
            },
            unFreeze() {
                document.getElementsByTagName('html')[0].style.overflow = ""
                document.getElementsByTagName('body')[0].style.overflowY = "";
            }
        }
    }
</script>

<style lang="scss" scoped>
    .index-modal{
        z-index: 9999;
    }
    .box-icon {
        margin-top: 7px;
        margin-bottom: 25px;
    }

    .box {
        .box-title {
            text-align: center;
            font-size: $size-4;
        }

        .has-icon-circle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin: 0 auto;
            border-width: 2px;
            border-style: solid;
            display: flex;
            align-content: center;
            align-items: center;
            justify-content: center;
            font-size: 25px;
        }

        .dialog-btn {
            margin: 0;
            margin-top: 25px;

            .button {
                margin-bottom: 0;
            }
        }

        @each $name, $par in $colors {
            &.is-#{$name} {
                .has-icon-circle {
                    border-color: darken(nth($par, 1), 5%);
                    color: nth($par, 1);
                }

                .box-title {
                    color: nth($par, 1);
                }
            }
        }
    }
</style>
