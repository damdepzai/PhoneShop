

<template>
  <img :src="`svg/${loadType}.svg`" v-if="isInline">
  <div :class="{'ajax-loader':true,'has-parent': parent !== null}" v-else>
    <div class="ajax-img" :style="{width:width, height: height}">
      <img :src="require(`./svg/${loadType}.svg`)">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ajax-loader',
    props: {
      loadType: {
        type: String,
        default: 'circles'
      },
      parent: {
        type: String,
        default: null
      },
      width: {
        type: String,
        default: '64px'
      },
      height: {
        type: String,
        default: '64px'
      },
      isInline: false,
      data: () => ({
        parentEl: null,
        hasRelative: false
      })
    },
    mounted() {
      this.$nextTick(() => {
        if (this.parent && !this.isInline) {
          if (this.parent instanceof HTMLElement) {
            this.parentEl = this.parent
          } else {
            this.parentEl = this.$el.closest(this.parent)
          }
          if (this.parentEl) {
            this.hasRelative = this.parentEl.classList.contains('has-relative')
            this.parentEl.classList.add('has-relative')
          }
        }
      })
    },
    destroyed() {
      if (this.parentEl && !this.hasRelative && !this.isInline) {
        this.parentEl.classList.remove('has-relative')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ajax-loader {
    z-index: 41;

    &.has-parent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba($primary, 0.2);
    }

    display: flex;
    align-items: center;
    justify-content: center;

    .ajax-img {

    }
  }


</style>
