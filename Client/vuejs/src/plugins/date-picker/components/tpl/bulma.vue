

<template>
  <div class="field has-addons">
    <p class="control">
      <button
        class="button is-outlined"
        type="button">
        <span class="icon"><i class="icon-regular calendar" /> </span>
      </button>
    </p>
    <p class="control">
      <input
        type="text"
        class="input input-date"
        :value="value"
        :placeholder="placeholder"
        data-input
        @change="inputChange">
    </p>
    <p class="control">
      <button
        class="button is-outlined"
        type="button">
        <span class="icon"><i class="icon-regular delete" /> </span>
      </button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Bulma',
};
</script>

<style scoped>

</style>
