
<template>
  <div class="slide-wap">
    <input :class="classObject" type="range" :min="min"
           :max="max" :step="step" :name="name" v-model="realValue"
           :orient="vertical && 'vertical'" :disabled="disabled">
    <output v-if="realValue != null">{{realValue}}</output>
  </div>
</template>

<script>
  export default {
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      value: {
        type: Number,
        default: 0
      },
      type: String,
      name: String,
      size: String,
      isFullwidth: {
        type: Boolean,
        default: true
      },
      disabled: Boolean,
      // orientation:
      vertical: Boolean,
      outPut: Boolean
    },

    data () {
      return {
        realValue: this.value,
        inputEl: null
      }
    },

    beforeMount () {
      if (this.max < this.min) {
        throw 'Unexpected range setting: Maximum cannot be less than minimum'
      }

      this.update(this.value)
    },

    mounted () {
      this.$nextTick(() => {
        this.inputEl = this.$el.querySelector('input')
        this.inputEl.style.setProperty('--low', this.low)
        this.inputEl.style.setProperty('--high', this.high)
      })

    },

    watch: {
      realValue (newVal, oldVal) {
        if (Number(newVal) !== Number(oldVal) && this.inputEl) {
          this.inputEl.style.setProperty('--high', this.high)
          this.$emit('input', parseInt(newVal))
        }
      },
      value (val) {
        this.update(val)
      }
    },

    methods: {
      update (val) {
        val = parseInt(val)
        if (val > this.max) {
          this.realValue = this.max
        } else if (val < this.min) {
          this.realValue = this.min
        } else if (isNaN(val)) {
          this.realValue = null
        } else {
          this.realValue = val
        }
      }
    },

    computed: {
      low () {
        return '0%'
      },
      high () {
        return (this.realValue - this.min) / (this.max - this.min) * 100 + '%'
      },
      classObject () {
        const { type, size, isFullwidth, outPut } = this
        return {
          slider: true,
          [`is-${type}`]: type,
          [`is-${size}`]: size,
          'is-fullwidth': isFullwidth,
          'has-output': outPut
        }
      }
    }
  }
</script>

<style lang="scss">
  .slide-wap {
    display: flex;
    align-items: center;
  }

  input[type=range].slider {
    $slider-output-width: 3rem !default;
    $slider-output-background: $grey-dark !default;
    $slider-output-radius: $radius !default;
    $radius: 290486px;
    --height: 8px;

    &.is-small {
      --height: 4px;
    }

    &.is-medium {
      --height: 12px;
    }

    &.is-large {
      --height: 16px;
    }

    &.is-fullwidth {
      width: 100%;
    }

    border: none;
    border-radius: $radius;
    display: block;
    height: var(--height);
    padding: 0;
    margin: 0;
    // width: 100%;
    cursor: pointer;
    outline: none;
    background: $border;
    -webkit-tap-highlight-color: transparent;

    &:focus {
      outline: none;
    }

    // http://stackoverflow.com/questions/18794026/remove-dotted-outline-from-range-input-element-in-firefox
    &::-moz-focus-outer {
      border: none;
    }

    &::-webkit-slider-runnable-track,
    &::-webkit-slider-thumb,
    & {
      appearance: none;
    }

    @mixin thumb-base() {
      border-radius: 50%;
      height: calc(var(--height) * 2.33);
      width: calc(var(--height) * 2.33);
      background-color: #FFF;
      border: calc(var(--height) / 2) solid $text;
      box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1);
      transform: translateZ(0);
      transition: (0.233s / 2) ease-in-out;
      box-sizing: border-box;

      &:hover {
        transform: scale(1.25);
      }
    }

    @mixin thumb-base-active {
      cursor: grabbing;
    }

    @mixin track {
      display: flex;
      align-items: center;
      height: var(--height);
      border-radius: $radius;
      --track-background: linear-gradient(to right, transparent var(--low), $text calc(0%), $text var(--high), transparent calc(0%)) no-repeat 0 100%;
      background: var(--track-background);
      transform: translateZ(0);
      transition: (0.233s / 2);
    }

    &::-webkit-slider-thumb {
      @include thumb-base();

      &:active {
        @include thumb-base-active();
      }
    }

    &::-webkit-slider-runnable-track {
      @include track();
    }

    &::-moz-range-thumb {
      @include thumb-base();

      &:active {
        @include thumb-base-active();
      }
    }

    &::-moz-range-progress:focus {
      outline: 0;
      border: 0;
    }

    &::-moz-range-track {
      background: transparent;
    }

    &::-moz-range-progress {
      display: flex;
      align-items: center;
      width: 100%;
      height: var(--height);
      border-radius: $radius;
      background-color: $text;
    }

    &::-ms-thumb {
      @include thumb-base();

      &:active {
        @include thumb-base-active();
      }
    }

    &::-ms-tooltip {
      display: none;
    }

    // Colors
    @each $name, $pair in $colors {
      $color: nth($pair, 1);
      $color-invert: nth($pair, 2);
      &.is-#{$name} {
        &::-webkit-slider-thumb {
          border-color: $color;
        }

        &::-webkit-slider-runnable-track {
          --track-background: linear-gradient(to right, transparent var(--low), $color calc(0%), $color var(--high), transparent calc(0%)) no-repeat 0 100%;
          background: var(--track-background);
        }

        // http://www.quirksmode.org/blog/archives/2015/11/styling_and_scr.html
        &::-moz-range-thumb {
          border-color: $color;
        }

        &::-moz-range-progress {
          background-color: $color;
        }

        &::-ms-thumb {
          border-color: $color;
        }

        &::-ms-fill-lower {
          background-color: $color;
        }

        &.has-output,
        .has-output-tooltip {
          + output {
            background-color: $color;
            color: $color-invert;
          }
        }
      }
    }

    &[orient=vertical] {
      writing-mode: bt-lr; // IE
      -webkit-appearance: slider-vertical; // webkit
      height: 200px;
      width: var(--height);
      -webkit-transform-origin: 0 0;
      position: relative;
      top: 0;
      left: 0;

      // Colors
      @each $name, $pair in $colors {
        $color: nth($pair, 1);
        &.is-#{$name} {
          &::-webkit-slider-thumb {
            &:after {
              width: 50px;
              height: 50px;
              background-color: red;
              border: 2px solid $color;
              content: '';
              position: absolute;
              z-index: 233;
            }
          }

          &::-webkit-slider-runnable-track {
            display: block;
            --track-background: linear-gradient(to top, transparent var(--low), $color 0, $color var(--high), transparent 0) no-repeat 0 100%;
            background: var(--track-background);
          }
        }
      }
    }

    &.has-output,
    &.has-output-tooltip {
      + output {
        width: $slider-output-width;
        background: $slider-output-background;
        border-radius: $slider-output-radius;
        padding: 0.4rem 0.8rem;
        font-size: $size-7;
        line-height: $size-7;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: $white;
        overflow: hidden;
        pointer-events: none;
        z-index: 200;
      }
    }

    &.has-output {
      display: inline-block;
      width: calc(100% - (#{$slider-output-width + 1.2rem}));

      + output {
        display: inline-block;
        position: relative;
        margin-left: 0.75rem;
        /*top: 0.75rem;*/
      }
    }

    &.has-output-tooltip {
      display: block;

      + output {
        position: absolute;
        left: 0;
        top: -0.1rem;
      }
    }
  }
</style>
