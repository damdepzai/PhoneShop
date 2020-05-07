

<template>
  <div class="field">
    <label class="label" v-if="label">{{label}}</label>
    <input type="text" :value="value"
           :class="['input','is-'+color,{'is-danger': error.length}]"
           :placeholder="placeholder"
           @input="$emit('input',$event.target.value)">
    <p class="help is-danger" v-if="error && help">{{error}}</p>
  </div>
</template>

<script>
  export default {
    name: 'field-input',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      label: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: null
      },
      help: {
        type: Boolean,
        default: false
      },
      error: {
        type: String,
        default: ''
      }
    },
    watch: {
      error: function (val) {
        if (val.length) {
          this.$el.querySelector('input').focus()
        }
      }
    }
  }
</script>

<style scoped>

</style>
