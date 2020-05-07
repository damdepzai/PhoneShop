

<template>
    <div class="field input-date-picker">
        <p class="control has-icons-right">
            <input
                type="text"
                class="input input-date"
                :value="value"
                :placeholder="placeholder"
                data-input
                @change="inputChange">
            <span class="icon is-small is-right icon-drop p-5">
           <span class="icon has-icon-inline"><i class="icon-calendar"></i></span>
            <app-icon icon="calendar" size="10px" v-if="dropIcon"></app-icon>
      </span>
        </p>
    </div>
</template>

<script>
    import Script from './mixin';

    export default {
        name: 'DatePicker',
        mixins: [Script],
        data: () => ({
            component: null,
        }),
        computed: {
            /*   loader() {
                 if (!this.tpl) {
                   return null;
                 }
                 return () => import(`./tpl/${this.tpl}`);
               },*/
        },
        mounted() {
            /*    this.loader()
                  .then(() => {
                    this.component = () => this.loader();
                  })
                  .catch(() => {
                    this.component = () => import('./tpl/bulma');
                  });*/
        },
    };
</script>

<style lang="scss">
    @import "../style/default";
    /*@import "../style/airbnb";*/
    @import "../style/month-select";

    .has-icon-inline {
        margin-top: -2px;
    }
    .p-5{
        margin-top: 5px !important;
    }
    .input-date-picker {
        display: block;
        align-items: center;
        width: 100%;
        min-width: 140px;

        .control {
            .icon-drop {
                transition: 0.3s ease-in-out;
            }

            .icon-rotate {
                transform: rotateZ(180deg);
            }
        }
    }
</style>
