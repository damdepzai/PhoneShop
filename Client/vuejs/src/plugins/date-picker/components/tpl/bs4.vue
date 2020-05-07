

<template>
  <div class="input-group flatpickr">
    <div
      v-show="calendarButton"
      class="input-group-prepend">
      <span
        class="input-group-text has-btn"
        data-toggle>
        <i class="icon-regular calendar" />
      </span>
    </div>
    <input
      type="text"
      class="form-control input-date"
      :value="value"
      :placeholder="placeholder"
      data-input
      @change="inputChange">
    <div
      v-show="clearButton && selectDate"
      class="input-group-append">
      <span
        class="input-group-text has-btn"
        data-clear>
        <span>&times;</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bs4',
};
</script>

<style scoped>

</style>
