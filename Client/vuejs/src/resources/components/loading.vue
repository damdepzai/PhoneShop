<template>
    <div :class="{'ajax-loader':true,'has-parent': parent !== null,'no-bg':!bg}">
        <div
            class="ajax-img"
            :style="{width:width, height: height}">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 :style="{margin:'auto',background:bgColor,display:'block'}"
                 :width="width"
                 :height="height" viewBox="0 0 100 100"
                 preserveAspectRatio="xMidYMid">
                <defs>
                    <filter id="ldio-0vfb4lhks0i-filter" x="-100%" y="-100%" width="300%" height="300%"
                            color-interpolation-filters="sRGB">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2.4000000000000004"></feGaussianBlur>
                        <feComponentTransfer result="cutoff">
                            <feFuncA type="linear" slope="10" intercept="-5"></feFuncA>
                        </feComponentTransfer>
                    </filter>
                </defs>
                <g filter="url(#ldio-0vfb4lhks0i-filter)">
                    <g transform="translate(50 50)">
                        <g transform="rotate(69.0038)">
                            <circle cx="17" cy="0" r="6.0401" fill="#e15b64">
                                <animate attributeName="r" keyTimes="0;0.5;1"
                                         values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="4s"
                                         repeatCount="indefinite" begin="-0.25s"></animate>
                            </circle>
                            <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360"
                                              dur="4s"
                                              repeatCount="indefinite" begin="0s"></animateTransform>
                        </g>
                    </g>
                    <g transform="translate(50 50)">
                        <g transform="rotate(147.008)">
                            <circle cx="17" cy="0" r="8.2402" fill="#f47e60">
                                <animate attributeName="r" keyTimes="0;0.5;1"
                                         values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="2s"
                                         repeatCount="indefinite" begin="-0.2s"></animate>
                            </circle>
                            <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360"
                                              dur="2s"
                                              repeatCount="indefinite" begin="-0.05s"></animateTransform>
                        </g>
                    </g>
                    <g transform="translate(50 50)">
                        <g transform="rotate(234.014)">
                            <circle cx="17" cy="0" r="6.59964" fill="#f8b26a">
                                <animate attributeName="r" keyTimes="0;0.5;1"
                                         values="3.5999999999999996;8.399999999999999;3.5999999999999996"
                                         dur="1.3333333333333333s"
                                         repeatCount="indefinite" begin="-0.15s"></animate>
                            </circle>
                            <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360"
                                              dur="1.3333333333333333s" repeatCount="indefinite"
                                              begin="-0.1s"></animateTransform>
                        </g>
                    </g>
                    <g transform="translate(50 50)">
                        <g transform="rotate(330.015)">
                            <circle cx="17" cy="0" r="4.87959" fill="#abbd81">
                                <animate attributeName="r" keyTimes="0;0.5;1"
                                         values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="1s"
                                         repeatCount="indefinite" begin="-0.1s"></animate>
                            </circle>
                            <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360"
                                              dur="1s"
                                              repeatCount="indefinite" begin="-0.15s"></animateTransform>
                        </g>
                    </g>
                    <g transform="translate(50 50)">
                        <g transform="rotate(75.0191)">
                            <circle cx="17" cy="0" r="3.80051" fill="#849b87">
                                <animate attributeName="r" keyTimes="0;0.5;1"
                                         values="3.5999999999999996;8.399999999999999;3.5999999999999996" dur="0.8s"
                                         repeatCount="indefinite" begin="-0.05s"></animate>
                            </circle>
                            <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360"
                                              dur="0.8s"
                                              repeatCount="indefinite" begin="-0.2s"></animateTransform>
                        </g>
                    </g>
                </g>
            </svg>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Loading',
        props: {
            color: {
                type: String,
                default: '#fff',
            },
            parent: {
                type: [String, HTMLElement],
                default: null,
            },
            width: {
                type: String,
                default: '64px',
            },
            height: {
                type: String,
                default: '64px',
            },
            bg: {
                type: Boolean,
                default: true,
            },
            bgColor: {
                type: String,
                default: 'transparent'
            }
        },
        data: () => ({
            parentEl: null,
            hasRelative: false,
        }),
        mounted() {
            this.$nextTick(() => {
                if (this.parent && !this.isInline) {
                    if (this.parent instanceof HTMLElement) {
                        this.parentEl = this.parent;
                    } else {
                        this.parentEl = this.$el.closest(this.parent);
                    }
                    if (this.parentEl) {
                        this.hasRelative = this.parentEl.classList.contains('has-relative');
                        this.parentEl.classList.add('has-relative');
                    }
                }
            });
        },
        destroyed() {
            if (this.parentEl && !this.hasRelative && !this.isInline) {
                this.parentEl.classList.remove('has-relative');
            }
        },
    };
</script>

<style lang="scss" scoped>
    /*@import "@/sass/_variables.scss";*/
    .ajax-loader {
        z-index: 41;

        &.has-parent {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba($primary, 0.2);

            &.no-bg {
                background-color: transparent !important;
            }
        }

        display: flex;
        align-items: center;
        justify-content: center;

        .ajax-img {

        }
    }


</style>
