

<template>
  <transition name="fade">
    <div :class="{modal: true,'is-active':is_active}"  v-if="active">
      <div class="modal-background" @click="clickOut?closeModal():false"></div>
      <div class="modal-card" :style="{width: width, height: height}">
        <header class="modal-card-head">
          <p class="modal-card-title">{{title}}</p>
          <slot name="head"></slot>
<!--          <button class="delete" aria-label="close" @click.prevent="closeModal()"></button>-->
        </header>
        <section class="modal-card-body">
          <slot name="body"></slot>
        </section>
        <footer class="modal-card-foot">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal-card',
    props: {
      active: false,
      clickOut: false,
      title: '',
        width:'',
        height:'',

    },
    data: () => ({
      is_active: false,
      subClickOut: null,
    }),
    mounted () {
      this.$nextTick(() => {
        this.is_active = this.active
      })
    },
    watch: {
      active: function (val) {
        this.is_active = val
      },
      is_active: function (val) {
        if (val) {
          this.openModal()
        } else {
          this.closeModal()
          if (this.subClickOut) {
            this.subClickOut.unsubscribe()
          }
        }
      }
    },
    methods: {
      closeModal () {
        if (this.is_active) {
          this.$emit('closeModal')
          this.is_active = false
        }
      },
      openModal () {
        this.$emit('openModal')
      }
    },
    destroyed () {
      if (this.subClickOut) {
        this.subClickOut.unsubscribe()
      }
    }
  }
</script>

<style lang="scss" scoped>
    .modal {
        z-index: 9998;
    }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
