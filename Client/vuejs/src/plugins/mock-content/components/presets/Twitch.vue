<!--
  - Copyright (c) 2020.
  - Project: Source
  - LastModified: 2/14/20, 3:23 PM
  - Author: diengv < Giáp Văn Điện >
  - Email: diengv@ominext.com
  - File name: Twitch.vue
  - File path: D:/Projects/PMS/Source/Client/vuejs/src/plugins/mock-content/components/presets/Twitch.vue
  -->

<script>
  import MockContentLoading from '../MockContent.vue';

  export default {
    components: {
      MockContentLoading,
    },
  };
</script>

<template>
  <mock-content-loading v-bind="$attrs" :width="300" :height="225">
    <rect x="0" y="0" rx="3" ry="3" width="300" height="170" />
    <rect x="0" y="180" rx="2" ry="2" width="35" height="45" />
    <rect x="45" y="180" rx="2" ry="2" width="150" height="15" />
    <rect x="45" y="203" rx="2" ry="2" width="100" height="10" />
  </mock-content-loading>
</template>
